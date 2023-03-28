import React from "react";
import { getHeaders } from "./utils";

export default function AddComment(post, token, requeryPost) {
    const postID=post.id;

    const addcomment = async (postId) => {
        const text=document.getElementById('comm').value;
        console.log(text);
        // define the endpoint:
        const postData = {
            "post_id": postId,
            "text": text
        };
    
        // Create the comment:
        const response = await fetch("/api/comments", {
            method: "POST",
            headers: getHeaders(token),
            body: JSON.stringify(postData)
        });
        const data = await response.json();
        //console.log(data);
        requeryPost(postId);
    }

    return(
        <div>
            <input type="text" id="comm" aria-label="add Commment"/> 
            <button onClick={()=>addcomment(post.id)}>post comment</button>
        </div>
    );
}