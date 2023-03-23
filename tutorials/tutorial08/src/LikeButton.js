import React from "react";
import { getHeaders } from "./utils";

export default function LikeButton({post, token, requeryPost}) {
    //some logic 
    const likeId=post.current_user_like_id;
    const postId=post.id;

    

    async function likeUnLike() {
        console.log(likeId, postId);
        if(likeId) {
            const response = await fetch(`/api/posts/likes/${likeId}`, {
            method: "DELETE",
            headers: getHeaders(token)
    });
    const data = await response.json();
    console.log(data);
    requeryPost();
        }

        else{
            const postData={
                "post_id": postId
            };
            const response = await fetch("/api/posts/likes/", {
                method: "POST",
                headers: getHeaders(token),
                body: JSON.stringify(postData)
            });
            const data = await response.json();
            console.log(data);
            requeryPost();
         }
    }
    //return some JSX
    return(<button onClick={likeUnLike}>{likeId ? 'unlike': 'like'}</button>);
}