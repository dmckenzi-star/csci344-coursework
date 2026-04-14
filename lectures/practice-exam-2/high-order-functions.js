const fruitList = [
    {
        name: "apple",
        color: "red"
    },
    {
      name: "banana",
      color: "yellow"  
    },
    {
        name: "grape",
        color: "purple"
    },
    {
        name: "orange",
        color: "orange",
    },
    {
        name: "watermelon",
        color: "red"
    }
];

console.log(fruitList);

//callback function
function doSomethingToEveryItem(item) {
    console.log(`${item.name} - ${item.color}`);
}

function goodMapCallbackFunction(item) {
    return `<section style="background:${item.color}>
        item.color;`
}

// const result = fruitList.map(goodMapCallbackFunction);
// console.log(result);

// fruitList.forEach(doSomethingToEveryItem);
// console.log(result)

//write some code that filters the original array to only return fruit objects
//that are read

// function redOnly(item) {
//     item.color.toLowerCase() === "red"
 
// }

const redOnly = item => item.color.toLowerCase() === "red"





const redFruitHTML = fruitList.filter(redOnly);
console.log(redFruitHTML)


//write a function that filters the fruit by the color red builds
// a card and inserts each card into the DOM

/** 
filter by red
visit each of the red items and convert each one to an HTML representation
reach into the DOM and target the parent element and jam the children in
*/

const onlyreds = fruitList.filter(RedOnly);
const htmlsnippets = fruitList.map(toHTML);
const containerEl = document.querySelector('#fruit-container');

// htmlsnippets.forEach(item => containerEl.insertAdjacentHTML('beforeend', snip))

// containerEl.innerHTML = htmlsnippets.join("");

