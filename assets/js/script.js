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
  // localStorage.setItem("previousSearches", JSON.stringify(previousSearches));
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

  // Create the concatUrl code to concatenate all passed parameters
  // Reassigned the newBaseUrl variable to store the value of the newly created newBaseUrl
  newBaseUrl = `${baseUrl}q=${query}&app_id=${apiID}&app_key=${apiKey}`;
  // newNutrientsUrl = `${nutrientsUrl}q=${healthLabels}&app_id=${nutrientsApiID}&app_key${nutrientsApiKey}`;
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
    // When promise is fulfilled then >
  }).then(function (response) {
    // Store hits from promise object
    let res = response.hits;
    let dataFromResponse = "";
    let recipeArray = res.slice(0, 6);
    recipeArray.map(function (value, index) {
      console.log(value);
      dataFromResponse += `
    <div class="card my-3 mx-2">
      <div class="card-front">
        <div class="card-body">
            <img class="card-img-top" style="Height: 250px; Width: 100%;" src=${value.recipe.images.SMALL.url}></img>
            <h5 class="card-title my-3">${value.recipe.label}</h5>
            <p class="card-text mb-0">${value.recipe.cuisineType[0]}</p>
            <p class="card-text mb-0">${value.recipe.dishType[0]}</p>
            <p class="card-text mb-0">${value.recipe.mealType}</p>
        </div>
      </div>
      <div class="card-back">
      <a class="text-dark text-decoration-none" href="${value.recipe.url}" target="_blank">
        <div class="card-body">
          <h5 class="card-title my-3">${value.recipe.label}</h5>
          <p class="card-text mb-2">Calories: ${parseInt(value.recipe.calories)}</p>
          <p class="card-text mb-2">Carbs: ${parseInt(value.recipe.totalNutrients.CHOCDF.quantity)}</p>
          <p class="card-text mb-2">Fats: ${parseInt(value.recipe.totalNutrients.FAT.quantity)}</p>
          <p class="card-text mb-2">Proteins: ${parseInt(value.recipe.totalNutrients.PROCNT.quantity)}</p>         
        </div>
      </a>
      </div>
    </div>`;
    });

    $("#card-container").append(dataFromResponse);
  });
}
