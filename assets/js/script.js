// Bootstrap Carousel
const myCarouselElement = document.querySelector("#myCarousel");
const carousel = new bootstrap.Carousel(myCarouselElement, {
  interval: 1000,
  wrap: true,
});

// Storing base urls for API
var baseUrl = "https://api.edamam.com/api/recipes/v2?type=public&";
var nutrientsUrl = "https://api.edamam.com/api/nutrition-details?";

// Created an undefined variable to store the newBaseUrl (newBaseUrl === baseUrl + query (q) + ApiID + ApiKey)
var newBaseUrl, newNutrientsUrl;

// Created a event listener to listen for user event
$("#search-button").on("click", function () {
  var searchParameter = $("#userSearchInput").val();
  concatUrl(searchParameter);
});

// Created an event listener to listen for click events on random Recipe
$("#hangry-button").on("click", function () {
  let randomSearchParameter = randomRecipe();
  concatUrl(randomSearchParameter);
});

// Created a randomRecipe function that will be responsible for randomly choosing a recipe
function randomRecipe() {
  //Arr to generate random Recipes, we'll need more to get at least 6 inputs displayed on the cards.
  const randomRecipeArr = ["pasta", "cheese", "sushi", "chicken"];

  const random = Math.floor(Math.random() * randomRecipeArr.length);

  return randomRecipeArr[random];
  // displayResults();
}

// Created a selectedCriteria function that will be responsible for collecting the selected user criteria
function selectedCriteria() {
  var selectedValues = [];
  var selectedDietValues = [];

  // Checking if values are checked/ or unchecked
  $("input.health:checked").each(function () {
    selectedValues.push(this.value);
  });
  $("input.diet:checked").each(function () {
    selectedDietValues.push(this.value);
  });

  // Pass the selectedCriteria to concatUrl function
  concatUrl(undefined, selectedValues, selectedDietValues);
}
$("#apply-button").on("click", function () {
  selectedCriteria();
});

// Created a concatUrl function that will be responsible for concatenating the : baseUrl, query (q), ApiID, ApiKey, and other selectedCriteria parameters
function concatUrl(query, healthLabels, dietLabels) {
  // Created two variables to store the apiID and apiKey
  var apiID = "8b44c5a3";
  var apiKey = "5aa1bbf6b8a35fe5f1a87ae1f373c84d";
  var nutrientsApiID = "81660670";
  var nutrientsApiKey = "bf3c626930152d5249b50c2db0532e9b";

  // Create the concatUrl code to concatenate all passed parameters
  // Reassigned the newBaseUrl variable to store the value of the newly created newBaseUrl
  // newBaseUrl = `${baseUrl}q=${query}&app_id=${apiID}&app_key=${apiKey}`;
  newNutrientsUrl = `${nutrientsUrl}q=${query}&app_id=${nutrientsApiID}&app_key${nutrientsApiKey}`;

  if (healthLabels) {
    healthLabels.map(function (label) {
      newBaseUrl = `${newBaseUrl}&health=${label}`;
    });
  }
  if (dietLabels) {
    dietLabels.map(function (label) {
      newBaseUrl = `${newBaseUrl}&diet=${label}`;
    });
  }
  // recipeSearchGetApi(newBaseUrl);
  nutritionGetApi(newNutrientsUrl);
}

// Created a recipeSearchApi function that will be responsible for fetching api data
// function recipeSearchGetApi(newBaseUrl) {
//   $.ajax({
//     url: newBaseUrl,
//     method: "GET",
//   }).then(function (response) {
//     $(response.hits).each(function (index, recipe) {
//       let dataFromResponse = [];
//       let storeForLater = [];

//       let title = recipe.recipe.label;
//       let image = recipe.recipe.images.REGULAR.url;
//       let cuisine = recipe.recipe.cuisineType[0];
//       let dishType = recipe.recipe.dishType[0];
//       let ingredients = recipe.recipe.ingredients;
//       let ingredientsLine = recipe.recipe.ingredientLines[0];
//       dataFromResponse.push(title, image, cuisine, ingredients);
//       storeForLater.push(ingredientsLine);
//       displayResults(dataFromResponse);
//     });
//   });
// }
// Calling the recipeSearchGetApi function

// Created a nutritionApi function that will be responsible for fetching api data
function nutritionGetApi() {
  // BaseUrl for recipe search API

  $.ajax({
    url: nutrientsUrl,
    method: "GET",
  }).then(function (response) {
    console.log(response.hits);
  });
}
// Calling the nutritionGetApi function
nutritionGetApi();

// Created a displayResults function that will be responsible for displayingResults
function displayResults(cardElements) {
  console.log(cardElements);
  // 1. I have Api data I want to display
  // 2. The Api Data has been .push to an new array  (cardElements parameter is that array)
  // 4. cardElements returns 20 objects containing a : title, img, cuisine, and ingredients
  // 5. I want to take those 4 items and display each item on a card
  // a. add each title to a card,
  // b. add each img to a card,
  // c. add each cuisine type to a card
  // d. add each ingredient to the card, but only on hover
  // 6. I only want to display 6 items until a user clicks the more btn
}

// RESOURCES ::
// ajax () - https://api.jquery.com/jquery.ajax/
