import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import CommunityPage from "./sections/community/CommunityPage";
import MeetingPage from "./sections/meeting/MeetingPage";
import DrivePage from "./sections/drive/DrivePage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<CommunityPage />} />
        <Route path="/meeting" element={<MeetingPage />} />
        <Route path="/drive" element={<DrivePage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
