'use strict';
/* eslint-disable indent */

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
  if (view === 'results') {
    $('.display-container-results-view').removeClass('hidden');
    $('.display-container-root-view').addClass('hidden');
  } else {
    $('.display-container-results-view').addClass('hidden');
    $('.display-container-root-view').removeClass('hidden');
  }
}

function formatQueryParams(params) {
  const queryItems = Object.keys(params).map(key => {
    return `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`;
  });
  return queryItems.join('&');
}

function fetchRestaurantInfo(area, distance, diet) {
 
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
      if (!response.ok) {
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
  const array = [];
  const arrCategories = [];

  for (let i = 0; i < data.businesses.length; i++) {

    for (let j = 0; j < data.businesses[i].categories.length; j++) {
      arrCategories.push(`
        <li class="cuisine">${data.businesses[i].categories[j].title}</li>
      `);
    }
    let strCategories = arrCategories.join('');

    array.push(`<li class="restaurant-item">
    <h2>${data.businesses[i].name}</h2>
    <ul class="food-types"> 
      <!--<li class="cuisine">${data.businesses[i].categories[0].title}</li>-->
      ${strCategories}
      <li class="price">${data.businesses[i].price}</li>
      <li class="diet">Rating:${data.businesses[i].rating}</li>
      <li class="diet">Reviews:${data.businesses[i].review_count}</li>
    </ul>
    <address>
      <p><b>Address:</b> ${data.businesses[i].location.address1}, ${data.businesses[i].location.city}, ${data.businesses[i].location.state} ${data.businesses[i].location.zip_code}</p>
      <p><b>Phone:</b> ${data.businesses[i].phone}</p>
    </address>
  </li>
    `);
    arrCategories.length = 0;
  }
  return array.join('');
}



// RENDERING FUNCTIONS ///////////////////////////////////////

function renderSearchResults(data) {
  console.log(`renderSearchResults() invoked...`);
  const results = generateSearchResults(data);
  console.log(results);
  $('.results-list').html(results);
  displayView('results');
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
    
    
    const diet = [];
    if ($('#gluten-free-check').is(':checked')) {
      diet.push('gluten-free');
    } 
    if ($('#vegan-check').is(':checked')) {
      diet.push('vegan');
    } 
    if ($('#vegetarian-check').is(':checked')) {
      diet.push('vegetarian');
    } 
    // const diet = 'vegan';

    console.log(area, distance, diet);
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