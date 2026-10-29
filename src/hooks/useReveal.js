import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function useReveal(ready) {
    const location = useLocation();

    useEffect(() => {
        if (!ready) {
            return undefined;
        }

        const elements = Array.from(document.querySelectorAll(".reveal"));

        if (!elements.length) {
            return undefined;
        }

        if (!("IntersectionObserver" in window)) {
            elements.forEach((element) => element.classList.add("show"));
            return undefined;
        }

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("show");
                        observer.unobserve(entry.target);
                    }
                });
            },
            {
                threshold: 0.12,
                rootMargin: "0px 0px -50px 0px"
            }
        );

        const timers = [];

        elements.forEach((element) => {
            if (element.closest(".hero")) {
                return;
            }

            observer.observe(element);
        });

        elements
            .filter((element) => element.closest(".hero"))
            .forEach((element, index) => {
                timers.push(
                    setTimeout(() => {
                        element.classList.add("show");
                    }, 150 + index * 120)
                );
            });

        return () => {
            observer.disconnect();
            timers.forEach(clearTimeout);
        };
    }, [ready, location.pathname, location.key]);
}
