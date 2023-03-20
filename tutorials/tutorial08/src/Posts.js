import React from 'react';
import {useState, useEffect} from "react";
import { getHeaders } from './utils';

export default function Posts({token}) { 
    const [posts, setPosts]=useState([]);

    useEffect(() => {
        async function fetchPosts() {
            const response = await fetch('/api/posts', {
                headers: getHeaders(token)
            });
            const data = await response.json();
            setPosts(data)
        }
        fetchPosts();
    }, [token]);

    if(posts.length===0) {
        return <div id="posts"></div>
    }
   
    return (
        posts.map(post => {
            return (
                <section key={post.id}>
                    <img src={post.image_url}/>
                    <div className="card">{post.caption}</div>
                </section>
            )
        })
    );     
}