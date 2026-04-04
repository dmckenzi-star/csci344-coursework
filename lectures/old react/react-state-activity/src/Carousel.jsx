import React, {useState} from "react";
import "./Carousel.css";


export default function Carousel({ photos }) {
//declare your state variables here
//first element in the array is the state variable
//second element is the state variable setter, which is responsible for;
// 1.  setting the vriable
// 2. redrawing the screen
const [index, setIndex] = useState(0);

  function next() {
    console.log("Next");
    if (index === photos.length - 1) {
        setIndex(0);
    } else {
        setIndex(index + 1);
    }

  }
  function previous() {
    console.log("Previous");
     if (index === 0) {
        setIndex(photos.length - 1);
    } else {
        setIndex(index - 1);
    }
  }
    return (
        <div className="carousel">
            {/* display the first image in the gallery array below */}
            <img src={ photos[index] } />
            <p> showing photo {index + 1} of {photos.length}</p>
            <button onClick={previous}>Previous</button>
            <button onClick={next}>Next</button>
        </div>
    );
}
