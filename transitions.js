
/* ==========================================
   THE DIGITAL LAB — SCROLL STORYTELLING
   PHASE 2 / STEP 1
========================================== */

const revealTargets = document.querySelectorAll(`
    .archive .section-heading,
    .learning-card,
    .lesson-top,
    .lesson-text,
    .lesson-image,
    .about-section .eyebrow,
    .about-section h2,
    .about-bottom
`);

// Add reveal behaviour to each target
revealTargets.forEach((element) => {
    element.classList.add("tdl-reveal");
});

// Respect reduced-motion preferences
const reducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
).matches;

if (reducedMotion) {
    revealTargets.forEach((element) => {
        element.classList.add("is-visible");
    });
} else {

    const revealObserver = new IntersectionObserver(
        (entries, observer) => {

            entries.forEach((entry) => {

                if (entry.isIntersecting) {

                    entry.target.classList.add("is-visible");

                    observer.unobserve(entry.target);
                }

            });

        },
        {
            threshold: 0.15,
            rootMargin: "0px 0px -45px 0px"
        }
    );

    revealTargets.forEach((element) => {
        revealObserver.observe(element);
    });

}

console.log("TDL Scroll Storytelling initialized.");
