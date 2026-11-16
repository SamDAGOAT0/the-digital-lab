
/* ==========================================
   THE DIGITAL LAB
   PHASE 2 — DEPTH & PARALLAX
========================================== */

const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
).matches;

if (!prefersReducedMotion) {

    const depthElements = [
        {
            selector: ".section-heading",
            speed: 0.045,
            property: "--parallax-y"
        },
        {
            selector: ".lesson-image img",
            speed: -0.065,
            property: "--parallax-y"
        },
        {
            selector: ".about-section h2",
            speed: 0.035,
            property: "--parallax-y"
        },
        {
            selector: ".foundations",
            speed: -0.055,
            property: "--atmosphere-y"
        }
    ];

    const elements = depthElements.flatMap(config => {
        return [...document.querySelectorAll(config.selector)]
            .map(element => ({
                element,
                speed: config.speed,
                property: config.property
            }));
    });

    let ticking = false;

    function updateParallax() {

        const viewportHeight = window.innerHeight;

        elements.forEach(item => {

            const bounds = item.element.getBoundingClientRect();

            const distanceFromCenter =
                bounds.top + bounds.height / 2 - viewportHeight / 2;

            const movement = distanceFromCenter * item.speed;

            const limitedMovement = Math.max(
                -35,
                Math.min(35, movement)
            );

            item.element.style.setProperty(
                item.property,
                `${limitedMovement}px`
            );

        });

        ticking = false;
    }

    function requestParallaxUpdate() {

        if (!ticking) {
            requestAnimationFrame(updateParallax);
            ticking = true;
        }

    }

    window.addEventListener(
        "scroll",
        requestParallaxUpdate,
        { passive: true }
    );

    window.addEventListener(
        "resize",
        requestParallaxUpdate
    );

    updateParallax();

}

console.log("TDL Depth & Parallax initialized.");
