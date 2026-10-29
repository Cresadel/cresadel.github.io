import { useState } from "react";
import FinalCTA from "../components/FinalCTA";
import JourneySlideshow from "../components/JourneySlideshow";
import PageHero from "../components/PageHero";
import PlaceSlideshow from "../components/PlaceSlideshow";
import SafeImage from "../components/SafeImage";
import SectionLabel from "../components/SectionLabel";

const FACTS = [
    {
        icon: "fa-solid fa-cake-candles",
        label: "Age",
        value: "20 years old"
    },
    {
        icon: "fa-solid fa-graduation-cap",
        label: "Current Stage",
        value: "3rd Year College"
    },
    {
        icon: "fa-solid fa-heart",
        label: "I Enjoy",
        value: "Music, Sunsets & Memories"
    },
    {
        icon: "fa-solid fa-lightbulb",
        label: "Mindset",
        value: "Learn & Keep Growing"
    }
];

const JOURNEY_ITEMS = [
    {
        number: "01",
        tag: "The Beginning",
        title: "First Year",
        paragraphs: [
            "The beginning was filled with adjustments, unfamiliar subjects, new classmates, and a lot of questions.",
            "I was still trying to understand what college was going to be like and whether I could actually keep up."
        ],
        image: "images/journey/year1.webp",
        imageAlt: "First year college memory"
    },
    {
        number: "02",
        tag: "Learning",
        title: "Second Year",
        paragraphs: [
            "By second year, things started becoming more familiar. The projects became more challenging, but I also became more comfortable trying things on my own.",
            "This was when I started getting more involved in programming, application development, and different technical projects."
        ],
        image: "images/journey/year2.webp",
        imageAlt: "Second year college memory",
        reverse: true
    },
    {
        number: "03",
        tag: "Current Chapter",
        title: "Third Year",
        paragraphs: [
            "And now, I'm here — already in my third year.",
            "There are still things I don't know, projects that challenge me, and moments when I question myself. But compared to where I started, I've learned how much progress can happen when you simply keep going.",
            "I'm still learning, still experimenting, and still figuring out what comes next."
        ],
        image: "images/journey/year3.webp",
        imageAlt: "Third year college memory",
        current: true,
        caption: "2026 · 3rd Year"
    }
];

const MEMORIES = [
    {
        image: "images/memories/memory-1.webp",
        alt: "Memory with friends",
        tag: "FRIENDS",
        title: "The people who make the journey better.",
        className: "memory-large"
    },
    {
        image: "images/memories/memory-2.webp",
        alt: "College activity",
        tag: "ACTIVITIES",
        title: "1st Runner-Up — JPEG.COM, ARSO Festival 2024–2025."
    },
    {
        image: "images/memories/memory-3.webp",
        alt: "College friends",
        tag: "FRIENDS",
        title: "RAATI moments."
    },
    {
        image: "images/memories/memory-4.webp",
        alt: "School activity",
        tag: "CAMPUS",
        title: "SINULOG FESTIVAL JAN 26, 2025."
    },
    {
        image: "images/memories/memory-5.webp",
        alt: "College memory",
        tag: "MOMENTS",
        title: "A collection of little memories.",
        className: "memory-wide"
    },
    {
        image: "images/memories/memory-6.webp",
        alt: "Personal memory",
        tag: "LIFE",
        title: "Beyond the classroom."
    },
    {
        image: "images/memories/memory-7.webp",
        alt: "Friends memory",
        tag: "DUMP",
        title: "Just because."
    }
];

const SKILLS = [
    {
        icon: "fa-solid fa-code",
        title: "Programming & Development",
        description:
            "Building logic, solving problems, and creating applications project by project.",
        chips: [
            "Programming",
            "Application Development",
            "Technical Projects"
        ]
    },
    {
        icon: "fa-solid fa-palette",
        title: "Design & Creativity",
        description:
            "Making things that look clean, feel personal, and are a pleasure to use.",
        chips: ["Web Design", "Layout & Interface"]
    },
    {
        icon: "fa-solid fa-people-group",
        title: "Working With People",
        description:
            "Learning from classmates, sharing ideas, and growing through collaboration.",
        chips: ["Collaboration", "Communication"]
    }
];

