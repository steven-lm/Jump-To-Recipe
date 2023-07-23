var modalBackground = document.getElementById("only-recipe-background");
var modalBox = document.getElementById("only-recipe-container");

var closeButton = document.getElementById("only-recipe-close-button");

closeButton.onclick = function() {
  modalBackground.style.display = "none";
  modalBox.style.display = "none";
}

// close modal when user clicks outside
window.addEventListener("click", function(event) {
  if (event.target == modalBackground) {
    modalBackground.style.display = "none";
    modalBox.style.display = "none";
  }
});