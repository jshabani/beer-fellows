var beerList = [];
var beerStyleList = [];
var defaultStyleId = 93;
var httpBeerRequest;
var httpStyleRequest;

// beer object constructor
function Beer() {
  this.name = "";
  this.styleId = "";
  this.styleName = "";
  this.abv = "";
  this.ibu = "";
  this.isOrganic = "";
  this.glass = "your choice";
  this.foodPairings = "more beer";
  this.imgLink = "pint.png";
  this.price = 0;
  this.description = "";
}

// style objecgt constructor
function BeerStyle(name, id) {
  this.name = name;
  this.id = id;
}

// make api call
function makeBeerRequest(url) {
  httpBeerRequest = new XMLHttpRequest();
  if (!httpBeerRequest) {
    alert('Giving up :( Cannot create an XMLHTTP instance');
    return false;
  }
  httpBeerRequest.onreadystatechange = makeBeerContent;
  httpBeerRequest.open('GET', url, true);
  httpBeerRequest.send();
}

// do stuff with the api call results
function makeBeerContent() {
  if (httpBeerRequest.readyState === XMLHttpRequest.DONE) {
    if (httpBeerRequest.status === 200) {
      var results = JSON.parse(httpBeerRequest.responseText);
      var beersArray = results.data;
      // console.log(results.data);
      // loop through results
      for (var i = 0; i < beersArray.length; i++) {
        // create beer object
        var beer = new Beer();
        beer.name = beersArray[i].name;
        beer.styleId = beersArray[i].style.id;
        beer.styleName = beersArray[i].style.name;
        if (beersArray[i].abv) { beer.abv = beersArray[i].abv; }
        if (beersArray[i].ibu) { beer.ibu = beersArray[i].ibu; }
        beer.isOrganic = beersArray[i].isOrganic;
        if (beersArray[i].foodPairings) { beer.glass = beersArray[i].foodPairings; }
        if (beersArray[i].labels) { beer.imgLink = beersArray[i].labels.medium; }
        beer.price = ((Math.random() * (20 - 2 + 1)) + 2).toFixed(2); // random number between 20 and 2, with 2 decimals
        if (beersArray[i].description) { beer.description = beersArray[i].description; }
        beerList.push(beer);
      }
      // add beers to page
      addBeersToPage();
    } else {
      alert('There was a problem with the request.');
    }
  }
}

// make api call
function makeBeerStyleRequest(url) {
  httpStyleRequest = new XMLHttpRequest();
  if (!httpStyleRequest) {
    alert('Giving up :( Cannot create an XMLHTTP instance');
    return false;
  }
  httpStyleRequest.onreadystatechange = makeBeerStyleContent;
  httpStyleRequest.open('GET', url, true);
  httpStyleRequest.send();
}

// do stuff with the api call
function makeBeerStyleContent() {
  if (httpStyleRequest.readyState === XMLHttpRequest.DONE) {
    if (httpStyleRequest.status === 200) {
      var results = JSON.parse(httpStyleRequest.responseText);
      var stylesArray = results.data;
      // console.log(results.data);
      for (var i = 0; i < stylesArray.length; i++) {
        if ((stylesArray[i].name)) {
          var style = new BeerStyle();
          style.name = stylesArray[i].name;
          style.id = stylesArray[i].id;
          beerStyleList.push(style);
        }
      }
      addBeerStylesToPage();
    } else {
      alert('There was a problem with the request.');
    }
  }
}

// make the html elements
function addBeersToPage() {
  var storeContainer = document.getElementById("store");
  for (var i = 0; i < beerList.length; i++) {
    var beerCard = document.createElement("div");
    beerCard.setAttribute("class", "beer");

    var image = document.createElement("img");
    image.setAttribute("class", "beerImg");
    image.setAttribute("src", beerList[i].imgLink);
    beerCard.appendChild(image);

    var name = document.createElement("h3");
    name.textContent = beerList[i].name;
    beerCard.appendChild(name);

    var style = document.createElement("h4");
    style.textContent = "Style: " + beerList[i].styleName;
    beerCard.appendChild(style);

    var description = document.createElement("p");
    description.textContent = beerList[i].description;
    beerCard.appendChild(description);

    var details = document.createElement("p");
    if (beerList[i].abv != 0) { details.textContent = "ABV " + beerList[i].abv + " | "; }
    if (beerList[i].ibu != 0) { details.textContent += "IBU " + beerList[i].ibu + " | "; }
    details.textContent += "$" + beerList[i].price + " ";
    var button = document.createElement("input");
    button.setAttribute("type", "button");
    button.setAttribute("value", "Buy");
    button.setAttribute("onclick", "addToCart()");
    details.appendChild(button);
    beerCard.appendChild(details);

    storeContainer.appendChild(beerCard);
  }
}

function addBeerStylesToPage() {
  // sort the list
  beerStyleList.sort(function(a, b){
    var nameA = a.name.toLowerCase(), nameB = b.name.toLowerCase()
    if (nameA < nameB)
        return -1
    if (nameA > nameB)
        return 1
    return 0
  });
  // add styles to the filter list
  var filterList = document.getElementById("filters");
  for (var i = 0; i < beerStyleList.length; i++) {
  // for (var i = 0; i < 20; i++) {
    var listItem = document.createElement("li");
    listItem.textContent = beerStyleList[i].name;
    // make the style clickable
    listItem.setAttribute("onclick", "getBeerByStyleId("+beerStyleList[i].id+")")
    filterList.appendChild(listItem);
  }
}

// update the page with beers of a specific style
function getBeerByStyleId(styleId) {
  // clear the current beer list
  beerList = [];
  // clear the page
  var oldBeers = document.getElementById("store");
  while (oldBeers.firstChild) {
    oldBeers.removeChild(oldBeers.firstChild);
  }
  // do the api call and update the page
  var url = "http://api.brewerydb.com/v2/beers?key=b0ea11da6b4664a3b34cd203de153077&styleId=" + styleId;
  makeBeerRequest(url);
}

function addToCart() {
  alert("added to cart!");
}


// do this on page load
window.addEventListener("load", makeBeerRequest("http://api.brewerydb.com/v2/beers?key=b0ea11da6b4664a3b34cd203de153077&styleId=" + defaultStyleId));
window.addEventListener("load", makeBeerStyleRequest("http://api.brewerydb.com/v2/styles?key=b0ea11da6b4664a3b34cd203de153077"));



// <div>Icons made by <a href="http://www.flaticon.com/authors/madebyoliver" title="Madebyoliver">Madebyoliver</a> from <a href="http://www.flaticon.com" title="Flaticon">www.flaticon.com</a> is licensed by <a href="http://creativecommons.org/licenses/by/3.0/" title="Creative Commons BY 3.0" target="_blank">CC 3.0 BY</a></div>
