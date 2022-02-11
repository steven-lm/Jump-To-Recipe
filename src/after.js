const page_url = window.location.href;

var url = "https://onlyrecipe.herokuapp.com/?url=" + page_url;

async function getData(url) {
  // Default options are marked with *
  const response = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: "$zS(`G=a9?8i&mC(OCs^kp[CzFjLe`",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Credentials": true,
    },
  })
    .then((response) => {
      return response;
    })
    .catch((err) => console.log(err));

  return response.json();
}

getData(url)
  .then((data) => {
    // Title
    const title = document.getElementById("jump-to-recipe-top-title");
    title.textContent = data.title;

    // Time
    const time = document.getElementById("jump-to-recipe-time");

    let hourLabel = "hours";
    let minLabel = "minutes";

    if (data.total_time.hours == 1) hourLabel = "hour";
    if (data.total_time.minutes == 1) minLabel = "minute";

    if (data.total_time.hours > 0 && data.total_time.minutes > 0) {
      time.textContent =
        data.total_time.hours +
        " " +
        hourLabel +
        "  " +
        Math.round(data.total_time.minutes) +
        " " +
        minLabel;
    } else if (data.total_time.hours > 0 && data.total_time.minutes == 0) {
      time.textContent = data.total_time.hours + " " + hourLabel;
    } else if (data.total_time.minutes > 0) {
      time.textContent = Math.round(data.total_time.minutes) + " " + minLabel;
    }

    // Servings
    const servings = document.getElementById("jump-to-recipe-servings");
    if (data.yields == "0 serving(s)") data.yields = "-- serving(s)"; // if no servings, show --
    servings.textContent = data.yields;

    const image = document.getElementById("jump-to-recipe-top-image");
    image.src = data.image;

    // Ingredients
    const ingredientsContainer = document.getElementById(
      "jump-to-recipe-bottom-ingredients-content"
    );

    for (let i = 0; i < data.ingredients.length - 1; i++) {
      const ingredient = document.createElement("div");
      ingredient.className = "jump-to-recipe-ingredient-item-underlined";
      ingredient.textContent = data.ingredients[i];
      ingredientsContainer.appendChild(ingredient);
    }

    const ingredient = document.createElement("div");
    ingredient.className = "jump-to-recipe-ingredient-item";
    ingredient.textContent = data.ingredients[data.ingredients.length - 1];
    ingredientsContainer.appendChild(ingredient);

    // Directions
    const directionsContainer = document.getElementById(
      "jump-to-recipe-bottom-instructions-content"
    );
    for (let i = 0; i < data.instructions.length; i++) {
      // container
      const step = document.createElement("div");
      step.className = "jump-to-recipe-instructions-container";

      // instructions
      const instr = document.createElement("div");
      instr.className = "jump-to-recipe-instructions-item";
      instr.textContent = data.instructions[i];

      // number
      const num = document.createElement("span");
      num.className = "jump-to-recipe-instructions-number";
      num.innerHTML = i + 1;

      step.appendChild(num);
      step.appendChild(instr);

      directionsContainer.appendChild(step);

      // Show modal
      const background = document.getElementById("jump-to-recipe-background");
      let container = document.getElementById("jump-to-recipe-container");

      if (!container) {
        container = document.getElementById("jump-to-recipe-container-error");
      }

      background.style.display = "block";
      container.style.display = "block";

      // get close element
      var closeButton = document.getElementById("jump-to-recipe-close-button");

      // close modal on click
      closeButton.onclick = function () {
        background.style.display = "none";
        container.style.display = "none";
      };

      // close modal when user clicks outside
      window.addEventListener("click", function (event) {
        if (event.target == background) {
          background.style.display = "none";
          container.style.display = "none";
        }
      });
    }
  })
  .catch(() => {
    chrome.storage.local.get(["jumptorecipe_norecipe"], function (result) {
      let current = result.jumptorecipe_norecipe;
      if (!current || current.length === 0) {
        const newList = [page_url];
        chrome.storage.local.set({ jumptorecipe_norecipe: newList });
      } else {
        current.push(page_url);
        chrome.storage.local.set({ jumptorecipe_norecipe: current });
      }
    });
  });
