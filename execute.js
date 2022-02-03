// this code will be executed when the extension's button is clicked
(function() {
  console.log("EXECUTE JS")
  
  const background = document.getElementById("only-recipe-background");
  let container = document.getElementById("only-recipe-container");

  if (!container) {
    container = document.getElementById("only-recipe-container-error");
  }

  background.style.display = "block";
  container.style.display = "block";

  // get close element
  var closeButton = document.getElementById("only-recipe-close-button");

  // close modal on click
  closeButton.onclick = function() {
    background.style.display = "none";
    container.style.display = "none";
  }

  // close modal when user clicks outside
  window.addEventListener("click", function(event) {
    if (event.target == background) {
      console.log("clicked outside");
      background.style.display = "none";
      container.style.display = "none";
    }
});

})();

