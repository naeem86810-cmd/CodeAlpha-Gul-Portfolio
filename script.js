// =========================================
// GUL PORTFOLIO JAVASCRIPT
// =========================================

console.log("Gul's portfolio is running!");

// Scroll Reveal Animation
const elements = document.querySelectorAll(
    ".section, .project-card, .service-card, .skill, .highlight, .about-text, .contact-box"
);

const observer = new IntersectionObserver(
    (entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add("show");
            }
        });
    },
    {
        threshold: 0.15
    }
);

elements.forEach((element) => {
    element.classList.add("reveal");
    observer.observe(element);
});