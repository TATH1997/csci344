const makeBigger = () => {
   /*alert('make bigger!'); */
   document.querySelector("p").style.fontSize = "200%";
   document.querySelector("header").style.fontSize = "200%"
};

const makeSmaller = () => {
   /* alert('make smaller!'); */
   document.querySelector("p").style.fontSize = "75%";
   document.querySelector("header").style.fontSize = "75%"
};




/*
Tips:
1. First, in the index.html file, add an onclick attribute to each button.
   The value of the attribute should be a call to the corresponding function
   (see class demos).

2. Then modify the body of the "makeBigger" and 
   "makeSmaller" functions (in between the curly braces)
   to target the body element and set it's font size.
*/
