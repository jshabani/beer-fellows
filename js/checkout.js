var cartList=JSON.parse(localStorage.getItem("Cart Contents").split(","));

function Checkout(first, last, email, phone, address, city, state, zip, shippingAddress, shippingOption, cardNo, exp_month, exp_year) {
  this.firstName = first;
  this.lastName = last;
  this.email = email;
  this.phone = phone;
  this.address = address;
  this.city = city;
  this.state = state;
  this.zip = zip;
  this.shippingAddress = shippingAddress;
  this.shippingOption = shippingOption;
  this.cardNo = cardNo;
  this.exp_month = exp_month;
  this.exp_year = exp_year;

}

function createUser(){
  var first = document.getElementById("fname").value;
  var last = document.getElementById("lname").value;
  var email = document.getElementById("email").value;
  var phone = document.getElementById("phone").value;
  var address = document.getElementById("address").value;
  var city = document.getElementById("city").value;
  var state = document.getElementById("state").value;
  var zip = document.getElementById("zip").value;
  var shippingAddress = document.getElementById("shippingAddress").value;
  var shippingOption = document.getElementById("formUser").ship.value;
  var cardNo = document.getElementById("cardNo").value;
  var exp_month = document.getElementById("exp_month").value;
  var exp_year= document.getElementById("exp_year").value;
  var newUser = new Checkout(first, last, email, phone, address, city, state, zip, shippingAddress, shippingOption, cardNo, exp_month, exp_year);
  console.log(newUser);
  localStorage.setItem("receipt " + Date(Date.now()), JSON.stringify(newUser));
}

function validateForm() {
var validate = document.getElementsByClassName("checkout");
for(i=0; i<validate.length; i++){
  if (validate[i].value == "") {
    return false;
  }
}
createUser();
alert("Thanks you for choosing Beer Fellows. Your order will be shipped in 24 hours. Cheers!!");
}


function getCartItems(){
//table header
var table = document.getElementById("cartTable");
table.innerHTML = "";
var headerRow = document.createElement("tr");
var headerCell1 = document.createElement("th");
headerCell1.textContent=("Items");
var headerCell2 = document.createElement("th");
headerCell2.textContent=("Qty");
var headerCell3 = document.createElement("th");
headerCell3.textContent=("Price");
headerRow.appendChild(headerCell1);
headerRow.appendChild(headerCell2);
headerRow.appendChild(headerCell3);
table.appendChild(headerRow);
//table Items
for (var i = 0 ; i < cartList.length; i++) {
  var row = document.createElement("tr");
  var cell1 = document.createElement("td");
  cell1.textContent = cartList[i].name;
  row.appendChild(cell1);

  var cell2 = document.createElement("td");
  cell2.textContent = cartList[i].qty;
  row.appendChild(cell2);

  var cell3 = document.createElement("td");
  cell3.textContent = "$"+cartList[i].eachPrice;
  row.appendChild(cell3);
  table.appendChild(row);
 }
 //table subtotal
 var rowSubTotal = document.createElement("tr");
  var cellSubTotal1 = document.createElement("td");
  cellSubTotal1.textContent = "SubTotal.................";
  cellSubTotal1.setAttribute("colspan","2");
 var totalItems=0;
 for(i=0; i<cartList.length;i++){
   totalItems+= parseFloat(cartList[i].qty*cartList[i].eachPrice);
 }
 var subTotal = totalItems.toFixed(2);
 var cellSubTotal2 = document.createElement("td");
 cellSubTotal2.textContent = "$"+subTotal;
 rowSubTotal.appendChild(cellSubTotal1);
 rowSubTotal.appendChild(cellSubTotal2);
 table.appendChild(rowSubTotal);
 //table shipping
 var shippingCost = parseFloat(document.getElementById("formUser").ship.value).toFixed(2);
 var rowShipping = document.createElement("tr");
 var cellShipping1 = document.createElement("td");
 cellShipping1.textContent = "Shipping Fee...........";
 cellShipping1.setAttribute("colspan","2");
 var cellShipping2 = document.createElement("td");
 cellShipping2.textContent = "$"+shippingCost;
 rowShipping.appendChild(cellShipping1);
 rowShipping.appendChild(cellShipping2);
 table.appendChild(rowShipping);
 //table total
 var rowTotal = document.createElement("tr");
 var cellTotal1 = document.createElement("td");
 cellTotal1.textContent = "Total......................";
 cellTotal1.setAttribute("colspan","2");
 var cellTotal2 = document.createElement("td");
 cellTotal2.textContent = "$"+(parseFloat(subTotal)+parseFloat(shippingCost)).toFixed(2);
 rowTotal.appendChild(cellTotal1);
 rowTotal.appendChild(cellTotal2);
 table.appendChild(rowTotal);

}

var radioGroup = document.getElementById("formUser").ship;
for(i=0; i<radioGroup.length; i++){
  radioGroup[i].onclick = getCartItems;

}
window.addEventListener("load", getCartItems());