const SEMINARS = [
    {
        date: "August 24, 2026",
        tag: "IT Seminar",
        title: "Ecommerce MVP + GSSo + Analytics with Django & Nuxt",
        speaker: "Jo Renlee Luna",
        learned:
            "I learned how e-commerce applications can be developed using an MVP approach and how Django, Nuxt, and analytics can work together in building and understanding an online platform.",
        image: "images/seminars/seminar-1.webp",
        imageAlt:
            "Seminar certificate — Ecommerce MVP + GSSo + Analytics with Django and Nuxt"
    },
    {
        date: "August 28, 2026",
        tag: "IT Seminar",
        title: "You Don't Need the Perfect Dev Path",
        speaker: "Joshua J. Vincente",
        learned:
            "I learned that there is no single perfect path in becoming a developer. What matters is continuing to learn, explore, and improve along the way.",
        image: "images/seminars/seminar-2.webp",
        imageAlt:
            "Seminar certificate — You Don't Need the Perfect Dev Path"
    }
];

const GOALS = [
    {
        number: "01",
        title: "Keep learning & improving",
        description:
            "Deepening my skills in programming and development so I can build more confidently."
    },
    {
        number: "02",
        title: "Build real projects",
        description:
            "Turning ideas into things that work, and finishing what I start."
    },
    {
        number: "03",
        title: "Grow through every experience",
        description:
            "Staying curious, meeting new people, and making the most of what comes my way."
    }
];

