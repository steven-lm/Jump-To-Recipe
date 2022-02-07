function addToSaved(title, url, imgSrc) {
  console.log("Saving Recipe!")

  chrome.storage.sync.get(['jumptorecipe_saved'], function(result) {
      console.log('Value currently is ' + result.jumptorecipe_saved);
      let current = result.jumptorecipe_saved;
      console.log("current", current)

      if (!current || current.length === 0) {
          console.log("current NOT exists")
          const newItem = {
              title: title,
              url: url,
              imgSrc: imgSrc
          }

          const newList = [newItem]
          chrome.storage.sync.set({'jumptorecipe_saved': newList}, function() {
              console.log('Value is set to ' + value);
          });

      } else {
          console.log("current exists")
          const newItem = {
              title: title,
              url: url,
              imgSrc: imgSrc
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
        console.log("message received")
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
      } else if (message.command == "savedItemRemoved") {
        console.log("savedItemRemoved")
        if (message.url === page_url) {
          const saveContainer = document.getElementById("only-recipe-saved-container");
          const saveButton = document.getElementById("only-recipe-save-button-saved");      
          const title = document.getElementById('only-recipe-top-title')
          const imgSrc = document.getElementById('only-recipe-top-image').src

          saveButton.textContent = "Save";
          saveButton.id = "only-recipe-save-button";
      
          saveContainer.onclick = function() {
              console.log("SAVED AGAGAN AJSLF")
              saveButton.id = "only-recipe-save-button-saved";
              saveButton.textContent = "Saved!";
              addToSaved(title.textContent, page_url, imgSrc);
              saveContainer.onclick = null;
          }
        }

      }
    });
})();
  