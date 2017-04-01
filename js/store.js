var beerList = [];
var beerCategoryList = [];
var beerStyleList = [];
var cartList = [];
var cartTotal;// = "";
var defaultStyleId = 93;
var currentStyleId = defaultStyleId;
var numberOfPages = "";
var totalResults = "";
var httpBeerRequest;
var httpStyleRequest;
var httpCategoryRequest;

function onLoad() {
  // check if localStorage exists
  if (localStorage.getItem("Cart Total") !== null) {
    cartTotal = JSON.parse(localStorage.getItem("Cart Total").split(","));
    // set header nav text
    var navText = document.getElementById("cart");
    if (cartTotal !== "") {
      navText.textContent = "Shopping Cart ($" + cartTotal + ")";
    }
  }

  // check if localStorage exists
  if (localStorage.getItem("Matched Beer Style") !== null) {
    var beerMatcherResult = JSON.parse(localStorage.getItem("Matched Beer Style").split(","));
    var currentStyleId = beerMatcherResult.id;
  } else  {
    var currentStyleId = defaultStyleId;
  }
  getBeerByStyleId(currentStyleId);
}

// beer object constructor
function Beer() {
  this.id = ""; // unique id of the beer
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
  this.imgLinkSmall = "img/beer-icon-64.png"; //"img/beer-icon-small.png";
  this.imgLinkLarge = "img/beer-icon-512.png"; //"img/beer-icon-large.png";
  this.price = 0;
  this.description = "N/A";
}

// style object constructor
function BeerStyle() {
  this.id = "";
  this.name = "";
  this.categoryId = "";
}

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
      console.log(results);
      numberOfPages = results.numberOfPages;
      totalResults = results.totalResults;
      var beersArray = results.data;
      // loop through results
      for (var i = 0; i < beersArray.length; i++) {
        makeBeerObject(beersArray[i]);
      }
      addBeersToPage();
    } else {
      alert('There was a problem with the request.');
    }
  }
}

