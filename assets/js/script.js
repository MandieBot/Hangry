const myCarouselElement = document.querySelector("#myCarousel");
const carousel = new bootstrap.Carousel(myCarouselElement, {
  interval: 1000,
  wrap: true,
});

// Created a variable to store that value of the baseUrl used in the api
// var baseUrl = "https://api.edamam.com/" + "app_id=" + apiID + "&" + "app_key=" + "$" + apiKey;
// var baseUrl = "https://api.edamam.com/";
var baseUrl = "https://api.edamam.com/api/recipes/v2?type=public&";
// console.log(baseUrl);

// Created an undefined variable to store the newBaseUrl (newBaseUrl === baseUrl + query (q) + ApiID + ApiKey)
var newBaseUrl;

// Created a variable to store a reference to the userSearchInput

// Created a event listener to listen for user event
$("#searchBtn").on("click", function () {
  var searchParameter = $("#userSearchInput").val();
  concatUrl(searchParameter);
});

// Created an event listener to listen for click events on random Recipe
// Using jquery to target any elements with a class of #randomBtn
//             .on () - event listener
$("#hangryBtn").on("click", function () {
  console.log("test");
  randomRecipe();
});

// Created a randomRecipe function that will be responsible for randomly choosing a recipe
function randomRecipe() {
  // Create the randomRecipe code to randomly choose a recipe
  displayResults();
}

// Created a selectedCriteria function that will be responsible for collecting the selected user criteria
// parameters to pass - userSearchInput and selectedCriteria
function selectedCriteria() {
  // Iterate over each criteria option
  // If the criteria option is checked (true) then run this code > collect each selectedCriteria
  // If the criteria option is unchecked (false) DON'T RUN CODE

  // Pass the selectedCriteria to concatUrl function
  concatURl();
}
// Created a concatUrl function that will be responsible for concatenating the : baseUrl, query (q), ApiID, ApiKey, and other selectedCriteria parameters
function concatUrl(query) {
  // Created two variables to store the apiID and apiKey
  var apiID = "8b44c5a3";
  var apiKey = "5aa1bbf6b8a35fe5f1a87ae1f373c84d";

  // Create the concatUrl code to concatenate all passed parameters
  // Reassigned the newBaseUrl variable to store the value of the newly created newBaseUrl
  newBaseUrl = baseUrl + "q=" + query + "&" + "app_id=" + apiID + "&" + "app_key=" + apiKey;
  // https://api.edamam.com/api/recipes/v2?type=public&q=salad&app_id=8b44c5a3&app_key=5aa1bbf6b8a35fe5f1a87ae1f373c84d

  // Still need to figure out which functions to call NEXT
  // Things we need to concat
  // api ID
  // api key
  // baseurl
  // search parameters
  // search criteria
  recipeSearchGetApi(newBaseUrl);
}

// // Created a recipeSearchApi function that will be responsible for fetching api data
function recipeSearchGetApi(newBaseUrl) {
  // ajax () -
  $.ajax({
    url: newBaseUrl,
    method: "GET",
  }).then(function (response) {
    // Just creating references to store each key we want to use

    var hits = response.hits;
    var cardElements = [];
    for (let i = 0; i < 1; i++) {
      const element = hits[i];
      cardElements.push(element.recipe.cuisineType);
      cardElements.push(element.recipe.dishType);
      cardElements.push(element.recipe.label);
      cardElements.push(element.recipe.images.REGULAR.url);
      console.log(cardElements);
      // // Response object AKA hit
      // console.log(element.recipe);
      // // Cuisine Type
      // console.log(element.recipe.cuisineType);
      // // High Fiber
      // console.log(element.recipe.dietLabels);
      // // Dish Type
      // console.log(element.recipe.dishType);
      // // Health Labels
      // console.log(element.recipe.healthLabels);
      // // Ingredients
      // console.log(element.recipe.ingredientLines);
      // // Recipe image small
      // console.log(element.recipe.images.SMALL.url);
      // // Recipe image regular
      // console.log(element.recipe.images.REGULAR.url);
      // // Recipe image large
      // // console.log(element.recipe.images.LARGE.url);
      // // Title / name of recipe
      // console.log(element.recipe.label);
      // // Link to website recipe is from
      // console.log(element.recipe.url);
    }
    // hits is a object of objects and arrays
    // we can target index of hits[]
    // console.log(hits[19]);
  });
}

// // Calling the recipeSearchGetApi function

// // Created a nutritionApi function that will be responsible for fetching api data
// function nutritionGetApi() {
//   // BaseUrl for recipe search API
//   var baseUrl = "https://api.edamam.com/api/recipes/v2?type=public&";

//   $.ajax({
//     url: baseUrl,
//     method: "GET",
//   }).then(function (response) {
//     console.log(response.hits);
//   });
// }
// // Calling the nutritionGetApi function
// nutritionGetApi();

// // Created a displayResults function that will be responsible for displayingResults
// function displayingResults() {}

// // RESOURCES ::
// // ajax () - https://api.jquery.com/jquery.ajax/