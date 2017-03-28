var defaultStyleId = 93;
var currentStyleId = defaultStyleId;

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
  // clear existing list
  beerList = [];
  // remove beers
  var container = document.getElementById("store");
  var oldBeers = document.getElementsByClassName("beer");
  for (var i = 0; i < oldBeers.length; i++) {
    container.removeChild(oldBeers[i]);
  }
  // check if any beers with the selcted class and remove
  var oldSelectedBeers = document.getElementsByClassName("selectedBeer");
  if (oldSelectedBeers.length > 0) {
    for (var i = 0; i < oldSelectedBeers.length; i++) {
      container.removeChild(oldSelectedBeers[i]);
    }
  }
}

// make the html elements
function addBeersToPage() {
  var storeContainer = document.getElementById("store");
  for (var i = 0; i < beerList.length; i++) {
    var beerCard = document.createElement("div");
    beerCard.setAttribute("class", "beer");
    beerCard.setAttribute("id", "beer_" + i);

    var name = document.createElement("h3");
    name.textContent = beerList[i].name;
    beerCard.appendChild(name);

    var image = document.createElement("img");
    image.setAttribute("class", "beerImg");
    image.setAttribute("src", beerList[i].imgLinkSmall);
    beerCard.appendChild(image);

    var abv = document.createElement("p");
    if (beerList[i].abv != 0) { abv.textContent = "ABV " + beerList[i].abv; }
    beerCard.appendChild(abv);

    var ibu = document.createElement("p");
    if (beerList[i].ibu != 0) { ibu.textContent += "IBU " + beerList[i].ibu; }
    beerCard.appendChild(ibu);

    var price = document.createElement("p");
    price.textContent += "$" + beerList[i].price + " pint";
    beerCard.appendChild(price);

    var qty = document.createElement("input");
    qty.setAttribute("id", "qtyButton" + i);
    qty.setAttribute("class", "quantityPicker");
    qty.setAttribute("type", "text");
    beerCard.appendChild(qty);

    var addQuantity = document.createElement("input");
    addQuantity.setAttribute("type", "button");
    addQuantity.setAttribute("value", "+");
    addQuantity.setAttribute("onclick", "addToQty(" + i + ")");
    beerCard.appendChild(addQuantity);

    var cartButton = document.createElement("input");
    cartButton.setAttribute("type", "button");
    cartButton.setAttribute("value", "Add to Cart");
    cartButton.setAttribute("onclick", "addToCart(" + i + ")");
    beerCard.appendChild(cartButton);

    beerCard.appendChild(document.createElement("br"));

    var detailsButton = document.createElement("input");
    detailsButton.setAttribute("id", "detailsButton" + i);
    detailsButton.setAttribute("type", "button");
    detailsButton.setAttribute("value", "View Details");
    detailsButton.setAttribute("onclick", "viewBeerDetails(" + i + ")");
    beerCard.appendChild(detailsButton);

    beerCard.appendChild(document.createElement("br"));

    var detailsContainer = document.createElement("div");
    detailsContainer.setAttribute("id", "beerDetails" + i);
    detailsContainer.style.display = "none";

      var category = document.createElement("p");
      category.textContent = "Beer Category: " + beerList[i].categoryName;
      detailsContainer.appendChild(category);

      var style = document.createElement("p");
      style.textContent = "Beer Style: " + beerList[i].styleName;
      detailsContainer.appendChild(style);

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

    beerCard.appendChild(detailsContainer);

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
  // loop through categories
  for (var i = 0; i < beerCategoryList.length; i++) {
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

// toggle view of sub-list
function expandStyleList(categoryNumber) {
  var listToShow = document.getElementById("categoryStyleList" + categoryNumber);
  if (listToShow.style.display === "none") {
    listToShow.style.display = "inline-block";
  } else {
    listToShow.style.display = "none";
  }
}

function getBeerByStyleId(styleId) {
  currentStyleId = styleId;

  // var headerElement = document.getElementById("style");
  // var headerText = beerStyleList.indexOf({ id: styleId });
  // headerElement.textContent = headerText;

  removeAllBeers();
  // do the api call and update the page
  var url = "http://api.brewerydb.com/v2/beers?key=b0ea11da6b4664a3b34cd203de153077&styleId=" + styleId;
  makeBeerRequest(url);
}

function viewBeerDetails(beerNumber) {
  var selectedBeer = document.getElementById("beer_" + beerNumber); // id of the div
  var id = "beerDetails" + beerNumber;
  var descriptionToShow = document.getElementById("beerDetails" + beerNumber);
  var button = document.getElementById("detailsButton" + beerNumber);
  var images = selectedBeer.getElementsByTagName("img");
  if (descriptionToShow.style.display === "none") {
    selectedBeer.setAttribute("class", "selectedBeer");
    descriptionToShow.style.display = "inline";
    button.value = "Hide Details";
    images[0].src = beerList[beerNumber].imgLinkLarge;
  } else {
    selectedBeer.setAttribute("class", "beer");
    descriptionToShow.style.display = "none";
    button.value = "Show Details";
    images[0].src = beerList[beerNumber].imgLinkSmall;
  }
}

function addToCart(beerNumber) {
  cartList.push(new CartItem(beerList[beerNumber].name, "1", beerList[beerNumber].price));
  var subTotal = 0;
  for (var i = 0; i < cartList.length; i++) {
    subTotal += parseFloat(cartList[i].qty) * parseFloat(cartList[i].eachPrice);
  }
  var cartCount = document.getElementById("cart");
  if (cartList.length === 1 ) {
    // cartCount.value = cartList.length + " Beer in Cart ($" + subTotal.toFixed(2) + ")";
    cartCount.value = "Shopping Cart ($" + subTotal.toFixed(2) + ")";
  } else {
    cartCount.value = "Shopping Cart ($" + subTotal.toFixed(2) + ")";
  }
  localStorage.setItem("Cart Contents", JSON.stringify(cartList));

  var tableData = "";
  for (var i = 0 ; i < cartList.length; i++) {
    tableData += "<td>" + cartList[i].name + "</td>";
    tableData += "<td>" + cartList[i].qty + "</td>";
    tableData += "<td>$" + cartList[i].eachPrice + "</td>";
    tableData += "<td>$" + (parseFloat(cartList[i].qty) * parseFloat(cartList[i].eachPrice)) + "</td>";
  }
  tableData += "<td colspan='3'>SubTotal</td><td>" + subTotal + "</td>";
  localStorage.setItem("Cart Contents Table", tableData);
}

function addToQty(beerNumber) {
  alert("still working on this");
}

function getDataOnLoad() {
  // get beer data
  makeBeerRequest("http://api.brewerydb.com/v2/beers?key=b0ea11da6b4664a3b34cd203de153077&styleId=" + defaultStyleId);
  // get beer category data
  makeBeerCategoryRequest("http://api.brewerydb.com/v2/categories?key=b0ea11da6b4664a3b34cd203de153077");
  // get beer style data
  makeBeerStyleRequest("http://api.brewerydb.com/v2/styles?key=b0ea11da6b4664a3b34cd203de153077");
  // add beer styles to page
  addBeerStylesToPage();
  // add beers to page
  addBeersToPage();

}

// do this on page load
window.addEventListener("load", getDataOnLoad());
