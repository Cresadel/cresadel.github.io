import { Link } from "react-router-dom";

export default function FinalCTA({
    small,
    to,
    buttonLabel,
    buttonClassName = "btn btn-primary",
    children
}) {
    return (
        <section className="final-cta">
            <div className="section-container">
                <span className="cta-small">{small}</span>

                <h2>{children}</h2>

                <Link to={to} className={buttonClassName}>
                    {buttonLabel}
                    <i className="fa-solid fa-arrow-right" aria-hidden="true"></i>
                </Link>
            </div>
        </section>
    );
}
