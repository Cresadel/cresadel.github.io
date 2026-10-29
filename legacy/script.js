/* =========================================================
   CRESADEL DELA CRUZ — PORTFOLIO V2
   Main JavaScript
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    initLoader();
    initMobileMenu();
    initDropdowns();
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
   NAVBAR DROPDOWNS — PURE VANILLA JAVASCRIPT
   ========================================================= */

/*
   initDropdown(buttonId, menuId)  wires up ONE dropdown.

   It takes the id of the trigger <button> and the id of the
   <ul> menu. Because the logic is the same for both dropdowns,
   we can reuse the same function for the desktop dropdown and
   the mobile dropdown.

   Important: the menu is shown/hidden by toggling the "show"
   class (which style.css maps to display: block). We never
   touch el.style.display directly.
*/

function initDropdown(buttonId, menuId) {

    // 1. Select the button and the menu with document.querySelector
    //    (a CSS id selector like "#dropdownBtn").
    const dropdownButton =
        document.querySelector(`#${buttonId}`);

    const dropdownMenu =
        document.querySelector(`#${menuId}`);

    // If either element is missing, do nothing. This keeps
    // the other pages (work.html, about.html, ...) error-free,
    // since they don't have these dropdowns.
    if (!dropdownButton || !dropdownMenu) {
        return;
    }

    // Grab the little ▼/▲ arrow that lives inside the button.
    const arrow =
        dropdownButton.querySelector(".dropdown-arrow");


    // 2. Handle the click on the trigger button.
    dropdownButton.addEventListener("click", () => {

        // Toggle the "show" class on the menu:
        //   first click  -> adds "show"    -> menu opens
        //   second click -> removes "show" -> menu closes
        const isOpen =
            dropdownMenu.classList.toggle("show");

        // If this dropdown just opened, close every other
        // dropdown first so only one menu is open at a time.
        if (isOpen) {
            closeAllDropdowns(dropdownMenu);
        }

        // Keep aria-expanded in sync (for screen readers).
        dropdownButton.setAttribute(
            "aria-expanded",
            isOpen
        );

        // Bonus: flip the arrow ▼ -> ▲ while open,
        // and ▲ -> ▼ when closed again.
        if (arrow) {
            arrow.textContent =
                isOpen
                    ? "▲"
                    : "▼";
        }

    });


    // 3. Bonus: close the menu when clicking outside of it.
    //    A click event on the whole document fires for every
    //    click that bubbles up, so we verify where it landed.
    document.addEventListener("click", event => {

        // Nothing to do if the menu is already closed.
        if (!dropdownMenu.classList.contains("show")) {
            return;
        }

        // Did the click land INSIDE the menu, or on the button?
        // Then we leave it alone.
        const clickedInside =
            dropdownMenu.contains(event.target) ||
            dropdownButton.contains(event.target);

        if (clickedInside) {
            return;
        }

        // Otherwise, the click was outside -> close the menu.
        // We close ALL dropdowns so a click outside closes
        // everything at once (even if two were somehow open).
        closeAllDropdowns();

    });


    // 4. Bonus: close the menu after clicking a link inside it.
    dropdownMenu
        .querySelectorAll("a")
        .forEach(link => {

            link.addEventListener("click", event => {

                // Placeholder links (href="#" + "(coming soon)")
                // don't go anywhere yet — stop them jumping the
                // page back to the top, and just close the menu.
                if (link.getAttribute("href") === "#") {
                    event.preventDefault();
                }

                closeDropdown(
                    dropdownButton,
                    dropdownMenu,
                    arrow
                );

            });

        });


    // 5. Bonus: close the menu with the Escape key.
    document.addEventListener("keydown", event => {

        if (
            event.key === "Escape" &&
            dropdownMenu.classList.contains("show")
        ) {

            closeDropdown(
                dropdownButton,
                dropdownMenu,
                arrow
            );

        }

    });

}


/*
   closeDropdown() is a small helper used everywhere above.
   It removes the "show" class, resets aria-expanded and
   puts the arrow back to ▼.
*/

function closeDropdown(button, menu, arrow) {

    menu.classList.remove("show");

    button.setAttribute(
        "aria-expanded",
        "false"
    );

    if (arrow) {
        arrow.textContent = "▼";
    }

}


/*
   closeAllDropdowns() closes every open dropdown.

   It accepts an optional "exceptMenu" argument so that when
   one dropdown opens we can keep that one open but close
   all the others. It reads the trigger <button> and the
   ▼/▲ arrow back out of each menu's parent.

   This is what makes the dropdowns work as a group:
   opening one closes the other, and clicking outside
   the navbar closes everything.
*/

function closeAllDropdowns(exceptMenu = null) {

    document
        .querySelectorAll(
            ".dropdown-menu.show, .mobile-dropdown-menu.show"
        )
        .forEach(menu => {

            // Keep the menu that just opened.
            if (exceptMenu && menu === exceptMenu) {
                return;
            }

            // Find the trigger button that belongs to this menu
            // (desktop: <li class="dropdown">, mobile: <div class="mobile-dropdown">).
            const wrapper = menu.parentElement;

            const trigger =
                wrapper
                    ? wrapper.querySelector("button")
                    : null;

            const arrow =
                trigger
                    ? trigger.querySelector(".dropdown-arrow")
                    : null;

            closeDropdown(trigger, menu, arrow);

        });

}


/*
   Wire up the About dropdown in both navbars (one in the
   desktop navbar, one inside the mobile menu). Thanks to
   closeAllDropdowns() they stay in sync while each keeps
   its own button/menu ids.
*/

function initDropdowns() {

    // Desktop navbar (visible on screens wider than 700px)
    initDropdown("dropdownBtn", "dropdownMenu");

    // Mobile menu (shown on small screens)
    initDropdown("mobileDropdownBtn", "mobileDropdownMenu");

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