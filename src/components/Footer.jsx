import { Link, useLocation } from "react-router-dom";

const FOOTER_CONTENT = {
    "/": {
        tagline: "Still learning. Still creating. Still becoming.",
        note: "Made with curiosity & caffeine"
    },
    "/work": {
        tagline: "From ideas to something real.",
        note: "Built with curiosity & creativity."
    },
    "/contact": {
        tagline: "Learning. Creating. Growing.",
        note: "Built with curiosity & creativity."
    },
    "/about": {
        tagline: "Learning. Creating. Growing.",
        note: "Built with curiosity & creativity."
    }
};

const LINKS = [
    { label: "Home", to: "/" },
    { label: "Work", to: "/work" },
    { label: "About", to: "/about" },
    { label: "Contact", to: "/contact" }
];

export default function Footer() {
    const { pathname } = useLocation();
    const content = FOOTER_CONTENT[pathname] || FOOTER_CONTENT["/about"];

    return (
        <footer>
            <div className="footer-container">
                <div className="footer-inner">
                    <span className="footer-logo">
                        C<span>{pathname === "/" ? "." : ""}</span>D
                    </span>

                    <p className="footer-tagline">{content.tagline}</p>

                    <nav className="footer-links" aria-label="Footer">
                        {LINKS.map((link) => (
                            <Link
                                key={link.to}
                                to={link.to}
                                className={
                                    pathname === link.to ? "active" : undefined
                                }
                                aria-current={
                                    pathname === link.to ? "page" : undefined
                                }
                            >
                                {link.label}
                            </Link>
                        ))}

                        <a
                            href="https://github.com/Cresadel"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            GitHub
                        </a>
                    </nav>
                </div>

                <div className="footer-bottom">
                    <span>© 2026 Cresadel M. Dela Cruz.</span>
                    <span>{content.note}</span>
                </div>
            </div>
        </footer>
    );
}
