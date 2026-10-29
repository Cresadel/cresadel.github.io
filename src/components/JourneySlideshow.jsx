import useSlideshow from "../hooks/useSlideshow";
import SafeImage from "./SafeImage";

const JOURNEY_SLIDES = [
    { src: "images/journey/gallery-1.webp", alt: "College journey memory" },
    { src: "images/journey/gallery-2.webp", alt: "College activity" },
    { src: "images/journey/gallery-3.webp", alt: "College memory" },
    {
        src: "images/journey/gallery-4.webp",
        alt: "College activity memory"
    },
    { src: "images/journey/gallery-5.webp", alt: "College friends memory" }
];

export default function JourneySlideshow() {
    const { index, next, previous, goTo, pause, resume, autoPlay, toggleAutoPlay } = useSlideshow(
        JOURNEY_SLIDES.length,
        5500
    );

    const handleKey = (e) => {
        if (e.key === "ArrowLeft") previous();
        if (e.key === "ArrowRight") next();
        if (e.key === " ") toggleAutoPlay();
    };

    return (
        <div
            className="journey-slider reveal"
            onMouseEnter={pause}
            onMouseLeave={resume}
            onKeyDown={handleKey}
            tabIndex={0}
        >
            {JOURNEY_SLIDES.map((slide, position) =>
                <div
                    key={slide.src}
                    className={`journey-slide${
                        position === index ? " active" : ""
                    }`}
                >
                    <SafeImage src={slide.src} alt={slide.alt} />
                </div>
            )}

            <div className="journey-slider-info">
                <span>COLLEGE DIARY</span>
                <strong>
                    {String(index + 1)} / {String(JOURNEY_SLIDES.length)}
                </strong>
            </div>

            <button
                className="slider-btn journey-prev"
                type="button"
                aria-label="Previous college photo"
                onClick={previous}
            >
                <i className="fa-solid fa-arrow-left" aria-hidden="true"></i>
            </button>

            <button
                className="slider-btn journey-next"
                type="button"
                aria-label="Next college photo"
                onClick={next}
            >
                <i className="fa-solid fa-arrow-right" aria-hidden="true"></i>
            </button>

            <div className="slide-controls">
                <button
                    className="slider-btn pause-btn"
                    aria-label={autoPlay ? "Pause slideshow" : "Resume slideshow"}
                    onClick={toggleAutoPlay}>
                    {autoPlay ? "⏸️ Pause" : "▶️ Play"}
                </button>
                <div aria-live="polite" aria-atomic="true">
                    Slide {String(index + 1)} of {JOURNEY_SLIDES.length}
                </div>
            </div>
        </div>
    );
}