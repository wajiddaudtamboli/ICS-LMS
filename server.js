import express from "express";
import cors from "cors";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const { RAPIDAPI_KEY, RAPIDAPI_HOST, VIDEOSDK_SECRET_KEY } = process.env;

const requireEnv = (name) => {
  if (!process.env[name]) {
    throw new Error(`Missing ${name} in environment`);
  }
};

app.get("/api/health", (_req, res) => {
  res.json({ ok: true });
});

app.get("/api/videosdk/token", (req, res) => {
  try {
    requireEnv("VIDEOSDK_SECRET_KEY");
    const role = req.query.role === "host" ? "host" : "participant";
    const permissions = role === "host"
      ? ["allow_join", "allow_mod", "allow_share", "allow_screen_share"]
      : ["allow_join", "allow_share", "allow_screen_share"];

    const payload = {
      permissions,
      iat: Math.floor(Date.now() / 1000),
      exp: Math.floor(Date.now() / 1000) + 60 * 60 * 2
    };

    const token = jwt.sign(payload, VIDEOSDK_SECRET_KEY);
    res.json({ token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post("/api/videosdk/meetings", async (_req, res) => {
  try {
    requireEnv("RAPIDAPI_KEY");
    requireEnv("RAPIDAPI_HOST");

    const response = await fetch(`https://${RAPIDAPI_HOST}/v1/meetings`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-RapidAPI-Key": RAPIDAPI_KEY,
        "X-RapidAPI-Host": RAPIDAPI_HOST
      },
      body: JSON.stringify({})
    });

    const data = await response.json();
    const meetingId = data.meetingId || data.id || data.roomId || data.room_id;

    if (!response.ok || !meetingId) {
      return res.status(500).json({ error: "Unable to create meeting", details: data });
    }

    res.json({ meetingId });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

const port = 5175;
app.listen(port, () => {
  console.log(`API server running on http://localhost:${port}`);
});
