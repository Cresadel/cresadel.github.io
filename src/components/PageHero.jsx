export default function PageHero({ label, sublabel, title, description }) {
    return (
        <section className="about-hero">
            <div className="section-container">
                <div className="about-hero-label reveal">
                    <span>{label}</span>
                    <span>{sublabel}</span>
                </div>

                <h1 className="about-hero-title reveal">{title}</h1>

                <p className="about-hero-description reveal">{description}</p>
            </div>
        </section>
    );
}
