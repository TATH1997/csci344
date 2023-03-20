/**
 * Shows users the available galleries and lets them select 
 */

import React from "react";

export default function Galleries({galleries, setGalleryIndex}) {
    

    function chooseGallery() {
        console.log("New gall");
        setGalleryIndex(1);
    }

    return (
        <section>
            <h2>Galleries</h2>
            {
                galleries.map(gallery=>{
                    return (<button onClick={chooseGallery}>{gallery.name}</button>);
                })
            }
        </section>
    );
}