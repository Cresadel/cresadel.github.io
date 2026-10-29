import SafeImage from "./SafeImage";

export default function ProjectCard({ project }) {
    return (
        <article
            className="project-card reveal"
            data-category={project.categoryKey}
        >
            <div className="project-image">
                <SafeImage
                    src={project.image}
                    alt={project.imageAlt}
                />

                <div className="project-overlay">
                    <a
                        href={project.demoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`Open ${project.title} live demo`}
                    >
                        <i
                            className="fa-solid fa-arrow-up-right-from-square"
                            aria-hidden="true"
                        ></i>
                    </a>
                </div>

                <span className="project-number">{project.number}</span>
            </div>

            <div className="project-content">
                <div className="project-top">
                    <span>{project.category}</span>
                    <i
                        className="fa-solid fa-arrow-up-right-from-square"
                        aria-hidden="true"
                    ></i>
                </div>

                <h3>{project.title}</h3>

                <p>{project.description}</p>

                <div className="project-tags">
                    {project.tags.map((tag) => (
                        <span key={tag}>{tag}</span>
                    ))}
                </div>

                <div className="project-links">
                    <a
                        href={project.demoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="project-link-btn"
                    >
                        <i className="fa-solid fa-play" aria-hidden="true"></i>
                        Live Demo
                    </a>

                    {project.codeUrl && (
                        <a
                            href={project.codeUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="project-link-btn secondary"
                        >
                            <i
                                className="fa-brands fa-github"
                                aria-hidden="true"
                            ></i>
                            Code
                        </a>
                    )}
                </div>
            </div>
        </article>
    );
}
