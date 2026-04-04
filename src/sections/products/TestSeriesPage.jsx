import React, { useState } from "react";
import "./test-series.css";

function TestSeriesPage({ onToast }) {
  const [view, setView] = useState("front");

  const closeCreatePage = () => {
    setView("front");
    onToast?.("Create Test Series closed");
  };

  const openCreatePage = () => {
    setView("create");
    onToast?.("Create Test Series opened");
  };

  if (view === "create") {
    return (
      <div className="test-series-page">
        <section className="test-series-create-shell">
          <div className="test-series-modal-head">
            <div className="test-series-breadcrumb">
              <button type="button" className="crumb-link" onClick={() => window.history.back()}>
                Courses
              </button>
              <span className="crumb-sep">/</span>
              <span className="crumb-current">Create Courses</span>
            </div>
            <button type="button" className="test-series-close" onClick={closeCreatePage}>×</button>
          </div>

          <div className="test-series-modal-body">
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
                    closeCreatePage();
                    onToast?.("Test Series created");
                  }}
                >
                  Create
                </button>
                <button type="button" className="secondary" onClick={closeCreatePage}>Cancel</button>
              </div>
            </section>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="test-series-page">
      <div className="test-series-front">
        <div className="test-series-dashed-card">
          <h2>Test Series</h2>
          <p>Create and manage Test Series</p>
        </div>
        <div className="test-series-front-actions">
          <button type="button" className="primary" onClick={openCreatePage}>+ Create</button>
        </div>
      </div>
    </div>
  );
}

export default TestSeriesPage;
