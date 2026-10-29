import { Link } from "react-router-dom";
import FinalCTA from "../components/FinalCTA";
import SafeImage from "../components/SafeImage";

const STATS = [
    { number: "03", label: "Years of college journey" },
    { number: "∞", label: "Things still to learn" },
    { number: "✦", label: "Memories worth keeping" },
    { number: "01", label: "Story still being written" }
];

export default function Home() {
    return (
        <main id="main-content" tabIndex={-1}>
            <section className="hero">
                <div className="hero-background">
                    <div className="hero-orb orb-one"></div>
                    <div className="hero-orb orb-two"></div>
                    <div className="hero-grid"></div>
                </div>

                <div className="hero-container">
                    <div className="hero-content">
                        <div className="eyebrow reveal">
                            <span className="eyebrow-line"></span>
                            <span>Student • Creator • Dreamer</span>
                        </div>

                        <h1 className="hero-title reveal">
                            Hi, I&apos;m <span className="name">Cresadel.</span>
                            <br />
                            <span className="outline-text">Still learning.</span>
                            <br />
                            Still becoming.
                        </h1>

                        <p className="hero-description reveal">
                            A college student who loves learning, creating,
                            exploring ideas, and turning little sparks of
                            inspiration into something meaningful.
                        </p>

                        <div className="hero-buttons reveal">
                            <Link to="/work" className="btn btn-primary">
                                <span>Explore my work</span>
                                <i
                                    className="fa-solid fa-arrow-up-right-from-square"
                                    aria-hidden="true"
                                ></i>
                            </Link>

                            <Link to="/about" className="btn btn-outline">
                                <span>My story</span>
                                <i
                                    className="fa-solid fa-arrow-right"
                                    aria-hidden="true"
                                ></i>
                            </Link>
                        </div>

                        <div className="hero-meta reveal">
                            <div className="meta-item">
                                <span className="status-dot"></span>
                                <span>3rd Year College Student</span>
                            </div>

                            <div className="meta-divider"></div>

                            <div className="meta-item">
                                <i
                                    className="fa-regular fa-heart"
                                    aria-hidden="true"
                                ></i>
                                <span>Learning &amp; Growing</span>
                            </div>
                        </div>
                    </div>

                    <div className="hero-visual reveal">
                        <div className="orbit orbit-one">
                            <div className="orbit-text">
                                ✦ LEARN ✦ CREATE ✦ GROW ✦
                            </div>
                        </div>

                        <div className="hero-photo-wrapper">
                            <div className="photo-backdrop"></div>

                            <div className="hero-photo">
                                <SafeImage
                                    src="images/profile.webp"
                                    alt="Portrait of Cresadel M. Dela Cruz"
                                    loading="eager"
                                />
                            </div>
                        </div>

                        <div className="floating-card card-top">
                            <span className="floating-number">01</span>

                            <div>
                                <small>Currently</small>
                                <strong>Growing</strong>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="scroll-indicator">
                    <span>Scroll to explore</span>
                    <div className="scroll-line"></div>
                </div>
            </section>

            <section className="intro-section">
                <div className="section-container">
                    <div className="section-label">
                        <span>01</span>
                        <span>A little introduction</span>
                    </div>

                    <div className="intro-grid">
                        <h2>
                            More than just <span>a portfolio.</span>
                        </h2>

                        <div className="intro-text">
                            <p>
                                This is a small collection of the things I&apos;ve
                                learned, created, experienced, and the people and
                                moments that made my journey meaningful.
                            </p>

                            <Link to="/about" className="text-link">
                                Get to know me
                                <i
                                    className="fa-solid fa-arrow-right"
                                    aria-hidden="true"
                                ></i>
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            <section className="stats-section">
                <div className="section-container">
                    <div className="stats-grid">
                        {STATS.map((stat) => (
                            <div className="stat" key={stat.label}>
                                <span className="stat-number">
                                    {stat.number}
                                </span>
                                <span className="stat-label">
                                    {stat.label}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <FinalCTA
                small="Have a little look around."
                to="/about"
                buttonLabel="Discover my journey"
            >
                There&apos;s more <span>to my story.</span>
            </FinalCTA>
        </main>
    );
}
