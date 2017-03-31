var form = document.getElementById("beermatcher")


function quiz(form){
  var enter = 0
  var climate = document.getElementById("climateQuiz");
  var climateSelected = climate.options[climate.selectedIndex].value;
  console.log(climateSelected);
  var location = document.getElementById("locationQuiz");
  var locationSelected = location.options[location.selectedIndex].value;
  var food = document.getElementById("foodQuiz");
  var foodSelected = food.options[food.selectedIndex].value;
  var color = document.getElementById("colorQuiz");
  var colorSelected = color.options[color.selectedIndex].value;
  var bitter = document.getElementById("strengthQuiz");
  var bitterSelected = bitter.options[bitter.selectedIndex].value;
  var venue = document.getElementById("venueQuiz");
  var venueSelected = venue.options[venue.selectedIndex].value;
  var partner = document.getElementById("partnerQuiz");
  var partnerSelected = partner.options[partner.selectedIndex].value;
  var checkingQuestion = true;
  if (climate.selectedIndex === 0){
    climate.style.border="5px solid #0000ff";
    checkingQuestion= false;
  }
  if (location.selectedIndex === 0){
    location.style.border="5px solid #0000ff";
    checkingQuestion = false;
    // alert("Please answer question #2");
  }
  if (food.selectedIndex === 0){
    food.style.border="5px solid #0000ff";
    var checkingQuestion = false;
    //alert("Please answer question #3");
  }
  if (color.selectedIndex === 0){
    color.style.border="5px solid #0000ff";
    var checkingQuestion = false;
    //alert("Please answer question #4");
  }
  if (bitter.selectedIndex === 0){
    bitter.style.border="5px solid #0000ff";
    checkingQuestion = false;
    //alert("Please answer question #4");
  }
  if (venue.selectedIndex === 0){
    venue.style.border="5px solid #0000ff";
    checkingQuestion = false;
  }
  if (partner.selectedIndex === 0){
    partner.style.border="5px solid #0000ff";
    checkingQuestion = false;

  }
  return checkingQuestion;
  //else {

  //}
  //alert("Please answer question #5");
  //else {
  //   Math.floor((Math.random() * 10) + 1);
  // }
  // var computerChoice = Math.random();
  // if (computerChoice < 0.34) {
  // 	computerChoice = "";
  // } else if(computerChoice <= 0.67) {
  // 	computerChoice = "";
  // } else {
  // 	computerChoice = "";
  // } console.log("Computer: " + computerChoice);
  // var compare = function(choice1, choice2) {
  //         if (choice1 === choice2) {
  //             return "";
  //         }
  //         else if (choice1 === "") {
  //
  //             if (choice2 === "") {
  //             compare = "";
  //         }
  //             else {
  //             compare = "";
  //                 }
  //             }
  //         else if (choice1 === "") {
  //
  //             if (choice2 === "") {
  //                 compare = "";
  //                 }
  //             else {
  //                 compare = "";
  //                 }
  //             }
  //         else if (choice1 === "") {
  //
  //             if (choice2 === "") {
  //                 compare = "";
  //                 }
  //             else {
  //                 compare = "";
  //                 }
}

function Picture(source) {
  this.src = source;
  this.y = 0; // votes
}


var photo = new Array();
photo.push(new Picture("splill.jpg"));
photo.push(new Picture("fourcheer.jpg"));
photo.push(new Picture("cheers.jpg"));
photo.push(new Picture("beerthumb.jpg"));


function showImages() {
  var container = document.getElementById("image-container");
  container.innerHTML="";
  var randomIndex = Math.floor(Math.random() * photo.length);
  var image = document.createElement("img");
  image.src = "imgbmatch/" +photo[randomIndex].src;
  container.appendChild(image);
}


function myButton(e) {

  document.getElementById("beermaster");
  if(quiz()) {
    styleRandomizer();
    showImages();
  }
  //Styles();

}

var beerStyleList = [];
var httpStyleRequest;

// style object constructor
function BeerStyle() {
  this.id = "";
  this.name = "";
  this.description = "";
  this.categoryId = "";
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
      //Randomizes the descriptions of the styles
      var j = Math.floor(Math.random() * beerStyleList.length);
      var obj = beerStyleList[j];
      console.log(obj);
      var styleName = document.getElementById("style-name");
      styleName.innerHTML = obj.name;
      var styleInformation = document.getElementById("style-description");
      styleInformation.innerHTML = obj.description;
      //styleName.addEventListener("onclick", false);
      //styleInformation.addEventListener("onclick", false);
    } else {
      alert('There was a problem with the request.');
    }
  }
}


function Styles() {
}

function styleRandomizer (){
  makeBeerStyleRequest("http://api.brewerydb.com/v2/styles?key=b0ea11da6b4664a3b34cd203de153077");
  console.log(beerStyleList);
  //var

  //  obj.description =
  //  var styleDescription = document.getElementById("")
}


// var pickResult = function (arr, count) {
//   var style = [], i, pick, clone = .slice(0, .length);
//   for (i = 0; i < count; i ++) {
//     pick = Math.floor(Math.random() * .length);
//     if (clone[pick] !== undefined) {
//       out.push(clone[pick]);
//       clone.splice(pick, 1);
//     }
//   }
//   return out;
// };
//
// function myProgressbar() {
//
// }
window.addEventListener("onclick", makeBeerStyleContent);
window.addEventListener("onclick", styleRandomizer);
