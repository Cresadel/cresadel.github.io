import { useEffect, useRef, useState } from "react";

export default function CursorGlow() {
    const glowRef = useRef(null);
    const [enabled, setEnabled] = useState(false);

    useEffect(() => {
        if (window.matchMedia("(pointer: coarse)").matches) {
            return undefined;
        }

        setEnabled(true);

        const handleMove = (event) => {
            if (!glowRef.current) {
                return;
            }

            glowRef.current.style.left = `${event.clientX}px`;
            glowRef.current.style.top = `${event.clientY}px`;
        };

        document.addEventListener("mousemove", handleMove);

        return () => document.removeEventListener("mousemove", handleMove);
    }, []);

    if (!enabled) {
        return null;
    }

    return (
        <div
            ref={glowRef}
            className="cursor-glow"
            style={{ left: "-200px", top: "-200px" }}
            aria-hidden="true"
        />
    );
}
