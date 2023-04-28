import React from 'react';
import { useState, useEffect } from "react";
import {getHeaders} from './utils';
import Suggestion from './Suggestion';

export default function Suggestions({token}) {

    const [suggestions, setSuggestions]=useState([]);

    useEffect(() => {
        async function fetchSuggestions() {
            const response = await fetch('/api/suggestions/', {
                headers: getHeaders(token)
            });
            const data = await response.json();
            setSuggestions(data);
        }
        fetchSuggestions();
    }, [token]);

    console.log(suggestions);

    return(
        <div id="suggestions">
        {
        suggestions.map(suggestion => <Suggestion key={suggestion.id} suggestion={suggestion} token={token}/>)
    }</div>
    );
}