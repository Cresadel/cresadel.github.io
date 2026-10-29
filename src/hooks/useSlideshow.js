import { useCallback, useEffect, useState } from "react";

function useReducedMotion() {
    const [reduced, setReduced] = useState(false);
    useEffect(() => {
        if (typeof window === "undefined") {
            return;
        }
        const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
        setReduced(mq.matches);
        mq.addEventListener("change", e => setReduced(e.matches));
        return () => mq.removeEventListener("change", e => setReduced(e.matches));
    }, []);
    return reduced;
}

export default function useSlideshow(length, interval = 5000) {
    const [index, setIndex] = useState(0);
    const [paused, setPaused] = useState(false);
    const [autoPlay, setAutoPlay] = useState(true);

    const reducedMotion = useReducedMotion();

    useEffect(() => {
        if (reducedMotion) {
            setAutoPlay(false);
        }
    }, [reducedMotion]);

    const next = useCallback(() => {
        setIndex((current) => (current + 1) % length);
    }, [length]);

    const previous = useCallback(() => {
        setIndex((current) => (current - 1 + length) % length);
    }, [length]);

    const goTo = useCallback((target) => {
        setIndex(target);
    }, []);

    const pause = useCallback(() => setPaused(true), []);
    const resume = useCallback(() => setPaused(false), []);

    useEffect(() => {
        if (!autoPlay || paused || length < 2) {
            return undefined;
        }

        const timer = setInterval(next, interval);

        return () => clearInterval(timer);
    }, [autoPlay, paused, interval, length, next]);

    const toggleAutoPlay = useCallback(() => setAutoPlay((prev) => !prev), []);

    return { index, next, previous, goTo, pause, resume, autoPlay, toggleAutoPlay };
}
