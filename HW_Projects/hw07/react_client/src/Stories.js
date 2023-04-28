import React from 'react';
import { useState, useEffect } from "react";
import {getHeaders} from './utils';
import Story from './Story'

export default function Stories({token}) {
    const [stories, setStories]=useState([]);

    useEffect(() => {
        async function fetchStories() {
            const response = await fetch('/api/stories', {
                headers: getHeaders(token)
            });
            const data = await response.json();
            setStories(data);
        }
        fetchStories();
    }, [token]);
    return(
        <div id="storiesBar">
        {
        stories.map(story => <Story key={story.id} story={story} token={token}/>)
    }</div>
    );
}