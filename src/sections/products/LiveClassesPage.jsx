import React, { useEffect, useMemo, useState } from "react";
import "./live-classes.css";

const initialLiveClasses = [
  {
    id: 1,
    courseName: "Complete Web Development Bootcamp",
    note: "Live attended",
    instructor: "Dr. Arpita Kathane",
    dateTime: "26 Apr 2025\n11:00 to 2:00pm",
    status: "Upcoming"
  },
  {
    id: 2,
    courseName: "Complete Web Development Bootcamp",
    note: "Live attended",
    instructor: "Mr. Amal Ghadge",
    dateTime: "26 Apr 2025\n11:00 to 2:00pm",
    status: "Completed"
  },
  {
    id: 3,
    courseName: "Complete Web Development Bootcamp",
    note: "Ongoing - Started at 2:00 PM",
    instructor: "Dr. Arpita Kathane",
    dateTime: "26 Apr 2025\n11:00 to 2:00pm",
    status: "Published"
  },
  {
    id: 4,
    courseName: "Complete Web Development Bootcamp",
    note: "Live attended",
    instructor: "Mr. Amal Ghadge",
    dateTime: "26 Apr 2025\n11:00 to 2:00pm",
    status: "Ongoing"
  },
  {
    id: 5,
    courseName: "Complete Web Development Bootcamp",
    note: "Cancelled",
    instructor: "Mr. Sumit Dorle",
    dateTime: "Started at 2:00pm",
    status: "Cancelled"
  }
];


const emptyLiveClassForm = {
  title: "",
  shortDescription: "",
  thumbnailName: "",
  instructor: "Select instructor",
  category: "Select Category",
  tags: "",
  startDate: "",
  day: "",
  startTime: "11:00 AM",
  endTime: "11:30 AM",
  timeZone: "GMT + 5:30 India Standard Time",
  endTimeZone: "GMT + 5:30 India Standard Time"
};

const formatDayFromDate = (value) => {
  if (!value) {
    return "";
  }

  const nextDate = new Date(value);
  if (Number.isNaN(nextDate.getTime())) {
    return "";
  }

  return nextDate.toLocaleDateString("en-US", { weekday: "long" });
};

const normalizeTo12Hour = (value) => {
  const input = (value || "").trim();
  const rawMatch = input.match(/^(\d{1,2}):(\d{2})(?:\s*(AM|PM))?$/i);

  if (!rawMatch) {
    return input;
  }

  const hour = Number(rawMatch[1]);
  const minutes = rawMatch[2];
  const ampm = rawMatch[3]?.toUpperCase();

  if (ampm && hour >= 1 && hour <= 12) {
    return `${String(hour).padStart(2, "0")}:${minutes} ${ampm}`;
  }

  if (hour >= 0 && hour <= 23) {
    const nextAmpm = hour >= 12 ? "PM" : "AM";
    const nextHour = hour % 12 === 0 ? 12 : hour % 12;
    return `${String(nextHour).padStart(2, "0")}:${minutes} ${nextAmpm}`;
  }

  return input;
};
const defaultDescription = `🚀 Paid Live Class - Advanced UI/UX Masterclass

This is a premium live training session designed for serious learners.
✅ Access: Paid (Only enrolled students allowed)
✅ Topic: Modern SaaS Dashboard Design (2026 Edition)
✅ Includes:
   • Live Figma walkthrough
   • UI system design
   • Grid & spacing mastery
   • Q&A session
   • Recording access (24 hours)`;

