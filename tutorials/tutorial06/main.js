//1) figure out what was selected/typed
//2) Build URL string 
//3) Send request off to server
//4) Process and display data by looping through results 
const showResults= async (ev) => {
    //Step 1
    const term=document.querySelector('#term').value;
    const type=document.querySelector('#resource_type').value;

    // spotify doc https://developer.spotify.com/documentation/web-api/reference/#/operations/search
    //query looks like: 
    //https://www.apitutor.org/spotify/simple/v1/search?q
    //before ? is the root, after is additional: =beyonce&type=album

    //step 2
    const rootURL=`https://www.apitutor.org/spotify/simple/v1/search?q`;
    const endpoint=`${rootURL}=${term}&type=${type}`;

    //step 3
    const req=await fetch(endpoint);
    const jsonData=await req.json();
    console.log(jsonData); 
    //look at how data comes back using console.log

    //step 4
    var  htmlOut;
    switch(type) {
        case "track": 
            htmlOut=jsonData.map(trackToHTML).join(' ');
            document.querySelector('#results').innerHTML=htmlOut;
            break;
        case "album":
            htmlOut=jsonData.map(albumToHTML).join(' ');
            document.querySelector('#results').innerHTML=htmlOut;
            break;
        case "artist": 
        htmlOut=jsonData.map(artistToHTML).join(' ');
        document.querySelector('#results').innerHTML=htmlOut;
        break;
    }
    }

const trackToHTML = track =>{
    return `
        <section class="track">
                <img src="${track.album.image_url}" />
                <h2>${track.name}</h2>
                <p>${track.preview_url}</p>
            </section>
            `
}

const artistToHTML = artist => {
        return `
            <section class="artist">
                    <img src="${artist.image_url}" />
                    <h2>${artist.name}</h2>
                </section>
                `
}

const albumToHTML = album => {
    return `
        <section class="album">
                <img src="${album.image_url}" />
                <h2>${album.name}</h2>
                <p>${album.spotify_url}</p>
            </section>
            `
}
