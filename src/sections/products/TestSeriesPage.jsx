import React from "react";
import "./test-series.css";

function TestSeriesPage({ onToast }) {
  return (
    <div className="test-series-page">
      <div className="test-series-breadcrumb">Courses / Create Courses</div>
      <section className="test-series-card">
        <h2>Create Test Series</h2>
        <p>Start creating a new test series</p>

        <div className="test-series-grid">
          <label>
            Title*
            <input placeholder="Enter Mock Test Title" maxLength={60} />
          </label>
          <label>
            Price
            <input placeholder="Price" />
          </label>
        </div>

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
          <button type="button" className="primary" onClick={() => onToast?.("Test Series created")}>Create</button>
          <button type="button" className="secondary">Cancel</button>
        </div>
      </section>
    </div>
  );
}

export default TestSeriesPage;
