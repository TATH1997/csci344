const defaultTheme = ev => {
    document.querySelector("body").style.backgroundColor="white";
    document.querySelector("h1").style.color="#555"
    document.querySelector("header").style.backgroundColor="#F2F2F2";
    document.querySelector("p").style.color="#666"
    document.querySelector("nav").style.backgroundColor="white";
};

const oceanTheme = ev => {
    document.querySelector("body").style.backgroundColor="lightBlue";
    document.querySelector("h1").style.color="white"
    document.querySelector("header").style.backgroundColor="Navy";
    document.querySelector("p").style.color="#666"
    document.querySelector("nav").style.backgroundColor="Navy";
};  

const desertTheme = ev => {
   document.querySelector("body").style.backgroundColor="tan";
   document.querySelector("h1").style.color="#555"
   document.querySelector("header").style.backgroundColor="AntiqueWhite";
   document.querySelector("nav").style.backgroundColor="AntiqueWhite";
};

const highContrastTheme = ev => {
    document.querySelector("header").style.backgroundColor="Black";
    document.querySelector("h1").style.color="white"
    document.querySelector("nav").style.backgroundColor="Black";
    document.querySelector("body").style.backgroundColor="Black";
    document.querySelector("p").style.color="white"
}; 

/*
    Hints: 
    1. Attach the event handlers (functions) above to the click event
       of each of the four buttons (#default, #ocean, #desert, 
        and #high-contrast) in index.html.
    2. Then, modify the  body of each function so that it
       sets the className property of the body tag based on 
       the button that was clicked.
*/