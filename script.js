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

  // Create floating items with staggered animations
  floatingContainer.innerHTML = personal.floatingSkills
    .map((skill, index) => {
      // create random positions for floating elements baseon length of floatingSkills
      const positions = Array.from({ length: personal.floatingSkills.length }, () => ({
        top: `${Math.random() * 80 + 10}%`,
        // left: `${Math.random() * 80 + 10}%`
        right: `${Math.random() * 80 + 10}%`,
      }));
      const positionsRandom = positions.sort(() => Math.random() - 0.5);

      const position = positionsRandom[index] || positionsRandom[0];
      const animationDelay = index * 2; // 0s, 2s, 4s

      return `
            <div class="float-item" 
                 style="top: ${position.top || "auto"}; 
                        bottom: ${position.bottom || "auto"}; 
                        left: ${position.left || "auto"}; 
                        right: ${position.right || "auto"};
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

// Render Experience Section
function renderExperience() {
  const { experience } = portfolioData;
  const timeline = document.querySelector(".experience-timeline");

  if (!timeline) return;

  timeline.innerHTML = experience
    .map(
      (exp) => `
        <div class="timeline-item">
            <h3>${exp.position}</h3>
            <p class="company">${exp.company} - ${exp.type}</p>
            <p class="duration">${exp.startDate} - ${exp.endDate} | ${exp.location}</p>
            <ul>
                ${exp.responsibilities.map((resp) => `<li>${resp}</li>`).join("")}
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

  document.querySelectorAll(".skill-card, .timeline-item, .project-card").forEach((el) => {
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
