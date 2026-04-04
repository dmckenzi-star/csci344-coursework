import React from "react";
import { useState, useEffect } from "react";
import "./Carousel.css";

export default function Carousel({ gallery }) {
    const [idx, setIdx] = useState(0);
    const currentImageUrl = gallery[idx];

    // effect to reset counter each time a new gallery is set:
    useEffect(() => setIdx(0), [gallery]);

    function previous() {
        idx > 0 ? setIdx(idx - 1) : setIdx(gallery.length - 1);
    }

    function next() {
        idx < gallery.length - 1 ? setIdx(idx + 1) : setIdx(0);
    }
    return (
        <div className="carousel">
            {/* Image and Caption */}
            <img src={currentImageUrl} alt={`Photo ${idx + 1}`} />
            <p className="progress">
                Photo {idx + 1} of {gallery.length}
            </p>

            {/* Next / Previous Button */}
            <button
                aria-label="show previous image"
                className="btn btn-left"
                onClick={previous}
            >
                <i className="fa-solid fa-chevron-left"></i>
            </button>
            <button
                className="btn btn-right"
                aria-label="show next image"
                onClick={next}
            >
                <i className="fa-solid fa-chevron-right"></i>
            </button>
        </div>
    );
}
