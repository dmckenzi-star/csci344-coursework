import React, {useState, useEffect } from "react";
import Carousel from "./Carousel";
import Galleries from "./Galleries";
import "./App.css";

export default function App() {

    let [activeIndex, setActiveIndex] = useState(0);
    let [photos, setPhotos] = useState([]);

    async function getFlickrPhotos() {
        //extract the correct endpoint
        const url = galleries[activeIndex].endpoint;

        //go out to the internet and get the http response 
        const response = await fetch(url);

        //get the JSON data from the http response body
        const arrOfObjects = await response.json();

        const arrOfStrings = arrOfObjects.map(obj => obj.img_url);
        console.log(arrOfStrings);
        setPhotos(arrOfStrings);
    }
    //wrap any functions that have side effects in a useEffect hook
    useEffect(() => {
        getFlickrPhotos();
    }, [activeIndex]); //in the array (second argument, list variables 
                        // that when chaged should re-trigger the side effects function)



    const galleries = [
  {
    name: "Cats",
    endpoint: "https://www.apitutor.org/flickr/simple/?tags=cat"
  },
  {
    name: "Dogs",
    endpoint: "https://www.apitutor.org/flickr/simple/?tags=dog"
  },
  {
    name: "Birds",
    endpoint: "https://www.apitutor.org/flickr/simple/?tags=bird"
  },
  {
    name: "Asheville",
    endpoint: "https://www.apitutor.org/flickr/simple/?tags=Asheville"
  }
];

    return (
        <div>
            <h1>This is a Gallery of Photos</h1>
            {/* sharing state between components often involves moving the
            state variable items to the parent and then passing those items in. */}
            <Galleries 
                galleries={galleries} 
                activeIndex={activeIndex} 
                setActiveIndex={setActiveIndex} />

            <Carousel photos={photos} />
        </div>
    );
}
