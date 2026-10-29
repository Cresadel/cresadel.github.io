import FinalCTA from "../components/FinalCTA";
import PageHero from "../components/PageHero";
import ProjectCard from "../components/ProjectCard";
import SectionLabel from "../components/SectionLabel";
import { webProjects, workValues } from "../data/projects";

export default function Work() {
    return (
        <main id="main-content" tabIndex={-1}>
            <PageHero
                label="Selected Work"
                sublabel="/ 2026"
                title={
                    <>
                        Things I&apos;ve <span>created.</span>
                    </>
                }
                description="A collection of my school projects, experiments, web applications, and creative works created throughout my college journey."
            />

            <section className="memories-section" id="projects">
                <div className="section-container">
                    <div className="memories-heading reveal">
                        <div>
                            <SectionLabel
                                number="01"
                                label="Project Collection"
                            />

                            <h2>
                                A few things <span>I&apos;ve built.</span>
                            </h2>
                        </div>

                        <p>
                            Each project reflects a different part of my
                            learning journey — from programming and web
                            development to experimenting with new ideas.
                        </p>
                    </div>

                    <div className="projects-grid">
                        <div className="project-group" id="web-dev">
                            <h3 className="project-group-title">
                                Web Development
                            </h3>

                            {webProjects.map((project) => (
                                <ProjectCard
                                    key={project.title}
                                    project={project}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            <section className="values-section">
                <div className="section-container">
                    <div className="values-grid">
                        <div className="values-title reveal">
                            <SectionLabel number="02" label="What I Use" />

                            <h2>
                                Tools that help me <span>create.</span>
                            </h2>
                        </div>

                        <div className="values-list">
                            {workValues.map((value) => (
                                <div
                                    className="value-item reveal"
                                    key={value.number}
                                    id={value.id}
                                >
                                    <span>{value.number}</span>

                                    <div>
                                        <h3>{value.title}</h3>
                                        <p>{value.description}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            <FinalCTA
                small="Have an idea?"
                to="/contact"
                buttonLabel="Let's Connect"
            >
                Let&apos;s create something <span>meaningful.</span>
            </FinalCTA>
        </main>
    );
}
