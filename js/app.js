var beerList = [];
var beerStyleList = [];
var cartList = [];
var defaultStyleId = 93;
var currentStyleId = defaultStyleId;
var httpBeerRequest;
var httpStyleRequest;
var selectedBeer = "";

// beer object constructor
function Beer() {
  this.name = "";
  this.styleId = "";
  this.styleName = "";
  this.styleDescription = "";
  this.categoryName = "";
  this.abv = "";
  this.ibu = "";
  this.isOrganic = "";
  this.glass = "your choice";
  this.foodPairings = "more beer";
  this.imgLinkSmall = "img/beer-icon-small.png";
  this.imgLinkLarge = "img/beer-icon-large.png";
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
      console.log(JSON.parse(httpBeerRequest.responseText));
      if (parseInt(results.numberOfPages) > 1) {
        makePageNavigation(results.numberOfPages);
      }
      var beersArray = results.data;
      console.log(results.data);
      // loop through results
      for (var i = 0; i < beersArray.length; i++) {
        makeBeerObject(beersArray[i]);
      }
      // add beers to page
      addBeersToPage();
    } else {
      alert('There was a problem with the request.');
    }
  }
}

function makeBeerObject(apiBeer) {
  var beer = new Beer();
  beer.name = apiBeer.name;
  beer.styleId = apiBeer.style.id;
  beer.styleName = apiBeer.style.name;
  beer.styleDescription = apiBeer.style.description;
  beer.categoryName = apiBeer.style.category.name;
  if (apiBeer.abv) { beer.abv = apiBeer.abv; } // check if provided
  if (apiBeer.ibu) { beer.ibu = apiBeer.ibu; } // check if provided
  beer.isOrganic = apiBeer.isOrganic;
  if (apiBeer.foodPairings) { beer.glass = apiBeer.foodPairings; } // check if provided
  if (apiBeer.labels) { // check if provided
    beer.imgLinkSmall = apiBeer.labels.icon;
    beer.imgLinkLarge = apiBeer.labels.large;
  }
  beer.price = ((Math.random() * (20 - 2 + 1)) + 2).toFixed(2); // random number between 20 and 2, with 2 decimals
  if (apiBeer.description) { beer.description = apiBeer.description; } // check if provided
  beerList.push(beer);
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

function makePageNavigation(numberOfPages) {
  var pageList = document.getElementById("pageNavigation");
  while (pageList.firstChild) {
    pageList.removeChild(pageList.firstChild);
  }
  for (var i = 1; i < numberOfPages; i++) {
    var pageItem = document.createElement("li");
    pageItem.textContent = i;
    pageItem.setAttribute("onclick", "goToBeerPage(" + i + ")");
    pageList.appendChild(pageItem);
  }
}

function goToBeerPage(pageNumber) {
  var url = "http://api.brewerydb.com/v2/beers?key=b0ea11da6b4664a3b34cd203de153077&styleId=" + currentStyleId + "&p=" + pageNumber;
  removeAllBeers();
  makeBeerRequest(url);
}

function removeAllBeers() {
  beerList = [];
  var oldBeers = document.getElementById("store");
  while (oldBeers.firstChild) {
    oldBeers.removeChild(oldBeers.firstChild);
  }
}

// make the html elements
function addBeersToPage() {
  // var header = document.getElementById("style");
  // header.textContent = beerStyleList[currentStyleId].name;

  var storeContainer = document.getElementById("store");
  for (var i = 0; i < beerList.length; i++) {
    var beerCard = document.createElement("div");
    beerCard.setAttribute("class", "beer");

    var name = document.createElement("a");
    name.setAttribute("href", "beer-details.html");
    name.textContent = beerList[i].name;
    beerCard.appendChild(name);

    var image = document.createElement("img");
    image.setAttribute("class", "beerImg");
    image.setAttribute("src", beerList[i].imgLinkSmall);
    beerCard.appendChild(image);

    // var style = document.createElement("a");
    // style.setAttribute("href", "style.html");
    // style.textContent = beerList[i].styleName;
    // beerCard.appendChild(style);

    // var description = document.createElement("p");
    // description.textContent = beerList[i].description;
    // beerCard.appendChild(description);

    var abv = document.createElement("p");
    if (beerList[i].abv != 0) { abv.textContent = "ABV " + beerList[i].abv; }
    beerCard.appendChild(abv);

    var ibu = document.createElement("p");
    if (beerList[i].ibu != 0) { ibu.textContent += "IBU " + beerList[i].ibu; }
    beerCard.appendChild(ibu);

    var price = document.createElement("p");
    price.textContent += "$" + beerList[i].price;
    beerCard.appendChild(price);

    var button = document.createElement("input");
    button.setAttribute("type", "button");
    button.setAttribute("value", "Add to Cart");
    button.setAttribute("onclick", "addToCart(" + i + ")");
    beerCard.appendChild(button);

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
    listItem.setAttribute("onclick", "getBeerByStyleId(" + beerStyleList[i].id+")")
    filterList.appendChild(listItem);
  }
}

function getBeerByStyleId(styleId) {
  currentStyleId = styleId;
  removeAllBeers();
  // do the api call and update the page
  var url = "http://api.brewerydb.com/v2/beers?key=b0ea11da6b4664a3b34cd203de153077&styleId=" + styleId;
  makeBeerRequest(url);
}

function addToCart(beerNumber) {
  cartList.push(beerList[beerNumber]);
  var subTotal = 0;
  for (var i = 0; i < cartList.length; i++) {
    console.log(parseFloat(cartList[i].price));
    subTotal += parseFloat(cartList[i].price);
  }
  var cartCount = document.getElementById("cart");
  if (cartList.length === 1 ) {
    cartCount.textContent = cartList.length + " Beer in Cart ($" + subTotal.toFixed(2) + ")";
  } else {
    cartCount.textContent = cartList.length + " Beers in Cart ($" + subTotal.toFixed(2) + ")";
  }
}

// do this on page load
window.addEventListener("load", makeBeerRequest("http://api.brewerydb.com/v2/beers?key=b0ea11da6b4664a3b34cd203de153077&styleId=" + defaultStyleId));
window.addEventListener("load", makeBeerStyleRequest("http://api.brewerydb.com/v2/styles?key=b0ea11da6b4664a3b34cd203de153077"));

// <div>Icons made by <a href="http://www.flaticon.com/authors/madebyoliver" title="Madebyoliver">Madebyoliver</a> from <a href="http://www.flaticon.com" title="Flaticon">www.flaticon.com</a> is licensed by <a href="http://creativecommons.org/licenses/by/3.0/" title="Creative Commons BY 3.0" target="_blank">CC 3.0 BY</a></div>
