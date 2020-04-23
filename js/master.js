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
  handleSort();
 }

$(() => {
  console.log('jQuery working', $);
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

function fetchRestaurantInfo(area, distance, diet, sort = 'best_match') {
 
  const baseURL = 'https://api.yelp.com/v3/businesses/search';
  const apiKey = 'IGnYDkKpA5hFg8el7-9WyyoLx5Z5sv2nssKYPflu_KGq26puqqFYSR9vikWHbTeSt9Vm1xzlQYKjzvf7uoJrkNTNfGdgJ5S7H3OW_CXlTJChkm-HxwgWNFnx-fOZXnYx';

  // get get past the CORS issue
  // bypass with a proxy
  const proxyBypassURL = 'https://galvanize-cors.herokuapp.com/'; 

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
    categories: diet,
    radius: distanceMeters,
    sort_by: sort
  };

  // add sorting
  // console.log(params);

  const queryString = formatQueryParams(params);
  const url = proxyBypassURL + baseURL + '?' + queryString;
  console.log(url);

  fetch(url, options)
    .then(response => {
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      return response.json();
    })
    .then(data => {
      console.log(data);
      renderSearchResults(data);
      $('.please-wait').text('');
    })
    .catch(err => console.log(err));
  }  

  // {{ FURTHER v2 ITERATION }}
  // pass the Yelp restaurant address data to Google Maps Geocode API
  // fetchMapData(addresses)
  // {{ ... will Function Stub / Psuedocode later }}



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
  const results = generateSearchResults(data);
  $('.results-list').html(results);
  displayView('results');
  
}



// EVENT HANDLERS ////////////////////////////////////////////

function handleSubmission() {
  $('.search-form').on('submit', event => {
    event.preventDefault();
    const area = $('.area-input').val();
    $('.view-results').find('.area-input').val(area);
    const distance = $('.distance-input').val();
    const sort = $('.sort-type').val();
    // console.log(sort);
    const diet = [];
    if ($('#gluten-free-check').is(':checked')) {
      diet.push('gluten_free');
      $('.view-results').find('#gluten-free-check').attr('checked', true);
    } 
    if ($('#vegan-check').is(':checked')) {
      diet.push('vegan');
      $('.view-results').find('#vegan-check').attr('checked', true);
    } 
    if ($('#vegetarian-check').is(':checked')) {
      diet.push('vegetarian');
      $('.view-results').find('#vegetarian-check').attr('checked', true);
    } 
    fetchRestaurantInfo(area, distance, diet, sort);
  });
}

// ** REFACTOR **
// as this fn is nearly identical to handleSubmission fn
// (with just different event listeners)
// should refactor so it's more efficient between
// the two fn without duplication of code
function handleSort() {
  $('.sort-type').on('change', event => {
    const sort = $(event.target).val();
    // console.log($(event.target).val());
    const area = $('.area-input').val();
    const distance = $('.distance-input').val();
    const diet = [];
    if ($('#gluten-free-check').is(':checked')) {
      diet.push('gluten_free');
      $('.view-results').find('#gluten-free-check').attr('checked', true);
    } 
    if ($('#vegan-check').is(':checked')) {
      diet.push('vegan');
      $('.view-results').find('#vegan-check').attr('checked', true);
    } 
    if ($('#vegetarian-check').is(':checked')) {
      diet.push('vegetarian');
      $('.view-results').find('#vegetarian-check').attr('checked', true);
    } 
    $('.please-wait').text('Please wait while we re-sort the results...');
    fetchRestaurantInfo(area, distance, diet, sort);
  });
} 



// INVOKE INIT
$(init);