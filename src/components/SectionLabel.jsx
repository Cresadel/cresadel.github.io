export default function SectionLabel({ number, label }) {
    return (
        <div className="section-label">
            <span>{number}</span>
            <span>{label}</span>
        </div>
    );
}
