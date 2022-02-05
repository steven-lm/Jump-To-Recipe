function hello() {
  console.log("Sending")
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    var activeTab = tabs[0];
    chrome.tabs.sendMessage(activeTab.id, {"command": "openModal"});
  });
}
  
document.getElementById('clickme').addEventListener('click', hello);