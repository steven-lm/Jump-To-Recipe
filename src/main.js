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

fetch(chrome.runtime.getURL('/popup.html')).then(r => r.text()).then(html => {
    document.body.insertAdjacentHTML('afterbegin', html);
    const saveContainer = document.getElementById("jump-to-recipe-saved-container");
    const saveButton = document.getElementById("jump-to-recipe-save-button");
    const page_url = window.location.href;

    const title = document.getElementById('jump-to-recipe-top-title')
    saveContainer.onclick = function() {
        saveButton.id = "jump-to-recipe-save-button-saved";
        saveButton.textContent = "Saved!";
        const imgSrc = document.getElementById('jump-to-recipe-top-image').src;
        const timeTaken = document.getElementById('jump-to-recipe-time');
        addToSaved(title.textContent, page_url, imgSrc, timeTaken.textContent);
        saveContainer.onclick = null;
    }

    chrome.storage.sync.get(["jumptorecipe_saved"], function (result) {
        let current = result.jumptorecipe_saved;
        if (!current || current.length === 0) {
          return
        } else {
          for (const item of current) {
            if(item.url === page_url) {
                saveButton.textContent = "Saved!";
                saveButton.id = "jump-to-recipe-save-button-saved";
                saveContainer.onclick = null;
            }
          }
        }
    });




}).catch(err => console.log(err));