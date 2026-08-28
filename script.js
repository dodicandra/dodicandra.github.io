// Global data variable
let portfolioData = null;

// Load data from JSON file
async function loadData() {
  try {
    const response = await fetch("./data.json");
    portfolioData = await response.json();
    initializePortfolio();
  } catch (error) {
    console.error("Error loading data:", error);
    // Use default data if JSON fails to load
    useDefaultData();
  }
}

// Initialize portfolio with loaded data
function initializePortfolio() {
  if (!portfolioData) return;

  renderHeroSection();
  renderFloatingElements();
  renderSkills();
  renderExperience();
  renderProjects();
  renderContact();
  initializeAnimations();
}

// Render Hero Section
function renderHeroSection() {
  const { personal } = portfolioData;

  // document.querySelector('.hero-text .subtitle').textContent = personal.subtitle;
  document.querySelector(".hero-text h1 .name").textContent = personal.name.toUpperCase();
  // document.querySelector('.hero-text p').textContent = personal.description;

  const profileImg = document.getElementById("profile-img");

  // profileImg.src = personal.profileImage;
  // profileImg.alt = personal.name;
}

// Render Floating Elements with dynamic animation
function renderFloatingElements() {
  const { personal } = portfolioData;
  const floatingContainer = document.getElementById("floating-elements");
  console.log("🚀 ~ renderFloatingElements ~ floatingContainer:", floatingContainer);

  if (!floatingContainer || !personal.floatingSkills) return;

  // Posisi orbital tetap di luar batas foto — tidak menimpa gambar
  const orbitalPositions = [
    { top: "-14%", right: "32%" },   // atas tengah
    { top: "8%",   right: "-30%" },  // kanan atas
    { top: "55%",  right: "-32%" },  // kanan bawah
    { top: "105%", right: "28%" },   // bawah tengah
    { top: "92%",  right: "82%" },   // bawah kiri
    { top: "5%",   right: "92%" },   // kiri atas
  ];

  floatingContainer.innerHTML = personal.floatingSkills
    .map((skill, index) => {
      const position = orbitalPositions[index % orbitalPositions.length];
      const animationDelay = index * 1.5;

      return `
            <div class="float-item"
                 style="top: ${position.top};
                        right: ${position.right};
                        animation-delay: ${animationDelay}s;">
                ${skill}
            </div>
        `;
    })
    .join("");
}

// Render Skills Section
function renderSkills() {
  const { skills } = portfolioData;
  const skillsGrid = document.querySelector(".skills-grid");

  if (!skillsGrid) return;

  skillsGrid.innerHTML = skills
    .map(
      (skill) => `
        <div class="skill-card">
            <h3>${skill.category}</h3>
            <ul class="skill-list">
                ${skill.items.map((item) => `<li>${item}</li>`).join("")}
            </ul>
        </div>
    `,
    )
    .join("");
}

// Render a single role inside a company timeline
function renderRole(role) {
  const marker = role.icon
    ? `<div class="role-marker"><img src="${role.icon}" alt="${role.position}" onerror="this.style.display='none'"></div>`
    : `<div class="role-marker is-dot"></div>`;

  const place = [role.location, role.workMode].filter(Boolean).join(" · ");

  const tasks = role.responsibilities?.length
    ? `<ul class="role-tasks">${role.responsibilities.map((task) => `<li>${task}</li>`).join("")}</ul>`
    : "";

  const skills = role.skills?.length
    ? `<div class="role-skills">${role.skills.map((skill) => `<span class="tag">${skill}</span>`).join("")}</div>`
    : "";

  return `
        <li class="role-item">
            ${marker}
            <div class="role-body">
                <h4 class="role-title">${role.position}</h4>
                <p class="role-duration">${role.startDate} – ${role.endDate} · ${role.duration}</p>
                ${place ? `<p class="role-location">${place}</p>` : ""}
                ${tasks}
                ${skills}
            </div>
        </li>
    `;
}

// Render Experience Section
function renderExperience() {
  const { experience } = portfolioData;
  const timeline = document.querySelector(".experience-timeline");

  if (!timeline) return;

  timeline.innerHTML = experience
    .map(
      (exp) => `
        <div class="experience-group">
            <div class="company-header">
                <div class="company-monogram">${exp.monogram}</div>
                <div class="company-info">
                    <h3 class="company-name">${exp.company}</h3>
                    <p class="company-meta">${exp.type} · ${exp.startDate} – ${exp.endDate} · ${exp.totalDuration}</p>
                </div>
            </div>
            <ul class="role-list">
                ${exp.roles.map(renderRole).join("")}
            </ul>
        </div>
    `,
    )
    .join("");
}

// Render Projects Section
function renderProjects() {
  const { projects } = portfolioData;
  const projectsGrid = document.querySelector(".projects-grid");

  if (!projectsGrid) return;

  projectsGrid.innerHTML = projects
    .map(
      (project) => `
        <div class="project-card" data-project-id="${project.id}">
            <div class="project-image">
              <img src="${project.icon}" alt="${project.title} Icon" class="project-icon" />
            </div>
            <div class="project-content">
                <h3>${project.title}</h3>
                <p>${project.description}</p>
                <div class="project-tags">
                    ${project.tags.map((tag) => `<span class="tag">${tag}</span>`).join("")}
                </div>
                <div class="project-links">
                    <a href="${project.demoLink}" target="_blank">View Demo →</a>
                </div>
            </div>
        </div>
    `,
    )
    .join("");
}

// Render Contact Section
function renderContact() {
  const { personal } = portfolioData;
  const contactInfo = document.querySelector(".contact-info");

  if (!contactInfo) return;

  contactInfo.innerHTML = `
        <div class="contact-item">
            <span>📧</span>
            <a href="mailto:${personal.email}">${personal.email}</a>
        </div>
        <div class="contact-item">
            <span>💼</span>
            <a href="${personal.linkedin}" target="_blank">LinkedIn Profile</a>
        </div>
        <div class="contact-item">
            <span>🐙</span>
            <a href="${personal.github}" target="_blank">GitHub Profile</a>
        </div>
    `;
}

// Initialize animations and interactions
function initializeAnimations() {
  // Smooth scroll animation
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute("href"));
      if (target) {
        target.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    });
  });

  // Fade in animation on scroll
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -100px 0px",
  };

  const observer = new IntersectionObserver(function (entries) {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = "1";
        entry.target.style.transform = "translateY(0)";
      }
    });
  }, observerOptions);

  document.querySelectorAll(".skill-card, .experience-group, .project-card").forEach((el) => {
    el.style.opacity = "0";
    el.style.transform = "translateY(30px)";
    el.style.transition = "all 0.6s ease-out";
    observer.observe(el);
  });
}

// Fallback default data if JSON fails to load
function useDefaultData() {
  console.warn("Using default data");
  // Keep existing HTML content
  initializeAnimations();
}

// Profile image error handler
function handleProfileImageError() {
  const profileImg = document.getElementById("profile-img");
  if (profileImg) {
    profileImg.onerror = function () {
      this.src =
        "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='400'%3E%3Crect fill='%231a2942' width='400' height='400'/%3E%3Ctext x='50%25' y='50%25' font-size='80' fill='%233b82f6' text-anchor='middle' dominant-baseline='middle' font-family='Arial'%3EDC%3C/text%3E%3C/svg%3E";
    };
  }
}

// Initialize on page load
document.addEventListener("DOMContentLoaded", function () {
  handleProfileImageError();
  loadData();
});

// Export functions for testing (optional)
if (typeof module !== "undefined" && module.exports) {
  module.exports = {
    loadData,
    initializePortfolio,
  };
}
