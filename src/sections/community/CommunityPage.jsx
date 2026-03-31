import React, { useEffect, useMemo, useRef, useState } from "react";
import "./community.css";
import ProductFlowPage from "../product-flow/ProductFlowPage";
import CoursesPage from "../products/CoursesPage";
import { SimpleProductPage, ClassificationPage, UtilitiesPage } from "../products/ProductSubPages";
import TestSeriesPage from "../products/TestSeriesPage";
import LiveClassesPage from "../products/LiveClassesPage";
import FigmaReplicaPage from "../products/FigmaReplicaPage";

const navItems = [
  { key: "getstarted", label: "Get Started", type: "link", icon: "trend" },
  { key: "dashboard", label: "Dashboard", type: "link", icon: "grid" },
  {
    key: "products",
    label: "Products",
    type: "group",
    icon: "box",
    sub: [
      "Courses",
      "Live Classes",
      "Mock Test",
      "Test Series",
      "Bundles",
      "Batch",
      "Poll",
      "Tracks",
      "Code",
      "More Products",
      "Question Pool",
      "All Questions",
      "Classification",
      "Utilities"
    ]
  },
  { key: "websiteApps", label: "Website & Apps", type: "group", icon: "screen", sub: ["Pages", "Themes"] },
  {
    key: "community",
    label: "Community",
    type: "group",
    icon: "users",
    sub: ["Learnyst Communities", "Telegram"]
  },
  { key: "marketing", label: "Marketing", type: "group", icon: "pulse", sub: [] },
  { key: "sales", label: "Sales", type: "group", icon: "dollar", sub: [] },
  { key: "users", label: "Users", type: "group", icon: "user", sub: [] },
  { key: "reports", label: "Reports", type: "group", icon: "bars", sub: [] },
  { key: "manage", label: "Manage", type: "group", icon: "briefcase", sub: [] },
  { key: "addons", label: "Add - Ons", type: "group", icon: "gear", sub: [] },
  { key: "security", label: "Security", type: "group", icon: "shield", sub: [] },
  { key: "subschools", label: "Sub Schools", type: "group", icon: "school", sub: [] },
  { key: "settings", label: "Settings", type: "link", icon: "gear" }
];

function Icon({ name, stroke = "currentColor" }) {
  const shared = { width: 16, height: 16, viewBox: "0 0 24 24", fill: "none", stroke, strokeWidth: 2 };

  if (name === "trend") {
    return (
      <svg {...shared}>
        <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
        <polyline points="17 6 23 6 23 12" />
      </svg>
    );
  }
  if (name === "grid") {
    return (
      <svg {...shared}>
        <rect x="3" y="3" width="7" height="7" />
        <rect x="14" y="3" width="7" height="7" />
        <rect x="14" y="14" width="7" height="7" />
        <rect x="3" y="14" width="7" height="7" />
      </svg>
    );
  }
  if (name === "box") {
    return (
      <svg {...shared}>
        <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
        <line x1="3" y1="6" x2="21" y2="6" />
        <path d="M16 10a4 4 0 01-8 0" />
      </svg>
    );
  }
  if (name === "screen") {
    return (
      <svg {...shared}>
        <rect x="2" y="3" width="20" height="14" rx="2" />
        <line x1="8" y1="21" x2="16" y2="21" />
        <line x1="12" y1="17" x2="12" y2="21" />
      </svg>
    );
  }
  if (name === "users") {
    return (
      <svg {...shared}>
        <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 00-3-3.87" />
        <path d="M16 3.13a4 4 0 010 7.75" />
      </svg>
    );
  }
  if (name === "pulse") {
    return (
      <svg {...shared}>
        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
      </svg>
    );
  }
  if (name === "dollar") {
    return (
      <svg {...shared}>
        <line x1="12" y1="1" x2="12" y2="23" />
        <path d="M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6" />
      </svg>
    );
  }
  if (name === "user") {
    return (
      <svg {...shared}>
        <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" />
        <circle cx="12" cy="7" r="4" />
      </svg>
    );
  }
  if (name === "bars") {
    return (
      <svg {...shared}>
        <line x1="18" y1="20" x2="18" y2="10" />
        <line x1="12" y1="20" x2="12" y2="4" />
        <line x1="6" y1="20" x2="6" y2="14" />
      </svg>
    );
  }
  if (name === "briefcase") {
    return (
      <svg {...shared}>
        <rect x="2" y="7" width="20" height="14" rx="2" />
        <path d="M16 21V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v16" />
      </svg>
    );
  }
  if (name === "gear") {
    return (
      <svg {...shared}>
        <circle cx="12" cy="12" r="3" />
        <path d="M19.07 4.93l-1.41 1.41M5.34 18.66l-1.41 1.41M20 12h2M2 12h2M19.07 19.07l-1.41-1.41M5.34 5.34L3.93 3.93M12 20v2M12 2v2" />
      </svg>
    );
  }
  if (name === "shield") {
    return (
      <svg {...shared}>
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    );
  }

  return (
    <svg {...shared}>
      <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
      <path d="M6 12v5c3 3 9 3 12 0v-5" />
    </svg>
  );
}

