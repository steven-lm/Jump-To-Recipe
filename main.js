console.log("HEYYYYYY MAIN")

const body = document.body;

// const cover = document.createElement('div');
// cover.id = 'only-recipe-cover';

// body.appendChild(cover);

function addToSaved(title, url) {
    console.log("Saving Recipe!")

    chrome.storage.sync.get(['jumptorecipe_saved'], function(result) {
        console.log('Value currently is ' + result.jumptorecipe_saved);
        let current = result.jumptorecipe_saved;
        console.log("current", current)

        if (!current || Object.keys(current).length === 0) {
            console.log("current NOT exists")
            const newItem = {
                title: title,
                url: url
            }

            const newList = [newItem]
            chrome.storage.sync.set({'jumptorecipe_saved': JSON.stringify(newList)}, function() {
                console.log('Value is set to ' + value);
            });

        } else {
            current =  JSON.parse(result.jumptorecipe_saved);
            console.log("current exists")
            const newItem = {
                title: title,
                url: url
            }

            current.push(newItem)
            chrome.storage.sync.set({jumptorecipe_saved: JSON.stringify(current)}, function() {
                console.log('Value is set to ' + value);
            });
        }
    });

}

fetch(chrome.runtime.getURL('/popup.html')).then(r => r.text()).then(html => {
    document.body.insertAdjacentHTML('afterbegin', html);
    // not using innerHTML as it would break js event listeners of the page
    

    const saveContainer = document.getElementById("only-recipe-saved-container");
    const saveButton = document.getElementById("only-recipe-save-button");
    const page_url = window.location.href;

    const title = document.getElementById('only-recipe-top-title')

    saveContainer.onclick = function() {
        console.log("SHARED BUTTON AJSLF")
        saveButton.id = "only-recipe-save-button-saved";
        saveButton.textContent = "Saved!";
        addToSaved(title.textContent, page_url);
        saveContainer.onclick = null;
    }

    chrome.storage.sync.get(["jumptorecipe_saved"], function (result) {
        console.log("Value currently is " + result.jumptorecipe_saved);
        let current = result.jumptorecipe_saved;
        console.log( current);
      
        if (!current || Object.keys(current).length === 0) {
          return
        } else {
          current = JSON.parse(result.jumptorecipe_saved);
          console.log("current exists");
      
          for (const item of current) {
            if(item.url === page_url) {
                saveButton.textContent = "Saved";
                saveButton.id = "only-recipe-save-button-saved";
                saveContainer.onclick = null;


            }
            console.log(item);
          }
        }
    });




}).catch(err => console.log(err));