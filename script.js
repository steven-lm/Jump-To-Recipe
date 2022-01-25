// get modal elements
var modalBackground = document.getElementById("only-recipe-background");
var modalBox = document.getElementById("only-recipe-container");


// get close element
var closeButton = document.getElementById("only-recipe-close-button");

// close modal on click
closeButton.onclick = function() {
  modalBackground.style.display = "none";
  modalBox.style.display = "none";
}

// close modal when user clicks outside
window.addEventListener("click", function(event) {
  if (event.target == modalBackground) {
    console.log("clicked outside");
    modalBackground.style.display = "none";
    modalBox.style.display = "none";
  }
});