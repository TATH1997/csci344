import React from 'react';

export default function Suggestions({suggestion}) {
    <section class="profile">
    <img 
        src={suggestion.thumb_url} 
        alt="profilePic" width="50" height="50"/>
        <header>
            <h2>${suggestion.username}</h2>
            <h2>Suggested for you</h2>
        </header>
        <button id="foll" onclick="followSwitch(${suggestion.id})" aria-checked="true">follow</button>
    </section>;
}