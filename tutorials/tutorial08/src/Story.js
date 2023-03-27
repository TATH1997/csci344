import React from 'react';

export default function Story({story, token}) {

    return(
        <section className="story">
        <img src={story.user.thumb_url} />
        <p>{story.user.username}</p>
    </section>
    );
}