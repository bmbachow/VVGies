'use strict';

//////////////////////////////////////////////////////////////
// SEPARATION OF CONCERNS: TYPES OF FUNCTIONS
// Miscellaneous (incl Fetch Request)
// Template Generators
// Rendering Functions
// Event Handlers
//////////////////////////////////////////////////////////////

// INIT
function init() {
  handleSubmission();
}

$(() => {
  console.log("jQuery working", $);
});


// MISCELLANEOUS /////////////////////////////////////////////

function displayView(view) {
  // to toggle class of <section> views: hidden or not
}

function formatQueryParams(params) {
  // format parameters into a string that can be appended to url

}

function fetchRestaurantInfo(area, distance, diet) {
  // fetch this info from Yelp business search API
  // formatQueryParams(params)
  // thet get http url + params
  
  // if HTTP response is 200 ok without a catch
  // renderSearchResults(data);

  
  // {{ FURTHER v2 ITERATION }}
  // pass the Yelp restaurant address data to Google Maps Geocode API
  // fetchMapData(addresses)
  // {{ ... will Function Stub / Psuedocode later }}
}



// TEMPLATE GENERATORS ///////////////////////////////////////

function generateSearchResults(data) {
  // loop through data to generate and return HTML

}



// RENDERING FUNCTIONS ///////////////////////////////////////

function renderSearchResults(data) {
  // pass data back and forth to another fn to generate HTML

  // then render HTML into the DOM 

}



// EVENT HANDLERS ////////////////////////////////////////////

function handleSubmission() {
  console.log(`handleSubmission init`);
  // on submit get values from inputs (area, distance, diet)
  // fetch restaurant data from Yelp API

  // which view to display? root or results? 
  // displayView(view); 
}



// INVOKE INIT
$(init);