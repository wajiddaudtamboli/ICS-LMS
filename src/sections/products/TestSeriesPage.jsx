import React, { useState } from "react";
import "./test-series.css";

function TestSeriesPage({ onToast }) {
  const [isOpen, setIsOpen] = useState(true);
  const [showCourseBuilder, setShowCourseBuilder] = useState(false);

  const closeModal = () => {
    setIsOpen(false);
    setShowCourseBuilder(false);
    onToast?.("Test Series form closed");
  };

  const reopenModal = () => {
    setIsOpen(true);
    setShowCourseBuilder(false);
    onToast?.("Test Series form opened");
  };

  return (
    <div className="test-series-page">
      {isOpen ? (
        <div className="test-series-overlay">
          <section className="test-series-modal-shell">
            <div className="test-series-modal-head">
              <div className="test-series-breadcrumb">
                <button type="button" className="crumb-link" onClick={() => window.history.back()}>
                  Courses
                </button>
                <span className="crumb-sep">/</span>
                <span className="crumb-current">Create Mock Test</span>
                <span className="crumb-sep">/</span>
                <span className="crumb-current">Create Test Series</span>
              </div>
              <button type="button" className="test-series-close" onClick={closeModal}>×</button>
            </div>

            <div className="test-series-modal-body">
              {!showCourseBuilder ? (
                <section className="test-series-card">
                  <h2>Create Test Series</h2>
                  <p>Start creating a new test series</p>

                  <div className="test-series-grid">
                    <label>
                      <span className="label-row">
                        <span>Title*</span>
                        <span className="count">0/60</span>
                      </span>
                      <input placeholder="Enter Mock Test Title" maxLength={60} />
                    </label>
                    <label>
                      Price
                      <input placeholder="Price" />
                    </label>
                  </div>

                  <label className="free-check">
                    <input type="checkbox" />
                    Make this a free mock test
                  </label>

                  <div className="quiz-type-title">Quiz Type</div>
                  <div className="quiz-types">
                    <label className="quiz-card">
                      <input type="radio" name="quizType" defaultChecked />
                      <div>
                        <strong>Online quiz</strong>
                        <p>Create online quiz by using competitive exam template</p>
                      </div>
                    </label>
                    <label className="quiz-card">
                      <input type="radio" name="quizType" />
                      <div>
                        <strong>Offline quiz</strong>
                        <p>Create offline quiz using essay type questions & digitally evaluate the answers</p>
                      </div>
                    </label>
                  </div>

                  <label className="template-select">
                    Select Template
                    <select defaultValue="Select">
                      <option>Select</option>
                    </select>
                  </label>

                  <div className="test-series-actions">
                    <button
                      type="button"
                      className="primary"
                      onClick={() => {
                        setShowCourseBuilder(true);
                        onToast?.("Test Series created");
                      }}
                    >
                      Create
                    </button>
                    <button type="button" className="secondary" onClick={closeModal}>Cancel</button>
                  </div>
                </section>
              ) : (
                <section className="course-builder-card">
                  <h2>Create New Course</h2>
                  <p>Build engaging content for your learners</p>

                  <div className="course-tabs">
                    <button type="button" className="active">Basic Information</button>
                    <button type="button">Content</button>
                    <button type="button">Settings</button>
                  </div>

                  <div className="course-section">
                    <h3>Course Details</h3>
                    <div className="course-grid">
                      <label>
                        Course Title*
                        <input placeholder="Enter your live class title" />
                      </label>
                      <label>
                        Description*
                        <textarea placeholder="Add description" rows={4} />
                      </label>
                    </div>

                    <div className="course-grid two-col">
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

                    <div className="course-thumbnail">
                      <h4>Thumbnail</h4>
                      <div className="course-drop">
                        <div className="course-drop-icon">🖼</div>
                        <p>Drag and drop an image, or click to upload.</p>
                        <small>Minimum dimension: 800x450px. Maximum file size: 2MB.</small>
                      </div>
                    </div>
                  </div>

                  <div className="course-actions">
                    <button type="button" className="primary" onClick={() => onToast?.("Course saved and published")}>Save &amp; Publish</button>
                    <button type="button" className="secondary" onClick={() => onToast?.("Preview")}>Preview</button>
                  </div>
                </section>
              )}
            </div>
          </section>
        </div>
      ) : (
        <section className="test-series-closed-card">
          <h3>Test Series Form Closed</h3>
          <p>Open it again to continue creating a test series.</p>
          <button type="button" className="primary" onClick={reopenModal}>Open Create Test Series</button>
        </section>
      )}
    </div>
  );
}

export default TestSeriesPage;
