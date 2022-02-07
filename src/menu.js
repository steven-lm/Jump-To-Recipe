

// function openModal() {
//   console.log("Sending");
//   chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
//     var activeTab = tabs[0];
//     chrome.tabs.sendMessage(activeTab.id, { command: "openModal" });
//   });
// }

// document.getElementById("clickme").addEventListener("click", openModal);

chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
  var activeTab = tabs[0];
  chrome.storage.local.get(["jumptorecipe_norecipe"], function (result) {
    let norecipe_urls = result.jumptorecipe_norecipe;

    if (norecipe_urls && norecipe_urls.length > 0) {
      console.log("norecipe_urls", norecipe_urls);

      for (const url of norecipe_urls) {
        console.log("url", url);
        console.log("ACTIVE TAB", activeTab.url);
        if (url === activeTab.url) {
          // console.log("SITE NOT FRICKIN SUPORTWED")
          document.getElementById("no-recipe").classList.remove("hidden");
    
        }
      }
    }
  });
});

const savedNotExist = document.getElementsByClassName("saved-not-exist")[0];
const savedContainer = document.getElementsByClassName("saved-container")[0];

const binSvg = document.getElementById("bin_svg");


chrome.storage.sync.get(["jumptorecipe_saved"], function (result) {
  console.log("Value currently is " + result.jumptorecipe_saved);
  let current = result.jumptorecipe_saved;
  console.log( current);

  function deleteSavedItem(title, url, element) {
    console.log("fetus deletus")

    let newSavedItems = current;

    for (const item of newSavedItems) {
      if (item.title === title && item.url === url) {
        newSavedItems.splice(newSavedItems.indexOf(item), 1);

        chrome.storage.sync.set({'jumptorecipe_saved': newSavedItems}, function() {
          console.log('Updated saved recipes');
      });
      }
    }

    element.remove()

    if (newSavedItems.length == 0) {
      savedNotExist.style.display = "block";
      savedContainer.style.display = "none";
    }

    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      var activeTab = tabs[0];
      chrome.tabs.sendMessage(activeTab.id, { command: "savedItemRemoved", url: url });
    });
  }
  


  if (!current || current.length === 0) {
    console.log("current NOT exists");
    savedNotExist.style.display = "block";
    savedContainer.style.display = "none";
  } else {
    current = result.jumptorecipe_saved;
    console.log("current exists");

    for (const item of current) {
      const newItem = document.createElement("div");
      newItem.classList.add("saved-item");

      const link = document.createElement("a");
      link.href = item.url;
      link.textContent = item.title;
      link.target = "_blank";
      link.classList.add("saved-item-link");

      const deleteButton = document.createElement("div");
      deleteButton.classList.add("saved-item-delete");

      const svgClone = binSvg.cloneNode(true);
      svgClone.classList.remove("hidden")
      deleteButton.appendChild(svgClone);

      const deleteText = document.createElement("span")
      deleteText.textContent = "Delete";
      deleteButton.appendChild(deleteText);

      deleteButton.onclick = function() {
        deleteSavedItem(item.title, item.url, newItem);
      } 

      newItem.appendChild(link);
      newItem.appendChild(deleteButton);
      savedContainer.appendChild(newItem);

      console.log(item);
    }
  }
  });