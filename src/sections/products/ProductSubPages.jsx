import React from "react";
import "./product-sub-pages.css";

function SimpleProductPage({ title, subtitleTitle, onToast }) {
  const displayTitle = subtitleTitle || (title === "Bundles" ? "course bundles" : title);

  return (
    <div className="product-simple-page">
      <div className="product-dashed-card">
        <h2>{title}</h2>
        <p>Create and manage {displayTitle}</p>
      </div>
      <div className="product-create-row">
        <button type="button" onClick={() => onToast?.(`Create ${title} clicked`)}>
          + Create
        </button>
      </div>
    </div>
  );
}

function ClassificationPage({ onToast }) {
  const cards = [
    {
      title: "Categories",
      description: "Create categories and add products for easy content discovery",
      tone: "cat"
    },
    {
      title: "Tags",
      description: "Create tags and use them to classify News Feed Posts and Questions",
      tone: "tag"
    },
    {
      title: "Segments",
      description: "Create Segments and Add multiple sub-segments or Products within",
      tone: "seg"
    }
  ];

  return (
    <div className="classification-page">
      <div className="classification-grid">
        {cards.map((card) => (
          <article key={card.title} className="classification-card">
            <div className={`classification-icon ${card.tone}`} aria-hidden="true" />
            <h3>{card.title}</h3>
            <p>{card.description}</p>
            <button type="button" onClick={() => onToast?.(`Open ${card.title}`)}>View</button>
          </article>
        ))}
      </div>
    </div>
  );
}

function UtilitiesPage({ onToast }) {
  return (
    <div className="utilities-page">
      <section className="utilities-head">
        <h2>Utilities</h2>
        <p>Utilities lets you create multiple copies of an existing course and encrypt your unencrypted courses.</p>
      </section>

      <button type="button" className="utilities-card" onClick={() => onToast?.("Copy Product clicked")}>
        <div>
          <h3>Copy Product</h3>
          <p>Create copy of course, mock test or test series to a new product or existing product within school or sub-school.</p>
          <small>Note: Copy of course will be created as encrypted course</small>
        </div>
        <span className="utilities-arrow">›</span>
      </button>
    </div>
  );
}

export { SimpleProductPage, ClassificationPage, UtilitiesPage };
