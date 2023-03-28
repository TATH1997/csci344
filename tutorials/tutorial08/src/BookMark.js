import React from "react";
import { getHeaders } from "./utils";

export default function LikeButton({post, token, requeryPost}) {
    const bookmarkId=post.current_user_bookmark_id;
    const postId=post.id;

    async function bookmarkBool() {
        console.log(bookmarkId, postId);
        if(bookmarkId) {
            const response = await fetch(`/api/bookmarks/${bookmarkId}`, {
            method: "DELETE",
            headers: getHeaders(token)
    });
    const data = await response.json();
    //console.log(data);
    requeryPost();
        }

        else{
            const postData={
                "post_id": postId
            };
            const response = await fetch("/api/bookmarks/", {
                method: "POST",
                headers: getHeaders(token),
                body: JSON.stringify(postData)
            });
            const data = await response.json();
            //console.log(data);
            requeryPost();
         }
    }

    return(<button onClick={bookmarkBool} aria-label={bookmarkId ? "Remove Bookmark" : "Bookmark"}>{bookmarkId ? <i className="fa-solid fa-bookmark"></i>: <i className="fa-regular fa-bookmark"></i>}</button>);
}