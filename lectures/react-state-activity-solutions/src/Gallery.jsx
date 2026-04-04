import React from "react";
import "./Gallery.css";

export default function Gallery({
    galleries,
    selectedGalleryId,
    onSelectGallery,
}) {
    return (
        <div className="gallery">
            {galleries.map((gallery) => (
                <button
                    key={gallery.id}
                    className={
                        gallery.id === selectedGalleryId ? "selected" : ""
                    }
                    onClick={() => onSelectGallery(gallery.id)}
                >
                    {gallery.name}
                </button>
            ))}
        </div>
    );
}
