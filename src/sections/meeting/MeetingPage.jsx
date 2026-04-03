import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  MeetingProvider,
  useMeeting,
  useParticipant
} from "@videosdk.live/react-sdk";
import "./meeting.css";

const API_BASE = import.meta.env.VITE_API_BASE || "/api";

function ParticipantTile({ participantId }) {
  const {
    displayName,
    webcamStream,
    micStream,
    webcamOn,
    micOn,
    isLocal
  } = useParticipant(participantId);
  const videoRef = useRef(null);
  const audioRef = useRef(null);

  useEffect(() => {
    if (videoRef.current && webcamOn && webcamStream) {
      const mediaStream = new MediaStream([webcamStream.track]);
      videoRef.current.srcObject = mediaStream;
      videoRef.current.play().catch(() => {});
    }
  }, [webcamOn, webcamStream]);

  useEffect(() => {
    if (audioRef.current && micOn && micStream && !isLocal) {
      const mediaStream = new MediaStream([micStream.track]);
      audioRef.current.srcObject = mediaStream;
      audioRef.current.play().catch(() => {});
    }
  }, [micOn, micStream, isLocal]);

  return (
    <div className={`participant-tile ${webcamOn ? "video-on" : "video-off"}`}>
      {webcamOn ? (
        <video ref={videoRef} muted={isLocal} autoPlay playsInline />
      ) : (
        <div className="participant-avatar">
          <span>{displayName?.slice(0, 1) || "U"}</span>
        </div>
      )}
      <div className="participant-label">
        <span>{displayName || "Participant"}</span>
        <span className={`status-dot ${micOn ? "on" : "off"}`} />
      </div>
      <audio ref={audioRef} autoPlay playsInline />
    </div>
  );
}

function MeetingRoom({ onLeave }) {
  const {
    join,
    leave,
    participants,
    toggleMic,
    toggleWebcam,
    toggleScreenShare,
    localMicOn,
    localWebcamOn,
    localScreenShareOn,
    meetingId
  } = useMeeting();

  const participantIds = useMemo(() => Array.from(participants.keys()), [participants]);

  useEffect(() => {
    join();
  }, [join]);

  const handleLeave = () => {
    leave();
    onLeave();
  };

  return (
    <div className="meeting-shell">
      <div className="meeting-header">
        <div className="meeting-brand">
          <img src="/image.png" alt="ICS Global" />
          <div>
            <p>ICS Global Live</p>
            <span>Meeting ID: {meetingId}</span>
          </div>
        </div>
        <div className="meeting-actions">
          <button className="ghost-btn" type="button">Grid View</button>
          <button className="ghost-btn" type="button">Participants</button>
        </div>
      </div>

      <div className="meeting-body">
        <aside className="participants-panel">
          <div className="panel-header">
            <h3>Participants</h3>
            <span>{participantIds.length}</span>
          </div>
          <div className="panel-list">
            {participantIds.map((id) => (
              <div className="panel-row" key={id}>
                <div className="panel-avatar">{id.slice(0, 2).toUpperCase()}</div>
                <div>
                  <p>Participant</p>
                  <span>Online</span>
                </div>
              </div>
            ))}
          </div>
        </aside>

        <div className="meeting-grid">
          {participantIds.map((id) => (
            <ParticipantTile key={id} participantId={id} />
          ))}
        </div>
      </div>

      <div className="meeting-controls">
        <button
          type="button"
          className={`control-btn ${localMicOn ? "active" : ""}`}
          onClick={toggleMic}
        >
          {localMicOn ? "Mic On" : "Mic Off"}
        </button>
        <button
          type="button"
          className={`control-btn ${localWebcamOn ? "active" : ""}`}
          onClick={toggleWebcam}
        >
          {localWebcamOn ? "Cam On" : "Cam Off"}
        </button>
        <button
          type="button"
          className={`control-btn ${localScreenShareOn ? "active" : ""}`}
          onClick={toggleScreenShare}
        >
          Share Screen
        </button>
        <button type="button" className="control-btn danger" onClick={handleLeave}>
          Leave
        </button>
      </div>
    </div>
  );
}

function MeetingPage() {
  const [meetingIdInput, setMeetingIdInput] = useState("");
  const [meetingId, setMeetingId] = useState("");
  const [displayName, setDisplayName] = useState("ICS Host");
  const [role, setRole] = useState("host");
  const [token, setToken] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchToken = async (selectedRole) => {
    const response = await fetch(`${API_BASE}/videosdk/token?role=${selectedRole}`);
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.error || "Failed to create token");
    }
    return data.token;
  };

  const createMeeting = async () => {
    const response = await fetch(`${API_BASE}/videosdk/meetings`, { method: "POST" });
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.error || "Failed to create meeting");
    }
    return data.meetingId;
  };

  const startMeeting = async () => {
    setIsLoading(true);
    setError("");
    try {
      const resolvedMeetingId = meetingIdInput.trim() || (await createMeeting());
      const resolvedToken = await fetchToken(role);
      setMeetingId(resolvedMeetingId);
      setToken(resolvedToken);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const resetMeeting = () => {
    setMeetingId("");
    setToken("");
  };

  if (meetingId && token) {
    return (
      <MeetingProvider
        config={{
          meetingId,
          micEnabled: true,
          webcamEnabled: true,
          name: displayName || "ICS Participant"
        }}
        token={token}
      >
        <MeetingRoom onLeave={resetMeeting} />
      </MeetingProvider>
    );
  }

  return (
    <div className="meeting-join">
      <div className="join-card">
        <div className="join-header">
          <img src="/image.png" alt="ICS Global" />
          <div>
            <h1>Start a meeting</h1>
            <p>Meet with your learners in real time</p>
          </div>
        </div>

        <label>Display name</label>
        <input
          type="text"
          value={displayName}
          onChange={(event) => setDisplayName(event.target.value)}
          placeholder="Your name"
        />

        <label>Meeting ID</label>
        <input
          type="text"
          value={meetingIdInput}
          onChange={(event) => setMeetingIdInput(event.target.value)}
          placeholder="Enter meeting ID or leave blank to create"
        />

        <div className="join-role">
          <label>
            <input
              type="radio"
              name="role"
              value="host"
              checked={role === "host"}
              onChange={() => setRole("host")}
            />
            Host
          </label>
          <label>
            <input
              type="radio"
              name="role"
              value="participant"
              checked={role === "participant"}
              onChange={() => setRole("participant")}
            />
            Participant
          </label>
        </div>

        {error ? <p className="join-error">{error}</p> : null}

        <button type="button" className="primary-btn" onClick={startMeeting} disabled={isLoading}>
          {isLoading ? "Connecting..." : "Join Meeting"}
        </button>
      </div>
    </div>
  );
}

export default MeetingPage;
