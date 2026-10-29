import { useCallback, useEffect, useState } from "react";
import {
    Navigate,
    Route,
    Routes,
    useLocation
} from "react-router-dom";

import BackToTop from "./components/BackToTop";
import CursorGlow from "./components/CursorGlow";
import Footer from "./components/Footer";
import Loader from "./components/Loader";
import Navbar from "./components/Navbar";
import useReveal from "./hooks/useReveal";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Home from "./pages/Home";
import Work from "./pages/Work";

const META = {
    "/": {
        title: "Cresadel M. Dela Cruz | Portfolio",
        description:
            "Cresadel M. Dela Cruz — student portfolio, creative projects, journey, and memories."
    },
    "/work": {
        title: "Work | Cresadel Dela Cruz",
        description:
            "Cresadel Dela Cruz — Selected projects, school works, and creative projects."
    },
    "/about": {
        title: "About | Cresadel Dela Cruz",
        description:
            "About Cresadel M. Dela Cruz — personal story, place, college journey, education, skills, and goals."
    },
    "/contact": {
        title: "Contact | Cresadel Dela Cruz",
        description:
            "Contact Cresadel M. Dela Cruz — email, social media, and GitHub."
    }
};

const LOADER_MESSAGES = {
    "/": "Loading my little corner of the internet...",
    "/work": "Loading my work...",
    "/about": "Getting to know me...",
    "/contact": "Getting ready to connect..."
};

function useTheme() {
    const [dark, setDark] = useState(() =>
        document.body.classList.contains("dark-mode")
    );

    useEffect(() => {
        document.body.classList.toggle("dark-mode", dark);
        localStorage.setItem("cresadel-theme", dark ? "dark" : "light");
    }, [dark]);

    const toggle = useCallback(() => {
        setDark((current) => !current);
    }, []);

    return { dark, toggle };
}

function ScrollManager() {
    const location = useLocation();

    useEffect(() => {
        if (location.hash) {
            const timer = setTimeout(() => {
                const target = document.getElementById(
                    decodeURIComponent(location.hash.slice(1))
                );

                if (target) {
                    target.scrollIntoView({
                        behavior: "smooth",
                        block: "start"
                    });
                }
            }, 80);

            return () => clearTimeout(timer);
        }

        window.scrollTo({ top: 0, left: 0, behavior: "auto" });
        return undefined;
    }, [location.key, location.pathname, location.hash]);

    return null;
}

function SkipLink() {
    return (
        <a
            href="#main-content"
            className="skip-link"
            onClick={(event) => {
                event.preventDefault();

                const main = document.getElementById("main-content");

                if (main) {
                    main.scrollIntoView({ behavior: "smooth", block: "start" });
                    main.focus({ preventScroll: true });
                }
            }}
        >
            Skip to main content
        </a>
    );
}

export default function App() {
    const [ready, setReady] = useState(false);
    const { dark, toggle } = useTheme();
    const location = useLocation();
    const loaderMessage =
        LOADER_MESSAGES[location.pathname] || LOADER_MESSAGES["/"];

    const handleLoaded = useCallback(() => setReady(true), []);

    useReveal(ready);

    useEffect(() => {
        const meta = META[location.pathname] || META["/"];
        document.title = meta.title;

        let description = document.querySelector(
            'meta[name="description"]'
        );

        if (!description) {
            description = document.createElement("meta");
            description.setAttribute("name", "description");
            document.head.appendChild(description);
        }

        description.setAttribute("content", meta.description);
    }, [location.pathname]);

    return (
        <>
            <Loader
                onFinish={handleLoaded}
                message={loaderMessage}
                showDot={location.pathname === "/"}
            />
            <SkipLink />
            <ScrollManager />
            <Navbar dark={dark} onToggleTheme={toggle} />

            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/work" element={<Work />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>

            <Footer />
            <BackToTop />
            <CursorGlow />
        </>
    );
}
