// this code will be executed before page load
(function () {
  console.log("before.js executed");
  chrome.runtime.onStartup.addListener(function() {
    chrome.storage.local.clear()
   })
})();
