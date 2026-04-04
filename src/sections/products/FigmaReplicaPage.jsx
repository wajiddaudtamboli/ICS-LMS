import React, { useEffect, useMemo, useState } from "react";
import "./figma-replica.css";

const mockRows = [
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

const builderQuestions = [
  "How many videos are allowed in one Lesson",
  "How many videos are allowed in one Lesson",
  "How many videos are allowed in one Lesson",
  "How many videos are allowed in one Lesson",
  "How many videos are allowed in one Lesson"
];

const formCards = ["Abc Pool", "Abc Pool"];

const formFeatures = [
  { id: "form-11", label: "Form + Theme" },
  { id: "form-12", label: "Question Card" },
  { id: "form-13", label: "Form Plain" },
  { id: "form-14", label: "Pool Overlay" },
  { id: "form-15", label: "Pool Standalone" },
  { id: "form-16", label: "Insert Image" },
  { id: "form-18", label: "Theme Blur" },
  { id: "form-19", label: "Minimal Header" }
];

function statusClassName(status) {
  if (status === "Upcoming") return "status-upcoming";
  if (status === "Completed") return "status-completed";
  if (status === "Published") return "status-published";
  if (status === "Ongoing") return "status-ongoing";
  return "status-cancelled";
}

function FigmaReplicaPage({ onToast, searchQuery = "" }) {
  const [activeScreen, setActiveScreen] = useState("mock-01");
  const [experience, setExperience] = useState("mock");
  const [mockMode, setMockMode] = useState("list");
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showAddQuestions, setShowAddQuestions] = useState(false);
  const [showQuickActions, setShowQuickActions] = useState(false);
  const [showMcqDesign, setShowMcqDesign] = useState(false);
  const [showImportedOk, setShowImportedOk] = useState(false);
  const [showSelectedQuestions, setShowSelectedQuestions] = useState(false);
  const [selectedCount, setSelectedCount] = useState(0);
  const [collapsedSection, setCollapsedSection] = useState(false);
  const [showPoolPicker, setShowPoolPicker] = useState(false);
  const [poolTab, setPoolTab] = useState("Pool");
  const [showTheme, setShowTheme] = useState(true);
  const [activeFormFeature, setActiveFormFeature] = useState("form-11");
  const [formVariant, setFormVariant] = useState("capital");
  const [showFormDim, setShowFormDim] = useState(false);
  const [showInsertImageDialog, setShowInsertImageDialog] = useState(false);
  const [selectedQuestionType, setSelectedQuestionType] = useState("Numerical");
  const [formTab, setFormTab] = useState("Questions");
  const [insertTab, setInsertTab] = useState("Upload");
  const [selectedQuestionRows, setSelectedQuestionRows] = useState(["q1", "q2"]);
  const [openMockRowMenuId, setOpenMockRowMenuId] = useState(null);

  const notify = (message) => onToast?.(message);

  const resolvedSearch = searchQuery.trim().toLowerCase();
  const filteredRows = useMemo(() => {
    if (!resolvedSearch) {
      return mockRows;
    }

    return mockRows.filter((row) =>
      [row.courseName, row.note, row.instructor, row.dateTime, row.status]
        .join(" ")
        .toLowerCase()
        .includes(resolvedSearch)
    );
  }, [resolvedSearch]);

  const openBuilder = () => {
    setMockMode("builder");
    setShowCreateModal(false);
    notify("Mock test builder opened");
  };

  const resetOverlays = () => {
    setShowCreateModal(false);
    setShowAddQuestions(false);
    setShowQuickActions(false);
    setShowMcqDesign(false);
    setShowImportedOk(false);
    setShowSelectedQuestions(false);
    setShowPoolPicker(false);
    setShowFormDim(false);
    setShowInsertImageDialog(false);
    setOpenMockRowMenuId(null);
  };

  const applyFormFeature = (featureId) => {
    setActiveFormFeature(featureId);
    setShowPoolPicker(false);
    setShowFormDim(false);
    setShowInsertImageDialog(false);

    if (featureId === "form-11") {
      setFormVariant("capital");
      setShowTheme(true);
    }
    if (featureId === "form-12") {
      setFormVariant("question");
      setShowTheme(true);
    }
    if (featureId === "form-13") {
      setFormVariant("capital");
      setShowTheme(false);
    }
    if (featureId === "form-14") {
      setFormVariant("capital");
      setShowTheme(true);
      setShowPoolPicker(true);
      setShowFormDim(true);
    }
    if (featureId === "form-15") {
      setFormVariant("capital");
      setShowTheme(false);
    }
    if (featureId === "form-16") {
      setFormVariant("capital");
      setShowTheme(true);
      setShowInsertImageDialog(true);
    }
    if (featureId === "form-18") {
      setFormVariant("capital");
      setShowTheme(true);
      setShowFormDim(true);
    }
    if (featureId === "form-19") {
      setFormVariant("minimal");
      setShowTheme(false);
    }
  };

  const applyScreen = (screenId) => {
    setActiveScreen(screenId);
    resetOverlays();

    if (screenId.startsWith("mock")) {
      setExperience("mock");
      setFormVariant("capital");
      setShowTheme(true);
    } else {
      setExperience("form");
      setMockMode("builder");
      setSelectedCount(0);
      setCollapsedSection(false);
      applyFormFeature(screenId);
    }

    if (screenId === "mock-01") {
      setMockMode("list");
      setSelectedCount(0);
      setCollapsedSection(false);
    }
    if (screenId === "mock-02") {
      setMockMode("builder");
      setSelectedCount(0);
      setCollapsedSection(false);
    }
    if (screenId === "mock-03") {
      setMockMode("builder");
      setCollapsedSection(true);
      setSelectedCount(0);
    }
    if (screenId === "mock-04") {
      setMockMode("createInline");
    }
    if (screenId === "mock-05") {
      setMockMode("list");
      setShowCreateModal(true);
    }
    if (screenId === "mock-06") {
      setMockMode("builder");
      setShowQuickActions(true);
    }
    if (screenId === "mock-07") {
      setMockMode("builder");
      setSelectedCount(5);
    }
    if (screenId === "mock-08") {
      setMockMode("builder");
      setShowMcqDesign(true);
    }
    if (screenId === "mock-09") {
      setMockMode("builder");
      setShowMcqDesign(true);
      setShowSelectedQuestions(true);
    }
    if (screenId === "mock-10") {
      setMockMode("builder");
      setShowMcqDesign(true);
      setShowImportedOk(true);
    }

  };

  useEffect(() => {
    applyScreen(activeScreen);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const closeMenusOnOutside = (event) => {
      if (!(event.target instanceof Element)) {
        return;
      }

      if (!event.target.closest(".figma-actions-cell") && !event.target.closest(".figma-row-menu")) {
        setOpenMockRowMenuId(null);
      }

      if (!event.target.closest(".builder-actions") && !event.target.closest(".quick-actions-menu")) {
        setShowQuickActions(false);
      }
    };

    const closeMenusOnEsc = (event) => {
      if (event.key === "Escape") {
        setOpenMockRowMenuId(null);
        setShowQuickActions(false);
      }
    };

    document.addEventListener("pointerdown", closeMenusOnOutside);
    window.addEventListener("keydown", closeMenusOnEsc);

    return () => {
      document.removeEventListener("pointerdown", closeMenusOnOutside);
      window.removeEventListener("keydown", closeMenusOnEsc);
    };
  }, []);

  const renderMockList = () => (
    <div className="figma-screen-card">
      <section className="figma-header-card">
        <div>
          <h2>Mock Test</h2>
          <p>View and manage your Mock Test</p>
        </div>
        <button type="button" className="figma-primary" onClick={() => setShowCreateModal(true)}>
          + Create Live Class
        </button>
      </section>

      <section className="figma-toolbar-card">
        <input placeholder="Search" />
        <div className="figma-tool-btns">
          <button type="button" aria-label="Layout options" title="Layout options" onClick={() => notify("Layout options opened") }>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <rect x="3" y="4" width="7" height="7" />
              <rect x="14" y="4" width="7" height="7" />
              <rect x="3" y="13" width="7" height="7" />
              <rect x="14" y="13" width="7" height="7" />
            </svg>
          </button>
          <button type="button" aria-label="Settings" title="Settings" onClick={() => notify("Settings opened") }>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <circle cx="12" cy="12" r="3" />
              <path d="M19.07 4.93l-1.41 1.41M5.34 18.66l-1.41 1.41M20 12h2M2 12h2M19.07 19.07l-1.41-1.41M5.34 5.34L3.93 3.93M12 20v2M12 2v2" />
            </svg>
          </button>
          <button type="button" aria-label="More tools" title="More tools" onClick={() => notify("More tools opened") }>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <circle cx="12" cy="12" r="1" />
              <circle cx="19" cy="12" r="1" />
              <circle cx="5" cy="12" r="1" />
            </svg>
          </button>
        </div>
      </section>

      <section className="figma-table-card">
        <div className="figma-table-scroll">
          <table>
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
                    <span className={`figma-status ${statusClassName(row.status)}`}>{row.status}</span>
                  </td>
                  <td className={openMockRowMenuId === row.id ? "figma-actions-cell menu-open" : "figma-actions-cell"}>
                    <button
                      type="button"
                      className="kebab"
                      onClick={() => setOpenMockRowMenuId((prev) => (prev === row.id ? null : row.id))}
                    >
                      ⋮
                    </button>
                    {openMockRowMenuId === row.id && (
                      <div className="figma-row-menu">
                        <button type="button" onClick={() => { openBuilder(); setOpenMockRowMenuId(null); }}>View</button>
                        <button type="button" onClick={() => { setShowCreateModal(true); setOpenMockRowMenuId(null); }}>Edit</button>
                        <button type="button" onClick={() => { notify("Mock test deleted"); setOpenMockRowMenuId(null); }}>Delete</button>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );

  const renderMockBuilder = () => (
    <div className="figma-screen-card">
      <div className="figma-breadcrumb">
        <button type="button" className="crumb-link" onClick={() => window.history.back()}>
          Mock Test
        </button>
        <span className="crumb-sep">/</span>
        <span className="crumb-current">Create Mock Test</span>
      </div>
      <section className="builder-shell">
        <div className="builder-head">
          <div>
            <span className="chip-unpublished">Un-published</span>
            <h2>Research Writing &amp; Use of AI</h2>
          </div>
          <div className="builder-actions">
            <button type="button" onClick={() => setCollapsedSection((prev) => !prev)}>⌄</button>
            <button
              type="button"
              onClick={() => {
                setCollapsedSection(false);
                setSelectedCount(0);
                notify("Builder reset");
              }}
            >
              ↻
            </button>
            <button type="button" onClick={() => setShowQuickActions((prev) => !prev)}>⚙</button>
          </div>
        </div>

        <div className="builder-search-row">
          <input placeholder="Search" />
          <div>{selectedCount} Questions</div>
          <div>{selectedCount} Marks</div>
        </div>

        <button type="button" className="section-row" onClick={() => setCollapsedSection((prev) => !prev)}>
          <span>{collapsedSection ? "⌄" : "⌃"} 1. Section 1</span>
          <span>• 0 Questions • 0 Marks • 0 Groups</span>
        </button>

        {!collapsedSection && (
          <>
            <button type="button" className="btn-add-question" onClick={() => setShowAddQuestions(true)}>
              + Add Question
            </button>
            {selectedCount > 0 && (
              <div className="question-list">
                {builderQuestions.slice(0, selectedCount).map((question, index) => (
                  <div className="question-row" key={`${question}-${index}`}>
                    <span>{index + 1}. {question}</span>
                    <span>#Course</span>
                    <span className="tag-easy">Easy</span>
                    <button type="button" onClick={() => notify(`Question ${index + 1} actions opened`)}>•••</button>
                  </div>
                ))}
              </div>
            )}
          </>
        )}

        <button type="button" className="btn-add-section" onClick={() => notify("Section created successfully")}>+ Add Section</button>

        {showQuickActions && (
          <div className="quick-actions-menu">
            <button type="button" onClick={() => { setShowMcqDesign(true); setShowQuickActions(false); }}>View All Questions</button>
            <button type="button" onClick={() => { setShowMcqDesign(true); setShowQuickActions(false); }}>Export Questions</button>
            <button type="button" onClick={() => { setShowMcqDesign(true); setShowQuickActions(false); }}>Import</button>
            <button type="button" onClick={() => { setShowQuickActions(false); notify("Quiz instructions opened"); }}>Quiz Instructions</button>
            <button type="button" onClick={() => { setShowQuickActions(false); notify("Test attachments opened"); }}>Test Attachments</button>
            <button type="button" onClick={() => { setShowQuickActions(false); notify("Question grouping opened"); }}>Questions Group</button>
          </div>
        )}
      </section>
    </div>
  );

  const renderFormBuilder = () => (
    <div className="figma-form-wrapper">
      <div className="form-header-line">
        <img className="form-logo" src="/image.png" alt="ICS" />
        <div className="form-back-line">Back</div>
        <div className="form-tabs">
          {[
            "Questions",
            "Responses",
            "Settings"
          ].map((tab) => (
            <button
              key={tab}
              type="button"
              className={formTab === tab ? "active" : ""}
              onClick={() => {
                setFormTab(tab);
                notify(`${tab} tab opened`);
              }}
            >
              {tab}
            </button>
          ))}
        </div>
        <div className="form-top-actions">
          <button type="button" className="figma-primary" onClick={() => notify("Form published")}>Publish</button>
          <span className="avatar-round">J</span>
        </div>
      </div>

      <div className="form-main-layout">
        <section className="form-questions-area">
          <article className={`form-card ${formVariant === "minimal" ? "minimal" : ""}`}>
            {formVariant === "minimal" ? (
              <>
                <div className="editor-tools wide">⌂ B I U ☰ Ξ ∞ ✈</div>
                <input className="desc-input" placeholder="Add description" />
              </>
            ) : (
              <>
                <input className="title-input" placeholder="Untitled Title" />
                <div className="editor-tools">B I U ∞ ✈</div>
                <input className="desc-input" placeholder="Description (optional)" />
              </>
            )}
          </article>
          <article className="form-card"><h3>Name<span>*</span></h3><input placeholder="Short answer text" /></article>
          <article className="form-card"><h3>Email<span>*</span></h3><input placeholder="Short answer text" /></article>
          <article className="form-card"><h3>Phone Number<span>*</span></h3><input placeholder="Short answer text" /></article>
          {formVariant !== "minimal" && (
            <article className="form-card radio-card">
              <div className="radio-head">
                <input value={formVariant === "capital" ? "Capital of India" : "Question"} readOnly />
                <select defaultValue="Multiple choice"><option>Multiple choice</option></select>
              </div>
              {formVariant === "capital" ? (
                <>
                  <label className="radio-option"><input type="radio" name="capital-city" /> New Delhi.</label>
                  <label className="radio-option"><input type="radio" name="capital-city" /> Kolhapur</label>
                  <label className="radio-option"><input type="radio" name="capital-city" /> Mumbai.</label>
                  <label className="radio-option"><input type="radio" name="capital-city" /> Pune.</label>
                  <div className="question-footer-line"><span>Required</span><span className="required-toggle" aria-hidden="true">○</span></div>
                </>
              ) : (
                <>
                  <label className="radio-option"><input type="radio" name="question-option" /> Option 1</label>
                  <label className="radio-option"><input type="radio" name="question-option" /> Add option or add "Other"</label>
                  <div className="question-footer-line"><span>Required</span><span className="required-toggle" aria-hidden="true">○</span></div>
                </>
              )}
            </article>
          )}
        </section>

        {showTheme && (
          <aside className="theme-panel">
            <div className="theme-head">
              <h4>Theme</h4>
              <button type="button" onClick={() => setShowTheme(false)}>×</button>
            </div>
            <label>Header<select defaultValue="Roboto"><option>Roboto</option></select></label>
            <label>Question<select defaultValue="Roboto"><option>Roboto</option></select></label>
            <label>Text<select defaultValue="Roboto"><option>Roboto</option></select></label>
            <div className="theme-swatches">
              {Array.from({ length: 14 }).map((_, idx) => <span key={`sw-${idx}`} />)}
            </div>
            <div className="theme-action-stack">
              <button type="button" onClick={() => applyFormFeature("form-16")}>Insert Image</button>
            </div>
          </aside>
        )}
      </div>

      {activeFormFeature === "form-15" && (
        <div className="form-inline-panel">
          <h4>Pool Standalone</h4>
          <div className="pool-search">
            <input placeholder="Search" />
            <button type="button" onClick={() => notify("Pool settings opened")}>⚙</button>
          </div>
          <div className="pool-tabs">
            {["Pool"].map((tab) => (
              <button key={tab} type="button" className={poolTab === tab ? "active" : ""} onClick={() => setPoolTab(tab)}>{tab}</button>
            ))}
          </div>
          <div className="pool-cards">
            <button type="button" className="pool-card" onClick={() => notify("Pool selected") }>
              <div className="pool-thumb" />
              <span>Abc Pool</span>
            </button>
          </div>
        </div>
      )}

      <button type="button" className="pool-launch" onClick={() => setShowPoolPicker(true)}>Open Pool Picker</button>
    </div>
  );

  const renderInsertImage = () => (
    <div className="dialog-shell">
      <div className="insert-image-dialog">
        <div className="dialog-head"><h3>Insert image</h3><button type="button" onClick={() => setShowInsertImageDialog(false)}>×</button></div>
        <div className="insert-tabs">
          {[
            "Upload",
            "Webcam",
            "By URL",
            "Photos",
            "Google Images"
          ].map((tab) => (
            <button type="button" key={tab} className={insertTab === tab ? "active" : ""} onClick={() => setInsertTab(tab)}>
              {tab}
            </button>
          ))}
        </div>
        <div className="upload-drop">
          <div className="cloud-shape" />
          <button type="button" className="figma-primary" onClick={() => notify("File picker opened")}>Browse</button>
          <p>or drag a file here</p>
        </div>
      </div>
    </div>
  );

  return (
    <div className="figma-replica-page">
      <div className="flow-sections">
        <section className={experience === "mock" ? "flow-section active" : "flow-section"}>
          <div className="flow-section-head">
            <h2>Mock Test Flow</h2>
            <button type="button" className="flow-jump" onClick={() => applyScreen("mock-01")}>Open</button>
          </div>
          <div className="single-flow-note" aria-label="Single mock test flow">
            Single page mock test with all features integrated.
          </div>
        </section>

        <section className={experience === "form" ? "flow-section active" : "flow-section"}>
          <div className="flow-section-head">
            <h2>Form Builder Flow</h2>
            <button type="button" className="flow-jump" onClick={() => applyScreen("form-11")}>Open</button>
          </div>
          <div className="single-flow-note" aria-label="Single form builder flow">
            Single page form builder with all features integrated.
          </div>
        </section>
      </div>

      {experience === "mock" ? (
        <div className="mock-unified-stack">
          {renderMockList()}
          {renderMockBuilder()}
        </div>
      ) : (
        renderFormBuilder()
      )}

      {showInsertImageDialog && (
        <div className="figma-overlay" onClick={(event) => event.target.classList.contains("figma-overlay") && setShowInsertImageDialog(false)}>
          {renderInsertImage()}
        </div>
      )}

      {showCreateModal && (
        <div className="figma-overlay" onClick={(event) => event.target.classList.contains("figma-overlay") && setShowCreateModal(false)}>
          <div className="create-series-modal">
            <button type="button" className="close" onClick={() => setShowCreateModal(false)}>×</button>
            <h3>Mock Test / Create Courses</h3>
            <div className="modal-form">
              <h4 className="modal-subtitle">Create Courses</h4>
              <p className="modal-description">Start creating a new test series</p>
              <div className="modal-grid-two">
                <label>Title*<input placeholder="Enter Mock Test Title" /></label>
                <label>Price<input placeholder="Price" /></label>
              </div>
              <div className="inline modal-checkbox">Make this a free mock test</div>
              <div className="quiz-type-cards">
                <label><input type="radio" name="quiztype" defaultChecked /> Online quiz</label>
                <label><input type="radio" name="quiztype" /> Offline quiz</label>
              </div>
              <label className="template-field">Select Template<select defaultValue="Select"><option>Select</option></select></label>
            </div>
            <div className="modal-actions">
              <button type="button" className="figma-primary" onClick={openBuilder}>Create</button>
              <button type="button" className="figma-secondary" onClick={() => setShowCreateModal(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}

      {showAddQuestions && (
        <div className="figma-overlay" onClick={(event) => event.target.classList.contains("figma-overlay") && setShowAddQuestions(false)}>
          <div className="add-questions-modal">
            <button type="button" className="close" onClick={() => setShowAddQuestions(false)}>×</button>
            <h3>Add Questions</h3>
            <p>Select to add questions, test attachment or group the questions</p>
            <div className="question-type-grid">
              {[
                "Multiple Choice",
                "Numerical",
                "Essay",
                "Fill In The Blanks",
                "Group Question",
                "Multi Input Reasoning",
                "Two Part Analysis",
                "Graphical Interpretation",
                "Multiple Choice V2"
              ].map((item) => (
                <button
                  key={item}
                  type="button"
                  className={item === selectedQuestionType ? "selected" : ""}
                  onClick={() => setSelectedQuestionType(item)}
                >
                  {item}
                </button>
              ))}
            </div>
            <div className="modal-actions-end">
              <button type="button" className="figma-primary" onClick={() => {
                setSelectedCount(5);
                setShowAddQuestions(false);
                notify(`${selectedQuestionType} questions added`);
              }}>
                Add
              </button>
            </div>
          </div>
        </div>
      )}

      {showMcqDesign && (
        <div className="figma-overlay" onClick={(event) => event.target.classList.contains("figma-overlay") && setShowMcqDesign(false)}>
          <div className="mcq-design-modal">
            <button type="button" className="close" onClick={() => setShowMcqDesign(false)}>×</button>
            <h3>MCQ Design</h3>
            <p>Only the questions that are not imported into the test will be displayed here</p>
            <div className="mcq-toolbar">
              <input placeholder="Search by question Details" />
              <button type="button" onClick={() => setShowSelectedQuestions(true)}>Selected item Count : 2</button>
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
                  <td><span className="pos">+ 3.0</span> / <span className="neg">- 0.0</span></td>
                  <td>11</td>
                </tr>
                <tr>
                  <td><input type="checkbox" /></td>
                  <td>249 + 250 = _ _ _ ?</td>
                  <td>Research</td>
                  <td>UX</td>
                  <td>Easy</td>
                  <td><span className="pos">+ 5.0</span> / <span className="neg">- 0.0</span></td>
                  <td>12</td>
                </tr>
              </tbody>
            </table>
            <div className="mcq-actions">
              <button type="button" className="figma-primary" onClick={() => { setShowImportedOk(true); setShowMcqDesign(false); }}>Export</button>
              <button type="button" className="figma-secondary" onClick={() => setShowMcqDesign(false)}>CANCEL</button>
            </div>
          </div>
        </div>
      )}

      {showImportedOk && (
        <div className="figma-overlay" onClick={(event) => event.target.classList.contains("figma-overlay") && setShowImportedOk(false)}>
          <div className="import-success-dialog">
            <p>Questions are imported to the quiz, Go back to Quiz Builder and verify the questions</p>
            <button type="button" className="figma-primary" onClick={() => setShowImportedOk(false)}>Close</button>
          </div>
        </div>
      )}

      {showSelectedQuestions && (
        <div className="figma-overlay" onClick={(event) => event.target.classList.contains("figma-overlay") && setShowSelectedQuestions(false)}>
          <div className="selected-questions-modal">
            <button type="button" className="close" onClick={() => setShowSelectedQuestions(false)}>×</button>
            <h3>{selectedQuestionRows.length} Question Selected</h3>
            <p>Only the questions that are not imported into the test will be displayed here</p>
            <table>
              <thead>
                <tr>
                  <th>Question Detail</th>
                  <th />
                </tr>
              </thead>
              <tbody>
                {selectedQuestionRows.length === 0 ? (
                  <tr>
                    <td colSpan={2}>No selected questions left.</td>
                  </tr>
                ) : (
                  selectedQuestionRows.map((rowId, index) => (
                    <tr key={rowId}>
                      <td>{index + 1}. 249 + 250 = _ _ _ ?</td>
                      <td>
                        <button
                          type="button"
                          onClick={() => setSelectedQuestionRows((prev) => prev.filter((item) => item !== rowId))}
                        >
                          Remove
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {showPoolPicker && (
        <div className="figma-overlay" onClick={(event) => event.target.classList.contains("figma-overlay") && setShowPoolPicker(false)}>
          <div className="pool-picker-modal">
            <button type="button" className="close" onClick={() => setShowPoolPicker(false)}>×</button>
            <div className="pool-search">
              <input placeholder="Search" />
              <button type="button" onClick={() => notify("Pool settings opened")}>⚙</button>
            </div>
            <div className="pool-tabs">
              {["Pool"].map((tab) => (
                <button key={tab} type="button" className={poolTab === tab ? "active" : ""} onClick={() => setPoolTab(tab)}>
                  {tab}
                </button>
              ))}
            </div>
            <div className="pool-title">Pool</div>
            <div className="pool-subtitle">Today</div>
            <div className="pool-cards">
              {formCards.map((card, index) => (
                <button type="button" className="pool-card" key={`${card}-${index}`} onClick={() => notify(`${card} selected`)}>
                  <div className="pool-thumb" />
                  <span>{card}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {showFormDim && <div className="form-dimmer" />}
    </div>
  );
}

export default FigmaReplicaPage;
