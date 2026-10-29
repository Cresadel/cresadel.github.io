import { useCallback, useEffect, useRef, useState } from "react";

export default function Loader({
    onFinish,
    message = "Loading my little corner of the internet...",
    showDot = true
}) {
    const [hidden, setHidden] = useState(false);
    const finishedRef = useRef(false);

    const finish = useCallback(() => {
        if (finishedRef.current) {
            return;
        }

        finishedRef.current = true;
        setHidden(true);

        document.body.style.overflow = "";

        window.setTimeout(onFinish, 700);
    }, [onFinish]);

    useEffect(() => {
        document.body.style.overflow = "hidden";

        let loadTimer;
        let fallbackTimer;

        const handleLoad = () => {
            loadTimer = window.setTimeout(finish, 900);
        };

        if (document.readyState === "complete") {
            handleLoad();
        } else {
            window.addEventListener("load", handleLoad, { once: true });
        }

        fallbackTimer = window.setTimeout(finish, 3000);

        return () => {
            window.removeEventListener("load", handleLoad);
            window.clearTimeout(loadTimer);
            window.clearTimeout(fallbackTimer);
            document.body.style.overflow = "";
        };
    }, [finish]);

    return (
        <div
            className={`loader${hidden ? " hidden" : ""}`}
            id="loader"
            aria-hidden={hidden}
        >
            <div className="loader-content">
                <div className="loader-logo">
                    C<span>{showDot ? "." : ""}</span>D
                </div>

                <div className="loader-line">
                    <span></span>
                </div>

                <p>{message}</p>
            </div>
        </div>
    );
}
