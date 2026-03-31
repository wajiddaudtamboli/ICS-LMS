import React, { useMemo, useState } from "react";
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

function LiveClassesPage({ onToast, searchQuery = "" }) {
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [classesData, setClassesData] = useState(initialLiveClasses);
  const [classesSearchQuery, setClassesSearchQuery] = useState("");
  const [openRowMenuId, setOpenRowMenuId] = useState(null);
  const [showEditorModal, setShowEditorModal] = useState(false);
  const [editorTab, setEditorTab] = useState("details");
  const [showRecurrenceMenu, setShowRecurrenceMenu] = useState(false);
  const [showNotificationTypeMenu, setShowNotificationTypeMenu] = useState(false);
  const [showNotificationUnitMenu, setShowNotificationUnitMenu] = useState(false);
  const [showTimeZoneDialog, setShowTimeZoneDialog] = useState(false);
  const [showSendLikeDialog, setShowSendLikeDialog] = useState(false);

  const activeSearchQuery = (classesSearchQuery.trim() || searchQuery.trim()).toLowerCase();

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
    setShowRecurrenceMenu(false);
    setShowNotificationTypeMenu(false);
    setShowNotificationUnitMenu(false);
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

  if (showCreateForm) {
    return (
      <div className="live-classes-page">
        <div className="live-breadcrumb">Product / Live Classes</div>

        <section className="live-form-card">
          <h2>Live Class</h2>
          <input placeholder="Enter your live class title" />

          <h3>Short Description</h3>
          <input placeholder="Enter a brief description for the live Class (Max 150 characters)" />

          <h3>Thumbnail</h3>
          <div className="live-upload-area">
            <div className="live-upload-icon">image</div>
            <p>Drag and drop an image, or click to upload.</p>
            <small>Minimum dimension: 800x450px.</small>
            <small>Maximum file size: 2MB.</small>
            <small>Accepted file types: png, jpeg, jpeg, gif</small>
          </div>

          <h3>Instructor</h3>
          <div className="live-two-col">
            <select defaultValue="Select instructor">
              <option>Select instructor</option>
            </select>
            <select defaultValue="Select Category">
              <option>Select Category</option>
            </select>
          </div>

          <h3>Tags</h3>
          <input placeholder="Add Tags (optional)" />
        </section>

        <section className="live-form-card compact">
          <div className="live-two-col">
            <label>
              Start Date
              <input placeholder="--/--/----" />
            </label>
            <label>
              Day
              <input placeholder="---------" />
            </label>
          </div>

          <div className="live-two-col">
            <label>
              Start Time
              <div className="time-range">
                <input value="11:00 AM" readOnly />
                <span>To</span>
                <input value="11:30 AM" readOnly />
              </div>
            </label>
            <label>
              Time zone
              <select defaultValue="GMT + 5:30 India Standard Time">
                <option>GMT + 5:30 India Standard Time</option>
              </select>
            </label>
          </div>

          <label>
            Time zone
            <input value="GMT + 5:30 India Standard Time" readOnly />
          </label>
        </section>

        <div className="live-form-actions">
          <button type="button" className="secondary" onClick={() => setShowCreateForm(false)}>Back to List</button>
          <button type="button" className="primary" onClick={() => { setShowCreateForm(false); onToast?.("Live class created"); }}>
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
        <button type="button" className="icon-btn">user</button>
        <button type="button" className="icon-btn">slider</button>
        <button type="button" className="icon-btn">calendar</button>
      </section>

      {isEmpty ? (
        <section className="live-empty-card">
          <div className="empty-illustration">No Results</div>
          <h4>{activeSearchQuery ? `No results found for "${classesSearchQuery || searchQuery}"` : "No results found"}</h4>
        </section>
      ) : (
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
        </section>
      )}

      {showEditorModal && (
        <div className="overlay" onClick={(event) => event.target.classList.contains("overlay") && setShowEditorModal(false)}>
          <div className="live-editor-modal">
            <button type="button" className="close-btn" onClick={() => setShowEditorModal(false)}>×</button>
            <div className="live-editor-head">
              <h3>Live Class</h3>
              <button type="button" className="primary">Save</button>
            </div>

            <div className="live-editor-grid-row">
              <input value="Feb 13,2026" readOnly />
              <input value="10:30 am" readOnly />
              <span>to</span>
              <input value="11:30 am" readOnly />
              <input value="Feb 13,2026" readOnly />
              <button type="button" className="outline" onClick={() => setShowTimeZoneDialog(true)}>Time zone</button>
            </div>

            <div className="live-editor-check-row">
              <label><input type="checkbox" /> All Day</label>
              <button type="button" className="ghost" onClick={() => setShowRecurrenceMenu((prev) => !prev)}>Does not Repeat</button>
              {showRecurrenceMenu && (
                <div className="mini-menu repeat-menu">
                  <button type="button">Does not Repeat</button>
                  <button type="button">Daily</button>
                  <button type="button">Weekly on Friday</button>
                  <button type="button">Every week Day</button>
                  <button type="button">Custom</button>
                </div>
              )}
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
                      <span>copy</span>
                    </div>
                    <small>meet.google.com/xyx-yghc-ioj • up to 100 guest connections</small>

                    <div className="field-like">Online</div>

                    <div className="notification-row">
                      <button type="button" className="ghost" onClick={() => setShowNotificationTypeMenu((prev) => !prev)}>Notification</button>
                      <input value="30" readOnly />
                      <button type="button" className="ghost" onClick={() => setShowNotificationUnitMenu((prev) => !prev)}>minutes</button>
                      <button type="button" className="ghost">×</button>

                      {showNotificationTypeMenu && (
                        <div className="mini-menu notify-type-menu">
                          <button type="button">Email</button>
                          <button type="button">WhatsApp</button>
                          <button type="button">Call</button>
                          <button type="button">All</button>
                        </div>
                      )}

                      {showNotificationUnitMenu && (
                        <div className="mini-menu notify-unit-menu">
                          <button type="button">Minutes</button>
                          <button type="button">Hours</button>
                          <button type="button">Day</button>
                          <button type="button">Weeks</button>
                        </div>
                      )}
                    </div>

                    <button type="button" className="add-link">Add notification</button>

                    <div className="small-select-row">
                      <button type="button" className="ghost">Digital Marketing</button>
                      <button type="button" className="ghost">Busy</button>
                      <button type="button" className="ghost">Default Visibility</button>
                    </div>

                    <div className="editor-box">
                      <div className="editor-toolbar">A B I U • •</div>
                      <textarea
                        value={"Here is the exact content from the last section (Description box) in the image.\n\n🚀 Paid Live Class – Advanced UI/UX Masterclass\n\nThis is a premium live training session designed for serious learners.\n\n✅ Access: Paid (Only enrolled students allowed)\n✅ Topic: Modern SaaS Dashboard Design (2026 Edition)\n✅ Includes:\n   • Live Figma walkthrough\n   • UI system design\n   • Grid & spacing mastery\n   • Q&A session\n   • Recording access (24 hours)"}
                        readOnly
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
                <input value="Add Guests" readOnly />
                <ul>
                  <li>guest1@email.com</li>
                  <li>guest2@email.com</li>
                  <li>digitalmarketingstudent@email.com</li>
                </ul>
                <strong>Guests Permissions</strong>
                <label><input type="checkbox" /> Modify event</label>
                <label><input type="checkbox" /> Invite others</label>
                <label><input type="checkbox" /> See guest list</label>
              </aside>
            </div>

            <div className="editor-save-row">
              <button type="button" className="primary">Save</button>
            </div>

            {showTimeZoneDialog && (
              <div className="inner-dialog">
                <div className="inner-card">
                  <button type="button" className="close-btn" onClick={() => setShowTimeZoneDialog(false)}>×</button>
                  <h4>Event Time Zone</h4>
                  <label><input type="checkbox" /> Use separate start and end time zones</label>
                  <div className="tz-box">(GMT+05:30) India Standard Time - Kolkata</div>
                  <div className="tz-box">(GMT+05:30) India Standard Time - Kolkata</div>
                  <div className="inner-actions">
                    <button type="button" className="link">Use current time zone</button>
                    <button type="button" className="link" onClick={() => setShowTimeZoneDialog(false)}>Cancel</button>
                    <button type="button" className="primary" onClick={() => setShowTimeZoneDialog(false)}>Ok</button>
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
                    <button type="button" className="primary" onClick={() => setShowSendLikeDialog(false)}>Send</button>
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
