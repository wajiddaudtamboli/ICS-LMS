import React, { useMemo, useState } from "react";
import "./mock-test.css";

const seedRows = [
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

function MockTestPage({ onToast, searchQuery = "" }) {
  const [search, setSearch] = useState("");
  const [rows] = useState(seedRows);
  const [mode, setMode] = useState("list");
  const [showCreateSeriesModal, setShowCreateSeriesModal] = useState(false);
  const [showAddQuestionsModal, setShowAddQuestionsModal] = useState(false);
  const [showActionMenu, setShowActionMenu] = useState(false);
  const [showImportDialog, setShowImportDialog] = useState(false);
  const [showMcqDesign, setShowMcqDesign] = useState(false);
  const [selectedCount, setSelectedCount] = useState(0);

  const statusClassName = (status) => {
    if (status === "Upcoming") return "status-upcoming";
    if (status === "Completed") return "status-completed";
    if (status === "Published") return "status-published";
    if (status === "Ongoing") return "status-ongoing";
    return "status-cancelled";
  };

  const activeSearch = (search.trim() || searchQuery.trim()).toLowerCase();

  const filteredRows = useMemo(() => {
    if (!activeSearch) {
      return rows;
    }

    return rows.filter((row) =>
      [row.courseName, row.note, row.instructor, row.dateTime, row.status]
        .join(" ")
        .toLowerCase()
        .includes(activeSearch)
    );
  }, [activeSearch, rows]);

  const startBuilder = () => {
    setMode("builder");
    setShowCreateSeriesModal(false);
    onToast?.("Mock test builder opened");
  };

  if (mode === "builder") {
    return (
      <div className="mock-test-page">
        <div className="mock-breadcrumb">Mock Test / Create Mock Test</div>

        <section className="mock-builder-card">
          <div className="mock-builder-head">
            <div>
              <span className="unpublished-pill">Un-published</span>
              <h2>Research Writing & Use of AI</h2>
            </div>
            <div className="mock-builder-tools">
              <button type="button">⌄</button>
              <button type="button">↻</button>
              <button type="button" onClick={() => setShowActionMenu((prev) => !prev)}>⚙</button>
            </div>
          </div>

          <div className="mock-builder-search-row">
            <input placeholder="Search" />
            <div className="mock-builder-counts">0 Questions • 0 Marks</div>
          </div>

          <div className="mock-section-row">
            <span>⌃ 1. Section 1</span>
            <span>• 0 Questions • 0 Marks • 0 Groups</span>
          </div>

          <button type="button" className="add-question-btn" onClick={() => setShowAddQuestionsModal(true)}>
            + Add Question
          </button>

          <button type="button" className="add-section-btn" onClick={() => onToast?.("Section created successfully")}>
            + Add Section
          </button>

          <div className="question-list">
            {selectedCount > 0 && (
              <>
                {Array.from({ length: selectedCount }).map((_, idx) => (
                  <div key={`q-${idx}`} className="question-item">
                    <span>{idx + 1}. How many videos are allowed in one Lesson</span>
                    <span>#Course</span>
                    <span className="difficulty">Easy</span>
                    <button type="button">•••</button>
                  </div>
                ))}
              </>
            )}
          </div>

          {showActionMenu && (
            <div className="builder-action-menu">
              <button type="button" onClick={() => { setShowMcqDesign(true); setShowActionMenu(false); }}>View All Questions</button>
              <button type="button" onClick={() => { setShowMcqDesign(true); setShowActionMenu(false); }}>Export Questions</button>
              <button type="button" onClick={() => { setShowMcqDesign(true); setShowActionMenu(false); }}>Import</button>
              <button type="button">Quiz Instructions</button>
              <button type="button">Test Attachments</button>
              <button type="button">Questions Group</button>
            </div>
          )}
        </section>

        {showAddQuestionsModal && (
          <div className="overlay" onClick={(event) => event.target.classList.contains("overlay") && setShowAddQuestionsModal(false)}>
            <div className="add-questions-modal">
              <button type="button" className="close-btn" onClick={() => setShowAddQuestionsModal(false)}>×</button>
              <h3>Add Questions</h3>
              <p>Select to add questions, test attachment or group the questions</p>
              <div className="question-type-grid">
                {["Multiple Choice", "Numerical", "Essay", "Fill In The Blanks", "Group Question", "Multi Input Reasoning", "Two Part Analysis", "Graphical Interpretation", "Multiple Choice V2"].map((item) => (
                  <button
                    key={item}
                    type="button"
                    className={item === "Numerical" ? "selected" : ""}
                    onClick={() => onToast?.(`${item} selected`)}
                  >
                    {item}
                  </button>
                ))}
              </div>
              <div className="modal-actions-right">
                <button
                  type="button"
                  className="primary"
                  onClick={() => {
                    setSelectedCount(5);
                    setShowAddQuestionsModal(false);
                    onToast?.("Questions added");
                  }}
                >
                  Add
                </button>
              </div>
            </div>
          </div>
        )}

        {showMcqDesign && (
          <div className="overlay" onClick={(event) => event.target.classList.contains("overlay") && setShowMcqDesign(false)}>
            <div className="mcq-modal">
              <button type="button" className="close-btn" onClick={() => setShowMcqDesign(false)}>×</button>
              <h3>MCQ Design</h3>
              <p>Only the questions that are not imported into the test will be displayed here</p>
              <div className="mcq-toolbar">
                <input placeholder="Search by question Details" />
                <button type="button">⎚</button>
                <button type="button">SELECT COLUMNS</button>
              </div>
              <table>
                <thead>
                  <tr>
                    <th />
                    <th>Question Detail</th>
                    <th>Question Type</th>
                    <th>Question Tag</th>
                    <th>Question Level</th>
                    <th>Marks</th>
                    <th>Used</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td><input type="checkbox" /></td>
                    <td>249 + 250 = _ _ _ ?</td>
                    <td>Design</td>
                    <td>UI</td>
                    <td>Medium</td>
                    <td>+ 3.0 / -0.0</td>
                    <td>11</td>
                  </tr>
                  <tr>
                    <td><input type="checkbox" /></td>
                    <td>249 + 250 = _ _ _ ?</td>
                    <td>Research</td>
                    <td>UX</td>
                    <td>Easy</td>
                    <td>+ 5.0 / -0.0</td>
                    <td>12</td>
                  </tr>
                </tbody>
              </table>
              <div className="mcq-actions">
                <button type="button" className="primary" onClick={() => { setShowImportDialog(true); setShowMcqDesign(false); }}>Export</button>
                <button type="button" className="secondary" onClick={() => setShowMcqDesign(false)}>CANCEL</button>
              </div>
            </div>
          </div>
        )}

        {showImportDialog && (
          <div className="overlay" onClick={(event) => event.target.classList.contains("overlay") && setShowImportDialog(false)}>
            <div className="import-ok-dialog">
              <p>Questions are imported to the quiz, Go back to Quiz Builder and verify the questions</p>
              <button type="button" className="primary" onClick={() => setShowImportDialog(false)}>Close</button>
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="mock-test-page">
      <section className="live-header-card">
        <div>
          <h2>Mock Test</h2>
          <p>View and manage your Mock Test</p>
        </div>
        <button type="button" className="primary" onClick={() => setShowCreateSeriesModal(true)}>
          + Create Live Class
        </button>
      </section>

      <section className="live-toolbar">
        <input value={search || searchQuery} onChange={(event) => setSearch(event.target.value)} placeholder="Search" />
        <button type="button" className="icon-btn">📊</button>
        <button type="button" className="icon-btn">⚙</button>
        <button type="button" className="icon-btn">👜</button>
      </section>

      <section className="live-table-card">
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
            {filteredRows.map((row) => (
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
                <td>
                  <button type="button" className="kebab-btn" onClick={startBuilder}>⋮</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      {showCreateSeriesModal && (
        <div className="overlay" onClick={(event) => event.target.classList.contains("overlay") && setShowCreateSeriesModal(false)}>
          <div className="series-modal">
            <button type="button" className="close-btn" onClick={() => setShowCreateSeriesModal(false)}>×</button>
            <h3>Mock Test / Create Courses</h3>
            <div className="series-body">
              <h4>Create Courses</h4>
              <p>Start creating a new test series</p>
              <label>
                Title*
                <input placeholder="Enter Mock Test Title" />
              </label>
              <label>
                Price
                <input placeholder="Price" />
              </label>
              <label><input type="checkbox" /> Make this a free mock test</label>
              <div className="quiz-types-inline">
                <label><input type="radio" name="qt" defaultChecked /> Online quiz</label>
                <label><input type="radio" name="qt" /> Offline quiz</label>
              </div>
              <label>
                Select Template
                <select defaultValue="Select"><option>Select</option></select>
              </label>
            </div>
            <div className="series-actions">
              <button type="button" className="primary" onClick={startBuilder}>Create</button>
              <button type="button" className="secondary" onClick={() => setShowCreateSeriesModal(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default MockTestPage;
