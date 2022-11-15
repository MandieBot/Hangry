// Bootstrap Carousel
const myCarouselElement = document.querySelector("#myCarousel");
const carousel = new bootstrap.Carousel(myCarouselElement, {
  interval: 1000,
  wrap: true,
});

// Storing base urls for API
var baseUrl = "https://api.edamam.com/api/recipes/v2?type=public&";
var nutrientsUrl = "https://api.edamam.com/api/nutrition-details";

var calories;
var proteins;
var carbs;
var fat;

// Created an undefined variable to store the newBaseUrl (newBaseUrl === baseUrl + query (q) + ApiID + ApiKey)
var newBaseUrl, newNutrientsUrl;

// Created a event listener to listen for user event
$("#search-button").on("click", function () {
  var searchParameter = $("#userSearchInput").val();
  concatUrl(searchParameter);
});

// Created an event listener to listen for click events on random Recipe
$("#hangry-button").on("click", function () {
  const randomRecipeArr = ["pasta", "cheese", "sushi", "chicken", "eggs", "hamburger"];

  //Random func
  const random = function (min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  };

  for (let i = 0; i < randomRecipeArr.length; i++) {
    concatUrl(randomRecipeArr[i]);
  }
});

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
  newBaseUrl = `${baseUrl}q=${query}&app_id=${apiID}&app_key=${apiKey}`;
  newNutrientsUrl = `${nutrientsUrl}q=${healthLabels}&app_id=${nutrientsApiID}&app_key${nutrientsApiKey}`;
  // console.log(newNutrientsUrl);

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
  recipeSearchGetApi(newBaseUrl);
  // nutritionGetApi(newNutrientsUrl);
}

// Created a recipeSearchApi function that will be responsible for fetching api data
function recipeSearchGetApi(newBaseUrl) {
  $.ajax({
    url: newBaseUrl,
    method: "GET",
    dataType: "json", 
    contentType: "application/JSON",
    // }).then(function (response) {
  }).then(function (response) {
    let res = response.hits;
    let dataFromResponse = "";
    let testResponse = "";

    // console.log(res);
    var recipeArray = res.slice(0, 6);
    var testUrl = "https://api.edamam.com/api/nutrition-data?app_id=81660670&app_key=bf3c626930152d5249b50c2db0532e9b&ingr=";
    for (const obj of recipeArray) {
      var ingArray = obj.recipe.ingredientLines;
      calories = 0;
      proteins = 0;
      carbs = 0;
      fat = 0;
      for (let i = 0; i < ingArray.length; i++) {
        function ajax(response) {
          $.ajax({
            type: "GET",
            url:
              testUrl + JSON.stringify(ingArray).replaceAll(";", "").replaceAll(",", "").replaceAll('"', "").replaceAll("[", "").replaceAll("]", ""),
          }).then(function (response) {
            // console.log(response);
            // var calories = response.calories;
            // var proteins = response.totalNutrients.PROCNT.quantity.toFixed();
            var carbs = response.totalNutrients.CHOCDF.quantity.toFixed(0);
            var fat = response.totalNutrients.FAT.quantity.toFixed(0);

            // calories += response.totalNutrients.ENERC_KCAL;
            // proteins += response.totalNutrients.PROCNT;
            // carbs += response.totalNutrients.CHOCDF;
            // fat += response.totalNutrients.FAT;
            // ,
            console.log(carbs, fat);
          });
        }
        ajax();

        // How to get response onto cards from 2nd api
      }
    }
    recipeArray.map(function (value) {
      dataFromResponse += `<div class="card my-3 mx-2">
      <div class="card-body">
      <a href="${value.recipe.url}" target="_blank" class="link">
      <img class="card-img-top" style="Height: 225px; Width: 100%;" src=${value.recipe.images.SMALL.url}></img>
      <h5 class="card-title my-3">${value.recipe.label}</h5>
      <p class="card-text mb-0">${value.recipe.cuisineType[0]}</p>
      <p class="card-text">${value.recipe.dishType[0]}</p>
      </a>
      </div>
      </div>`;
    });
    $("#card-container").append(dataFromResponse);
  });
}

// value.recipe.url
