function addToSaved(title, url, imgSrc, timeTaken) {
  chrome.storage.sync.get(['jumptorecipe_saved'], function(result) {
      let current = result.jumptorecipe_saved;
      const newItem = {
        title: title,
        url: url,
        imgSrc: imgSrc,
        time: timeTaken
      }

      if (!current || current.length === 0) {
        const newList = [newItem]
        chrome.storage.sync.set({'jumptorecipe_saved': newList});
      } else {
          current.push(newItem)
          chrome.storage.sync.set({jumptorecipe_saved: current});
      }
  });
}

(function () {
    const page_url = window.location.href;

    chrome.runtime.onMessage.addListener(function(message) {
      if (message.command == "openModal") {
        const background = document.getElementById("jump-to-recipe-background");
        let container = document.getElementById("jump-to-recipe-container");
      
        if (!container) {
          container = document.getElementById("jump-to-recipe-container-error");
        }
      
        background.style.display = "block";
        container.style.display = "block";
      
        var closeButton = document.getElementById("jump-to-recipe-close-button");
      
        closeButton.onclick = function() {
          background.style.display = "none";
          container.style.display = "none";
        }
      
        // close modal when user clicks outside
        window.addEventListener("click", function(event) {
          if (event.target == background) {
            background.style.display = "none";
            container.style.display = "none";
          }
        });
      } else if (message.command == "savedItemRemoved") {
        if (message.url === page_url) {
          const saveContainer = document.getElementById("jump-to-recipe-saved-container");
          const saveButton = document.getElementById("jump-to-recipe-save-button-saved");      
          const title = document.getElementById('jump-to-recipe-top-title');
          const imgSrc = document.getElementById('jump-to-recipe-top-image').src;
          const timeTaken = document.getElementById('jump-to-recipe-time');


          saveButton.textContent = "Save";
          saveButton.id = "jump-to-recipe-save-button";
      
          saveContainer.onclick = function() {
              saveButton.id = "jump-to-recipe-save-button-saved";
              saveButton.textContent = "Saved!";
              addToSaved(title.textContent, page_url, imgSrc, timeTaken.textContent);
              saveContainer.onclick = null;
          }
        }

      }
    });
})();