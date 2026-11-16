
/* =========================================================
   THE DIGITAL LAB — JAVASCRIPT COURSE
   MAIN INTERACTION ENGINE
========================================================= */


/* 01 — INITIALIZATION */

document.addEventListener("DOMContentLoaded", () => {

    console.log("THE DIGITAL LAB — JavaScript course initialized.");

    initializeNavigation();
    initializeScrollReveal();
    initializeCodeWindow();

});


/* 02 — NAVIGATION */

function initializeNavigation() {

    const navLinks = document.querySelectorAll(".js-nav-links a");

    navLinks.forEach(link => {

        link.addEventListener("click", event => {

            const targetId = link.getAttribute("href");

            const target = document.querySelector(targetId);

            if (!target) return;

            event.preventDefault();

            target.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });

        });

    });

}


/* 03 — SCROLL REVEAL */

function initializeScrollReveal() {

    const revealElements = document.querySelectorAll(
        ".js-intro, .js-curriculum-heading, .js-stage-card, .js-final"
    );

    const observer = new IntersectionObserver((entries, observer) => {

        entries.forEach(entry => {

            if (entry.isIntersecting) {

                entry.target.classList.add("js-visible");

                observer.unobserve(entry.target);

            }

        });

    }, {
        threshold: 0.12
    });

    revealElements.forEach(element => {

        element.classList.add("js-reveal");

        observer.observe(element);

    });

}


/* 04 — CODE WINDOW INTERACTION */

function initializeCodeWindow() {

    const codeWindow = document.querySelector(".js-code-window");

    if (!codeWindow) return;

    codeWindow.addEventListener("mouseenter", () => {

        codeWindow.classList.add("js-code-active");

    });

    codeWindow.addEventListener("mouseleave", () => {

        codeWindow.classList.remove("js-code-active");

    });

}


/* 05 — COURSE STATUS */

const javascriptCourse = {

    name: "JavaScript",

    stages: 3,

    lessons: 12,

    status: "Ready to learn"

};

console.log("Course:", javascriptCourse.name);
console.log("Stages:", javascriptCourse.stages);
console.log("Lessons:", javascriptCourse.lessons);
console.log("Status:", javascriptCourse.status);
