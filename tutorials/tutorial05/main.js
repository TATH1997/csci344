// Part 1: Set up the helper functions:
// 1. Implement two filter functions (which should return either true or false):
//      * filterClassFull: to filter out the closed courses (if applicable)
//      * filterTermMatched: to only match courses relevant to the search term
// 2. Implement the dataToHTML function, which takes a course object as an
//    argument and returns an HTML string that represents the course.

// Part 2: Within the showData function, use the array's filter, map, join
//         methods, and any relevant DOM methods, to build the interface.
// 1. Use the array's built in "filter" method, which takes a filter
//    function as an argument and returns an array of objects that 
//    match the criteria.
//          * Note that you can chain filter functions together.
// 2. Use the array's built in "map" method to generate an array of 
//    HTML strings.
// 3. Join the array of strings on the empty string or new line character
//    to create one large HTML string.
// 4. Clear out the existing courses in the DOM and insert
//    the HTML string into the DOM.

const search = ev => {
    ev.preventDefault(); // overrides default button action

    // Get user's preferences:
    const searchTerm = document.querySelector('#search_term').value;
    const openOnly = document.querySelector('#is_open').checked;
    
    // Pass the user's preferences into the showData function
    showData(searchTerm, openOnly);
}

// Part 1.1a
const filterClassFull = course => {
    if(document.querySelector('#is_open').checked) {
        if(course.Classification.Open) {
            return true;
        }
            return false;
    }
    else{
        return true;
    }
}

// Part 1.1b
const filterTermMatched = course => {
    const searchTerm=document.querySelector('#search_term').value.toLowerCase();
    const instructorName=course.Instructors[0].Name.toLowerCase();
    
    //if statements for all cases we care about
    if(course.Title.toLowerCase().includes(searchTerm)) {
        return true;
    }
    else{
        return false;
    }
}

// Part 1.2
const dataToHTML = course => {
    var iClass;
    var seats;
    var open;
    if(course.Classification.Open) {
        console.log("Here");
        iClass=`fa-solid fa-circle-check`;
        seats=course.EnrollmentMax-course.EnrollmentCurrent;
        open=`open`;
    }
    else{
        iClass=`fa-solid fa-circle-xmark`;
        seats=0;
        open=`closed`;
    }
    var loc;
    if(course.Location.FullLocation!==null) {
        loc=course.Location.FullLocation;
    }
    else{
        loc=`TBD`;
    }
    var day;
    if(course.Days!==null) {
        day=course.Days;
    }
    else{
        day=`TBD`;
    }
    return `<section class="course">
                <h2>${course.Code}: ${course.Title}</h2>
                    <p>
                    <i class="${iClass}"></i>
                        ${open} &bull; ${course.CRN} &bull; Seats Available: ${seats}
                    </p>
                <p>
                    ${day} &bull;  ${loc} &bull; ${course.Hours} credit hour(s)
                </p>
                <p><strong>${course.Instructors[0].Name}</strong></p>
            </section>`;
}

// const p=course=> {
//     if(filterClassFull(course)) {
//         return "Closed";
//     }
//     else{
//         return "Open";
//     }
// }


//******Start explination of .map

// class CoolArray extends Array {
//     mapChase(functionTOApply) {
//         const copy=[];
//         for(const item of this) {
//             const result =functionTOApply(item);
//             copy.push(result);
//         }
//         return copy;
//     }

// }

// function double(num) {
//     return 2*num;
// }

// function squareNum(num) {
//     return num*num;
// }

// const test=new CoolArray(1,2,5,7,9,11,55);
// console.log(test.mapChase(double));
// console.log(test.mapChase(squareNum));

//*****End explination of .map

// Part 2
const showData = (searchTerm, openOnly) => {
    /*filter by search term
    filter by open or closed
    take matched and convert all to HTML
    join array into megaString 
    insert megaString into DOM */

    //behind seens, filter method is invoking filterTermMatched
    //function on every item in array
    const dataThatMatches=data.filter(filterTermMatched);
    console.log("List of data that matches: ", dataThatMatches);
    const onlyShowOpen= dataThatMatches.filter(filterClassFull);
    const listOfHTMLChunks=onlyShowOpen.map(dataToHTML);
    console.log("List of STR: ", listOfHTMLChunks);

    const megaString=listOfHTMLChunks.join('');

    //clear old results
    document.querySelector('.courses').innerHTML="";
    //add new results 
    document.querySelector('.courses').insertAdjacentHTML(
        'beforeend', megaString);
    
    //does the same as above, but not as readable 
    // document.querySelector('.courses').insertAdjacentHTML
    // ('beforeend', 
    // data.filter(
    //     filterTermMatched
    //     ).filterClassFull
    //     ).map(
    //         dataToHTML
    //     ).join('');
    

}