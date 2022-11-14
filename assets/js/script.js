// Bootstrap Carousel
const myCarouselElement = document.querySelector("#myCarousel");
const carousel = new bootstrap.Carousel(myCarouselElement, {
  interval: 1000,
  wrap: true,
});

// Storing base urls for API
var baseUrl = "https://api.edamam.com/api/recipes/v2?type=public&";
var nutrientsUrl = "https://api.edamam.com/api/nutrition-details";

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
  newBaseUrl = `${baseUrl}q=${query}&app_id=${apiID}&app_key=${apiKey}`;
  newNutrientsUrl = `${nutrientsUrl}q=${healthLabels}&app_id=${nutrientsApiID}&app_key${nutrientsApiKey}`;

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
  nutritionGetApi(newNutrientsUrl);
}

// Created a recipeSearchApi function that will be responsible for fetching api data
function recipeSearchGetApi(newBaseUrl) {
  $.ajax({
    url: newBaseUrl,
    method: "GET",
    dataType: "json",
  }).then(function (response) {
    let res = response.hits;
    let dataFromResponse = "";

    console.log(res);
    res.map(function (value) {
      dataFromResponse += `<div class="card my-3 mx-2">
      <div class="card-body">
      <img class="card-img-top" src=${value.recipe.images.SMALL.url}></img>
      <h5 class="card-title">${value.recipe.label}</h5>
      <p class="card-text">${value.recipe.cuisineType[0]}</p>
      <p class="card-text">${value.recipe.dishType[0]}</p>
      </div>
      </div>`;
    });
    $("#card-container").append(dataFromResponse);

    // //              var count = user input count
    // for (let i = 0; i < 7; i++) {
    //   const element = response.hits[i];
    //   let title = element.recipe.label;
    //   let image = element.recipe.images.REGULAR.url;
    //   let cuisine = element.recipe.cuisineType[0];
    //   let dishType = element.recipe.dishType[0];
    //   ingredients = element.recipe.ingredients;
    //   // let ingredientsLine = element.recipe.ingredientLines[0];
    //   // console.log(ingredientLine);
    //   dataFromResponse.push(title, image, cuisine, dishType);
    // }
    // // let card =

    // for (let i = 0; i < dataFromResponse.length; i++) {
    //   let element = dataFromResponse.splice(0, 4);
    //   displayResults(element);
    // }

    // storeForLater.push(ingredientsLine);
  });
}
// Calling the recipeSearchGetApi function

// // Created a nutritionApi function that will be responsible for fetching api data
// function nutritionGetApi() {
//   // BaseUrl for recipe search API

//   $.ajax({
//     url: newNutrientsUrl,
//     method: "GET",
//   }).then(function (response) {
//     console.log(response.hits);
//   });
// }

// // Calling the nutritionGetApi function
// nutritionGetApi();

// Created a displayResults function that will be responsible for displayingResults
function displayResults(cardArr) {
  // console.log(cardArr);
  // $("#card-container").append("<div class='card'></div>");
  // console.log(cardArr); //each array
  // console.log(cardArr.length); //array length = 4
  // cardArr.forEach((x, index) => {
  //   console.log(x);
  //   console.log(index);
  //   //
  // });
  // cardArr.map(function (value, index, array) {
  //   console.log(array);
  //   // test += `<h5>${cardArr[0]}</h5>`;
  //   // $(".card").append("<h5>" + value);
  //   // $(".card").append(`<h5>${value}</h5>`);
  //   // $(".card").append(`<img>${value}</img>`);
  //   // $(".card").append(`<p>${value}</p>`);
  //   // $(".card").append(`<small>${value}</small>`);
  // });
  // $(".card").append(test);
  // $(this).each(function () {
  //   $(".card").append(`<h5>${cardArr[0]}</h5>`);
  // });
  // for (let i = 0; i < cardArr.length; i++) {
  //   const element = cardArr[i];
  //   console.log(element);
  //   $("#card-container").append("<div class='card'></div>");
  //   $(".card").append(`<h5>${cardArr[0]}</h5>`);
  // }
  // console.log($(this));
  // $("#card-container").append("<div class='card'></div>");
  // $(".card").each(function () {
  //   $(this).append(`<h5>${cardArr[0]}</h5>`);
  // });
  // console.log(cardArr[0]);
  // for (let i = 0; i < cardArr.length; i++) {
  //   const element = cardArr[i];
  //   console.log(element);
  //   $(".card").append(`<h5>${cardArr[0]}</h5>`);
  // }
  // $(cardArr[0]).each(function () {
  //   $(".card").append(`<h5>${cardArr[0]}</h5>`);
  // });
  // for (let i = 0; i < cardArr; i++) {
  //   const element = cardArr[i];
  //   console.log(cardArr);
  // }
  // 1. Grab reference to element
  // 2. Update that reference
  // 3. Append
  // 5. I want to take those 4 items and display each item on a card
  // a. add each title to a card,
  // b. add each img to a card,
  // c. add each cuisine type to a card
  // d. add each ingredient to the card, but only on hover
  // 6. I only want to display 6 items until a user clicks the more btn
  // $(".card").each(function (index, card) {
  //   if (index === 0) {
  //   }
  // });
  // add data
}

// RESOURCES ::
// ajax () - https://api.jquery.com/jquery.ajax/
