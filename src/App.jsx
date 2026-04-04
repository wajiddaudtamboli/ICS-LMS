import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import CommunityPage from "./sections/community/CommunityPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<CommunityPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
