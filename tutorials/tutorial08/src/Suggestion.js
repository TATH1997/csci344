import React from "react";

export default function Suggestion({suggestion, token}) {

    //need to add follow button
    //<button id="foll" onClick={followSwitch({suggestion.id})} aria-checked="true">follow</button>
    return(
        <section className="profile">
    <img 
        src={suggestion.thumb_url} 
        alt="profilePic" width="50" height="50"/>
        <header>
            <h2>{suggestion.username}</h2>
            <h3>Suggested for you</h3>
        </header>
        
    </section>
    );
}