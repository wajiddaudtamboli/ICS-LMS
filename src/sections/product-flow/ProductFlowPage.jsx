import React, { useMemo, useState } from "react";
import "./product-flow.css";

const initialSteps = [
  { id: 1, title: "Set Up Payments", description: "Connect payment gateway and payout account.", completed: true },
  { id: 2, title: "Set Up Products", description: "Create products and map delivery settings.", completed: true },
  { id: 3, title: "Publish Product Catalog", description: "Review listing details and publish to learners.", completed: false },
  { id: 4, title: "Go Live", description: "Enable checkout and launch your sales flow.", completed: false }
];

function ProductFlowPage({ onToast, onOpenSection }) {
  const [steps, setSteps] = useState(initialSteps);

  const completedCount = useMemo(() => steps.filter((step) => step.completed).length, [steps]);
  const progress = useMemo(() => Math.round((completedCount / steps.length) * 100), [completedCount, steps.length]);

  const completeStep = (id) => {
    setSteps((prev) =>
      prev.map((step) => {
        if (step.id !== id || step.completed) {
          return step;
        }
        return { ...step, completed: true };
      })
    );

    const selected = steps.find((step) => step.id === id);
    if (selected && !selected.completed) {
      onToast?.(`${selected.title} completed`);
    }
  };

  return (
    <div className="product-flow-page">
      <section className="pf-hero">
        <h2>Welcome, to Learnyst Admin</h2>
        <p>Manage your courses, learners, and product sales from one place.</p>
        <div className="pf-hero-actions">
          <button type="button" onClick={() => onToast?.("Create action clicked")}>+ Create</button>
          <button type="button" className="secondary" onClick={() => onToast?.("Reorder action clicked")}>Reorder</button>
        </div>
      </section>

      <section className="pf-section">
        <div className="pf-section-head">
          <h3>Complete Your Setup</h3>
          <span>{completedCount} of {steps.length} completed</span>
        </div>
        <div className="pf-progress-track">
          <div className="pf-progress-fill" style={{ width: `${progress}%` }} />
        </div>

        <div className="pf-steps-grid">
          {steps.map((step) => (
            <div key={step.id} className={`pf-step-card ${step.completed ? "done" : ""}`}>
              <div className="pf-step-title">{step.id}. {step.title}</div>
              <p>{step.description}</p>
              <button type="button" disabled={step.completed} onClick={() => completeStep(step.id)}>
                {step.completed ? "Completed" : "Start"}
              </button>
            </div>
          ))}
        </div>
      </section>

      <section className="pf-section">
        <h3>Overview</h3>
        <div className="pf-overview-grid">
          <div className="pf-overview-card">
            <div className="pf-mini-icon blue">📖</div>
            <strong>24</strong>
            <span>Total Sales</span>
          </div>
          <div className="pf-overview-card">
            <div className="pf-mini-icon purple">⟐</div>
            <strong>$45.6k</strong>
            <span>Active Learners</span>
          </div>
          <div className="pf-overview-card">
            <div className="pf-mini-icon green">$</div>
            <strong>892</strong>
            <span>Monthly Revenue</span>
          </div>
          <div className="pf-overview-card">
            <div className="pf-mini-icon orange">↗</div>
            <strong>68%</strong>
            <span>Completion Rate</span>
          </div>
        </div>
      </section>

      <section className="pf-section">
        <h3>Quick Actions</h3>
        <div className="pf-quick-grid">
          <button type="button" className="pf-quick-card" onClick={() => onToast?.("Create Crouse clicked")}>
            <div className="pf-mini-icon blue">📖</div>
            <strong>Create Crouse</strong>
            <span>Build and publish new courses</span>
          </button>
          <button type="button" className="pf-quick-card" onClick={() => onToast?.("Add Lesson clicked")}>
            <div className="pf-mini-icon blue">📖</div>
            <strong>Add Lesson</strong>
            <span>Create new lesson content</span>
          </button>
          <button type="button" className="pf-quick-card" onClick={() => onToast?.("Customize Website clicked")}>
            <div className="pf-mini-icon sky">↗</div>
            <strong>Customize Website</strong>
            <span>Edit your site design</span>
          </button>
          <button type="button" className="pf-quick-card" onClick={() => onToast?.("Send Promotion clicked")}>
            <div className="pf-mini-icon sky">↗</div>
            <strong>Send Promotion</strong>
            <span>Launch marketing campaigns</span>
          </button>
        </div>
      </section>

      <section className="pf-section">
        <h3>Recent Activity</h3>
        <ul className="pf-activity-list">
          <li>
            <div className="pf-activity-main">
              <div className="pf-mini-icon blue">📖</div>
              <div>
                <strong>New enrollment</strong>
                <span>Sarah Johnson enrolled in complete Web Development</span>
              </div>
            </div>
            <small>5 minutes ago</small>
          </li>
          <li>
            <div className="pf-activity-main">
              <div className="pf-mini-icon blue">📖</div>
              <div>
                <strong>New enrollment</strong>
                <span>Sarah Johnson enrolled in complete Web Development</span>
              </div>
            </div>
            <small>5 minutes ago</small>
          </li>
          <li>
            <div className="pf-activity-main">
              <div className="pf-mini-icon blue">📖</div>
              <div>
                <strong>New enrollment</strong>
                <span>Sarah Johnson enrolled in complete Web Development</span>
              </div>
            </div>
            <small>5 minutes ago</small>
          </li>
          <li>
            <div className="pf-activity-main">
              <div className="pf-mini-icon blue">📖</div>
              <div>
                <strong>New enrollment</strong>
                <span>Sarah Johnson enrolled in complete Web Development</span>
              </div>
            </div>
            <small>3 hours ago</small>
          </li>
        </ul>
      </section>
    </div>
  );
}

export default ProductFlowPage;
