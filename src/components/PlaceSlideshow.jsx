import useSlideshow from "../hooks/useSlideshow";
import SafeImage from "./SafeImage";

const PLACE_SLIDES = [
    { src: "images/place/place-1.webp", alt: "Photo of my hometown" },
    {
        src: "images/place/place-2.webp",
        alt: "Beautiful scenery from my hometown"
    },
    { src: "images/place/place-3.webp", alt: "Another view of my hometown" },
    { src: "images/place/place-4.jpg", alt: "Scenery from my home" },
    { src: "images/place/place-5.webp", alt: "Memories from my hometown" }
];

export default function PlaceSlideshow() {
    const { index, next, previous, goTo, pause, resume, autoPlay, toggleAutoPlay } = useSlideshow(
        PLACE_SLIDES.length,
        5000
    );

    const handleKey = (e) => {
        if (e.key === "ArrowLeft") previous();
        if (e.key === "ArrowRight") next();
        if (e.key === " ") toggleAutoPlay();
    };

    return (
        <div
            className="place-slider"
            onMouseEnter={pause}
            onMouseLeave={resume}
            onKeyDown={handleKey}
            tabIndex={0}
        >
            {PLACE_SLIDES.map((slide, position) => (
                <div
                    key={slide.src}
                    className={`place-slide${position === index ? " active" : ""}`}
                >
                    <SafeImage src={slide.src} alt={slide.alt} />
                </div>
            ))}

            <div className="place-overlay"></div>

            <div className="place-slider-text">
                <span>HOME</span>
                <h3>Solaton Island</h3>
                <p>Tangub City, Misamis Occidental</p>
            </div>

            <button
                className="slider-btn slider-prev"
                type="button"
                aria-label="Previous place photo"
                onClick={previous}
            >
                <i className="fa-solid fa-arrow-left" aria-hidden="true"></i>
            </button>

            <button
                className="slider-btn slider-next"
                type="button"
                aria-label="Next place photo"
                onClick={next}
            >
                <i className="fa-solid fa-arrow-right" aria-hidden="true"></i>
            </button>

            <div className="slider-dots">
                {PLACE_SLIDES.map((slide, position) => (
                    <button
                        key={slide.src}
                        className={`slider-dot${
                            position === index ? " active" : ""
                        }`}
                        type="button"
                        aria-label={`Go to place photo ${position + 1}`}
                        onClick={() => goTo(position)}
                    ></button>
                ))}
            </div>

            <div className="slide-controls">
                <button
                    className="slider-btn pause-btn"
                    aria-label={autoPlay ? "Pause slideshow" : "Resume slideshow"}
                    onClick={toggleAutoPlay}>
                    {autoPlay ? "⏸️ Pause" : "▶️ Play"}
                </button>
                <div aria-live="polite" aria-atomic="true">
                    Slide {String(index + 1)} of {PLACE_SLIDES.length}
                </div>
            </div>
        </div>
    );
}