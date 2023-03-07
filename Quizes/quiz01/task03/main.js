// Your Code Here:

const displayUserDetail =async(ev, name)=>{
    //console.log("I LIVE");
    //not sure how to grab the user name. If I could...

    const data=await getUserDetails(name);
    userToHTML(data)
    //That is what Id do
}

const statusToHTML=(status)=> {
    user=status.screen_name;
    content=status.text;
    button=`<button onclick="displayUserDetail(event, ${user})">more</button>`;
    return `user: ${user}<br> content: ${content}<br> ${button}<br>`;
  } 

  const getStatuses = async(term, num)=>{
    root=`https://www.apitutor.org/twitter/simple/1.1/search/tweets.json?q=${term}&count=${num}`;
    const req=await fetch(root);
    const jsonData=await req.json();
    return jsonData;
}

const displayMatchingStatuses =async(ev)=>{
    const term=document.querySelector('#term').value;
    const num=document.querySelector('#count').value;

    const jsonData=await getStatuses(term, num);

    htmlOut=jsonData.map(statusToHTML).join(' ');
    document.querySelector('#output').innerHTML=htmlOut;
}

const getUserDetails=async(username) =>{
    root=`https://www.apitutor.org/twitter/1.1/users/show.json?screen_name=${username}`;
    const req=await fetch(root);
    const jsonData=await req.json();
    return jsonData;
}

const userToHTML =(user)=>{
    img=user.image_url;
    Username=user.name;
    followers=user.followers_count;
    friends=user.friends_count;
    if(user.verified) {
      check=`<i class="fa-solid fa-circle-check"></i>`;
    }
    else{
      check=null;
    }
  
    if(check) {
      return `<img src=${img} alt="User"><br> Name:${Username}${check}<br> 
        follower count: ${followers} friend count: ${friends}<br>`;
    }
    return `<img src=${img} alt="User"><br> Name=${Username}<br> 
      follower count: ${followers}, friend count: ${friends}`;
  }