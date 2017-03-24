var beerList = [];
var beerStyleList = [];

function Beer(name, abv, ibu) {
  this.name = name;
  this.abv = abv;
  this.ibu = ibu;
  this.isOrganic = "N";
  this.imgLink = "";
  this.price = 0;
  this.description = "";
}

function BeerStyle(name, id) {
  this.name = name;
  this.id = id;
}

var httpBeerRequest;
var httpStyleRequest;

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

function makeBeerContent() {
  if (httpBeerRequest.readyState === XMLHttpRequest.DONE) {
    if (httpBeerRequest.status === 200) {
      var results = JSON.parse(httpBeerRequest.responseText);
      var beersArray = results.data;
      console.log(results.data);
      // loop through results
      for (var i = 0; i < beersArray.length; i++) {
        if ((beersArray[i].labels) && (beersArray[i].description)) {
          // create beer object
          var beer = new Beer();
          beer.name = beersArray[i].name;
          beer.abv = "0";
          beer.ibu = "0";
          beer.isOrganic = beersArray[i].isOrganic;
          beer.imgLink = beersArray[i].labels.medium;
          beer.price = "0";
          beer.description = beersArray[i].description;
          // add to array
          beerList.push(beer);
        }
      }
      // add beers to page
      addBeersToPage();
    } else {
      alert('There was a problem with the request.');
    }
  }
}

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

function makeBeerStyleContent() {
  if (httpStyleRequest.readyState === XMLHttpRequest.DONE) {
    if (httpStyleRequest.status === 200) {
      var results = JSON.parse(httpStyleRequest.responseText);
      var stylesArray = results.data;
      console.log(results.data);
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

function addBeersToPage() {
  var storeContainer = document.getElementById("store");
  for (var i = 0; i < beerList.length; i++) {
    var beerCard = document.createElement("div");
    beerCard.setAttribute("class", "beerStore");

    var header = document.createElement("h3");
    header.textContent = beerList[i].name;
    beerCard.appendChild(header);

    var image = document.createElement("img");
    image.setAttribute("src", beerList[i].imgLink);
    beerCard.appendChild(image);

    var beerDetails = document.createElement("div");
    beerDetails.setAttribute("class", "beerDetails");
    beerDetails.textContent = beerList[i].description;

    var beerSpecs = document.createElement("div");
    beerSpecs.setAttribute("class", "beerSpecs");
    beerSpecs.textContent = "ABV " + beerList[i].abv;
    beerSpecs.textContent += "| IBU " + beerList[i].ibu;
    beerSpecs.textContent = "| " + beerList[i].price;

    // TODO: add buy button

    beerCard.appendChild(beerDetails);
    beerCard.appendChild(beerSpecs);
    storeContainer.appendChild(beerCard);
  }
}

function addBeerStylesToPage() {
  // TODO: sort the list
  var filterList = document.getElementById("filters");
  for (var i = 0; i < beerStyleList.length; i++) {
  // for (var i = 0; i < 20; i++) {
    var listItem = document.createElement("li");
    listItem.textContent = beerStyleList[i].name;
    listItem.setAttribute("onclick", "getBeerByStyleId("+beerStyleList[i].id+")")
    filterList.appendChild(listItem);
  }
}

function getBeerByStyleId(styleId) {
  var url = "http://api.brewerydb.com/v2/beers?key=b0ea11da6b4664a3b34cd203de153077&styleId=" + styleId;
  makeBeerStyleRequest(url);
}

function loadData() {
  makeBeerRequest("http://api.brewerydb.com/v2/beers?key=b0ea11da6b4664a3b34cd203de153077&styleId=20");
  makeBeerStyleRequest("http://api.brewerydb.com/v2/styles?key=b0ea11da6b4664a3b34cd203de153077");
}

window.addEventListener("load", loadData);
