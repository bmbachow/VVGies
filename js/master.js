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
  // take object 'params' and .map key/values to make an array
  const queryItems = Object.keys(params).map( key => {
    return `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`;
  });
  // return => convert array into a string
  // concatenating each array item with an ampersand (&)
  return queryItems.join('&');
}

function fetchRestaurantInfo(area, distance, diet) {
  // console.log(`area: ${area} / distance: ${distance} / diet: ${diet}`);

  
  const baseURL = 'https://api.yelp.com/v3/businesses/search';
  const apiKey = 'IGnYDkKpA5hFg8el7-9WyyoLx5Z5sv2nssKYPflu_KGq26puqqFYSR9vikWHbTeSt9Vm1xzlQYKjzvf7uoJrkNTNfGdgJ5S7H3OW_CXlTJChkm-HxwgWNFnx-fOZXnYx';

  // get get past the CORS issue
  // bypass with a proxy
  const proxyBypassURL = 'http://galvanize-cors.herokuapp.com/'; 

  const options = {
    headers: new Headers({
      'Authorization': 'Bearer ' + apiKey,
    })
  };

  // apparently Yelp 'radius' value must be in meters (max value: 40000)
  // convert distance from miles to meters
  let distanceMeters = Math.floor(distance * 1609.344);
  const maxMeters = 40000;
  if (distanceMeters > maxMeters) {
    distanceMeters = maxMeters;
  }

  const params = {
    location: area,
    category: diet,
    radius: distanceMeters,
  };
  // console.log(params);

  const queryString = formatQueryParams(params);
  const url = proxyBypassURL + baseURL + '?' + queryString;
  console.log(url);

  fetch(url, options) // disabled due to CORS
  // fetch(url)
  .then(response => {
    if(!response.ok) {
      throw new Error(response.statusText);
    }
    return response.json();
  })
  .then(data => {
    console.log(data);
    renderSearchResults(data);
  })
  .catch(err => console.log(err));
  
  
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
  console.log(`renderSearchResults() invoked...`);
  // pass data back and forth to another fn to generate HTML

  // then render HTML into the DOM 

}



// EVENT HANDLERS ////////////////////////////////////////////

function handleSubmission() {
  console.log(`handleSubmission init`);
  // on submit get values from inputs (area, distance, diet)
  $('.search-form').on('submit', event => {
    event.preventDefault();
    const area = $('.area-input').val();
    const distance = $('.distance-input').val();
  
    // ** REFACTOR **
    // having difficulty getting values of checked checkbox inputs
    // so for now hard-coding value so I can proceed with fetch
    // const diet = $('checkbox').val();
    const diet = 'vegan';

    fetchRestaurantInfo(area, distance, diet);
  });

  // toggle which view to display 
  // (root or results?)
  // but invoke later in different fn... 
  // likely fn fetch() .then(data) else fn render()
  // displayView(view); 
}



// INVOKE INIT
$(init);