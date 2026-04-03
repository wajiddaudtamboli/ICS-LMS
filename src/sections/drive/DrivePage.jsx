import React, { useMemo, useState } from "react";
import "./drive.css";

const sampleFiles = [
  {
    id: "pool-1",
    name: "Abc Pool",
    category: "Pool",
    createdAt: "Today"
  },
  {
    id: "word-1",
    name: "Word Notes",
    category: "Word document",
    createdAt: "Today"
  },
  {
    id: "excel-1",
    name: "Scores Sheet",
    category: "Excel sheet",
    createdAt: "Today"
  }
];

const tabs = ["Pool", "Word document", "Excel sheet"];

function DrivePage() {
  const [files] = useState(sampleFiles);
  const [activeTab, setActiveTab] = useState("Pool");
  const [search, setSearch] = useState("");
  const [sortByRecent, setSortByRecent] = useState(true);
  const [selectedId, setSelectedId] = useState("pool-1");

  const renderedFiles = useMemo(() => {
    const query = search.trim().toLowerCase();
    const filtered = files.filter((file) => {
      const inTab = file.category === activeTab;
      const inSearch = !query || file.name.toLowerCase().includes(query);
      return inTab && inSearch;
    });

    return [...filtered].sort((a, b) => {
      if (sortByRecent) {
        return b.id.localeCompare(a.id);
      }
      return a.name.localeCompare(b.name);
    });
  }, [activeTab, files, search, sortByRecent]);

  return (
    <div className="drive-shell">
      <div className="drive-frame">
        <header className="drive-topbar">
          <div className="drive-search">
            <input
              type="text"
              placeholder="Search"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
            />
            <svg className="drive-search-icon" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#6b7280" strokeWidth="2">
              <circle cx="11" cy="11" r="8" />
              <path d="M21 21l-4.35-4.35" />
            </svg>
          </div>
          <button
            type="button"
            className="drive-filter"
            aria-label="Toggle sort"
            onClick={() => setSortByRecent((prev) => !prev)}
            title={sortByRecent ? "Sorted by recent" : "Sorted by name"}
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="4" y1="8" x2="20" y2="8" />
              <circle cx="10" cy="8" r="2" />
              <line x1="4" y1="16" x2="20" y2="16" />
              <circle cx="14" cy="16" r="2" />
            </svg>
          </button>
        </header>

        <nav className="drive-tabs" aria-label="Drive categories">
          {tabs.map((tab) => (
            <button
              key={tab}
              className={activeTab === tab ? "active" : ""}
              type="button"
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </button>
          ))}
        </nav>

        <div className="drive-section-title">{activeTab}</div>

        <main className="drive-content">
          <h3>Today</h3>
          <div className="drive-grid" role="list">
            {renderedFiles.map((file) => (
              <button
                key={file.id}
                type="button"
                role="listitem"
                className={`drive-card ${selectedId === file.id ? "selected" : ""}`}
                onClick={() => setSelectedId(file.id)}
              >
                <div className="drive-thumb" aria-hidden="true">
                  <div className="drive-thumb-top" />
                  <div className="drive-thumb-lines">
                    <span />
                    <span />
                    <span />
                  </div>
                </div>
                <div className="drive-meta">{file.name}</div>
              </button>
            ))}
          </div>
          {renderedFiles.length === 0 ? <p className="drive-empty">No files found.</p> : null}
        </main>
      </div>
    </div>
  );
}

export default DrivePage;
