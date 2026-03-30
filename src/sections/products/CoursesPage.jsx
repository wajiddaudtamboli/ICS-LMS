import React from "react";
import "./courses.css";

function CoursesPage({ sectionTitle = "Courses", onToast }) {
  const metricCards = [
    { label: "Total Course", value: "27" },
    { label: "Encrypted Course", value: "5" },
    { label: "Unencrypted Course", value: "22" },
    { label: "Encrypted Course Limit", value: "100" }
  ];

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
          <button type="button" className="btn-create-course" onClick={() => onToast?.("Create clicked")}>
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
        <input type="text" placeholder="Search" />
        <button type="button" className="btn-filter" onClick={() => onToast?.("Add Filter clicked")}>
          <span aria-hidden="true">⎚</span>
          Add Filter
        </button>
      </section>

      <section className="courses-activity-card">
        <h3>Recent Activity</h3>
        <div className="courses-skeleton-grid">
          {Array.from({ length: 12 }).map((_, index) => (
            <div key={`sk-${index}`} className="courses-skeleton-item" />
          ))}
        </div>
      </section>
    </div>
  );
}

export default CoursesPage;
