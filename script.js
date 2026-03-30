const communityToggle = document.getElementById("community-toggle");
const communitySubmenu = document.getElementById("community-submenu");
const createButton = document.getElementById("create-btn");

if (communityToggle && communitySubmenu) {
  communityToggle.addEventListener("click", () => {
    const isExpanded = communityToggle.getAttribute("aria-expanded") === "true";
    communityToggle.setAttribute("aria-expanded", String(!isExpanded));
    communityToggle.classList.toggle("is-open", !isExpanded);
    communitySubmenu.style.display = isExpanded ? "none" : "grid";
  });
}

if (createButton) {
  createButton.addEventListener("click", () => {
    alert("Create action triggered.");
  });
}
