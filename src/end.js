function addToSaved(title, url) {
  console.log("Saving Recipe!")

  chrome.storage.sync.get(['jumptorecipe_saved'], function(result) {
      console.log('Value currently is ' + result.jumptorecipe_saved);
      let current = result.jumptorecipe_saved;
      console.log("current", current)

      if (!current || current.length === 0) {
          console.log("current NOT exists")
          const newItem = {
              title: title,
              url: url
          }

          const newList = [newItem]
          chrome.storage.sync.set({'jumptorecipe_saved': newList}, function() {
              console.log('Value is set to ' + value);
          });

      } else {
          console.log("current exists")
          const newItem = {
              title: title,
              url: url
          }

          current.push(newItem)
          chrome.storage.sync.set({jumptorecipe_saved: current}, function() {
              console.log('Value is set to ' + value);
          });
      }
  });
}

// this code will be executed before page load
(function () {
    console.log("end.js executed");
    const page_url = window.location.href;

    chrome.runtime.onMessage.addListener(function(message, sender) {
      console.log("hey")
      if (message.command == "openModal") {
        const background = document.getElementById("jump-to-recipe-background");
        let container = document.getElementById("jump-to-recipe-container");
      
        if (!container) {
          container = document.getElementById("jump-to-recipe-container-error");
        }
      
        background.style.display = "block";
        container.style.display = "block";
      
        // get close element
        var closeButton = document.getElementById("jump-to-recipe-close-button");
      
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
      } else if (message.command == "savedItemRemoved") {
        console.log("savedItemRemoved")
        if (message.url === page_url) {
          const saveContainer = document.getElementById("jump-to-recipe-saved-container");
          const saveButton = document.getElementById("jump-to-recipe-save-button-saved");      
          const title = document.getElementById('jump-to-recipe-top-title')


          saveButton.textContent = "Save";
          saveButton.id = "jump-to-recipe-save-button";
      
          saveContainer.onclick = function() {
              console.log("SAVED AGAGAN AJSLF")
              saveButton.id = "jump-to-recipe-save-button-saved";
              saveButton.textContent = "Saved!";
              addToSaved(title.textContent, page_url);
              saveContainer.onclick = null;
          }
        }

      }
    });
})();
  