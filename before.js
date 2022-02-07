// this code will be executed before page load
(function () {
  console.log("before.js executed");
  if (chrome.runtime.onStartup) {
    chrome.runtime.onStartup.addListener(function() {
      chrome.storage.local.clear()
    })
  }

})();
