import { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";

const WORK_LINKS = [
    { label: "Projects", to: "/work#projects" },
    { label: "Web Development", to: "/work#web-dev" },
    { label: "Mobile Development", to: "/work#mobile-dev" }
];

export default function Navbar({ dark, onToggleTheme }) {
    const location = useLocation();

    const navRef = useRef(null);
    const dropdownRef = useRef(null);
    const mobileDropdownRef = useRef(null);
    const mobileMenuRef = useRef(null);
    const menuToggleRef = useRef(null);

    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);
    const [mobileDropdownOpen, setMobileDropdownOpen] = useState(false);

    const isActive = (path) => {
        if (path === "/") {
            return location.pathname === "/";
        }

        return location.pathname.startsWith(path);
    };

    useEffect(() => {
        const navbar = navRef.current;

        if (!navbar) {
            return undefined;
        }

        const handleScroll = () => {
            navbar.classList.toggle("scrolled", window.scrollY > 50);
        };

        handleScroll();
        window.addEventListener("scroll", handleScroll, { passive: true });

        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    useEffect(() => {
        setDropdownOpen(false);
        setMobileOpen(false);
        setMobileDropdownOpen(false);
    }, [location.pathname, location.key]);

    useEffect(() => {
        const handleClick = (event) => {
            if (
                dropdownOpen &&
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target)
            ) {
                setDropdownOpen(false);
            }

            if (
                mobileDropdownOpen &&
                mobileDropdownRef.current &&
                !mobileDropdownRef.current.contains(event.target)
            ) {
                setMobileDropdownOpen(false);
            }

            if (
                mobileOpen &&
                mobileMenuRef.current &&
                !mobileMenuRef.current.contains(event.target) &&
                menuToggleRef.current &&
                !menuToggleRef.current.contains(event.target)
            ) {
                setMobileOpen(false);
            }
        };

        const handleKey = (event) => {
            if (event.key !== "Escape") {
                return;
            }

            setDropdownOpen(false);
            setMobileOpen(false);
            setMobileDropdownOpen(false);
        };

        document.addEventListener("click", handleClick);
        document.addEventListener("keydown", handleKey);

        return () => {
            document.removeEventListener("click", handleClick);
            document.removeEventListener("keydown", handleKey);
        };
    }, [dropdownOpen, mobileDropdownOpen, mobileOpen]);

    const closeMenus = () => {
        setDropdownOpen(false);
        setMobileOpen(false);
        setMobileDropdownOpen(false);
    };

    return (
        <header className="navbar" id="navbar" ref={navRef}>
            <div className="nav-container">
                <nav className="desktop-nav" aria-label="Main Navigation">
                    <ul className="nav-list">
                        <li>
                            <Link
                                to="/"
                                className={isActive("/") ? "active" : undefined}
                                aria-current={isActive("/") ? "page" : undefined}
                            >
                                Home
                            </Link>
                        </li>

                        <li className="dropdown" ref={dropdownRef}>
                            <button
                                type="button"
                                className={`dropdown-trigger${
                                    isActive("/work") ? " active" : ""
                                }`}
                                aria-haspopup="true"
                                aria-expanded={dropdownOpen}
                                aria-current={
                                    isActive("/work") ? "page" : undefined
                                }
                                onClick={() => setDropdownOpen((open) => !open)}
                            >
                                Work
                                <span className="dropdown-arrow">
                                    {dropdownOpen ? "▲" : "▼"}
                                </span>
                            </button>

                            <ul
                                className={`dropdown-menu${dropdownOpen ? " show" : ""}`}
                            >
                                {WORK_LINKS.map((item) => (
                                    <li key={item.to}>
                                        <Link to={item.to} onClick={closeMenus}>
                                            {item.label}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </li>

                        <li>
                            <Link
                                to="/about"
                                className={isActive("/about") ? "active" : undefined}
                                aria-current={
                                    isActive("/about") ? "page" : undefined
                                }
                            >
                                About
                            </Link>
                        </li>

                        <li>
                            <Link
                                to="/contact"
                                className={
                                    isActive("/contact") ? "active" : undefined
                                }
                                aria-current={
                                    isActive("/contact") ? "page" : undefined
                                }
                            >
                                Contact
                            </Link>
                        </li>
                    </ul>
                </nav>

                <div className="nav-actions">
                    <button
                        className="theme-toggle"
                        type="button"
                        aria-label="Toggle dark mode"
                        onClick={onToggleTheme}
                    >
                        <i
                            className={`fa-solid ${
                                dark ? "fa-sun" : "fa-moon"
                            }`}
                        ></i>
                    </button>

                    <button
                        ref={menuToggleRef}
                        className={`menu-toggle${mobileOpen ? " active" : ""}`}
                        type="button"
                        aria-label={
                            mobileOpen
                                ? "Close navigation menu"
                                : "Open navigation menu"
                        }
                        aria-expanded={mobileOpen}
                        onClick={() => setMobileOpen((open) => !open)}
                    >
                        <span></span>
                        <span></span>
                        <span></span>
                    </button>
                </div>
            </div>

            <div
                ref={mobileMenuRef}
                className={`mobile-menu${mobileOpen ? " open" : ""}`}
                id="mobileMenu"
            >
                <Link
                    to="/"
                    className={isActive("/") ? "active" : undefined}
                    aria-current={isActive("/") ? "page" : undefined}
                    onClick={closeMenus}
                >
                    <span>01</span>
                    Home
                </Link>

                <div className="mobile-dropdown" ref={mobileDropdownRef}>
                    <button
                        type="button"
                        className={`mobile-dropdown-trigger${
                            isActive("/work") ? " active" : ""
                        }`}
                        aria-haspopup="true"
                        aria-expanded={mobileDropdownOpen}
                        aria-current={
                            isActive("/work") ? "page" : undefined
                        }
                        onClick={() =>
                            setMobileDropdownOpen((open) => !open)
                        }
                    >
                        <span>02</span>
                        Work
                        <span className="dropdown-arrow">
                            {mobileDropdownOpen ? "▲" : "▼"}
                        </span>
                    </button>

                    <ul
                        className={`mobile-dropdown-menu${
                            mobileDropdownOpen ? " show" : ""
                        }`}
                    >
                        {WORK_LINKS.map((item) => (
                            <li key={item.to}>
                                <Link to={item.to} onClick={closeMenus}>
                                    {item.label}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>

                <Link
                    to="/about"
                    className={isActive("/about") ? "active" : undefined}
                    aria-current={isActive("/about") ? "page" : undefined}
                    onClick={closeMenus}
                >
                    <span>03</span>
                    About
                </Link>

                <Link
                    to="/contact"
                    className={isActive("/contact") ? "active" : undefined}
                    aria-current={isActive("/contact") ? "page" : undefined}
                    onClick={closeMenus}
                >
                    <span>04</span>
                    Contact
                </Link>
            </div>
        </header>
    );
}
