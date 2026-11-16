/* =================================
   TDL — LIVING SCROLL ATMOSPHERE
================================= */

const atmosphere = document.querySelector(".scroll-atmosphere");

if (atmosphere) {

    let ticking = false;

    function updateAtmosphere() {

        const scrollableHeight =
            document.documentElement.scrollHeight - window.innerHeight;

        const progress = scrollableHeight > 0
            ? window.scrollY / scrollableHeight
            : 0;

        // First emerald light
        const lightX = 50 + Math.sin(progress * Math.PI * 2) * 25;
        const lightY = 15 + progress * 70;

        // Second atmospheric light
        const lightXTwo = 75 - progress * 55;
        const lightYTwo = 80 - progress * 45;

        atmosphere.style.setProperty("--light-x", `${lightX}%`);
        atmosphere.style.setProperty("--light-y", `${lightY}%`);

        atmosphere.style.setProperty("--light-x-two", `${lightXTwo}%`);
        atmosphere.style.setProperty("--light-y-two", `${lightYTwo}%`);

        ticking = false;
    }

    function requestAtmosphereUpdate() {
        if (!ticking) {
            requestAnimationFrame(updateAtmosphere);
            ticking = true;
        }
    }

    window.addEventListener(
        "scroll",
        requestAtmosphereUpdate,
        { passive: true }
    );

    window.addEventListener("resize", requestAtmosphereUpdate);

    updateAtmosphere();

    console.log("TDL Living Atmosphere initialized.");
}