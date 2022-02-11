
chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
  var activeTab = tabs[0];
  chrome.storage.local.get(["jumptorecipe_norecipe"], function (result) {
    let norecipe_urls = result.jumptorecipe_norecipe;

    if (norecipe_urls && norecipe_urls.length > 0) {

      for (const url of norecipe_urls) {
        if (url === activeTab.url) {
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
  let current = result.jumptorecipe_saved;

  function deleteSavedItem(title, url, element) {

    let newSavedItems = current;

    for (const item of newSavedItems) {
      if (item.title === title && item.url === url) {
        newSavedItems.splice(newSavedItems.indexOf(item), 1);

        chrome.storage.sync.set({'jumptorecipe_saved': newSavedItems});
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
    savedNotExist.style.display = "block";
    savedContainer.style.display = "none";
  } else {
    current = result.jumptorecipe_saved;
    for (const item of current) {
      // item container
      const newItem = document.createElement("div");
      newItem.classList.add("saved-item");
      newItem.onclick = function () {
        window.open(item.url);
      }

      // image container
      var imgContainer = document.createElement("div");
      imgContainer.classList.add("saved-item-image-container");

      // image
      var img = document.createElement("img");
      img.classList.add("saved-recipe-image");
      img.src = item.imgSrc;
      imgContainer.appendChild(img);

      // text container
      const textContainer = document.createElement("div");
      textContainer.classList.add("saved-item-text-container");

      // ---- title
      const title = document.createElement("span");
      title.textContent = item.title;
      title.target = "_blank";
      title.classList.add("saved-item-text-title");
      textContainer.appendChild(title);
      // ---- time
      const timeText = document.createTextNode("Total time: " + item.time);
      const time = document.createElement("span");
      time.appendChild(timeText);
      time.classList.add("saved-item-text-time");
      textContainer.appendChild(time);
      

      // delete button
      const deleteButton = document.createElement("div");
      deleteButton.classList.add("saved-item-delete");

      const svgClone = binSvg.cloneNode(true);
      svgClone.classList.remove("hidden")
      deleteButton.appendChild(svgClone);

      const deleteText = document.createElement("span")
      deleteButton.appendChild(deleteText);

      deleteButton.addEventListener('click', (event) => {
        event.stopPropagation();
        deleteSavedItem(item.title, item.url, newItem);
      });
      
      // add all to item container
      newItem.appendChild(imgContainer);
      newItem.appendChild(textContainer);
      newItem.appendChild(deleteButton);
      savedContainer.appendChild(newItem);
    }
  }
  });