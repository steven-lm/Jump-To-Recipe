// this code will be executed when the extension's button is clicked
(function() {
  console.log('execute.js executed');
  const background = document.getElementById("only-recipe-background");
  const wrapper = document.getElementById("only-recipe-wrapper");

  background.style.display = "block";
  wrapper.style.display = "block";
})();

