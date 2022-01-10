// this code will be executed after page load
(function() {
  console.log('after.js executed');

  const page_url = window.location.href;
  console.log("page url", page_url);

  //   fetch('https://onlyrecipe.herokuapp.com/?' + new URLSearchParams({
  //     url: page_url,
  // }))
  //   .then(response => response.json())
  //   .then(data => console.log(data));
  // const request = (url, params = {}, method = "GET") => {
  //   let options = {
  //     method,
  //     headers: {
  //       "Access-Control-Allow-Origin": "*",
  //       Authorization: "$zS(`G=a9?8i&mC(OCs^kp[CzFjLe`",
  //     },
  //     mode: "no-cors",
  //   };
  //   url += "?" + new URLSearchParams(params).toString();

  //   return fetch(url, options).then((response) => {return response.json()});
  // };

  var url = "https://onlyrecipe.herokuapp.com/?url=https://www.dontgobaconmyheart.co.uk/cowboy-burgers/";

  async function getData(url = '') {
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
      return response
    })
    .catch(err => console.log(err));

    console.log("HERE", response);
    return response.json(); 
  }
  
  getData(url)
    .then(data => {
      console.log(data); // JSON data parsed by `data.json()` call

      const shid = document.getElementById('only-recipe-shid')
      shid.textContent(data)
    });

})();
