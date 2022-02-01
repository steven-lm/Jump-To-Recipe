console.log("HEYYYYYY MAIN")

const body = document.body;

// const cover = document.createElement('div');
// cover.id = 'only-recipe-cover';

// body.appendChild(cover);

fetch(chrome.runtime.getURL('/popup.html')).then(r => r.text()).then(html => {
    document.body.insertAdjacentHTML('afterbegin', html);
    // not using innerHTML as it would break js event listeners of the page

    const saveButton = document.getElementById("only-recipe-saved-container");
    const page_url = window.location.href;

    saveButton.onclick = function() {
        console.log("SHARED BUTTON AJSLF")
        navigator.clipboard.writeText(page_url);
    }

}).catch(err => console.log(err));