

(function() {

  console.log("SCRIPT JS LOADED")
// get modal elements
var modalBackground = document.getElementById("only-recipe-background");
var modalBox = document.getElementById("only-recipe-container");


// get close element
var closeButton = document.getElementById("only-recipe-close-button");

// close modal on click
closeButton.onclick = function() {
  console.log("clickity click clik")
  modalBackground.style.display = "none";
  modalBox.style.display = "none";
}

// close modal when user clicks outside
window.addEventListener("click", function(event) {
  console.log("clickity click clik")
  if (event.target == modalBackground) {
    console.log("clicked outside");
    modalBackground.style.display = "none";
    modalBox.style.display = "none";
  }
});

})