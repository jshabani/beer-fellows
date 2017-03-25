
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
  var newUser= new Checkout(first, last, email, phone, address, city, state, zip, shippingAddress, shippingOption, cardNo, exp_month, exp_year);
  console.log(newUser);
}
function validateForm() {
  var x = document.forms["formUser"]["email"].value;
  var atpos = x.indexOf("@");
  var dotpos = x.lastIndexOf(".");
  if (atpos<1 || dotpos<atpos+2 || dotpos+2>=x.length) {
      alert("Not a valid e-mail address");
      return false;
  }
}
