/**
 * 🖼️ SafeImage – wraps an <img> with lazy loading,
 * error‑class fallback, atong BASE_URL gamit ang asset().
 * Accepts optional className, loading, ug extra props (...rest).
 */
import { asset } from "../utils/assets";

export default function SafeImage({
    src,
    alt,
    className,
    loading = "lazy",
    ...rest
}) {
    return (
        <img
            src={asset(src)}
            alt={alt}
            className={className}
            loading={loading}
            onError={(event) => {
                event.currentTarget.classList.add("image-error");
            }}
            {...rest}
        />
    );
}
