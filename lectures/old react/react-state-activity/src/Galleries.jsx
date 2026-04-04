import React, { useState} from "react";

// pass in the state variable and the setter (controlled by the parent):
export default function Galleries({ galleries, activeIndex, setActiveIndex }) {
    console.log(galleries);

    function switchGallery(idx) {
        setActiveIndex(idx);
    }

    return (
        <>
            {
                // function that takes a single array item as an argument
                // and returns some kind of value
                galleries.map(function (gallery, idx) {
                    return (
                        <button
                            onClick={() => {
                                switchGallery(idx);
                            }}
                        >
                            {gallery.name} { idx === activeIndex ? " - Active" : ""}
                        </button>
                    );
                })
            }
        </>
    );
}
