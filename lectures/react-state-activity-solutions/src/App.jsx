import React, { useState } from "react";
import Carousel from "./Carousel";
import Gallery from "./Gallery";
import "./App.css";

const galleries = [
    {
        id: "nature",
        name: "Nature",
        photos: [
            "https://picsum.photos/id/164/600/430",
            "https://picsum.photos/id/116/600/430",
            "https://picsum.photos/id/182/600/430",
        ],
    },
    {
        id: "city",
        name: "City",
        photos: [
            "https://picsum.photos/id/127/600/430",
            "https://picsum.photos/id/140/600/430",
            "https://picsum.photos/id/141/600/430",
        ],
    },
    {
        id: "animals",
        name: "Animals",
        photos: [
            "https://picsum.photos/id/122/600/430",
            "https://picsum.photos/id/176/600/430",
            "https://picsum.photos/id/196/600/430",
            "https://picsum.photos/id/190/600/430",
        ],
    },
];



export default function App() {
    const [selectedGalleryId, setSelectedGalleryId] = useState(galleries[0].id);

    function getSelectedGallery(selectedGalleryId) {
        for (let i = 0; i < galleries.length; i++) {
            if (galleries[i].id === selectedGalleryId) {
                return galleries[i];
            }
        }
        return galleries[0];
    }
    const selectedGallery = getSelectedGallery(selectedGalleryId);


    return (
        <div className="app">
            <h1>{selectedGallery.name} Photo Carousel</h1>
            <Gallery
                galleries={galleries}
                selectedGalleryId={selectedGalleryId}
                onSelectGallery={setSelectedGalleryId}
            />
            <Carousel gallery={selectedGallery.photos} />
        </div>
    );
}
