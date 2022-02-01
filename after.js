// this code will be executed after page load
(function() {
  console.log('after.js executed');

  const page_url = window.location.href;
  console.log("page url", page_url);

  var url = "https://onlyrecipe.herokuapp.com/?url=" + page_url;

  async function getData(url) {
    // Default options are marked with *
    console.log("CALLING", url);
    const response = await fetch(url, {
      method: 'GET', 
      headers: {
        'Content-Type': 'application/json',
        'Authorization': "$zS(`G=a9?8i&mC(OCs^kp[CzFjLe`",
        "Access-Control-Allow-Origin" : "*", 
        "Access-Control-Allow-Credentials" : true 
      },
    })
    .then((response) => {
      // if (Object.keys(response).length === 0) {
      //   console.log("NO DATA");
      //   document.getElementById("only-recipe-container").innerHTML = "";
      // };
      return response
    })
    .catch(err => console.log(err));

    console.log("HERE", response);
    return response.json(); 
  }
  
  getData(url)
    .then(data => {

	    // title
      const title = document.getElementById('only-recipe-top-title')
      title.textContent = data.title;

      // time
      const time = document.getElementById('only-recipe-time')

      let hourLabel = "hours";
      let minLabel = "minutes";

      if (data.total_time.hours == 1) hourLabel = "hour";
      if (data.total_time.minutes == 1) minLabel = "minute";

      if (data.total_time.hours > 0 && data.total_time.minutes > 0) {
        time.textContent = data.total_time.hours + " " + hourLabel + "  " + Math.round(data.total_time.minutes) + " " + minLabel;
      } else if (data.total_time.hours > 0 && data.total_time.minutes == 0) {
        time.textContent = data.total_time.hours + " " + hourLabel;
      } else if (data.total_time.minutes > 0) {
        time.textContent = Math.round(data.total_time.minutes) + " " + minLabel;
      }

      // servings
      const servings = document.getElementById('only-recipe-servings')
      if (data.yields == "0 serving(s)") data.yields = "-- serving(s)";   // if no servings, show --
      servings.textContent = data.yields;

      const image = document.getElementById('only-recipe-top-image')
      image.src = data.image;


      // ingredients
      const ingredientsContainer = document.getElementById('only-recipe-bottom-ingredients-content')

      for (let i = 0; i < data.ingredients.length - 1; i++) {
        const ingredient = document.createElement('div')
        ingredient.className = "only-recipe-ingredient-item-underlined"
        ingredient.textContent = data.ingredients[i];
        ingredientsContainer.appendChild(ingredient);
      }

      const ingredient = document.createElement('div')
      ingredient.className = "only-recipe-ingredient-item"
      ingredient.textContent = data.ingredients[data.ingredients.length - 1];
      ingredientsContainer.appendChild(ingredient);


      // directions
      const directionsContainer = document.getElementById('only-recipe-bottom-instructions-content')
      for (let i = 0; i < data.instructions.length; i++) {
        // container
        const step = document.createElement('div')
        step.className = "only-recipe-instructions-container"
        
        // instructions
        const instr = document.createElement('div')
        instr.className = "only-recipe-instructions-item"
        instr.textContent = data.instructions[i];

        // number
        const num = document.createElement('span')
        num.className = "only-recipe-instructions-number"
        num.innerHTML = i + 1;
        
        step.appendChild(num);
        step.appendChild(instr);

        directionsContainer.appendChild(step);
      }

      // image
      // ingredients (array)
      // instructions (array)
      // total time {hours, minutes}
      //yields
    });


})();
