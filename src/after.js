const page_url = window.location.href;

var url = "https://jump-to-recipe-flask.onrender.com/?url=" + page_url;

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

const scripts = document.querySelectorAll('script[type="application/ld+json"]');

const hasRecipe = Array.from(scripts).some(script => {
  try {
    const json = JSON.parse(script.innerText);
    return hasRecipeSchema(json)
  } catch (e) {
    return false;
  }
});

// Recursively check if page has a recipe schema
// some websites store recipe data in a complex structure 
function hasRecipeSchema(json) {
  if (Array.isArray(json)) {
    for (let element of json) {
      if (hasRecipeSchema(element)) {
        return true;
      }
    }
    return false;
  } else if (typeof json === 'object') {
    for (let key in json) {
      if (json[key] === "Recipe" || hasRecipeSchema(json[key])) {
        return true;
      }
    }
    return false;
  } else {
    return false;
  }
}

function updateUI(data) {
  const title = document.getElementById("jump-to-recipe-top-title");
  title.textContent = data.title;

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

  const servings = document.getElementById("jump-to-recipe-servings");
  if (data.yields == "0 serving(s)") data.yields = "-- serving(s)"; // if no servings, show --
  servings.textContent = data.yields;

  const image = document.getElementById("jump-to-recipe-top-image");
  image.src = data.image;

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

    var closeButton = document.getElementById("jump-to-recipe-close-button");

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
}

if (hasRecipe) {
  chrome.storage.local.set({ jumptorecipe_norecipe: false });
  getData(url)
    .then((data) => {
      updateUI(data)
    })
    .catch(() => {
      chrome.storage.local.set({ jumptorecipe_norecipe: true });
    });
} else {
  chrome.storage.local.set({ jumptorecipe_norecipe: true });
}