function Chevron() {
  return (
    <svg className="chevron" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <polyline points="6 9 12 15 18 9" />
    </svg>
  );
}

function CommunityPage() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [showCreatePage, setShowCreatePage] = useState(false);
  const [sidebarQuery, setSidebarQuery] = useState("");
  const [topbarQuery, setTopbarQuery] = useState("");
  const [openGroups, setOpenGroups] = useState({
    products: true,
    websiteApps: false,
    community: false,
    marketing: false,
    sales: false,
    users: false,
    reports: false,
    manage: false,
    addons: false,
    security: false,
    subschools: false
  });
  const [activeNav, setActiveNav] = useState("products");
  const [activeProductSub, setActiveProductSub] = useState("Courses");
  const [activeCommunitySub, setActiveCommunitySub] = useState("Learnyst Communities");
  const [showModal, setShowModal] = useState(false);
  const [communityName, setCommunityName] = useState("");
  const [communityType, setCommunityType] = useState("Learnyst");
  const [communities, setCommunities] = useState([]);
  const [toast, setToast] = useState("");
  const [communityImagePreview, setCommunityImagePreview] = useState("");
  const [coverImagePreview, setCoverImagePreview] = useState("");
  const toastTimerRef = useRef(null);
  const nameInputRef = useRef(null);
  const imageInputRef = useRef(null);
  const coverInputRef = useRef(null);

  const hasCommunities = communities.length > 0;

  const filteredNavItems = useMemo(() => {
    const query = sidebarQuery.trim().toLowerCase();
    if (!query) {
      return navItems;
    }

    return navItems.reduce((acc, item) => {
      const labelMatch = item.label.toLowerCase().includes(query);

      if (item.type === "link") {
        if (labelMatch) {
          acc.push(item);
        }
        return acc;
      }

      const matchedSub = (item.sub || []).filter((sub) => sub.toLowerCase().includes(query));
      if (labelMatch || matchedSub.length > 0) {
        acc.push({ ...item, sub: matchedSub.length > 0 ? matchedSub : item.sub });
      }
      return acc;
    }, []);
  }, [sidebarQuery]);

  const filteredCommunities = useMemo(() => {
    const query = topbarQuery.trim().toLowerCase();
    if (!query) {
      return communities.map((item, index) => ({ item, index }));
    }

    return communities
      .map((item, index) => ({ item, index }))
      .filter(({ item }) => item.name.toLowerCase().includes(query) || item.type.toLowerCase().includes(query));
  }, [communities, topbarQuery]);

  const toggleSidebar = () => {
    setSidebarOpen((prev) => !prev);
  };

  const showToast = (message) => {
    setToast(message);
    if (toastTimerRef.current) {
      clearTimeout(toastTimerRef.current);
    }
    toastTimerRef.current = setTimeout(() => {
      setToast("");
    }, 2800);
  };

  const toggleSub = (key) => {
    setOpenGroups((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const navigate = (key) => {
    setActiveNav(key);
    if (key !== "community") {
      setShowCreatePage(false);
    }
    showToast(`Navigating to ${key}...`);
  };

  const openSection = (key) => {
    setActiveNav(key);
    if (key === "products") {
      setOpenGroups((prev) => ({ ...prev, products: true }));
      setActiveProductSub("Courses");
    }
    if (key === "community") {
      setOpenGroups((prev) => ({ ...prev, community: true }));
      setActiveCommunitySub("Learnyst Communities");
    }
  };

  const logout = () => {
    if (window.confirm("Are you sure you want to log out?")) {
      showToast("Logged out successfully");
    }
  };

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setCommunityName("");
  };

  const createCommunity = () => {
    const name = communityName.trim();
    if (!name) {
      window.alert("Please enter a community name.");
      return;
    }

    setCommunities((prev) => [...prev, { name, type: communityType }]);
    closeModal();
    showToast(`Community "${name}" created!`);
  };

  const deleteCommunity = (index) => {
    const target = communities[index];
    if (!target) {
      return;
    }
    if (!window.confirm(`Delete "${target.name}"?`)) {
      return;
    }

    setCommunities((prev) => prev.filter((_, i) => i !== index));
    showToast("Community deleted.");
  };

  const onPickImage = (type) => {
    if (type === "community") {
      imageInputRef.current?.click();
      return;
    }
    coverInputRef.current?.click();
  };

  const onRemoveImage = (type) => {
    if (type === "community") {
      setCommunityImagePreview("");
      if (imageInputRef.current) {
        imageInputRef.current.value = "";
      }
      return;
    }

    setCoverImagePreview("");
    if (coverInputRef.current) {
      coverInputRef.current.value = "";
    }
  };

  const onImageChange = (type, event) => {
    const file = event.target.files?.[0];
    if (!file) {
      return;
    }

    if (file.size > 8 * 1024 * 1024) {
      showToast("Maximum file size is 8MB.");
      event.target.value = "";
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      const result = typeof reader.result === "string" ? reader.result : "";
      if (type === "community") {
        setCommunityImagePreview(result);
      } else {
        setCoverImagePreview(result);
      }
    };
    reader.readAsDataURL(file);
  };

  useEffect(() => {
    if (showModal && nameInputRef.current) {
      const timer = setTimeout(() => nameInputRef.current?.focus(), 100);
      return () => clearTimeout(timer);
    }
    return undefined;
  }, [showModal]);

  useEffect(() => {
    const onEsc = (event) => {
      if (event.key === "Escape") {
        closeModal();
      }
    };

    window.addEventListener("keydown", onEsc);
    return () => window.removeEventListener("keydown", onEsc);
  }, []);

  useEffect(() => {
    return () => {
      if (toastTimerRef.current) {
        clearTimeout(toastTimerRef.current);
      }
    };
  }, []);

  const topbarHelpIcon = useMemo(
    () => (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#6b7280" strokeWidth="2">
        <circle cx="12" cy="12" r="10" />
        <path d="M9.09 9a3 3 0 015.83 1c0 2-3 3-3 3" />
        <line x1="12" y1="17" x2="12.01" y2="17" />
      </svg>
    ),
    []
  );



  const topbarBellIcon = useMemo(
    () => (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#6b7280" strokeWidth="2">
        <path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9" />
        <path d="M13.73 21a2 2 0 01-3.46 0" />
      </svg>
    ),
    []
  );

  const productPage = useMemo(() => {
    if (activeProductSub === "Courses") {
      return <CoursesPage sectionTitle={activeProductSub} onToast={showToast} searchQuery={topbarQuery} />;
    }

    if (activeProductSub === "Classification") {
      return <ClassificationPage onToast={showToast} />;
    }

    if (activeProductSub === "Utilities") {
      return <UtilitiesPage onToast={showToast} />;
    }

    if (activeProductSub === "Test Series") {
      return <TestSeriesPage onToast={showToast} />;
    }

    if (activeProductSub === "Live Classes") {
      return <LiveClassesPage onToast={showToast} searchQuery={topbarQuery} />;
    }

    if (activeProductSub === "Mock Test") {
      return <FigmaReplicaPage onToast={showToast} searchQuery={topbarQuery} />;
    }

    if (activeProductSub === "All Questions") {
      return <SimpleProductPage title="More Products" subtitleTitle="More Products" onToast={showToast} />;
    }

    return <SimpleProductPage title={activeProductSub} onToast={showToast} />;
  }, [activeProductSub, topbarQuery]);

  return (
    <div className="preview-root">
      <div className="frame-stage">
        <div className={`community-shell ${sidebarOpen ? "sidebar-open" : "sidebar-closed"}`}>
      <aside id="community-sidebar" className={`community-sidebar ${!sidebarOpen ? "collapsed" : ""}`}>

        <div className="sidebar-logo">
          <div className="logo-box">
            <img className="logo-image" src="/image.png" alt="ICS Global" />
          </div>
        </div>

        <div className="sidebar-search">
          <input
            type="text"
            placeholder="Search"
            value={sidebarQuery}
            onChange={(event) => setSidebarQuery(event.target.value)}
          />
        </div>

        <nav className="community-nav">
          {filteredNavItems.map((item) => {
            if (item.type === "link") {
              return (
                <div
                  key={item.key}
                  className={`nav-item ${activeNav === item.key ? "active" : ""}`}
                  onClick={() => navigate(item.key)}
                >
                  <Icon name={item.icon} />
                  {item.label}
                </div>
              );
            }

            const isOpen = sidebarQuery.trim() ? true : !!openGroups[item.key];
            const isProduct = item.key === "products";
            const isCommunity = item.key === "community";
            return (
              <div key={item.key}>
                <div
                  className={`nav-item ${isOpen ? "open" : ""} ${activeNav === item.key ? "active" : ""}`}
                  onClick={() => {
                    toggleSub(item.key);
                    setActiveNav(item.key);
                  }}
                >
                  <Icon name={item.icon} />
                  {item.label}
                  <Chevron />
                </div>
                <div className={`sub-menu ${isOpen ? "open" : ""} ${isProduct ? "products-sub-menu" : ""}`}>
                  {item.sub?.map((sub) => (
                    <div
                      key={`${item.key}-${sub}`}
                      className={`sub-item ${(isCommunity && activeCommunitySub === sub) || (isProduct && activeProductSub === sub) ? "active" : ""}`}
                      onClick={() => {
                        if (isProduct) {
                          setActiveProductSub(sub);
                          setActiveNav("products");
                          return;
                        }
                        if (isCommunity) {
                          setActiveCommunitySub(sub);
                          setActiveNav("community");
                        }
                      }}
                    >
                      {sub}
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </nav>

        <div className="sidebar-footer" onClick={logout}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4" />
            <polyline points="16 17 21 12 16 7" />
            <line x1="21" y1="12" x2="9" y2="12" />
          </svg>
          Log out
        </div>
      </aside>

      <button
        id="toggle-sidebar"
        type="button"
        className={!sidebarOpen ? "collapsed" : ""}
        aria-label={sidebarOpen ? "Collapse sidebar" : "Expand sidebar"}
        aria-controls="community-sidebar"
        aria-expanded={sidebarOpen}
        onClick={toggleSidebar}
      >
        {sidebarOpen ? "<" : ">"}
      </button>

      <main className="community-main">
        <div className="community-topbar">
          <div className="topbar-actions-right">
            <div className="search-wrap">
              <input
                type="text"
                placeholder="Search"
                value={topbarQuery}
                onChange={(event) => setTopbarQuery(event.target.value)}
              />
            </div>
            <button className="btn-upgrade">Upgrade</button>
            <button className="btn-learner">View As Learner</button>
            <button className="help-btn">
              {topbarHelpIcon}
              <span>Help</span>
            </button>
            <button className="topbar-icon" aria-label="Notifications">
              {topbarBellIcon}
            </button>
            <div className="avatar">J</div>
          </div>
        </div>

        <div className="community-content">
          {activeNav === "products" ? (
            productPage
          ) : activeNav === "dashboard" ? (
            <ProductFlowPage onToast={showToast} onOpenSection={openSection} />
          ) : activeNav !== "community" ? (
            <div className="section-placeholder">
              <h2>{navItems.find((item) => item.key === activeNav)?.label || "Section"}</h2>
              <p>This section is connected and ready. Select Products or Community to continue working.</p>
            </div>
          ) : showCreatePage ? (
            <div className="create-community-page">
              <button className="back-btn" onClick={() => setShowCreatePage(false)}>
                &lt; Back
              </button>

              <div className="form-header-card">
                <div className="breadcrumb">Communities / Create Communities</div>
                <h2>Create Community</h2>
                <p>Create community to provide platform for open discussions and interactions</p>
              </div>

              <div className="form-section">
                <label>Title*</label>
                <input type="text" placeholder="Title" maxLength={60} />

                <label>SEO Description</label>
                <textarea placeholder="Enter SEO description" rows={4} maxLength={60} />

                <label>Detailed Description*</label>
                <textarea placeholder="Write short description" rows={4} maxLength={60} />
              </div>

              <div className="form-section">
                <label>Custom Url*</label>
                <input type="text" placeholder="https://ics-global.learnyst.com/learn/communities" />

                <label>Image</label>
                <input
                  ref={imageInputRef}
                  type="file"
                  accept="image/*"
                  className="file-input"
                  onChange={(event) => onImageChange("community", event)}
                />
                <div className="upload-box">
                  {communityImagePreview ? <img src={communityImagePreview} alt="Community" className="preview-img" /> : null}
                </div>
                <div className="upload-actions">
                  <button type="button" onClick={() => onRemoveImage("community")}>REMOVE</button>
                  <button type="button" className="primary-mini" onClick={() => onPickImage("community")}>UPLOAD</button>
                </div>
                <p className="hint">Maximum file size upto 8MB. Image resolution should be 512x512 px</p>

                <label>Cover Image</label>
                <input
                  ref={coverInputRef}
                  type="file"
                  accept="image/*"
                  className="file-input"
                  onChange={(event) => onImageChange("cover", event)}
                />
                <div className="upload-box cover">
                  {coverImagePreview ? <img src={coverImagePreview} alt="Cover" className="preview-img" /> : null}
                </div>
                <div className="upload-actions">
                  <button type="button" onClick={() => onRemoveImage("cover")}>REMOVE</button>
                  <button type="button" className="primary-mini" onClick={() => onPickImage("cover")}>UPLOAD</button>
                </div>
                <p className="hint">Maximum file size upto 8MB. Image resolution should be 1440x242 px</p>
              </div>

              <div className="form-section privacy">
                <div className="privacy-head">
                  <div>
                    <h3>Make this community private</h3>
                    <p>Select configurations for learners to join public community</p>
                  </div>
                  <div className="switch-dot" />
                </div>
                <label className="radio-row">
                  <input type="radio" name="learners" /> Signed up learners
                </label>
                <label className="radio-row">
                  <input type="radio" name="learners" defaultChecked /> Paid learners
                </label>
              </div>

              <div className="page-actions">
                <button className="save-btn" onClick={() => showToast("Community settings saved")}>SAVE</button>
                <button className="cancel-btn" onClick={() => setShowCreatePage(false)}>CANCEL</button>
              </div>
            </div>
          ) : (
            <>
              {!hasCommunities && (
                <div className="community-card">
                  <h2>Community</h2>
                  <p>Create and manage Community</p>
                </div>
              )}

              <div className={`community-list ${hasCommunities ? "show" : ""}`}>
                {filteredCommunities.map(({ item: community, index: originalIndex }) => (
                  <div className="comm-row" key={`${community.name}-${originalIndex}`}>
                    <div className="comm-icon">
                      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#0e4da4" strokeWidth="2">
                        <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
                        <circle cx="9" cy="7" r="4" />
                        <path d="M23 21v-2a4 4 0 00-3-3.87" />
                        <path d="M16 3.13a4 4 0 010 7.75" />
                      </svg>
                    </div>
                    <div className="comm-info">
                      <div className="name">{community.name}</div>
                      <div className="type">{community.type} Community</div>
                    </div>
                    <div className="comm-actions">
                      <button onClick={() => showToast(`Opening ${community.name}...`)}>Open</button>
                      <button className="del" onClick={() => deleteCommunity(originalIndex)}>
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
                {hasCommunities && filteredCommunities.length === 0 ? (
                  <div className="comm-empty-note">No communities found for "{topbarQuery}".</div>
                ) : null}
              </div>

              <div className="create-row">
                <button className="btn-create" onClick={() => setShowCreatePage(true)}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <line x1="12" y1="5" x2="12" y2="19" />
                    <line x1="5" y1="12" x2="19" y2="12" />
                  </svg>
                  Create
                </button>
              </div>
            </>
          )}
        </div>
      </main>

      <div
        className={`modal-overlay ${showModal ? "show" : ""}`}
        onClick={(event) => {
          if (event.target.classList.contains("modal-overlay")) {
            closeModal();
          }
        }}
      >
        <div className="modal">
          <h3>Create Community</h3>
          <p>Set up a new community for your learners</p>
          <label htmlFor="comm-name">Community Name</label>
          <input
            id="comm-name"
            ref={nameInputRef}
            type="text"
            value={communityName}
            onChange={(event) => setCommunityName(event.target.value)}
            placeholder="e.g. ICS Batch 2025"
          />
          <label htmlFor="comm-type">Type</label>
          <select id="comm-type" value={communityType} onChange={(event) => setCommunityType(event.target.value)}>
            <option value="Learnyst">Learnyst Community</option>
            <option value="Telegram">Telegram</option>
          </select>
          <div className="modal-footer">
            <button className="btn-cancel" onClick={closeModal}>
              Cancel
            </button>
            <button className="btn-save" onClick={createCommunity}>
              Create
            </button>
          </div>
        </div>
      </div>

      <div className={`toast ${toast ? "show" : ""}`}>{toast}</div>
        </div>
      </div>
    </div>
  );
}

export default CommunityPage;
