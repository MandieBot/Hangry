var apiID = "8b44c5a3";
var apiKey = "5aa1bbf6b8a35fe5f1a87ae1f373c84d";
var baseUrl = "https://api.edamam.com/" + "app_id=" + apiID + "&" + "app_key=" + "$" + apiKey;
// console.log(baseUrl);  

// Fetch request for recipe search
function recipeSearchGetApi() {
  // BaseUrl for recipe search API
  var baseUrl = "https://api.edamam.com/api/recipes/v2?type=public&";
  var test = "https://api.edamam.com/api/recipes/v2?type=public&q=apples&app_id=8b44c5a3&app_key=5aa1bbf6b8a35fe5f1a87ae1f373c84d";

  $.ajax({
    // url: "https://api.edamam.com/api/recipes/v2?type=public&app_id=8b44c5a3&app_key=5aa1bbf6b8a35fe5f1a87ae1f373c84d",
    // url: baseUrl + "app_id=" + apiID + "&app_key=" + apiKey,
    url: test,
    method: "GET",
  }).then(function (response) {
    console.log(response.hits);
  });
}
recipeSearchGetApi();
// appID = "8b44c5a3"
// appKey = "cf4bf66d9ed2dfe68d7907e7d5ea6a58"

function concat() {
  // api ID
  // api key
  // baseurl 

  
  
  // search parameters
  // search criteria
}
