import React from "react";
import { getHeaders } from "./utils";
import {useState, useEffect} from "react";

export default function Suggestion({suggestion, token}) {

    var followed=false; 

    const[ actualSuggestion, setActualSuggestion] =useState(suggestion);

    async function requerySuggestion() {
        const postData={
            "user_id": suggestion.id
        };
        const response = await fetch(`/api/following/${suggestion.id}`, {
                method: "GET",
                headers: getHeaders(token)
            })
        const data = await response.json();
    setActualSuggestion(data);
    } 
    
    const followSwitch = async (sugId) => {
        async function getAndShowData2() {
            const response = await fetch("/api/following/", {
                method: "GET",
                headers: getHeaders(token)
            });
            const data = await response.json();
        }
        
        if(!followed) {
            const postData={
                "user_id": sugId
            };
            console.log(sugId);
            const response = await fetch("/api/following/", {
                    method: "POST",
                    headers: getHeaders(token),
                    body: JSON.stringify(postData)
                })
            const data = await response.json();
            console.log(data);
            followed=true;  
            requerySuggestion()
        } else {
            const postData={
                "user_id": sugId
            };
            console.log(sugId);
            const response = await fetch(`/api/following/${sugId}`, {
                    method: "DELETE",
                    headers: getHeaders(token)
                })
            const data = await response.json();
            console.log(data);
            followed=false;
            requerySuggestion();
        }
    }
    return(
        <section className="profile">
    <img 
        src={suggestion.thumb_url} 
        alt="profilePic" width="50" height="50"/>
        <header>
            <h2>{suggestion.username}</h2>
            <h3>Suggested for you</h3>
        </header>
        <button id="foll" onClick={()=>followSwitch(suggestion.id)} aria-checked="true">{followed ? "unfollow" : "follow"}</button>
    </section>
    );
}