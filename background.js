
chrome.action.onClicked.addListener(execScript);

async function execScript() {
  const tabId = await getTabId();
  chrome.scripting.executeScript({
    target: {tabId: tabId},
    files: ['execute.js']
  })

}

async function getTabId() {
  const tabs = await chrome.tabs.query({active: true, currentWindow: true});
  return (tabs.length > 0) ? tabs[0].id : null;
}

chrome.runtime.onMessage.addListener(function(message, sender) {
  console.log("hey")
  if (msg.command == "openModal") {
    const background = document.getElementById("only-recipe-background");
    let container = document.getElementById("only-recipe-container");
  
    if (!container) {
      container = document.getElementById("only-recipe-container-error");
    }
  
    background.style.display = "block";
    container.style.display = "block";
  }
});