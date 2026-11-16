/* ==========================================
   THE DIGITAL LAB
   MAGNETIC LEARNING CARDS
========================================== */

const cards = document.querySelectorAll(".learning-card");

const reducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
).matches;

const touchDevice = window.matchMedia(
    "(hover: none)"
).matches;

if (!reducedMotion && !touchDevice) {

    cards.forEach(card => {

        // Create cursor-following light
        const light = document.createElement("div");
        light.className = "card-light";

        card.prepend(light);

        card.addEventListener("pointermove", event => {

            const bounds = card.getBoundingClientRect();

            const x = event.clientX - bounds.left;
            const y = event.clientY - bounds.top;

            const centerX = bounds.width / 2;
            const centerY = bounds.height / 2;

            const rotateY = ((x - centerX) / centerX) * 4;
            const rotateX = ((centerY - y) / centerY) * 4;

            card.style.setProperty(
                "--card-rotate-x",
                `${rotateX}deg`
            );

            card.style.setProperty(
                "--card-rotate-y",
                `${rotateY}deg`
            );

            card.style.setProperty(
                "--mouse-x",
                `${x}px`
            );

            card.style.setProperty(
                "--mouse-y",
                `${y}px`
            );

        });

        card.addEventListener("pointerleave", () => {

            card.style.setProperty("--card-rotate-x", "0deg");
            card.style.setProperty("--card-rotate-y", "0deg");

        });

    });

}

console.log("TDL Magnetic Cards initialized.");