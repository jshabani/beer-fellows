var form = document.getElementById("beermatcher");
var beerStyleList = [];
var httpStyleRequest;
var cartList = ""; // this is for the subtotal in the header
var cartTotal = ""; // this is for the subtotal in the header


// THIS IS FOR THE HEADER
// check if local storages exist
if (localStorage.getItem("Cart Contents") !== null) {
  cartList = JSON.parse(localStorage.getItem("Cart Contents").split(","));
}
// check if local storage exits
var cartTotal = "";
if (localStorage.getItem("Cart Total") !== null) {
  cartTotal = JSON.parse(localStorage.getItem("Cart Total").split(","));
  var navText = document.getElementById("cart");
  // set header nav text
  if (cartTotal !== "") {
    navText.textContent = "Shopping Cart ($" + cartTotal + ")";
  }
}

function validateForm() {
  var validateElements = document.getElementsByClassName("pickChoice");
  console.log("Total number of questions: " + validateElements.length);
  var questionsAnswered = 0;

  for (i = 0; i < validateElements.length; i++){
    if (validateElements[i].value === "") {
      validateElements[i].style.backgroundColor = "rgba(255, 69, 0, .7)";
    } else {
      validateElements[i].style.backgroundColor = "white";
      questionsAnswered++;
    }
  }
  console.log("User answered " + questionsAnswered + " questions");

  // show results if form filled out completely
  if (questionsAnswered === validateElements.length) {
    var randomStyleId = Math.floor(Math.random() * 170) //there are 170 styles to choose from
    console.log("random style chosen: " + randomStyleId);
    // get api data
    makeBeerStyleRequest(randomStyleId);
    // hide button after match is made
    var button = document.getElementById("submitButton");
    button.hidden = true;
  }
}

// style object constructor
function BeerStyle() {
  this.id = "";
  this.name = "";
  this.categoryName = "";
  this.description = "";
}

function makeBeerStyleRequest(styleId) {
  httpStyleRequest = new XMLHttpRequest();
  if (!httpStyleRequest) {
    alert('Giving up :( Cannot create an XMLHTTP instance');
    return false;
  }
  console.log("making api call for styles");
  // get data for an individual style
  var url = "https://api.brewerydb.com/v2/style/" + styleId + "?key=b0ea11da6b4664a3b34cd203de153077"
  httpStyleRequest.onreadystatechange = makeBeerStyleContent;
  httpStyleRequest.open('GET', url, true);
  httpStyleRequest.send();
}

// do stuff with the api call
function makeBeerStyleContent() {
  if (httpStyleRequest.readyState === XMLHttpRequest.DONE) {
    console.log("returning api results for styles");
    if (httpStyleRequest.status === 200) {
      var results = JSON.parse(httpStyleRequest.responseText);
      console.log(results);
      var apiData = results.data;
      // make an object
      var selectedStyle = new BeerStyle();
      selectedStyle.id = apiData.id;
      selectedStyle.name = apiData.name
      selectedStyle.categoryName = apiData.category.name;
      selectedStyle.description = apiData.description;
      // store in local storage
      localStorage.setItem("Matched Beer Style", JSON.stringify(selectedStyle));
      // show on page
      document.getElementById("style-name").innerHTML = selectedStyle.name;
      document.getElementById("style-category-name").innerHTML = selectedStyle.categoryName;
      document.getElementById("style-description").innerHTML = selectedStyle.description;
      document.getElementById("results").style.display = "block";
    } else {
      alert('There was a problem with the request.');
    }
  }
}

// function Picture(source) {
//   this.src = source;
//   this.y = 0; // votes
// }
//
//
// var photo = new Array();
// photo.push(new Picture("splill.jpg"));
// photo.push(new Picture("fourcheer.jpg"));
// photo.push(new Picture("cheers.jpg"));
// photo.push(new Picture("beerthumb.jpg"));
//
//
// function showImages() {
//   var container = document.getElementById("image-container");
//   container.innerHTML="";
//   var randomIndex = Math.floor(Math.random() * photo.length);
//   var image = document.createElement("img");
//   image.src = "img/" +photo[randomIndex].src;
//   container.appendChild(image);
// }