// make beer objects from api results
function makeBeerObject(apiBeer) {
  var beer = new Beer();
  beer.id = apiBeer.id;
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
      console.log(results);
      var categoryArray = results.data;
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
      for (var i = 0; i < stylesArray.length; i++) {
        if ((stylesArray[i].name)) {
          var style = new BeerStyle();
          style.name = stylesArray[i].name;
          style.id = stylesArray[i].id;
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

function goToBeerPage(pageNumber){ //, numberOfPages, totalResults) {
  removeAllBeers();
  var url = "http://api.brewerydb.com/v2/beers?key=b0ea11da6b4664a3b34cd203de153077&styleId=" + currentStyleId + "&p=" + pageNumber;
  makeBeerRequest(url);
  //TODO: get the page count to update
}

function removeAllBeers() {
  // clear existing list
  beerList = [];
  // remove all elements
  var container = document.getElementById("store");
  while (container.firstChild) {
    container.removeChild(container.firstChild);
  }
}

function addBeersToPage() {
  var storeContainer = document.getElementById("store");

  // put style name in store header
  var styleName = document.getElementById("styleName");
  styleName.textContent = beerList[0].categoryName + " > " + beerList[0].styleName; // this will work because the list is always per style

  // put count of beers found in store header
  var count = document.getElementById("numberOfBeers");
  count.textContent = "Found " + totalResults + " Beers";

  // remove old page nav
  var pageList = document.getElementById("pageNavigation");
  while (pageList.firstChild) {
    pageList.removeChild(pageList.firstChild);
  }

  // make new page nav
  if (numberOfPages > 1) {
    for (var i = 1; i <= numberOfPages; i++) {
      var pageItem = document.createElement("li");
      pageItem.textContent = i;
      pageItem.setAttribute("onclick", "goToBeerPage(" + i + ")");
      pageList.appendChild(pageItem);
      if ((i % 30) === 0) {
        var pageBreak = document.createElement("br");
        pageList.appendChild(pageBreak);
      }
    }
  }

  // make the beer elements
  for (var i = 0; i < beerList.length; i++) {
    // console.log("I am going to add this beer to page: " + beerList[i].name);
    var beerCard = document.createElement("div");
    beerCard.setAttribute("class", "beer");
    beerCard.setAttribute("id", "beer_" + beerList[i].id);

    var name = document.createElement("h2");
    name.textContent = beerList[i].name;
    beerCard.appendChild(name);

    // var imageDiv = document.createElement("div");

    var image = document.createElement("img");
    image.setAttribute("id", "img_" + beerList[i].id);
    image.setAttribute("class", "beerImg");
    image.setAttribute("src", beerList[i].imgLinkSmall);

    // imageDiv.appendChild(image);

    beerCard.appendChild(image);

    var textDiv = document.createElement("div");
    textDiv.setAttribute("class", "beerText");

      var abv = document.createElement("p");
      if (beerList[i].abv != 0) { abv.textContent = "ABV " + beerList[i].abv; }
      textDiv.appendChild(abv);

      var ibu = document.createElement("p");
      if (beerList[i].ibu != 0) { ibu.textContent += "IBU " + beerList[i].ibu; }
      textDiv.appendChild(ibu);

      var price = document.createElement("p");
      price.textContent += "$" + beerList[i].price + " pint";
      textDiv.appendChild(price);

      var qty = document.createElement("input");
      qty.setAttribute("id", "qtyInput_" + beerList[i].id);
      qty.setAttribute("class", "quantityPicker");
      qty.setAttribute("type", "text");
      qty.setAttribute("value", "1"); // default value
      textDiv.appendChild(qty);

      var addQuantity = document.createElement("input");
      addQuantity.setAttribute("type", "button");
      addQuantity.setAttribute("class", "button");
      addQuantity.setAttribute("value", "+");
      addQuantity.setAttribute("onclick", "addToQty('" + beerList[i].id + "')");
      textDiv.appendChild(addQuantity);

      // beerCard.appendChild(document.createElement("br"));

      var cartButton = document.createElement("input");
      cartButton.setAttribute("type", "button");
      cartButton.setAttribute("class", "button");
      cartButton.setAttribute("value", "Add to Cart");
      cartButton.setAttribute("onclick", "addToCart('" + beerList[i].id + "')");
      textDiv.appendChild(cartButton);

      // beerCard.appendChild(document.createElement("br"));

      var detailsButton = document.createElement("input");
      detailsButton.setAttribute("id", "detailsButton_" + beerList[i].id);
      detailsButton.setAttribute("type", "button");
      detailsButton.setAttribute("class", "button");
      detailsButton.setAttribute("value", "Show Details");
      detailsButton.setAttribute("onclick", "viewBeerDetails('" + beerList[i].id + "')");
      textDiv.appendChild(detailsButton);

      // beerCard.appendChild(document.createElement("br"));

      var detailsContainer = document.createElement("div");
      detailsContainer.setAttribute("id", "beerDetails_" + beerList[i].id);
      detailsContainer.style.display = "none";

        var style = document.createElement("p");
        style.textContent = "Beer Style: " + beerList[i].styleName;
        detailsContainer.appendChild(style);

        var category = document.createElement("p");
        category.textContent = "Beer Category: " + beerList[i].categoryName;
        detailsContainer.appendChild(category);

        var description = document.createElement("p");
        description.textContent = "Description: " + beerList[i].description;
        detailsContainer.appendChild(description);

        var glass = document.createElement("p");
        glass.textContent = "Glass Type: " + beerList[i].glassName;
        detailsContainer.appendChild(glass);

        var description = document.createElement("p");
        description.textContent = "Food Pairings: " + beerList[i].foodPairings;
        detailsContainer.appendChild(description);

        var servingTemperature = document.createElement("p");
        servingTemperature.textContent = "Serving Temperature: " + beerList[i].servingTemperature;
        detailsContainer.appendChild(servingTemperature);

        var organic = document.createElement("p");
        organic.textContent = "Organic? " + beerList[i].isOrganic;
        detailsContainer.appendChild(organic);

        var year = document.createElement("p");
        year.textContent = "Year: " + beerList[i].year;
        detailsContainer.appendChild(year)

        textDiv.appendChild(detailsContainer);

      beerCard.appendChild(textDiv);

    storeContainer.appendChild(beerCard);
  }
}

function addBeerStylesToPage() {
  // sort the lists
  beerCategoryList.sort();
  beerStyleList.sort(function(a, b){
    var nameA = a.name.toLowerCase(), nameB = b.name.toLowerCase()
    if (nameA < nameB)
        return -1
    if (nameA > nameB)
        return 1
    return 0
  });
  // make the lists
  var filterList = document.getElementById("filters");
  var header = document.createElement("h3");
  header.textContent = "Select a Beer Style";
  filterList.appendChild(header);

  // loop through categories
  for (var i = 0; i < beerCategoryList.length; i++) {
    if (/"/.test(beerCategoryList[i]) === false) { // don't include category """"
      var categoryListItem = document.createElement("li");
      categoryListItem.setAttribute("onclick", "expandStyleList(" + i + ")");
      categoryListItem.textContent = beerCategoryList[i];
      filterList.appendChild(categoryListItem);

      // make sub-list for styles
      var stylesList = document.createElement("ul");
      stylesList.setAttribute("id", "categoryStyleList" + i);
      stylesList.setAttribute("class", "hiddenSubList");
      // loop through styles
      for (var j = 0; j < beerStyleList.length; j++) {
        if (beerStyleList[j].categoryName == beerCategoryList[i]) {
          var styleListItem = document.createElement("li");
          styleListItem.setAttribute("onclick", "getBeerByStyleId(" + beerStyleList[j].id + ")");
          styleListItem.textContent = beerStyleList[j].name;
          stylesList.appendChild(styleListItem);
        }
      }
      filterList.appendChild(stylesList);
    }
  }
}

// toggle view of sub-list
function expandStyleList(categoryNumber) {
  var listToShow = document.getElementById("categoryStyleList" + categoryNumber);
  if (listToShow.style.display === "none" || listToShow.style.display === "") {
    listToShow.style.display = "inline-block";
  } else {
    listToShow.style.display = "none";
  }
}

function getBeerByStyleId(styleId) {
  currentStyleId = styleId;
  // remove the old beers
  removeAllBeers();
  // do the api call and update the page
  var url = "http://api.brewerydb.com/v2/beers?key=b0ea11da6b4664a3b34cd203de153077&styleId=" + styleId;
  makeBeerRequest(url);
}

function viewBeerDetails(beerId) {
  // get beer object
  var beerToShow;
  for (var i = 0; i < beerList.length; i++) {
    if (beerList[i].id === beerId) {
      beerToShow = beerList[i];
      break;
    }
  }
  // get elements
  var selectedBeer = document.getElementById("beer_" + beerId); // id of the div
  var image = document.getElementById("img_" + beerId);
  var descriptionToShow = document.getElementById("beerDetails_" + beerId);
  var button = document.getElementById("detailsButton_" + beerId);
  // toggle hide or show
  if (descriptionToShow.style.display === "none") {
    selectedBeer.setAttribute("class", "selectedBeer");
    descriptionToShow.style.display = "inline";
    button.value = "Hide Details";
    image.src = beerToShow.imgLinkLarge;
  } else {
    selectedBeer.setAttribute("class", "beer");
    descriptionToShow.style.display = "none";
    button.value = "Show Details";
    image.src = beerToShow.imgLinkSmall;
  }
}

function addToCart(beerId) {
  // get beer object
  var beerToAdd = new Beer();
  for (var i = 0; i < beerList.length; i++) {
    if (beerList[i].id === beerId) {
      beerToAdd = beerList[i];
    }
  }
  // get qty from user input on page
  var userQty = parseInt(document.getElementById("qtyInput_" + beerId).value);
  // get index of beer if alreay in cart, will return -1 if not in cart
  var beerInCartIndex = cartList.findIndex(x => x.name === beerToAdd.name);
  // check if beer in cart already
  if (beerInCartIndex === -1) { //not found in car already
    // add to cart array
    cartList.push(new CartItem(beerToAdd.name, userQty,beerToAdd.price));
  } else {
    // already in cart, increase qty
    cartList[beerInCartIndex].qty = cartList[beerInCartIndex].qty + userQty;
  }
  // get new sub total
  var subTotal = 0;
  for (var i = 0; i < cartList.length; i++) {
    subTotal += parseFloat(cartList[i].qty) * parseFloat(cartList[i].eachPrice);
  }
  // update button with new sub total
  var cartCount = document.getElementById("cart");
  if (cartList.length === 1 ) {
    cartCount.textContent = "Shopping Cart ($" + subTotal.toFixed(2) + ")";
  } else {
    cartCount.textContent = "Shopping Cart ($" + subTotal.toFixed(2) + ")";
  }
  // add to local storage
  localStorage.setItem("Cart Total", subTotal.toFixed(2));
  localStorage.setItem("Cart Contents", JSON.stringify(cartList));
}

function addToQty(beerId) {
  var qtyInput = document.getElementById("qtyInput_" + beerId);
  var qty = parseInt(qtyInput.value) + 1;
  qtyInput.value = qty;
}

// do this on page load
//window.addEventListener("load", makeBeerRequest("http://api.brewerydb.com/v2/beers?key=b0ea11da6b4664a3b34cd203de153077&styleId=" + defaultStyleId));
window.addEventListener("load", makeBeerCategoryRequest("https://api.brewerydb.com/v2/categories?key=b0ea11da6b4664a3b34cd203de153077"));
window.addEventListener("load", makeBeerStyleRequest("https://api.brewerydb.com/v2/styles?key=b0ea11da6b4664a3b34cd203de153077"));
window.addEventListener("load", onLoad);
