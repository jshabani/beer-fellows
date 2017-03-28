var beerList = [];
var beerCategoryList = [];
var beerStyleList = [];
var cartList = [];
var httpBeerRequest;
var httpStyleRequest;
var httpCategoryRequest;

// beer object constructor
function Beer() {
  this.name = "";
  this.styleId = "";
  this.styleName = "";
  this.styleDescription = "";
  this.categoryName = "";
  this.abv = "";
  this.ibu = "";
  this.isOrganic = "N/A";
  this.glassName = "N/A";
  this.foodPairings = "N/A";
  this.servingTemperature = "N/A";
  this.year = "N/A";
  this.imgLinkSmall = "img/beer-icon-small.png";
  this.imgLinkLarge = "img/beer-icon-large.png";
  this.price = 0;
  this.description = "N/A";
}

// style object constructor
function BeerStyle() {
  this.id = "";
  this.name = "";
  this.description = "";
  this.categoryId = "";
}

// cart object constructor
function CartItem(name, qty, eachPrice) {
  this.name = name;
  this.qty = qty;
  this.eachPrice = eachPrice;
}

// make api call
function makeBeerRequest(url) {
  httpBeerRequest = new XMLHttpRequest();
  if (!httpBeerRequest) {
    alert('Giving up :( Cannot create an XMLHTTP instance');
    return false;
  }
  console.log("making api call for beers");
  httpBeerRequest.onreadystatechange = makeBeerContent;
  httpBeerRequest.open('GET', url, true);
  httpBeerRequest.send();
}

// do stuff with the api call results
function makeBeerContent() {
  if (httpBeerRequest.readyState === XMLHttpRequest.DONE) {
    if (httpBeerRequest.status === 200) {
      console.log("returning api results for beers");
      var results = JSON.parse(httpBeerRequest.responseText);
      if (parseInt(results.numberOfPages) > 1) {
        makePageNavigation(results.numberOfPages);
      }
      var beersArray = results.data;
      // console.log(results.data);
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

// make beer objects from api results
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
  if (apiBeer.glass) { beer.glassName = apiBeer.glass.name; } // check if provided
  if (apiBeer.foodPairings) { beer.foodPairings = apiBeer.foodPairings; } // check if provided
  if (apiBeer.servingTemperature) { beer.servingTemperature = apiBeer.servingTemperature; } // check if provided
  if (apiBeer.year) { beer.year = apiBeer.year; } // check if provided
  if (apiBeer.labels) { // check if provided
    beer.imgLinkSmall = apiBeer.labels.icon;
    beer.imgLinkLarge = apiBeer.labels.large;
  }
  beer.price = ((Math.random() * (6 - 2 + 1)) + 2).toFixed(2); // random number between 20 and 2, with 2 decimals
  if (apiBeer.description) { beer.description = apiBeer.description; } // check if provided
  beerList.push(beer);
}

// make api call
function makeBeerCategoryRequest(url) {
  httpCategoryRequest = new XMLHttpRequest();
  if (!httpCategoryRequest) {
    alert('Giving up :( Cannot create an XMLHTTP instance');
    return false;
  }
  console.log("making api call for categories");
  httpCategoryRequest.onreadystatechange = makeBeerCategoryContent;
  httpCategoryRequest.open('GET', url, true);
  httpCategoryRequest.send();
}

// do stuff with the api call
function makeBeerCategoryContent() {
  if (httpCategoryRequest.readyState === XMLHttpRequest.DONE) {
    if (httpCategoryRequest.status === 200) {
      console.log("returning api results for categories");
      var results = JSON.parse(httpCategoryRequest.responseText);
      var categoryArray = results.data;
      console.log(results.data);
      for (var i = 0; i < categoryArray.length; i++) {
        if (categoryArray[i].name) {
          beerCategoryList.push(categoryArray[i].name);
        }
      }
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
  console.log("making api call for styles");
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
      var stylesArray = results.data;
      console.log(results.data);
      for (var i = 0; i < stylesArray.length; i++) {
        if ((stylesArray[i].name)) {
          var style = new BeerStyle();
          style.name = stylesArray[i].name;
          style.id = stylesArray[i].id;
          style.description = stylesArray[i].description;
          style.categoryName = stylesArray[i].category.name;
          beerStyleList.push(style);
        }
      }
      addBeerStylesToPage();
    } else {
      alert('There was a problem with the request.');
    }
  }
}
