import React, { useMemo, useState } from "react";
import "./courses.css";

function CoursesPage({ sectionTitle = "Courses", onToast, searchQuery = "" }) {
  const [selectedFilter, setSelectedFilter] = useState("All Courses");
  const [coursesSearchQuery, setCoursesSearchQuery] = useState("");
  const [showFilterMenu, setShowFilterMenu] = useState(false);
  const [openRowMenuId, setOpenRowMenuId] = useState(null);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [createTab, setCreateTab] = useState("basic");
  const [showLessonStructure, setShowLessonStructure] = useState(false);
  const [showLessonContent, setShowLessonContent] = useState(false);
  const [showSectionMenu, setShowSectionMenu] = useState(false);
  const [courseSettings, setCourseSettings] = useState({
    certificates: false,
    comments: true,
    drip: false,
    prerequisites: false
  });

  const notify = (message) => onToast?.(message);

  const metricCards = [
    { label: "Total Course", value: "27" },
    { label: "Encrypted Course", value: "5" },
    { label: "Unencrypted Course", value: "22" },
    { label: "Encrypted Course Limit", value: "100" }
  ];

  const rows = useMemo(
    () => [
      { id: 1, course: "Complete Web Development Bootcamp", status: "Published", enrollments: 234, revenue: "$12,450", updated: "2 days ago" },
      { id: 2, course: "Advance React & TypeScript", status: "Published", enrollments: 156, revenue: "$15,860", updated: "2 days ago" },
      { id: 3, course: "Python for Data Science", status: "Draft", enrollments: 0, revenue: "$0", updated: "2 Week ago" },
      { id: 4, course: "UI/UX Design Masterclass", status: "Published", enrollments: 89, revenue: "$5,860", updated: "2 days ago" }
    ],
    []
  );

  const filteredRows = useMemo(() => {
    const activeSearchQuery = (coursesSearchQuery.trim() || searchQuery.trim()).toLowerCase();

    return rows.filter((row) => {
      const matchesFilter = selectedFilter === "All Courses" ? true : row.status === selectedFilter;
      if (!matchesFilter) {
        return false;
      }

      if (!activeSearchQuery) {
        return true;
      }

      return [row.course, row.status, row.revenue, row.updated]
        .join(" ")
        .toLowerCase()
        .includes(activeSearchQuery);
    });
  }, [coursesSearchQuery, rows, searchQuery, selectedFilter]);

  const renderCreateTab = () => {
    if (createTab === "content") {
      return (
        <div className="create-tab-body">
          <h4>Research Writing & Use of AI</h4>
          <div className="content-row">
            <span>⋮</span>
            <input value="Introduction to th Course" readOnly />
            <select defaultValue="Video">
              <option>Text</option>
              <option>Video</option>
              <option>Quiz</option>
            </select>
            <input value="5:30 hr" readOnly />
            <button type="button" className="mini-danger" onClick={() => notify("Section row removed")}>🗑</button>
          </div>
          <div className="content-row">
            <span>⋮</span>
            <input value="Introduction to th Course" readOnly />
            <select defaultValue="Text">
              <option>Text</option>
              <option>Video</option>
              <option>Quiz</option>
            </select>
            <input value="" readOnly />
            <button type="button" className="mini-danger" onClick={() => notify("Section row removed")}>🗑</button>
          </div>
          <div className="content-actions">
            <button type="button" onClick={() => notify("New section added")}>+ Add Section</button>
          </div>
          <div className="resource-box">
            <h5>Course Resources</h5>
            <div className="resource-drop">
              <div className="resource-icon">🖼</div>
              <p>Upload course materials</p>
              <small>PDF, ZIP, documents up to 50MB</small>
            </div>
          </div>
        </div>
      );
    }

    if (createTab === "settings") {
      return (
        <div className="create-tab-body">
          <div className="settings-card">
            <h5>COURSE SETTINGS</h5>
            <div className="settings-row">
              <span>Enable Certificates</span>
              <button
                type="button"
                className={`toggle ${courseSettings.certificates ? "on" : ""}`}
                aria-pressed={courseSettings.certificates}
                onClick={() => setCourseSettings((prev) => ({ ...prev, certificates: !prev.certificates }))}
              />
            </div>
            <div className="settings-row">
              <span>Allow Comments</span>
              <button
                type="button"
                className={`toggle ${courseSettings.comments ? "on" : ""}`}
                aria-pressed={courseSettings.comments}
                onClick={() => setCourseSettings((prev) => ({ ...prev, comments: !prev.comments }))}
              />
            </div>
            <div className="settings-row">
              <span>Drip Content</span>
              <button
                type="button"
                className={`toggle ${courseSettings.drip ? "on" : ""}`}
                aria-pressed={courseSettings.drip}
                onClick={() => setCourseSettings((prev) => ({ ...prev, drip: !prev.drip }))}
              />
            </div>
            <div className="settings-row">
              <span>Course Prerequisites</span>
              <button
                type="button"
                className={`toggle ${courseSettings.prerequisites ? "on" : ""}`}
                aria-pressed={courseSettings.prerequisites}
                onClick={() => setCourseSettings((prev) => ({ ...prev, prerequisites: !prev.prerequisites }))}
              />
            </div>
          </div>
          <div className="settings-card">
            <h4>Research Writing & Use of AI</h4>
            <div className="settings-grid">
              <label>
                Maximum Students
                <select defaultValue="Always Open">
                  <option>Always Open</option>
                  <option>Limited Time</option>
                  <option>Scheduled</option>
                </select>
              </label>
              <label>
                Enrollment period
                <select defaultValue="Select Period">
                  <option>Select Period</option>
                  <option>30 days</option>
                  <option>60 days</option>
                </select>
              </label>
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className="create-tab-body">
        <h4>Course Details</h4>
        <div className="basic-grid">
          <label>
            Course Title*
            <input placeholder="Enter your live class title" />
          </label>
          <label>
            Description*
            <textarea placeholder="Add description" rows={5} />
          </label>
        </div>
        <div className="basic-grid two-col">
          <label>
            Category
            <select defaultValue="Select Category">
              <option>Select Category</option>
            </select>
          </label>
          <label>
            Level
            <select defaultValue="Select Level">
              <option>Select Level</option>
            </select>
          </label>
          <label>
            Price($)
            <input placeholder="Enter Price" />
          </label>
          <label>
            Estimate Duration
            <select defaultValue="Select Level">
              <option>Select Level</option>
            </select>
          </label>
        </div>
        <div className="thumbnail-box">
          <h5>Thumbnail</h5>
          <div className="resource-drop">
            <div className="resource-icon">🖼</div>
            <p>Drag and drop an image, or click to upload.</p>
            <small>Minimum dimension: 800x450px. Maximum file size: 2MB.</small>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="courses-page">
      <section className="courses-head-card">
        <div>
          <h2>{sectionTitle}</h2>
          <p>Welcome to your course dashboard</p>
        </div>
        <div className="courses-head-actions">
          <button type="button" className="btn-reorder" onClick={() => onToast?.("Reorder clicked")}>
            Reorder
          </button>
          <button type="button" className="btn-create-course" onClick={() => setShowCreateModal(true)}>
            + Create
          </button>
        </div>
      </section>

      <section className="courses-metric-grid">
        {metricCards.map((metric) => (
          <article key={metric.label} className="courses-metric-card">
            <span>{metric.label}</span>
            <strong>{metric.value}</strong>
          </article>
        ))}
      </section>

      <section className="courses-toolbar">
        <input
          type="text"
          placeholder="Search"
          value={coursesSearchQuery || searchQuery}
          onChange={(event) => setCoursesSearchQuery(event.target.value)}
        />
        <button type="button" className="btn-filter" onClick={() => setShowFilterMenu((prev) => !prev)}>
          <span aria-hidden="true">⎚</span>
          {selectedFilter}
        </button>
        {showFilterMenu && (
          <div className="courses-filter-menu">
            {[
              "All Courses",
              "Published",
              "Draft",
              "Archived"
            ].map((option) => (
              <button
                key={option}
                type="button"
                onClick={() => {
                  setSelectedFilter(option);
                  setShowFilterMenu(false);
                }}
              >
                {option}
              </button>
            ))}
          </div>
        )}
      </section>

      <section className="courses-activity-card">
        <h3>Recent Activity</h3>
        <div className="courses-table-scroll">
          <table className="courses-table">
            <thead>
              <tr>
                <th>Course</th>
                <th>Status</th>
                <th>Enrollments</th>
                <th>Revenue</th>
                <th>Last Updated</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredRows.length === 0 ? (
                <tr>
                  <td colSpan={6}>No courses found.</td>
                </tr>
              ) : (
                filteredRows.map((row) => (
                  <tr key={row.id}>
                    <td>{row.course}</td>
                    <td>
                      <span className={`status-pill ${row.status === "Published" ? "published" : "draft"}`}>{row.status}</span>
                    </td>
                    <td>{row.enrollments}</td>
                    <td>{row.revenue}</td>
                    <td>{row.updated}</td>
                    <td className="actions-cell">
                      <button
                        type="button"
                        className="kebab-btn"
                        onClick={() => setOpenRowMenuId((prev) => (prev === row.id ? null : row.id))}
                      >
                        ⋮
                      </button>
                      {openRowMenuId === row.id && (
                        <div className="row-menu">
                          <button type="button" onClick={() => { setShowLessonStructure(true); setOpenRowMenuId(null); }}>View</button>
                          <button type="button" onClick={() => { setShowLessonContent(true); setOpenRowMenuId(null); }}>Edit</button>
                          <button type="button" onClick={() => { setOpenRowMenuId(null); onToast?.("Course deleted"); }}>Delete</button>
                        </div>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </section>

      {showCreateModal && (
        <div className="overlay" onClick={(event) => event.target.classList.contains("overlay") && setShowCreateModal(false)}>
          <div className="course-modal">
            <button type="button" className="close-btn" onClick={() => setShowCreateModal(false)}>×</button>
            <h4>Create New Course</h4>
            <p>Build engaging content for your learners</p>
            <div className="tab-nav">
              <button type="button" className={createTab === "basic" ? "active" : ""} onClick={() => setCreateTab("basic")}>Basic Information</button>
              <button type="button" className={createTab === "content" ? "active" : ""} onClick={() => setCreateTab("content")}>Content</button>
              <button type="button" className={createTab === "settings" ? "active" : ""} onClick={() => setCreateTab("settings")}>Settings</button>
            </div>
            {renderCreateTab()}
            <div className="modal-actions">
              <button
                type="button"
                className="primary"
                onClick={() => {
                  notify("Course saved and published");
                  setShowCreateModal(false);
                }}
              >
                Save & Publish
              </button>
              <button type="button" className="secondary" onClick={() => setShowCreateModal(false)}>Preview</button>
            </div>
          </div>
        </div>
      )}

      {showLessonStructure && (
        <div className="full-overlay">
          <header className="builder-topbar">
            <img src="/image.png" alt="ICS" />
            <div className="builder-actions">
              <button type="button" onClick={() => notify("Lesson structure published")}>Publish</button>
              <div className="avatar-dot">J</div>
            </div>
          </header>
          <main className="builder-body">
            <div className="builder-card">
              <h2>Research Writing & Use of AI</h2>
              <div className="builder-meta">0 Hidden Lessons • 40 Lessons • 31 Quizzes • 19 hrs 20 mins 24 secs</div>
              <div className="builder-rows">
                {Array.from({ length: 7 }).map((_, idx) => (
                  <div className="builder-row" key={`row-${idx}`}>
                    <span>⌄ 1. Index</span>
                    <span>• 9 Lessons • 7 Questions</span>
                    <button type="button" className="kebab-btn" onClick={() => setShowSectionMenu((prev) => !prev)}>⋯</button>
                  </div>
                ))}
              </div>
              {showSectionMenu && (
                <div className="section-menu">
                  <button type="button" onClick={() => { setShowSectionMenu(false); notify("Edit section opened"); }}>Edit Section</button>
                  <button type="button" onClick={() => { setShowSectionMenu(false); notify("Section added"); }}>Add Section</button>
                  <button type="button" onClick={() => { setShowSectionMenu(false); notify("Lesson added"); }}>Add Lesson</button>
                  <button type="button" onClick={() => { setShowSectionMenu(false); notify("Reorder section enabled"); }}>Reorder Section</button>
                  <button type="button" onClick={() => { setShowSectionMenu(false); notify("Section moved to top"); }}>Move to Top</button>
                  <button type="button" onClick={() => { setShowSectionMenu(false); notify("Section moved down"); }}>Move to Down</button>
                  <button type="button" onClick={() => { setShowSectionMenu(false); notify("Section deleted"); }}>Delete</button>
                </div>
              )}
              <button type="button" className="add-question" onClick={() => notify("Question added")}>+ Add Question</button>
            </div>
            <button type="button" className="close-full" onClick={() => setShowLessonStructure(false)}>Close</button>
          </main>
        </div>
      )}

      {showLessonContent && (
        <div className="full-overlay">
          <header className="builder-topbar">
            <img src="/image.png" alt="ICS" />
            <div className="builder-actions">
              <button type="button" onClick={() => notify("Lesson content published")}>Publish</button>
              <div className="avatar-dot">J</div>
            </div>
          </header>
          <main className="content-editor-body">
            <section className="content-outline">
              <h3>Index_Introduction</h3>
              <ul>
                <li>Objectives</li>
                <li>Index Introduction</li>
                <li>Fundamental Of Research Writing</li>
                <li>Role of AI in Research</li>
              </ul>
            </section>
            <section className="content-preview">
              <div className="preview-head">PDF Lesson 1</div>
              <div className="preview-box">
                <img src="/image.png" alt="Lesson" />
              </div>
              <div className="preview-foot">
                <span>Content uploaded successfully</span>
                <button type="button" className="remove-btn" onClick={() => notify("Attachment removed")}>Remove</button>
              </div>
            </section>
            <section className="attachment-panel">
              <h3>Attachment</h3>
              <div className="resource-drop">
                <div className="resource-icon">☁</div>
                <p>Drag & Drop files here, or</p>
                <button type="button" className="upload-btn" onClick={() => notify("File upload picker opened")}>Upload File</button>
              </div>
            </section>
            <button type="button" className="close-full" onClick={() => setShowLessonContent(false)}>Close</button>
          </main>
        </div>
      )}
    </div>
  );
}

export default CoursesPage;
