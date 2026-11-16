console.log("AMBIENT CURSOR SCRIPT LOADED");

const ambient = document.querySelector(".ambient-cursor");

console.log("AMBIENT ELEMENT:", ambient);

if (!ambient) {
    console.error("Ambient cursor element is missing from HTML.");
} else {

    window.addEventListener("pointermove", (event) => {

        ambient.classList.add("active");

        ambient.style.transform =
            `translate3d(${event.clientX}px, ${event.clientY}px, 0) translate(-50%, -50%)`;

    });

    console.log("AMBIENT CURSOR READY");
}