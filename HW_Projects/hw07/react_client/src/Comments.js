import React from "react";
import { getHeaders } from "./utils";

export default function Commments({postId, token, requeryRedraw}) {

    const addcomment = async (postId) => {
    const text=document.getElementById('comm').value;
    // define the endpoint:
    const postData = {
        "post_id": postId,
        "text": text
    };

    // Create the comment:
    const response = await fetch("/api/posts/comments", {
        method: "POST",
        headers: getHeaders(token),
        body: JSON.stringify(postData)
    });
    const data = await response.json();
    //console.log(data);
    requeryRedraw(postId);
}

    return('');
}