/* =========================================================
   CRESADEL DELA CRUZ — PORTFOLIO V2
   Main JavaScript
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    initLoader();
    initMobileMenu();
    initThemeToggle();
    initScrollReveal();
    initBackToTop();
    initNavbarScroll();
    initLazyImages();
    setActiveNavigation();
    initSmoothLinks();
    initCursorGlow();
    initButtonInteractions();

});


/* =========================================================
   LOADING SCREEN
   ========================================================= */

function initLoader() {

    const loader = document.getElementById("loader");

    if (!loader) {
        return;
    }

    // Prevent scrolling while loading
    document.body.style.overflow = "hidden";

    let loaderFinished = false;

    function hideLoader() {

        if (loaderFinished) {
            return;
        }

        loaderFinished = true;

        loader.classList.add("hidden");

        document.body.style.overflow = "";

        // Reveal hero content
        setTimeout(() => {

            document
                .querySelectorAll(".hero .reveal")
                .forEach((element, index) => {

                    setTimeout(() => {
                        element.classList.add("show");
                    }, index * 120);

                });

        }, 200);

    }


    /*
       Normal loading:
       Wait until all page resources are loaded.
    */

    window.addEventListener("load", () => {

        setTimeout(() => {
            hideLoader();
        }, 900);

    });


    /*
       SAFETY FALLBACK

       If something prevents the window "load"
       event from completing, the loader will
       NEVER remain stuck forever.
    */

    setTimeout(() => {
        hideLoader();
    }, 3000);

}


/* =========================================================
   MOBILE MENU
   ========================================================= */

function initMobileMenu() {

    const menuToggle = document.getElementById("menuToggle");
    const mobileMenu = document.getElementById("mobileMenu");

    if (!menuToggle || !mobileMenu) {
        return;
    }


    menuToggle.addEventListener("click", () => {

        const isOpen =
            mobileMenu.classList.toggle("open");

        menuToggle.classList.toggle(
            "active",
            isOpen
        );

        menuToggle.setAttribute(
            "aria-expanded",
            isOpen
        );

        menuToggle.setAttribute(
            "aria-label",
            isOpen
                ? "Close navigation menu"
                : "Open navigation menu"
        );

    });


    // Close menu when clicking links

    mobileMenu
        .querySelectorAll("a")
        .forEach(link => {

            link.addEventListener("click", () => {

                mobileMenu.classList.remove("open");

                menuToggle.classList.remove("active");

                menuToggle.setAttribute(
                    "aria-expanded",
                    "false"
                );

                menuToggle.setAttribute(
                    "aria-label",
                    "Open navigation menu"
                );

            });

        });


    // Close when clicking outside

    document.addEventListener("click", event => {

        const clickedInsideMenu =
            mobileMenu.contains(event.target);

        const clickedToggle =
            menuToggle.contains(event.target);


        if (
            !clickedInsideMenu &&
            !clickedToggle &&
            mobileMenu.classList.contains("open")
        ) {

            mobileMenu.classList.remove("open");

            menuToggle.classList.remove("active");

            menuToggle.setAttribute(
                "aria-expanded",
                "false"
            );

        }

    });

}


/* =========================================================
   DARK / LIGHT MODE
   ========================================================= */

function initThemeToggle() {

    const themeToggle =
        document.getElementById("themeToggle");

    if (!themeToggle) {
        return;
    }


    const icon =
        themeToggle.querySelector("i");


    const savedTheme =
        localStorage.getItem("cresadel-theme");


    if (savedTheme === "dark") {

        document.body.classList.add("dark-mode");

        updateThemeIcon(icon, true);

    }


    themeToggle.addEventListener("click", () => {

        const isDark =
            document.body.classList.toggle("dark-mode");


        localStorage.setItem(
            "cresadel-theme",
            isDark ? "dark" : "light"
        );


        updateThemeIcon(
            icon,
            isDark
        );

    });

}


function updateThemeIcon(icon, isDark) {

    if (!icon) {
        return;
    }


    if (isDark) {

        icon.classList.remove("fa-moon");

        icon.classList.add("fa-sun");

    } else {

        icon.classList.remove("fa-sun");

        icon.classList.add("fa-moon");

    }

}


/* =========================================================
   SCROLL REVEAL
   ========================================================= */

function initScrollReveal() {

    const elements =
        document.querySelectorAll(".reveal");


    if (!elements.length) {
        return;
    }


    // Fallback for browsers without IntersectionObserver

    if (!("IntersectionObserver" in window)) {

        elements.forEach(element => {
            element.classList.add("show");
        });

        return;

    }


    const observer =
        new IntersectionObserver(
            (entries, observer) => {

                entries.forEach(entry => {

                    if (entry.isIntersecting) {

                        entry.target.classList.add("show");

                        observer.unobserve(
                            entry.target
                        );

                    }

                });

            },
            {
                threshold: 0.12,
                rootMargin: "0px 0px -50px 0px"
            }
        );


    elements.forEach(element => {

        // Hero animations are handled separately
        if (element.closest(".hero")) {
            return;
        }

        observer.observe(element);

    });

}


/* =========================================================
   BACK TO TOP
   ========================================================= */

