// Your code here.
const fetchAndShowTweets = async (searchTerm, callBack) => {
    //retrieve tweets of interest..
    const url=`https://www.apitutor.org/twitter/simple/1.1/search/tweets.json?q=${searchTerm}`;    const response =await fetch(url);
    //console.log(url);
    const data= await response.json();
    //console.log(data);
    
    //...when return, invoke callback funcition
    //with return data (list of tweets) as an argument

    callBack(data);
}

const printTwitterUsers = listOfTweets => {
    listOfTweets.forEach(tweet => {
        console.log(tweet.screen_name);
    })

}

const printTwitterRetweet = listOfTweets => {
    listOfTweets.forEach(tweet => {
        console.log(tweet.retweet_count);
    })

}

fetchAndShowTweets('dogs', listOfTweets);
