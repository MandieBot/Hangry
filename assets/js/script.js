// Bootstrap carousel
const myCarouselElement = document.querySelector("#myCarousel");
const carousel = new bootstrap.Carousel(myCarouselElement, {
  interval: 1000,
  wrap: true,
});

// Recipe base Url
var baseUrl = "https://api.edamam.com/api/recipes/v2?type=public&";

// Nutrition base Url
var nutrientsUrl = "https://api.edamam.com/api/nutrition-details";

// Undefined variables for new base Urls
var newBaseUrl, newNutrientsUrl;

// Created a event listener to listen for user event
$("#search-button").on("click", function () {
  var query = $("#userSearchInput").val();
  concatUrl(query);
});

// Created a function responsible for concatenating new base Url
// healthLabels, dietLabels
function concatUrl(query) {
  // Created two variables to store the apiID and apiKey
  var apiID = "8b44c5a3";
  var apiKey = "5aa1bbf6b8a35fe5f1a87ae1f373c84d";
  // var nutrientsApiID = "81660670";
  // var nutrientsApiKey = "bf3c626930152d5249b50c2db0532e9b";

  // Reassigned the newBaseUrl variable to store the value of the newly concatenated url
  newBaseUrl = `${baseUrl}q=${query}&app_id=${apiID}&app_key=${apiKey}`;

  // if (healthLabels) {
  //   healthLabels.map(function (label) {
  //     newBaseUrl = `${newBaseUrl}&health=${label}`;
  //   });
  // }
  // if (dietLabels) {
  //   dietLabels.map(function (label) {
  //     newBaseUrl = `${newBaseUrl}&diet=${label}`;
  //   });
  // }
  // console.log(newNutrientsUrl);
  // console.log(newBaseUrl);
  recipeSearchFetchApi(newBaseUrl);
}

//
// // Created a recipeSearchApi function that will be responsible for fetching api data
function recipeSearchFetchApi(newBaseUrl) {
  $.ajax({
    url: newBaseUrl,
    method: "GET",
  }).then(function (response) {
    // hits = response.hits;
    $(response.hits).each(function (index, recipe) {
      let dataFromResponse = [];
      let storeForLater = [];

      let title = recipe.recipe.label;
      let image = recipe.recipe.images.REGULAR.url;
      let cuisine = recipe.recipe.cuisineType[0];
      let dishType = recipe.recipe.dishType[0];
      let ingredients = recipe.recipe.ingredients;
      let ingredientsLine = recipe.recipe.ingredientLines[0];
      dataFromResponse.push(title, image, cuisine, ingredients);
      storeForLater.push(ingredientsLine);

      displayResults(dataFromResponse);
    });
  });
}

function displayResults(cardElements) {
  // console.log(cardElements);
  let titleEl = cardElements[0];

  $(".card").each(function () {
    $(this).append(`<h5>${titleEl}</h5>`);
  });

  // 1. I have Api data I want to display
  // 2. The Api Data has been .push to an new array  (cardElements parameter is that array)
  // 4. cardElements returns 20 objects containing a : title, img, cuisine, and ingredients
  // 5. I want to take those 4 items and display each item on a card
  // a. add each title to a card,
  // b. add each img to a card,
  // c. add each cuisine type to a card
  // d. add each ingredient to the card, but only on hover
  // 6. I only want to display 6 items until a user clicks the more btn
  // console.log(cardElements[1]);
  // console.log(cardElements[2]);
  // console.log(cardElements[3]);
  // console.log(cardElements);


  // let imgEl = cardElements[1];
  // let cuisineEl = cardElements[2];
  // let ingredientsEl = cardElements[3];
  // $("titleEl").each(function (index) {
  //   $("")
  // });

  // $(cardElements).each(function (index) {
  //   $(cardElements[0]).append(`<h5>${titleEl}</h5>`);
  // });

  // for (let i = 0; i < cardElements[0].length; i++) {
  //   const element = titleEl[i];
  //   console.log(element);
  // }
}
