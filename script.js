var prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

// Intersection Observer for scroll animations
function reveal() {
    var reveals = document.querySelectorAll(".reveal");

    for (var i = 0; i < reveals.length; i++) {
        var windowHeight = window.innerHeight;
        var elementTop = reveals[i].getBoundingClientRect().top;
        var elementVisible = 150;

        if (elementTop < windowHeight - elementVisible) {
            reveals[i].classList.add("active");
        }
    }
}

window.addEventListener("scroll", reveal);

// Trigger once on load
reveal();

// Smooth scrolling adjusted for the fixed header.
document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener("click", function (event) {
        var targetSelector = this.getAttribute("href");

        if (!targetSelector || targetSelector === "#") {
            return;
        }

        var target = document.querySelector(targetSelector);

        if (!target) {
            return;
        }

        event.preventDefault();

        var header = document.querySelector("header");
        var headerOffset = header ? header.offsetHeight : 0;
        var targetPosition = target.getBoundingClientRect().top + window.scrollY - headerOffset;

        window.scrollTo({
            top: targetPosition,
            behavior: prefersReducedMotion ? "auto" : "smooth"
        });
    });
});