export default function About() {
    const [seminarIndex, setSeminarIndex] = useState(0);

    return (
        <main id="main-content" tabIndex={-1}>
            <PageHero
                label="About Me"
                sublabel="/ My Story"
                title={
                    <>
                        More than <span>just a portfolio.</span>
                    </>
                }
                description="A little corner of the internet where I share where I come from, how I got here, the people and moments I've met along the way, and the person I'm becoming."
            />

            <section className="about-intro">
                <div className="section-container">
                    <div className="about-intro-grid">
                        <div className="about-intro-photo reveal">
                            <div className="intro-photo-frame">
                                <SafeImage
                                    src="images/profile.webp"
                                    alt="Portrait of Cresadel Dela Cruz"
                                    loading="eager"
                                />
                            </div>

                            <div className="intro-photo-label">
                                <span>C.D</span>
                                <span>2026</span>
                            </div>
                        </div>

                        <div className="about-intro-content reveal">
                            <SectionLabel number="01" label="A Little About Me" />

                            <h2>
                                Hi, I&apos;m <span>Cresa.</span>
                            </h2>

                            <p>
                                My name is Cresadel M. Dela Cruz, and I&apos;m a
                                college student currently navigating my third
                                year.
                            </p>

                            <p>
                                I&apos;m someone who enjoys learning, creating,
                                exploring ideas, and discovering new things
                                along the way. I don&apos;t always have
                                everything figured out, but every experience
                                teaches me something new.
                            </p>

                            <p>
                                This portfolio isn&apos;t only about the things
                                I&apos;ve built. It&apos;s also about the
                                journey behind them — the places I&apos;ve been,
                                the people I&apos;ve met, the memories I&apos;ve
                                made, and the small moments that helped shape me.
                            </p>

                            <div className="about-facts">
                                {FACTS.map((fact) => (
                                    <div className="about-fact" key={fact.label}>
                                        <i
                                            className={fact.icon}
                                            aria-hidden="true"
                                        ></i>

                                        <div>
                                            <small>{fact.label}</small>
                                            <strong>{fact.value}</strong>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section
                className="place-section"
                id="where-i-came-from"
            >
                <div className="section-container">
                    <div className="place-heading reveal">
                        <div>
                            <SectionLabel
                                number="02"
                                label="Where I Come From"
                            />

                            <h2>
                                A little piece of <span>home.</span>
                            </h2>
                        </div>

                        <p>
                            The place I grew up in is more than just a
                            location. It&apos;s part of the memories,
                            experiences, and stories that made me who I am
                            today.
                        </p>
                    </div>

                    <div className="place-layout reveal">
                        <PlaceSlideshow />

                        <div className="place-story">
                            <span className="story-number">01</span>

                            <h3>Where everything started.</h3>

                            <p>
                                I was born and raised on Solaton Island in
                                Tangub. Growing up in a place surrounded by
                                nature gave me a lot of simple but meaningful
                                memories.
                            </p>

                            <p>
                                Home reminds me that growth doesn&apos;t always
                                have to be complicated. Sometimes, it begins
                                with the smallest experiences and the people
                                around us.
                            </p>

                            <div className="place-details">
                                <div>
                                    <i
                                        className="fa-solid fa-location-dot"
                                        aria-hidden="true"
                                    ></i>
                                    <span>Solaton Island</span>
                                </div>

                                <div>
                                    <i
                                        className="fa-solid fa-map"
                                        aria-hidden="true"
                                    ></i>
                                    <span>
                                        Tangub City, Misamis Occidental
                                    </span>
                                </div>

                                <div>
                                    <i
                                        className="fa-solid fa-leaf"
                                        aria-hidden="true"
                                    ></i>
                                    <span>Northern Mindanao</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="journey-section" id="my-journey">
                <div className="section-container">
                    <div className="journey-heading reveal">
                        <div>
                            <SectionLabel number="03" label="My Journey" />

                            <h2>
                                I didn&apos;t have{" "}
                                <span>everything figured out.</span>
                            </h2>
                        </div>

                        <p>
                            My college journey has been a process of figuring
                            things out, learning from mistakes, trying new
                            things, and slowly discovering where I want to go.
                        </p>
                    </div>

                    <div className="journey-intro reveal">
                        <div className="journey-intro-number">01</div>

                        <div>
                            <h3>It started without a clear plan.</h3>

                            <p>
                                Computer Science wasn&apos;t originally the path
                                I had in mind. I came from a different
                                background and entered college without having
                                everything completely figured out.
                            </p>

                            <p>
                                But sometimes, the unexpected path becomes the
                                one that teaches us the most. Little by little,
                                I started learning, experimenting, struggling,
                                improving, and discovering what I could actually
                                do.
                            </p>
                        </div>
                    </div>

                    <div className="journey-timeline">
                        {JOURNEY_ITEMS.map((item) => (
                            <article
                                className={`journey-item${
                                    item.reverse ? " reverse" : ""
                                }${item.current ? " current" : ""} reveal`}
                                key={item.number}
                            >
                                <div className="journey-marker">
                                    <span>{item.number}</span>
                                </div>

                                <div className="journey-content">
                                    <span className="journey-tag">
                                        {item.tag}
                                    </span>

                                    <h3>{item.title}</h3>

                                    {item.paragraphs.map((paragraph) => (
                                        <p key={paragraph}>{paragraph}</p>
                                    ))}

                                    {item.current && (
                                        <div className="current-badge">
                                            <span></span>
                                            Currently here
                                        </div>
                                    )}
                                </div>

                                <div className="journey-photo">
                                    <SafeImage
                                        src={item.image}
                                        alt={item.imageAlt}
                                    />

                                    {item.caption && (
                                        <div className="photo-caption">
                                            {item.caption}
                                        </div>
                                    )}
                                </div>
                            </article>
                        ))}
                    </div>
                </div>
            </section>

            <section className="journey-gallery">
                <div className="section-container">
                    <div className="gallery-heading reveal">
                        <SectionLabel number="04" label="Along The Way" />

                        <h2>
                            Little moments from <span>the journey.</span>
                        </h2>
                    </div>

                    <JourneySlideshow />
                </div>
            </section>

            <section className="memories-section" id="memories">
                <div className="section-container">
                    <div className="memories-heading reveal">
                        <div>
                            <SectionLabel number="05" label="Memory Dump" />

                            <h2>
                                People,{" "}
                                <span>places &amp; little moments.</span>
                            </h2>
                        </div>

                        <p>
                            Not everything needs to become a project. Some
                            moments are simply worth remembering.
                        </p>
                    </div>

                    <div className="memory-grid">
                        {MEMORIES.map((memory) => (
                            <div
                                className={`memory-card${
                                    memory.className
                                        ? ` ${memory.className}`
                                        : ""
                                } reveal`}
                                key={memory.image}
                            >
                                <SafeImage
                                    src={memory.image}
                                    alt={memory.alt}
                                />

                                <div className="memory-overlay">
                                    <span>{memory.tag}</span>
                                    <h3>{memory.title}</h3>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="education-section">
                <div className="section-container">
                    <div className="education-heading reveal">
                        <div>
                            <SectionLabel number="06" label="Education" />

                            <h2>
                                Learning one <span>step at a time.</span>
                            </h2>
                        </div>

                        <p>
                            From where I started to where I am now, every year
                            has added something new to how I think, build, and
                            grow.
                        </p>
                    </div>

                    <div className="education-list">
                        <article className="education-item reveal">
                            <div className="education-period">College</div>

                            <div className="education-body">
                                <span className="education-tag">Current</span>

                                <h3>
                                    Bachelor of Science in Computer Science
                                </h3>

                                <p className="education-school">
                                    Third Year · Tangub City Global College
                                    (TCGC)
                                </p>

                                <p>
                                    Currently in my third year, learning
                                    programming, application development, and
                                    how to turn ideas into real things.
                                </p>
                            </div>
                        </article>
                    </div>
                </div>
            </section>

            <section className="skills-section">
                <div className="section-container">
                    <div className="skills-heading reveal">
                        <div>
                            <SectionLabel number="07" label="Skills" />

                            <h2>
                                What I enjoy <span>working with.</span>
                            </h2>
                        </div>

                        <p>
                            A mix of technical and personal skills I&apos;ve
                            been building through school, projects, and
                            everyday learning.
                        </p>
                    </div>

                    <div className="skills-list">
                        {SKILLS.map((skill) => (
                            <div className="skill-row reveal" key={skill.title}>
                                <div className="skill-icon">
                                    <i
                                        className={skill.icon}
                                        aria-hidden="true"
                                    ></i>
                                </div>

                                <div className="skill-info">
                                    <h3>{skill.title}</h3>
                                    <p>{skill.description}</p>
                                </div>

                                <div className="skill-chips">
                                    {skill.chips.map((chip) => (
                                        <span key={chip}>{chip}</span>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="seminars-section">
                <div className="section-container">
                    <div className="seminars-heading reveal">
                        <div>
                            <SectionLabel
                                number="08"
                                label="Seminars &amp; Learning"
                            />

                            <h2>
                                Always open <span>to learning.</span>
                            </h2>
                        </div>

                        <p>
                            Talks, seminars, and sessions that have added to
                            what I know and how I think.
                        </p>
                    </div>

                    <div className="seminar-carousel reveal">
                        {SEMINARS.map((seminar, position) => (
                            <input
                                key={seminar.title}
                                type="radio"
                                name="seminar"
                                id={`seminar-radio-${position + 1}`}
                                checked={seminarIndex === position}
                                onChange={() => setSeminarIndex(position)}
                            />
                        ))}

                        <div className="seminar-slides">
                            {SEMINARS.map((seminar) => (
                                <div
                                    className="seminar-slide"
                                    key={seminar.title}
                                >
                                    <div className="seminar-slide-image">
                                        <SafeImage
                                            src={seminar.image}
                                            alt={seminar.imageAlt}
                                        />
                                    </div>

                                    <div className="seminar-slide-content">
                                        <div className="seminar-slide-meta">
                                            <span className="seminar-slide-date">
                                                {seminar.date}
                                            </span>

                                            <span className="seminar-slide-tag">
                                                {seminar.tag}
                                            </span>
                                        </div>

                                        <h3>{seminar.title}</h3>

                                        <p className="seminar-slide-speaker">
                                            {seminar.speaker}
                                        </p>

                                        <div className="seminar-slide-learned">
                                            <strong>What I Learned</strong>
                                            <p>{seminar.learned}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="seminar-nav">
                            {SEMINARS.map((seminar, position) => (
                                <label
                                    key={seminar.title}
                                    htmlFor={`seminar-radio-${position + 1}`}
                                    aria-label={`Go to seminar ${position + 1}`}
                                ></label>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            <section className="goals-section">
                <div className="section-container">
                    <div className="goals-heading reveal">
                        <div>
                            <SectionLabel number="09" label="Goals" />

                            <h2>
                                Where I&apos;m <span>headed next.</span>
                            </h2>
                        </div>

                        <p>
                            A few directions I&apos;m working toward, one small
                            step at a time.
                        </p>
                    </div>

                    <div className="goals-list">
                        {GOALS.map((goal) => (
                            <div className="goal-item reveal" key={goal.number}>
                                <span className="goal-number">
                                    {goal.number}
                                </span>

                                <h3>{goal.title}</h3>
                                <p>{goal.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <FinalCTA
                small="Still growing."
                to="/work"
                buttonLabel="See My Work"
                buttonClassName="primary-btn"
            >
                This is only <span>the beginning.</span>
            </FinalCTA>
        </main>
    );
}
