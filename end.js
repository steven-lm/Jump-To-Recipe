// this code will be executed before page load
(function () {
    console.log("end.js executed");
    chrome.runtime.onMessage.addListener(function(message, sender) {
      console.log("hey")
      if (message.command == "openModal") {
        const background = document.getElementById("only-recipe-background");
        let container = document.getElementById("only-recipe-container");
      
        if (!container) {
          container = document.getElementById("only-recipe-container-error");
        }
      
        background.style.display = "block";
        container.style.display = "block";
      }
    });
})();
  