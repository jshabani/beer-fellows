var form = document.getElementById("beermatcher")


function quiz(form){
  var enter = 0
  var result1 = document.getElementById("climateQuiz")
  var result2 = document.getElementById("locationQuiz")
  var result3 = document.getElementById("foodQuiz")
  var result4 = document.getElementById("colorQuiz")
  var result5 = document.getElementById("venueQuiz")
  var result6 = document.getElementById("partnerQuiz")
  if (result1.selectedIndex==0){

  }
	if (result2==0){
		alert("Question #2 was not answered");}
	if (result3==0){
		alert("Question #3 was not answered");}
  if (result4==0){
		alert("Question #1 was not answered");}
	if (result5==0){
		alert("Question #2 was not answered");}
	if (result6==0){
		alert("Question #3 was not answered");}
}
else {
  Math.floor((Math.random() * 10) + 1);
}
/*var computerChoice = Math.random();
if (computerChoice < 0.34) {
	computerChoice = "";
} else if(computerChoice <= 0.67) {
	computerChoice = "";
} else {
	computerChoice = "";
} console.log("Computer: " + computerChoice);
var compare = function(choice1, choice2) {
        if (choice1 === choice2) {
            return "";
        }
        else if (choice1 === "") {

            if (choice2 === "") {
            compare = "";
        }
            else {
            compare = "";
                }
            }
        else if (choice1 === "") {

            if (choice2 === "") {
                compare = "";
                }
            else {
                compare = "";
                }
            }
        else if (choice1 === "") {

            if (choice2 === "") {
                compare = "";
                }
            else {
                compare = "";
                }
            }
*/
function Picture(source) {
  this.src = source;
  this.y = 0; // votes
}


var photo = new Array();
pictures.push(new Picture("spill.jpg"));
pictures.push(new Picture("fourcheer.jpg"));
pictures.push(new Picture("cheers.jpg"));
pictures.push(new Picture("beerthumb.jpg"));


function showImages() {
    var container = document.getElementById("image-container");
      container.innerHTML="";
    for (var count = 1; count ; count++) {
      var randomIndex = Math.floor(Math.random() * pictures.length);
      var image = document.createElement("imgbmatch");
      image.src = "imgbmatch/" +products[randomIndex].src;
      container.appendChild(image);
  }
}

function myButton() {
  console.log("");
    document.getElementById("beermaster").submit;
    button.setAttribute("", "display:inline");

  }


function Styles() {

}



var pickResult = function (arr, count) {
  var style = [], i, pick, clone = .slice(0, .length);
  for (i = 0; i < count; i ++) {
    pick = Math.floor(Math.random() * .length);
    if (clone[pick] !== undefined) {
      out.push(clone[pick]);
      clone.splice(pick, 1);
    }
  }
  return out;
};

function myProgressbar() {

}