function LiveClassesPage({ onToast, searchQuery = "" }) {
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [classesData, setClassesData] = useState(initialLiveClasses);
  const [isLoadingClasses, setIsLoadingClasses] = useState(false);
  const [isSavingClass, setIsSavingClass] = useState(false);
  const [createForm, setCreateForm] = useState(emptyLiveClassForm);
  const [thumbnailError, setThumbnailError] = useState("");
  const [classesSearchQuery, setClassesSearchQuery] = useState("");
  const [openRowMenuId, setOpenRowMenuId] = useState(null);
  const [showEditorModal, setShowEditorModal] = useState(false);
  const [editorTab, setEditorTab] = useState("details");
  const [showTimeZoneDialog, setShowTimeZoneDialog] = useState(false);
  const [showSendLikeDialog, setShowSendLikeDialog] = useState(false);
  const [eventDraft, setEventDraft] = useState({
    title: "Live Class",
    startDate: "Feb 13,2026",
    startTime: "10:30 am",
    endTime: "11:30 am",
    endDate: "Feb 13,2026",
    timeZone: "(GMT+05:30) India Standard Time - Kolkata",
    allDay: false,
    recurrence: "Does not Repeat",
    joinLink: "meet.google.com/xyx-yghc-ioj",
    mode: "Online",
    category: "Digital Marketing",
    availability: "Busy",
    visibility: "Default Visibility",
    description: defaultDescription,
    guests: [
      "guest1@email.com",
      "guest2@email.com",
      "digitalmarketingstudent@email.com"
    ],
    guestInput: "",
    permissions: {
      modifyEvent: true,
      inviteOthers: true,
      seeGuestList: true
    }
  });
  const [notifications, setNotifications] = useState([
    { id: 1, type: "Notification", value: "30", unit: "minutes" }
  ]);
  const descriptionRef = React.useRef(null);

  const activeSearchQuery = (classesSearchQuery.trim() || searchQuery.trim()).toLowerCase();

  useEffect(() => {
    const fetchLiveClasses = async () => {
      setIsLoadingClasses(true);
      try {
        const response = await fetch("/api/live-classes");
        if (!response.ok) {
          throw new Error("Failed to fetch live classes");
        }

        const payload = await response.json();
        if (Array.isArray(payload.items) && payload.items.length > 0) {
          setClassesData(payload.items);
        }
      } catch {
        onToast?.("Using local list. Start API server with npm run dev:server");
      } finally {
        setIsLoadingClasses(false);
      }
    };

    fetchLiveClasses();
  }, [onToast]);

  const statusClassName = (status) => {
    if (status === "Upcoming") return "status-upcoming";
    if (status === "Completed") return "status-completed";
    if (status === "Published") return "status-published";
    if (status === "Ongoing") return "status-ongoing";
    return "status-cancelled";
  };

  const tableRows = useMemo(() => {
    if (!activeSearchQuery) {
      return classesData;
    }

    return classesData.filter((item) =>
      [item.courseName, item.note, item.instructor, item.dateTime, item.status]
        .join(" ")
        .toLowerCase()
        .includes(activeSearchQuery)
    );
  }, [activeSearchQuery, classesData]);

  const isEmpty = tableRows.length === 0;

  const openEditor = () => {
    setShowEditorModal(true);
    setEditorTab("details");
    setShowTimeZoneDialog(false);
    setShowSendLikeDialog(false);
  };

  const removeOneClass = () => {
    if (classesData.length === 0) {
      return;
    }
    setClassesData((prev) => prev.slice(0, prev.length - 1));
    setOpenRowMenuId(null);
    onToast?.("Live class removed");
  };

  const closeEditor = () => {
    setShowEditorModal(false);
    setShowTimeZoneDialog(false);
    setShowSendLikeDialog(false);
  };

  const updateCreateForm = (field, value) => {
    setCreateForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleDateChange = (value) => {
    setCreateForm((prev) => ({
      ...prev,
      startDate: value,
      day: formatDayFromDate(value)
    }));
  };

  const handleThumbnailSelect = (file) => {
    if (!file) {
      return;
    }

    const allowedTypes = ["image/png", "image/jpeg", "image/gif"];
    if (!allowedTypes.includes(file.type)) {
      setThumbnailError("Only png, jpeg, jpg, gif are accepted");
      return;
    }

    if (file.size > 2 * 1024 * 1024) {
      setThumbnailError("Thumbnail must be less than 2MB");
      return;
    }

    setThumbnailError("");
    updateCreateForm("thumbnailName", file.name);
    onToast?.(`${file.name} selected`);
  };

  const resetCreateForm = () => {
    setCreateForm(emptyLiveClassForm);
    setThumbnailError("");
  };

  const saveLiveClass = async () => {
    if (!createForm.title.trim()) {
      onToast?.("Live class title is required");
      return;
    }

    if (!createForm.shortDescription.trim()) {
      onToast?.("Short description is required");
      return;
    }

    if (!createForm.startDate) {
      onToast?.("Start date is required");
      return;
    }

    setIsSavingClass(true);
    const payload = {
      title: createForm.title.trim(),
      shortDescription: createForm.shortDescription.trim(),
      thumbnailName: createForm.thumbnailName,
      instructor: createForm.instructor,
      category: createForm.category,
      tags: createForm.tags
        .split(",")
        .map((item) => item.trim())
        .filter(Boolean),
      startDate: createForm.startDate,
      day: createForm.day,
      startTime: normalizeTo12Hour(createForm.startTime),
      endTime: normalizeTo12Hour(createForm.endTime),
      timeZone: createForm.timeZone
    };

    try {
      const response = await fetch("/api/live-classes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        const errorPayload = await response.json().catch(() => ({ message: "Unable to save live class" }));
        throw new Error(errorPayload.message || "Unable to save live class");
      }

      const result = await response.json();
      if (result.item) {
        setClassesData((prev) => [result.item, ...prev]);
      }
      resetCreateForm();
      setShowCreateForm(false);
      onToast?.("Live class saved");
    } catch (error) {
      onToast?.(error.message || "Unable to save live class");
    } finally {
      setIsSavingClass(false);
    }
  };

  const updateEventDraft = (field, value) => {
    setEventDraft((prev) => ({ ...prev, [field]: value }));
  };

  const updatePermission = (field, checked) => {
    setEventDraft((prev) => ({
      ...prev,
      permissions: {
        ...prev.permissions,
        [field]: checked
      }
    }));
  };

  const copyJoinLink = async () => {
    try {
      await navigator.clipboard.writeText(eventDraft.joinLink);
      onToast?.("Meeting link copied");
    } catch {
      onToast?.("Unable to copy link");
    }
  };

  const updateNotification = (id, field, value) => {
    setNotifications((prev) => prev.map((item) => (item.id === id ? { ...item, [field]: value } : item)));
  };

  const addNotification = () => {
    setNotifications((prev) => [
      ...prev,
      { id: Date.now(), type: "Notification", value: "10", unit: "minutes" }
    ]);
  };

  const removeNotification = (id) => {
    setNotifications((prev) => prev.filter((item) => item.id !== id));
  };

  const wrapSelection = (prefix, suffix = "") => {
    const textarea = descriptionRef.current;
    if (!textarea) {
      return;
    }

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selected = eventDraft.description.slice(start, end);
    const replacement = `${prefix}${selected}${suffix}`;
    const nextValue = `${eventDraft.description.slice(0, start)}${replacement}${eventDraft.description.slice(end)}`;

    setEventDraft((prev) => ({ ...prev, description: nextValue }));
    requestAnimationFrame(() => {
      textarea.focus();
      const cursor = start + replacement.length;
      textarea.setSelectionRange(cursor, cursor);
    });
  };

  const addGuests = () => {
    const nextGuests = eventDraft.guestInput
      .split(",")
      .map((item) => item.trim())
      .filter(Boolean);

    if (nextGuests.length === 0) {
      return;
    }

    setEventDraft((prev) => ({
      ...prev,
      guests: [...prev.guests, ...nextGuests],
      guestInput: ""
    }));
  };

  const removeGuest = (guest) => {
    setEventDraft((prev) => ({
      ...prev,
      guests: prev.guests.filter((item) => item !== guest)
    }));
  };

  useEffect(() => {
    const closeRowMenuOnOutside = (event) => {
      if (!(event.target instanceof Element)) {
        return;
      }

      if (!event.target.closest(".actions-cell") && !event.target.closest(".row-menu")) {
        setOpenRowMenuId(null);
      }
    };

    const closeRowMenuOnEsc = (event) => {
      if (event.key === "Escape") {
        setOpenRowMenuId(null);
      }
    };

    document.addEventListener("pointerdown", closeRowMenuOnOutside);
    window.addEventListener("keydown", closeRowMenuOnEsc);

    return () => {
      document.removeEventListener("pointerdown", closeRowMenuOnOutside);
      window.removeEventListener("keydown", closeRowMenuOnEsc);
    };
  }, []);

  if (showCreateForm) {
    return (
      <div className="live-classes-page">
        <div className="live-breadcrumb">
          <button type="button" className="crumb-link" onClick={() => window.history.back()}>
            Product
          </button>
          <span className="crumb-sep">/</span>
          <span className="crumb-current">Live Classes</span>
        </div>

        <section className="live-form-card">
          <h2>Live Class</h2>
          <input
            value={createForm.title}
            onChange={(event) => updateCreateForm("title", event.target.value)}
            placeholder="Enter your live class title"
          />

          <h3>Short Description</h3>
          <input
            value={createForm.shortDescription}
            maxLength={150}
            onChange={(event) => updateCreateForm("shortDescription", event.target.value)}
            placeholder="Enter a brief description for the live Class (Max 150 characters)"
          />

          <h3>Thumbnail</h3>
          <label
            className="live-upload-area"
            onDragOver={(event) => event.preventDefault()}
            onDrop={(event) => {
              event.preventDefault();
              handleThumbnailSelect(event.dataTransfer.files?.[0]);
            }}
          >
            <input
              type="file"
              className="media-input"
              accept="image/png,image/jpeg,image/gif"
              onChange={(event) => handleThumbnailSelect(event.target.files?.[0])}
            />
            <div className="live-upload-icon">image</div>
            <p>Drag and drop an image, or click to upload.</p>
            <small>Minimum dimension: 800x450px.</small>
            <small>Maximum file size: 2MB.</small>
            <small>Accepted file types: png, jpeg, jpeg, gif</small>
            {createForm.thumbnailName ? <small>Selected: {createForm.thumbnailName}</small> : null}
            {thumbnailError ? <small className="upload-error">{thumbnailError}</small> : null}
          </label>

          <h3>Instructor</h3>
          <div className="live-two-col">
            <select value={createForm.instructor} onChange={(event) => updateCreateForm("instructor", event.target.value)}>
              <option>Select instructor</option>
              <option>Dr. Arpita Kathane</option>
              <option>Mr. Amal Ghadge</option>
              <option>Mr. Sumit Dorle</option>
            </select>
            <select value={createForm.category} onChange={(event) => updateCreateForm("category", event.target.value)}>
              <option>Select Category</option>
              <option>Digital Marketing</option>
              <option>Product Design</option>
              <option>Web Development</option>
            </select>
          </div>

          <h3>Tags</h3>
          <input
            value={createForm.tags}
            onChange={(event) => updateCreateForm("tags", event.target.value)}
            placeholder="Add Tags (optional)"
          />
        </section>

        <section className="live-form-card compact">
          <div className="live-two-col">
            <label>
              Start Date
              <input type="date" value={createForm.startDate} onChange={(event) => handleDateChange(event.target.value)} />
            </label>
            <label>
              Day
              <input value={createForm.day} placeholder="---------" onChange={(event) => updateCreateForm("day", event.target.value)} />
            </label>
          </div>

          <div className="live-two-col">
            <label>
              Start Time
              <div className="time-range">
                <input value={createForm.startTime} onChange={(event) => updateCreateForm("startTime", event.target.value)} />
                <span>To</span>
                <input value={createForm.endTime} onChange={(event) => updateCreateForm("endTime", event.target.value)} />
              </div>
            </label>
            <label>
              Time zone
              <select value={createForm.timeZone} onChange={(event) => updateCreateForm("timeZone", event.target.value)}>
                <option>GMT + 5:30 India Standard Time</option>
                <option>GMT + 0:00 Greenwich Mean Time</option>
                <option>GMT - 5:00 Eastern Time</option>
              </select>
            </label>
          </div>

          <label>
            Time zone
            <input value={createForm.endTimeZone} onChange={(event) => updateCreateForm("endTimeZone", event.target.value)} />
          </label>
        </section>

        <div className="live-form-actions">
          <button
            type="button"
            className="secondary"
            onClick={() => {
              resetCreateForm();
              setShowCreateForm(false);
            }}
          >
            Back to List
          </button>
          <button type="button" className="primary" disabled={isSavingClass} onClick={saveLiveClass}>
            Save
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="live-classes-page">
      <section className="live-header-card">
        <div>
          <h2>Live Class</h2>
          <p>View and manage your live classes</p>
        </div>
        <button type="button" className="primary" onClick={() => setShowCreateForm(true)}>
          + Create Live Class
        </button>
      </section>

      <section className="live-toolbar">
        <input
          placeholder="Search"
          value={classesSearchQuery || searchQuery}
          onChange={(event) => setClassesSearchQuery(event.target.value)}
        />
        <button type="button" className="icon-btn" aria-label="User filter" title="User filter" onClick={() => onToast?.("User filter opened") }>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M20 21a8 8 0 0 0-16 0" />
            <circle cx="12" cy="8" r="4" />
          </svg>
        </button>
        <button type="button" className="icon-btn" aria-label="Advanced filters" title="Advanced filters" onClick={() => onToast?.("Advanced filters opened") }>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <line x1="4" y1="6" x2="20" y2="6" />
            <line x1="7" y1="12" x2="17" y2="12" />
            <line x1="10" y1="18" x2="14" y2="18" />
          </svg>
        </button>
        <button type="button" className="icon-btn" aria-label="Date filter" title="Date filter" onClick={() => onToast?.("Date filter opened") }>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <rect x="3" y="4" width="18" height="18" rx="2" />
            <line x1="16" y1="2" x2="16" y2="6" />
            <line x1="8" y1="2" x2="8" y2="6" />
            <line x1="3" y1="10" x2="21" y2="10" />
          </svg>
        </button>
      </section>

      {isEmpty ? (
        <section className="live-empty-card">
          <div className="empty-illustration">No Results</div>
          <h4>{activeSearchQuery ? `No results found for "${classesSearchQuery || searchQuery}"` : "No results found"}</h4>
        </section>
      ) : (
        <section className="live-table-card">
          {isLoadingClasses ? <p className="live-loading">Loading live classes...</p> : null}
          <div className="live-table-scroll">
            <table className="live-table">
              <thead>
                <tr>
                  <th>Course Name</th>
                  <th>Instructor</th>
                  <th>Date & Time</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {tableRows.map((row) => (
                  <tr key={row.id}>
                    <td>
                      <strong>{row.courseName}</strong>
                      <span>{row.note}</span>
                    </td>
                    <td>{row.instructor}</td>
                    <td>{row.dateTime}</td>
                    <td>
                      <span className={`live-status ${statusClassName(row.status)}`}>{row.status}</span>
                    </td>
                    <td className={openRowMenuId === row.id ? "actions-cell menu-open" : "actions-cell"}>
                      <button
                        type="button"
                        className="kebab-btn"
                        onClick={() => setOpenRowMenuId((prev) => (prev === row.id ? null : row.id))}
                      >
                        ⋮
                      </button>
                      {openRowMenuId === row.id && (
                        <div className="row-menu">
                          <button type="button" onClick={() => { openEditor(); setOpenRowMenuId(null); }}>Edit</button>
                          <button type="button" onClick={() => { setShowSendLikeDialog(true); openEditor(); setOpenRowMenuId(null); }}>Send Like</button>
                          <button type="button" onClick={removeOneClass}>Delete</button>
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      )}

      {showEditorModal && (
        <div className="overlay" onClick={(event) => event.target.classList.contains("overlay") && setShowEditorModal(false)}>
          <div className="live-editor-modal">
            <button type="button" className="close-btn" onClick={closeEditor}>×</button>
            <div className="live-editor-head">
              <h3>{eventDraft.title}</h3>
              <button type="button" className="primary" onClick={() => onToast?.("Live class changes saved")}>Save</button>
            </div>

            <div className="live-editor-grid-row">
              <input value={eventDraft.startDate} onChange={(event) => updateEventDraft("startDate", event.target.value)} />
              <input value={eventDraft.startTime} onChange={(event) => updateEventDraft("startTime", event.target.value)} />
              <span>to</span>
              <input value={eventDraft.endTime} onChange={(event) => updateEventDraft("endTime", event.target.value)} />
              <input value={eventDraft.endDate} onChange={(event) => updateEventDraft("endDate", event.target.value)} />
              <button type="button" className="outline" onClick={() => setShowTimeZoneDialog(true)}>Time zone</button>
            </div>

            <div className="live-editor-check-row">
              <label><input type="checkbox" checked={eventDraft.allDay} onChange={(event) => updateEventDraft("allDay", event.target.checked)} /> All Day</label>
              <select value={eventDraft.recurrence} onChange={(event) => updateEventDraft("recurrence", event.target.value)}>
                <option>Does not Repeat</option>
                <option>Daily</option>
                <option>Weekly on Friday</option>
                <option>Every week Day</option>
                <option>Custom</option>
              </select>
            </div>

            <div className="editor-main-grid">
              <div>
                <div className="tabs-row">
                  <button type="button" className={editorTab === "details" ? "active" : ""} onClick={() => setEditorTab("details")}>Event details</button>
                  <button type="button" className={editorTab === "find" ? "active" : ""} onClick={() => setEditorTab("find")}>Find a time</button>
                </div>

                {editorTab === "details" ? (
                  <div className="event-details-card">
                    <div className="link-row">
                      <strong>Join with Link</strong>
                      <button type="button" className="copy-link" onClick={copyJoinLink}>copy</button>
                    </div>
                    <small>{eventDraft.joinLink} • up to 100 guest connections</small>

                    <div className="field-like">
                      <select value={eventDraft.mode} onChange={(event) => updateEventDraft("mode", event.target.value)}>
                        <option>Online</option>
                        <option>Offline</option>
                      </select>
                    </div>

                    {notifications.map((item) => (
                      <div key={item.id} className="notification-row">
                        <select value={item.type} onChange={(event) => updateNotification(item.id, "type", event.target.value)}>
                          <option>Notification</option>
                          <option>Email</option>
                          <option>WhatsApp</option>
                          <option>Call</option>
                        </select>
                        <input
                          value={item.value}
                          onChange={(event) => updateNotification(item.id, "value", event.target.value.replace(/[^0-9]/g, ""))}
                        />
                        <select value={item.unit} onChange={(event) => updateNotification(item.id, "unit", event.target.value)}>
                          <option value="minutes">minutes</option>
                          <option value="hours">hours</option>
                          <option value="days">days</option>
                          <option value="weeks">weeks</option>
                        </select>
                        <button type="button" className="ghost" onClick={() => removeNotification(item.id)}>×</button>
                      </div>
                    ))}

                    <button type="button" className="add-link" onClick={addNotification}>Add notification</button>

                    <div className="small-select-row">
                      <select value={eventDraft.category} onChange={(event) => updateEventDraft("category", event.target.value)}>
                        <option>Digital Marketing</option>
                        <option>Product Design</option>
                        <option>Business</option>
                      </select>
                      <select value={eventDraft.availability} onChange={(event) => updateEventDraft("availability", event.target.value)}>
                        <option>Busy</option>
                        <option>Free</option>
                      </select>
                      <select value={eventDraft.visibility} onChange={(event) => updateEventDraft("visibility", event.target.value)}>
                        <option>Default Visibility</option>
                        <option>Public</option>
                        <option>Private</option>
                      </select>
                    </div>

                    <div className="editor-box">
                      <div className="editor-toolbar">
                        <button type="button" onClick={() => wrapSelection("**", "**")}>A</button>
                        <button type="button" onClick={() => wrapSelection("__", "__")}>B</button>
                        <button type="button" onClick={() => wrapSelection("*", "*")}>I</button>
                        <button type="button" onClick={() => wrapSelection("<u>", "</u>")}>U</button>
                        <button type="button" onClick={() => wrapSelection("\n• ")}>•</button>
                        <button type="button" onClick={() => wrapSelection("\n✅ ")}>•</button>
                      </div>
                      <textarea
                        ref={descriptionRef}
                        value={eventDraft.description}
                        onChange={(event) => updateEventDraft("description", event.target.value)}
                      />
                    </div>
                  </div>
                ) : (
                  <div className="find-time-card">
                    <div className="calendar-head">Week View</div>
                    <div className="calendar-grid">
                      {Array.from({ length: 42 }).map((_, idx) => (
                        <div key={`cell-${idx}`} className="calendar-cell" />
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <aside className="guests-panel">
                <h4>Guests</h4>
                <p>Only paid & verified students can access this class.</p>
                <div className="guest-input-row">
                  <input
                    value={eventDraft.guestInput}
                    onChange={(event) => updateEventDraft("guestInput", event.target.value)}
                    placeholder="Add Guests"
                    onKeyDown={(event) => {
                      if (event.key === "Enter") {
                        event.preventDefault();
                        addGuests();
                      }
                    }}
                  />
                  <button type="button" className="outline" onClick={addGuests}>Add</button>
                </div>
                <ul>
                  {eventDraft.guests.map((guest) => (
                    <li key={guest}>
                      <span>{guest}</span>
                      <button type="button" className="ghost" onClick={() => removeGuest(guest)}>x</button>
                    </li>
                  ))}
                </ul>
                <strong>Guests Permissions</strong>
                <label><input type="checkbox" checked={eventDraft.permissions.modifyEvent} onChange={(event) => updatePermission("modifyEvent", event.target.checked)} /> Modify event</label>
                <label><input type="checkbox" checked={eventDraft.permissions.inviteOthers} onChange={(event) => updatePermission("inviteOthers", event.target.checked)} /> Invite others</label>
                <label><input type="checkbox" checked={eventDraft.permissions.seeGuestList} onChange={(event) => updatePermission("seeGuestList", event.target.checked)} /> See guest list</label>
              </aside>
            </div>

            <div className="editor-save-row">
              <button type="button" className="primary" onClick={() => onToast?.("Event details saved")}>Save</button>
            </div>

            {showTimeZoneDialog && (
              <div className="inner-dialog">
                <div className="inner-card">
                  <button type="button" className="close-btn" onClick={() => setShowTimeZoneDialog(false)}>×</button>
                  <h4>Event Time Zone</h4>
                  <label><input type="checkbox" /> Use separate start and end time zones</label>
                  <div className="tz-box">{eventDraft.timeZone}</div>
                  <div className="tz-box">{eventDraft.timeZone}</div>
                  <div className="inner-actions">
                    <button
                      type="button"
                      className="link"
                      onClick={() => {
                        updateEventDraft("timeZone", "(GMT+05:30) India Standard Time - Kolkata");
                        onToast?.("Current time zone selected");
                      }}
                    >
                      Use current time zone
                    </button>
                    <button type="button" className="link" onClick={() => setShowTimeZoneDialog(false)}>Cancel</button>
                    <button
                      type="button"
                      className="primary"
                      onClick={() => {
                        setShowTimeZoneDialog(false);
                        onToast?.("Time zone updated");
                      }}
                    >
                      Ok
                    </button>
                  </div>
                </div>
              </div>
            )}

            {showSendLikeDialog && (
              <div className="inner-dialog">
                <div className="inner-card compact">
                  <button type="button" className="close-btn" onClick={() => setShowSendLikeDialog(false)}>×</button>
                  <p>Send like to every one</p>
                  <div className="inner-actions">
                    <button
                      type="button"
                      className="primary"
                      onClick={() => {
                        setShowSendLikeDialog(false);
                        onToast?.("Likes sent to attendees");
                      }}
                    >
                      Send
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default LiveClassesPage;