function initBackToTop() {

    const button =
        document.getElementById("backToTop");


    if (!button) {
        return;
    }


    window.addEventListener(
        "scroll",
        () => {

            if (window.scrollY > 500) {

                button.classList.add("visible");

            } else {

                button.classList.remove("visible");

            }

        },
        { passive: true }
    );


    button.addEventListener(
        "click",
        () => {

            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });

        }
    );

}


/* =========================================================
   NAVBAR ON SCROLL
   ========================================================= */

function initNavbarScroll() {

    const navbar =
        document.querySelector(".navbar");


    if (!navbar) {
        return;
    }


    window.addEventListener(
        "scroll",
        () => {

            if (window.scrollY > 50) {

                navbar.classList.add("scrolled");

            } else {

                navbar.classList.remove("scrolled");

            }

        },
        { passive: true }
    );

}


/* =========================================================
   IMAGE LAZY LOADING
   ========================================================= */

function initLazyImages() {

    const images =
        document.querySelectorAll("img");


    images.forEach(image => {

        /*
           Don't add lazy loading to:
           - logo
           - profile
           - loader images
        */

        const isImportantImage =
            image.closest(".loader") ||
            image.classList.contains("logo-image") ||
            image.classList.contains("profile-image");


        if (
            !image.hasAttribute("loading") &&
            !isImportantImage
        ) {

            image.setAttribute(
                "loading",
                "lazy"
            );

        }

    });

}


/* =========================================================
   ACTIVE NAVIGATION
   ========================================================= */

function setActiveNavigation() {

    const currentPage =
        window.location.pathname
            .split("/")
            .pop()
            .toLowerCase();


    const navLinks =
        document.querySelectorAll(
            ".desktop-nav a, .mobile-menu a, nav a"
        );


    navLinks.forEach(link => {

        const href =
            link
                .getAttribute("href")
                ?.split("/")
                .pop()
                .toLowerCase();


        link.classList.remove("active");


        if (
            href === currentPage ||
            (
                currentPage === "" &&
                href === "index.html"
            )
        ) {

            link.classList.add("active");

        }

    });

}


/* =========================================================
   IMAGE ERROR HANDLING
   ========================================================= */

document.addEventListener(
    "error",
    event => {

        const element =
            event.target;


        if (
            element.tagName !== "IMG"
        ) {
            return;
        }


        element.classList.add(
            "image-error"
        );

    },
    true
);


/* =========================================================
   KEYBOARD ACCESSIBILITY
   ========================================================= */

document.addEventListener(
    "keydown",
    event => {

        // ESC closes mobile menu

        if (event.key !== "Escape") {
            return;
        }


        const mobileMenu =
            document.getElementById(
                "mobileMenu"
            );


        const menuToggle =
            document.getElementById(
                "menuToggle"
            );


        if (
            mobileMenu &&
            mobileMenu.classList.contains("open")
        ) {

            mobileMenu.classList.remove("open");

            menuToggle?.classList.remove("active");

            menuToggle?.setAttribute(
                "aria-expanded",
                "false"
            );

            menuToggle?.setAttribute(
                "aria-label",
                "Open navigation menu"
            );

        }

    }
);


/* =========================================================
   SMOOTH INTERNAL LINKS
   ========================================================= */

function initSmoothLinks() {

    document
        .querySelectorAll('a[href^="#"]')
        .forEach(link => {

            link.addEventListener(
                "click",
                event => {

                    const targetId =
                        link.getAttribute("href");


                    if (
                        !targetId ||
                        targetId === "#"
                    ) {
                        return;
                    }


                    const target =
                        document.querySelector(
                            targetId
                        );


                    if (!target) {
                        return;
                    }


                    event.preventDefault();


                    target.scrollIntoView({
                        behavior: "smooth",
                        block: "start"
                    });

                }
            );

        });

}


/* =========================================================
   CURSOR GLOW — DESKTOP ONLY
   ========================================================= */

function initCursorGlow() {

    if (
        window.matchMedia(
            "(pointer: coarse)"
        ).matches
    ) {
        return;
    }


    const glow =
        document.createElement("div");


    glow.className =
        "cursor-glow";


    document.body.appendChild(
        glow
    );


    document.addEventListener(
        "mousemove",
        event => {

            glow.style.left =
                `${event.clientX}px`;

            glow.style.top =
                `${event.clientY}px`;

        }
    );

}


/* =========================================================
   BUTTON MICRO INTERACTION
   ========================================================= */

function initButtonInteractions() {

    document
        .querySelectorAll(
            ".btn, .project-link, .view-all, .text-link, .primary-btn, .secondary-btn"
        )
        .forEach(element => {

            element.addEventListener(
                "mouseenter",
                () => {

                    element.style.setProperty(
                        "--hover-x",
                        "1"
                    );

                }
            );


            element.addEventListener(
                "mouseleave",
                () => {

                    element.style.setProperty(
                        "--hover-x",
                        "0"
                    );

                }
            );

        });

}


/* =========================================================
   CONSOLE MESSAGE
   ========================================================= */

console.log(
    "%c✦ Welcome to Cresadel's Portfolio ✦",
    "color:#48707a;font-size:18px;font-weight:bold;"
);

console.log(
    "Still learning. Still creating. Still becoming."
);