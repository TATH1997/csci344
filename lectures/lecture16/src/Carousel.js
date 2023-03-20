import React, { useState } from "react"; 

export default function Carousel({gallery}) {
    //console.log(gallery); 
    const [index, setIndex]=useState(0);

    const currentImgURL=gallery.images[index];
    function previous() {
        (index===0) ? setIndex(gallery.images.length-1): setIndex(index-1);
    }
    function next() {
        (index===gallery.images.length-1) ? setIndex(0): setIndex(index+1);
    }

    return (
        <div className="carousel">
           <h1>{gallery.name}</h1>
           <img src={currentImgURL}/>
           <button onClick={previous}>previous</button>
           <button onClick={next}>next</button>
        </div>
    )
}