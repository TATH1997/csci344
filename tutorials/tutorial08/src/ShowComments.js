import React from "react";

export default function ShowComments({post, requeryPost, token}) {

    const hasComments = post.comments.length > 0;
    const lastCommentIndex = post.comments.length - 1
    const postID=post.id;


    if (hasComments) {
        //need to add button 
        //some code: <button onClick="showModal(${post.id})">View all {post.comments.length} comments</button>
        return (<div>
            
            <p><b>{post.comments[lastCommentIndex].user.username}: </b>{post.comments[lastCommentIndex].text}</p>
        </div>);
    } else {
        return '';
    } 
}