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
    //console.log('Stories:', data);
    const htmlChunk=data.map(storiesToHTML).join(' ');
    document.getElementsByClassName('storiesBar').innerHTML=htmlChunk;
}

const storiesToHTML= story => {

    return ` <section>
    <img scr="${story.thumb_url}"/><br>
    <p>${story.user.username}</p>
    </section>`;
}

const showPosts = async (token) => {
    console.log('code to show posts');
}


const initPage = async () => {
    // first log in (we will build on this after Spring Break):
    const token = await getAccessToken(rootURL, 'webdev', 'password');

    // then use the access token provided to access data on the user's behalf
    showStories(token);
    showPosts(token);
    //posts
    //suggestions
}

//Kicks off site
initPage();



