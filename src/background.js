
// Reset local storage on startup
chrome.runtime.onStartup.addListener(function() {
    chrome.storage.local.clear();
});