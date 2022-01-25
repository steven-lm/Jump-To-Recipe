// this code will be executed when the extension's button is clicked
(function() {
  console.log('execute.js executed');
  const background = document.getElementById("only-recipe-background");
  const container = document.getElementById("only-recipe-container");

  background.style.display = "block";
  container.style.display = "block";
})();

