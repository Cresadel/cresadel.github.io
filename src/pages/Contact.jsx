import PageHero from "../components/PageHero";

const CONTACT_LINKS = [
    {
        icon: "fa-solid fa-envelope",
        label: "Email",
        value: "cresadeldelacruz16@gmail.com",
        href: "mailto:cresadeldelacruz16@gmail.com"
    },
    {
        icon: "fa-solid fa-phone",
        label: "Phone",
        value: "0975 462 6486",
        href: "tel:09754626486"
    },
    {
        icon: "fa-brands fa-facebook-f",
        label: "Facebook",
        value: "Cresadel Dela Cruz",
        href: "https://www.facebook.com/cresadel.delacruz.7",
        external: true
    },
    {
        icon: "fa-brands fa-instagram",
        label: "Instagram",
        value: "@crey_saa",
        href: "https://www.instagram.com/crey_saa",
        external: true
    },
    {
        icon: "fa-brands fa-github",
        label: "GitHub",
        value: "github.com/Cresadel",
        href: "https://github.com/Cresadel",
        external: true
    }
];

export default function Contact() {
    return (
        <main id="main-content" tabIndex={-1}>
            <PageHero
                label="Contact"
                sublabel="/ Say Hello"
                title={
                    <>
                        Let&apos;s <span>connect.</span>
                    </>
                }
                description="Whether it's about a project, collaboration, school, or simply saying hi — I'd love to hear from you."
            />

            <section className="contact-section" id="contact">
                <div className="section-container">
                    <div className="contact-grid">
                        <div className="contact-info reveal">
                            <h3>Get in touch.</h3>

                            <p>
                                You can reach me through any of the platforms
                                below.
                            </p>

                            {CONTACT_LINKS.map((link) => (
                                <a
                                    key={link.label}
                                    href={link.href}
                                    className="contact-link"
                                    {...(link.external
                                        ? {
                                              target: "_blank",
                                              rel: "noopener noreferrer"
                                          }
                                        : {})}
                                >
                                    <div className="contact-icon">
                                        <i
                                            className={link.icon}
                                            aria-hidden="true"
                                        ></i>
                                    </div>

                                    <div>
                                        <small>{link.label}</small>
                                        <strong>{link.value}</strong>
                                    </div>
                                </a>
                            ))}
                        </div>

                        <div className="contact-message reveal">
                            <div className="message-box">
                                <div className="message-icon">
                                    <i
                                        className="fa-solid fa-paper-plane"
                                        aria-hidden="true"
                                    ></i>
                                </div>

                                <span>OPEN TO CONNECTIONS</span>

                                <h3>
                                    Let&apos;s create something meaningful.
                                </h3>

                                <p>
                                    I&apos;m always open to learning,
                                    collaborating, sharing ideas, and meeting
                                    people who are passionate about what they
                                    do.
                                </p>

                                <a
                                    href="mailto:cresadeldelacruz16@gmail.com"
                                    className="primary-btn"
                                >
                                    Send me an Email
                                    <i
                                        className="fa-solid fa-arrow-right"
                                        aria-hidden="true"
                                    ></i>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}
