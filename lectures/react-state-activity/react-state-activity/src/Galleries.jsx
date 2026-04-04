import React from "react";

// We are passing in the state variable and the setter (controlled by the parent).
// This allows us to change the state of the active gallery so that the parent
// can know about the chane:
export default function Galleries({ galleries, activeIndex, setActiveIndex }) {
    console.log(galleries);

    return (
        <>
            {
                // function that takes a single array item as an argument
                // and returns some kind of value
                galleries.map(function (gallery, idx) {
                    return (
                        <button
                            className={
                                idx === activeIndex ? "active" : "normal"
                            }
                            onClick={() => {
                                setActiveIndex(idx);
                            }}
                        >
                            {gallery.name}
                        </button>
                    );
                })
            }
        </>
    );
}
