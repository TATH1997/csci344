// Maximize: shift + ⌘ + [
// Minimize: shift + ⌘ + ]

/********************/
/* Global Variables */
/********************/
const rootURL = 'https://photo-app-secured.herokuapp.com';
let token; 


/******************/
/* Your Functions */
/******************/
const showStories = async () => {
    const endpoint = `${rootURL}/api/stories`;
    const response = await fetch(endpoint, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        }
    })
    const data = await response.json();
    console.log(data);
    const htmlChunk = data.map(storyToHtml).join('');
    document.querySelector('#stories').innerHTML = htmlChunk;
}

const storyToHtml = story => {
    return `<section class="story">
        <img src="${story.user.thumb_url}" />
        <p>${story.user.username}</p>
    </section>
    `
}

const showPosts = async () => {
    // 1. go out to the internet and grab our posts
    // 2. save the resulting data to a variable
    // 3. transform the data into an HTML represention
    // 4. display it:
    const endpoint = `${rootURL}/api/posts`;
    const response = await fetch(endpoint, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        }
    })
    const data = await response.json();
    console.log('Posts:', data);

    const arrayOfHTML = data.map(postToHTML);
    const htmlString = arrayOfHTML.join('');
    document.querySelector('#posts').innerHTML = htmlString;
}
const getBookMarkButton = post => {
    if(post.current_user_bookmark_id!=null) {
        return  `
            <button onclick="unbookMarkPost(${post.current_user_bookmark_id}, ${post.id})" aria-label="Remove Bookmark">
                <i class="fa-solid fa-bookmark"></i>
            </button>
            `;
    }
    else {
        return  `
        <button onclick="bookMarkPost(${post.id})" aria-label="Bookmark Post">
            <i class="fa-regular fa-bookmark"></i>
        </button>
        `;
    }
}

const getHeartButton = post => {
    if(post.current_user_like_id!=null) {
        return  `
            <button onclick="unheartPost(${post.current_user_like_id}, ${post.id})" aria-label="Unlike post">
                <i class="fas fa-heart"></i>
            </button>
            `;
    }
    else {
        return  `
        <button onclick="heartPost(${post.id})" aria-label="Like post">
            <i class="far fa-heart"></i>
        </button>
        `;
    }
}



const requeryRedraw = async (postId) =>{
    const endpoint = `${rootURL}/api/posts/${postId}`;
    const response = await fetch(endpoint, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        }
    })
    const data = await response.json();
    const htmlString=postToHTML(data);
    targetElementAndReplace(`#post_${postId}`, htmlString)
}

const heartPost = async (postId) => {
    // define the endpoint:
    const endpoint = `${rootURL}/api/posts/likes/`;
    const postData = {
        "post_id": postId
    };

    // Create the like:
    const response = await fetch(endpoint, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        },
        body: JSON.stringify(postData)
    })
    const data = await response.json();
    console.log(data);
    requeryRedraw(postId);
}

const unheartPost = async (bookmarkId, postId) => {
    // define the endpoint:
    const endpoint = `${rootURL}/api/posts/likes/${bookmarkId}`;

    // Create the bookmark:
    const response = await fetch(endpoint, {
        method: "DELETE",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        }
    })
    const data = await response.json();
    requeryRedraw(postId);
}


const bookMarkPost = async (postId) => {
    // define the endpoint:
    const endpoint = `${rootURL}/api/bookmarks/`;
    const postData = {
        "post_id": postId
    };

    // Create the bookmark:
    const response = await fetch(endpoint, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        },
        body: JSON.stringify(postData)
    })
    const data = await response.json();
    console.log(data);
    requeryRedraw(postId);
}

const unbookMarkPost = async (bookmarkId, postId) => {
    // define the endpoint:
    const endpoint = `${rootURL}/api/bookmarks/${bookmarkId}`;

    // Create the bookmark:
    const response = await fetch(endpoint, {
        method: "DELETE",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        }
    })
    const data = await response.json();
    requeryRedraw(postId);
}

