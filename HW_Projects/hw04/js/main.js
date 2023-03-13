import {getAccessToken} from './utilities.js';
const rootURL = 'https://photo-app-secured.herokuapp.com';

const showStories = async (token) => {
    const endpoint = `${rootURL}/api/stories`;
    const response = await fetch(endpoint, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        }
    })
    const data = await response.json();
    console.log('Stories:', data);
    const htmlChunk=data.map(storiesToHTML).join(' ');
    console.log(htmlChunk);
    document.querySelector('.storiesBar').innerHTML=htmlChunk;
}

const storiesToHTML= story => {
    return `<section class=story>
    <img src="${story.user.thumb_url}"/>
    <p>${story.user.username}</p>
    </section>`;
}

const showPosts = async (token) => {
    const endpoint = `${rootURL}/api/posts/`;
    const response = await fetch(endpoint, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        }
    })
    const data = await response.json();
    //console.log('Posts:', data);
    const htmlChunk=data.map(postsToHTML).join(' ');
    document.querySelector('.posts').innerHTML=htmlChunk;
}

const commentToHTML = comment=>{
    return `<p>${comment.user.username}</p>
    <p>
        ${comment.text}
    </p>`;
}

const postsToHTML= post => {
    return `<section class="post">
    <header>
    <h1>${post.user.username}</h1>
        
    <button class="icon-button"><i class="fa-solid fa-bars"></i></button>
        
    </header>
    <img 
        src=${post.image_url} 
        alt="${post.alt_txt}"
        width="800" height="400" />
    <section class="social-box">
        <header>
        <div class="buttons">
        <div>
            <button class="icon-button"><i class="far fa-heart"></i></button>
            <button class="icon-button"><i class="far fa-comment"></i></button>
            <button class="icon-button"><i class="far fa-paper-plane"></i></button>
        </div>
        <div>
            <button class="icon-button"><i class="farfa-bookmark"></i></button>
        </div>
    </div>
        </header>
    </section>
    <section> 
        likes: <strong>${post.likes.length} </strong>
    </section>
    <section class="description">
        <ul> 
        ${post.user.username}
        </ul>
        <p>
        ${post.caption}  
        </p>
    </section>
    <section class="comments">
        ${showComments(post)}
    </section>
    <section class="commentBox">
        
            <i class="fa-regular fa-face-smile"></i>
            <p>Make a comment...</p> 
            <a href="url">post</a>
        
    </section>
</section>`;
}

window.showModal=(post)=>{
    var box=`<div id="myModal" class="modal">
    <div class="modal-content">
      <div class="modal-header">
        <span class="close">&times;</span>
        <h2>Modal Header</h2>
      </div>
      <div class="modal-body">
        <p>Some text in the Modal Body</p>
        <p>Some other text...</p>
      </div>
      <div class="modal-footer">
        <h3>Modal Footer</h3>
      </div>
    </div>
  </div>`;
}

const showComments = post =>{
    const hasComments=post.comments.length>0;
    if(hasComments) {
        return `<ul> 
        <button onclick="showModal()">View all ${post.comments.length} comments</button>
        <p>${post.comments[post.comments.length-1].text} </p>
        </ul>`;
    } 
    else {
    return '';
    }
}


const showSuggestions = async (token) => {
    const endpoint = `${rootURL}/api/suggestions`;
    const response = await fetch(endpoint, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        }
    })
    const data = await response.json();
    console.log('suggestions:', data);
    const htmlChunk=data.map(suggestionToHTML).join(' ');
    document.querySelector('#suggestions').innerHTML=htmlChunk;
}

const suggestionToHTML = suggestion=>{

    return `<section class="profile">
    <img 
        src=${suggestion.image_url} 
        alt="profilePic" width="50" height="50"/>
        <header>
            <h2>${suggestion.username}</h2>
            <h2>Suggested for you</h2>
        </header>
        <a href="#follow">follow</a>
    </section>`;
}

//dosent work
const showprofile = async (token) => {
    const endpoint = `${rootURL}/api/profile`;
    const response = await fetch(endpoint, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        }
    })
    const data = await response.json();
    console.log('profile:', data);
    const htmlChunk=data.map(profileToHTML).join(' ');
    document.querySelector('.profile').innerHTML=htmlChunk;
}

const profileToHTML= profile => {
    return `<img 
    src="https://picsum.photos/id/237/200/300" 
    alt="profilePic" width="80" height="80"/>
    <h1>user69</h1>`;
}


const initPage = async () => {
    // first log in (we will build on this after Spring Break):
    const token = await getAccessToken(rootURL, 'webdev', 'password');

    //console.log(token);
    // then use the access token provided to access data on the user's behalf
    showPosts(token);
    showStories(token);
    showSuggestions(token);
    //suggestions
}

//Kicks off site
initPage();



