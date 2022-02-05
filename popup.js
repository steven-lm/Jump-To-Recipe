

function hello() {
  console.log("Sending");
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    var activeTab = tabs[0];
    chrome.tabs.sendMessage(activeTab.id, { command: "openModal" });
  });
}

document.getElementById("clickme").addEventListener("click", hello);


const savedNotExist = document.getElementsByClassName("saved-not-exist")[0];
const savedContainer = document.getElementsByClassName("saved-container")[0];


chrome.storage.sync.get(["jumptorecipe_saved"], function (result) {
  console.log("Value currently is " + result.jumptorecipe_saved);
  let current = result.jumptorecipe_saved;
  console.log( current);

  if (!current || Object.keys(current).length === 0) {
    console.log("current NOT exists");
    savedNotExist.style.display = "block";
    savedContainer.style.display = "none";
  } else {
    current = JSON.parse(result.jumptorecipe_saved);
    console.log("current exists");

    for (const item of current) {
      const newItem = document.createElement("div");
      newItem.classList.add("saved-item");

      newItem.innerHTML = `          
      <a href="${item.url}" class="saved-item-link" target="_blank">
        ${item.title}
      </a>
      <div class="saved-item-delete">
        <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="trash" class="svg-inline--fa fa-trash fa-w-14" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path fill="white" d="M432 32H312l-9.4-18.7A24 24 0 0 0 281.1 0H166.8a23.72 23.72 0 0 0-21.4 13.3L136 32H16A16 16 0 0 0 0 48v32a16 16 0 0 0 16 16h416a16 16 0 0 0 16-16V48a16 16 0 0 0-16-16zM53.2 467a48 48 0 0 0 47.9 45h245.8a48 48 0 0 0 47.9-45L416 128H32z"></path></svg>
        <span>Delete</span>
      </div>
      `;

      savedContainer.appendChild(newItem);

      console.log(item);
    }
  }
  });
