import React, { useEffect, useMemo, useRef, useState } from "react";
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
  const [rows, setRows] = useState(seedRows);
  const [activeToolbarPanel, setActiveToolbarPanel] = useState("analytics");
  const [compactToolbarView, setCompactToolbarView] = useState(false);
  const [showToolbarToasts, setShowToolbarToasts] = useState(true);
  const [showCreateSeriesModal, setShowCreateSeriesModal] = useState(false);
  const [showAddQuestionsModal, setShowAddQuestionsModal] = useState(false);
  const [showActionMenu, setShowActionMenu] = useState(false);
  const [showImportDialog, setShowImportDialog] = useState(false);
  const [showMcqDesign, setShowMcqDesign] = useState(false);
  const [showQuestionEditor, setShowQuestionEditor] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [questionDraft, setQuestionDraft] = useState({
    header: "",
    question: "",
    text: "",
    headerFont: "Roboto",
    questionFont: "Roboto",
    textFont: "Roboto",
    imageUrl: "",
    imageName: ""
  });
  const [openMockRowMenuId, setOpenMockRowMenuId] = useState(null);
  const [mediaPreviewUrl, setMediaPreviewUrl] = useState("");
  const [mediaPreviewType, setMediaPreviewType] = useState("");
  const [mediaPreviewName, setMediaPreviewName] = useState("");
  const mediaInputRef = useRef(null);
  const questionImageInputRef = useRef(null);
  const mediaPreviewUrlRef = useRef("");
  const questionDraftImageUrlRef = useRef("");
  const questionImageUrlsRef = useRef([]);

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
    setShowCreateSeriesModal(false);
    setOpenMockRowMenuId(null);
    onToast?.("Mock test builder section removed");
  };

  const notify = (message) => onToast?.(message);

  const panelCounts = useMemo(() => {
    return {
      total: filteredRows.length,
      published: filteredRows.filter((item) => item.status === "Published").length,
      upcoming: filteredRows.filter((item) => item.status === "Upcoming").length,
      completed: filteredRows.filter((item) => item.status === "Completed").length
    };
  }, [filteredRows]);

  const handleToolbarPanel = (panel) => {
    setActiveToolbarPanel((prev) => (prev === panel ? "" : panel));
    if (showToolbarToasts) {
      notify(`${panel.charAt(0).toUpperCase()}${panel.slice(1)} panel ${activeToolbarPanel === panel ? "closed" : "opened"}`);
    }
  };

  const updateQuestionDraft = (field, value) => {
    setQuestionDraft((prev) => ({ ...prev, [field]: value }));
  };

  const closeQuestionEditor = () => {
    if (questionDraft.imageUrl) {
      URL.revokeObjectURL(questionDraft.imageUrl);
    }
    setQuestionDraft({
      header: "",
      question: "",
      text: "",
      headerFont: "Roboto",
      questionFont: "Roboto",
      textFont: "Roboto",
      imageUrl: "",
      imageName: ""
    });
    setShowQuestionEditor(false);
  };

  const handleQuestionImageSelect = (event) => {
    const file = event.target.files?.[0];
    if (!file) {
      return;
    }

    if (questionDraft.imageUrl) {
      URL.revokeObjectURL(questionDraft.imageUrl);
    }

    const nextImageUrl = URL.createObjectURL(file);
    setQuestionDraft((prev) => ({
      ...prev,
      imageUrl: nextImageUrl,
      imageName: file.name
    }));
    notify(`${file.name} inserted in question`);
    event.target.value = "";
  };

  const saveQuestion = () => {
    if (!questionDraft.question.trim()) {
      notify("Question field is required");
      return;
    }

    setQuestions((prev) => [
      ...prev,
      {
        id: Date.now(),
        header: questionDraft.header.trim(),
        question: questionDraft.question.trim(),
        text: questionDraft.text.trim(),
        headerFont: questionDraft.headerFont,
        questionFont: questionDraft.questionFont,
        textFont: questionDraft.textFont,
        imageUrl: questionDraft.imageUrl,
        imageName: questionDraft.imageName
      }
    ]);

    setQuestionDraft({
      header: "",
      question: "",
      text: "",
      headerFont: "Roboto",
      questionFont: "Roboto",
      textFont: "Roboto",
      imageUrl: "",
      imageName: ""
    });
    setShowQuestionEditor(false);
    notify("Question added successfully");
  };

  useEffect(() => {
    mediaPreviewUrlRef.current = mediaPreviewUrl;
  }, [mediaPreviewUrl]);

  useEffect(() => {
    questionDraftImageUrlRef.current = questionDraft.imageUrl;
  }, [questionDraft.imageUrl]);

  useEffect(() => {
    questionImageUrlsRef.current = questions.map((item) => item.imageUrl).filter(Boolean);
  }, [questions]);

  useEffect(() => {
    return () => {
      if (mediaPreviewUrlRef.current) {
        URL.revokeObjectURL(mediaPreviewUrlRef.current);
      }
      if (questionDraftImageUrlRef.current) {
        URL.revokeObjectURL(questionDraftImageUrlRef.current);
      }
      questionImageUrlsRef.current.forEach((imageUrl) => {
        URL.revokeObjectURL(imageUrl);
      });
    };
  }, []);

  const handleMediaSelect = (event) => {
    const file = event.target.files?.[0];
    if (!file) {
      return;
    }

    if (mediaPreviewUrl) {
      URL.revokeObjectURL(mediaPreviewUrl);
    }

    const nextUrl = URL.createObjectURL(file);
    const fileType = file.type || "";
    const mediaType = fileType.startsWith("image/") ? "image" : fileType.startsWith("video/") ? "video" : "document";

    setMediaPreviewUrl(nextUrl);
    setMediaPreviewType(mediaType);
    setMediaPreviewName(file.name);
    notify(`${file.name} attached`);
    event.target.value = "";
  };

  useEffect(() => {
    const closeMenusOnOutside = (event) => {
      if (!(event.target instanceof Element)) {
        return;
      }

      if (!event.target.closest(".mock-actions-cell") && !event.target.closest(".mock-row-menu")) {
        setOpenMockRowMenuId(null);
      }

      if (!event.target.closest(".mock-builder-tools") && !event.target.closest(".builder-action-menu")) {
        setShowActionMenu(false);
      }
    };

    const closeMenusOnEsc = (event) => {
      if (event.key === "Escape") {
        setOpenMockRowMenuId(null);
        setShowActionMenu(false);
      }
    };

    document.addEventListener("pointerdown", closeMenusOnOutside);
    window.addEventListener("keydown", closeMenusOnEsc);

    return () => {
      document.removeEventListener("pointerdown", closeMenusOnOutside);
      window.removeEventListener("keydown", closeMenusOnEsc);
    };
  }, []);

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

      <section className={`live-toolbar ${compactToolbarView ? "compact" : ""}`}>
        <input value={search || searchQuery} onChange={(event) => setSearch(event.target.value)} placeholder="Search" />
        <button
          type="button"
          className={`icon-btn ${activeToolbarPanel === "analytics" ? "active" : ""}`}
          aria-label="Analytics"
          title="Analytics"
          onClick={() => handleToolbarPanel("analytics")}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <line x1="18" y1="20" x2="18" y2="10" />
            <line x1="12" y1="20" x2="12" y2="4" />
            <line x1="6" y1="20" x2="6" y2="14" />
          </svg>
        </button>
        <button
          type="button"
          className={`icon-btn ${activeToolbarPanel === "settings" ? "active" : ""}`}
          aria-label="Settings"
          title="Settings"
          onClick={() => handleToolbarPanel("settings")}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <circle cx="12" cy="12" r="3" />
            <path d="M19.07 4.93l-1.41 1.41M5.34 18.66l-1.41 1.41M20 12h2M2 12h2M19.07 19.07l-1.41-1.41M5.34 5.34L3.93 3.93M12 20v2M12 2v2" />
          </svg>
        </button>
        <button
          type="button"
          className={`icon-btn ${activeToolbarPanel === "tools" ? "active" : ""}`}
          aria-label="Tools"
          title="Tools"
          onClick={() => handleToolbarPanel("tools")}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <rect x="3" y="7" width="18" height="13" rx="2" />
            <path d="M8 7V5a4 4 0 0 1 8 0v2" />
          </svg>
        </button>
      </section>

      {activeToolbarPanel === "analytics" ? (
        <section className="toolbar-panel">
          <strong>Analytics</strong>
          <div className="toolbar-panel-grid">
            <span>Total: {panelCounts.total}</span>
            <span>Published: {panelCounts.published}</span>
            <span>Upcoming: {panelCounts.upcoming}</span>
            <span>Completed: {panelCounts.completed}</span>
          </div>
        </section>
      ) : null}

      {activeToolbarPanel === "settings" ? (
        <section className="toolbar-panel">
          <strong>Settings</strong>
          <label className="toolbar-toggle-row">
            <input
              type="checkbox"
              checked={compactToolbarView}
              onChange={(event) => setCompactToolbarView(event.target.checked)}
            />
            Compact toolbar
          </label>
          <label className="toolbar-toggle-row">
            <input
              type="checkbox"
              checked={showToolbarToasts}
              onChange={(event) => setShowToolbarToasts(event.target.checked)}
            />
            Show action toasts
          </label>
        </section>
      ) : null}

      {activeToolbarPanel === "tools" ? (
        <section className="toolbar-panel">
          <strong>Tools</strong>
          <div className="toolbar-tools-row">
            <button
              type="button"
              onClick={() => {
                setSearch("");
                notify("Search cleared");
              }}
            >
              Clear Search
            </button>
            <button
              type="button"
              onClick={() => {
                setRows(seedRows);
                notify("List reset");
              }}
            >
              Reset List
            </button>
          </div>
        </section>
      ) : null}

      <section className="live-table-card">
        <div className="question-empty">Mock test list removed from this section.</div>
      </section>

      {showCreateSeriesModal && (
        <div className="overlay" onClick={(event) => event.target.classList.contains("overlay") && setShowCreateSeriesModal(false)}>
          <div className="series-modal">
            <button type="button" className="close-btn" onClick={() => setShowCreateSeriesModal(false)}>×</button>
            <h3>Mock Test / Create Courses</h3>
            <div className="series-body">
              <h4>Create Courses</h4>
              <p>Start creating a new test series</p>
              <div className="series-grid-two">
                <label>
                  Title*
                  <input placeholder="Enter Mock Test Title" />
                </label>
                <label>
                  Price
                  <input placeholder="Price" />
                </label>
              </div>
              <label className="series-checkbox"><input type="checkbox" /> Make this a free mock test</label>
              <div className="quiz-types-inline">
                <label className="quiz-type-option"><input type="radio" name="qt" defaultChecked /> Online quiz</label>
                <label className="quiz-type-option"><input type="radio" name="qt" /> Offline quiz</label>
              </div>
              <label className="template-field">
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
