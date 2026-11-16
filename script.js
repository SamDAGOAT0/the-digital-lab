
window.addEventListener("DOMContentLoaded", () => {

    // 1. PAGE ENTRANCE
    requestAnimationFrame(() => {
        document.body.classList.add("loaded");
    });


    // 2. LEARNING CARD REVEALS
    const cards = document.querySelectorAll(".learning-card");

    if ("IntersectionObserver" in window) {

        const observer = new IntersectionObserver((entries) => {

            entries.forEach((entry) => {

                if (entry.isIntersecting) {
                    entry.target.classList.add("visible");
                    observer.unobserve(entry.target);
                }

            });

        }, {
            threshold: 0.2
        });

        cards.forEach((card) => observer.observe(card));

    } else {
        cards.forEach((card) => card.classList.add("visible"));
    }


    // 3. INTERACTIVE HERO SCULPTURE
    const hero = document.querySelector(".hero");
    const heroArt = document.querySelector(".hero-art");

    if (!hero || !heroArt) return;

    const reducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    ).matches;

    if (reducedMotion) return;

    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;

    // Mouse movement sets the sculpture's target rotation.
    hero.addEventListener("pointermove", (event) => {

        if (event.pointerType !== "mouse") return;

        const bounds = hero.getBoundingClientRect();

        const x = (event.clientX - bounds.left) / bounds.width;
        const y = (event.clientY - bounds.top) / bounds.height;

        targetY = (x - 0.5) * 12;
        targetX = (0.5 - y) * 9;

    });

    // Smoothly follow the mouse instead of snapping.
    function animateSculpture() {

        currentX += (targetX - currentX) * 0.055;
        currentY += (targetY - currentY) * 0.055;

        heroArt.style.transform =
            `perspective(1000px) rotateX(${currentX}deg) rotateY(${currentY}deg)`;

        requestAnimationFrame(animateSculpture);
    }

    animateSculpture();

    // Return to neutral when the mouse leaves.
    hero.addEventListener("pointerleave", () => {
        targetX = 0;
        targetY = 0;
    });

});