const postToHTML = post => {
    // console.log(post.comments.length);
    return `
        <section id="post_${post.id}" class="post">
            <img src="${post.image_url}" alt="Fake image" />
            <section> 
                likes: <strong>${post.likes.length} </strong>
            </section>
            ${getHeartButton(post)}
            <button class="icon-button"><i class="far fa-comment"></i></button>
            <button class="icon-button"><i class="far fa-paper-plane"></i></button>
            ${getBookMarkButton(post)}

            <p>${post.caption}</p>
            ${ showCommentAndButtonIfItMakesSense(post) }
            <input type="text" id="comm" aria-label="add Commment"> 
            <button onclick="addcomment(${post.id})">post comment</button>
        </section>
    `
}

const addcomment = async (postId) => {
    const text=document.getElementById('comm').value; 
    // define the endpoint:
    const endpoint = `${rootURL}/api/comments`;
    const postData = {
        "post_id": postId,
        "text": text
    };

    // Create the comment:
    const response = await fetch(endpoint, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        },
        body: JSON.stringify(postData)
    })
    const data = await response.json();
    console.log(data);
    requeryRedraw(postId);
}

showModal = () => {
    alert('Show Modal');
}

const showCommentAndButtonIfItMakesSense = post => {
    const hasComments = post.comments.length > 0;
    const lastCommentIndex = post.comments.length - 1;
    if (hasComments) {
        return `<div>
            <button onclick="showModal()">View all ${post.comments.length} comments</button>
            <p>${post.comments[lastCommentIndex].text}</p>
        </div>`;
    } else {
        return '';
    } 
}


const initPage = async () => {
    // set the token as a global variable 
    // (so that all of your other functions can access it):
    token = await getAccessToken(rootURL, 'webdev', 'password');
    console.log(token);
    
    // then use the access token provided to access data on the user's behalf
    showStories();
    showPosts();
    showSuggestions();

    // query for the user's profile
    // query for suggestions
}

const followSwitch = thing => {
    if(thing.getAttribute("aria-checked")) {
        alert("follow!");
    }
    else{
        alert("unfollow");
    }
    
}

/********************/
/*   Suggestions    */
/********************/

const showSuggestions = async () => {
    const endpoint = `${rootURL}/api/suggestions/`;
    const response = await fetch(endpoint, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        }
    })
    const data = await response.json();
    console.log('suggestions:', data);
    const htmlChunk=data.map(suggestionToHTML).join(' ');
    document.querySelector('.suggestions').innerHTML=htmlChunk;
}

const suggestionToHTML = suggestion=>{
    return `<section class="profile">
    <img 
        src=${suggestion.thumb_url} 
        alt="profilePic" width="50" height="50"/>
        <header>
            <h2>${suggestion.username}</h2>
            <h2>Suggested for you</h2>
        </header>
        <button onclick=followSwitch(${this}) data-id=${suggestion.id} aria-checked="true">follow</button>
    </section>`;
}


/********************/
/* Helper Functions */
/********************/

// helper function for logging into the website:
const getAccessToken = async (rootURL, username, password) => {
    const postData = {
        "username": "jacob",
        "password": "jacob_password"
    };
    const endpoint = `${rootURL}/api/token/`;
    const response = await fetch(endpoint, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(postData)
    });
    const data = await response.json();
    return data.access_token;
}

/**
 * Helper function to replace a DOM element.
 * https://developer.mozilla.org/en-US/docs/Web/API/Node/replaceChild
 * 
 *  Arguments: 
 *     1. selector: the selector you want to target (string)
 *     2. newHTML:  the HTML you want to replace
 */
const targetElementAndReplace = (selector, newHTML) => { 
	const div = document.createElement('div'); 
	div.innerHTML = newHTML;
	const newEl = div.firstElementChild; 
    const oldEl = document.querySelector(selector);
    oldEl.parentElement.replaceChild(newEl, oldEl);
}


/******************************************/
/* Invoke initPage to kick everything off */
/******************************************/
initPage();
