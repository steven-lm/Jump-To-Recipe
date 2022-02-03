function hello() {
    chrome.scripting.executeScript(
        {
          files: ['alert.js'],
        },
        () => { console.log("donezo") });
}
  
document.getElementById('clickme').addEventListener('click', hello);