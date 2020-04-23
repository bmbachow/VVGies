'use strict';
/* eslint-disable indent */

//////////////////////////////////////////////////////////////
// SEPARATION OF CONCERNS: TYPES OF FUNCTIONS
// Miscellaneous (incl Fetch Request)
// Template Generators
// Rendering Functions
// Event Handlers
//////////////////////////////////////////////////////////////



// const STORE = [];
// INIT
function init() {
  handleSubmission();
 }

$(() => {
  console.log('jQuery working', $);
});


// MISCELLANEOUS /////////////////////////////////////////////

// function sortSearchResults() {
//   // resorting order of objects in sachaSTORE array
//   // first instance: sort alphabetically by data.businesses[i].name
// }

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

function fetchRestaurantInfo(area, distance, diet, criteria = 'best_match') {
 
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
    categories: diet,
    radius: distanceMeters,
    sort_by: criteria
  };

  // add sorting
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
      // STORE.push(response);
      return response.json();
    })
    .then(data => {
      console.log(data);
      // sachaSTORE = data.businesses; 
      // ^^^^^^^^^^^^^^^^^^^^^^^^^^
      // we don't push data to the pre-existing STORE array... we replace entire value of STORE 
      // (ergo, 'let' STORE instead of 'const' STORE)
      
      // STORE.push(data);
      // console.log(STORE);
      renderSearchResults(data);
    })
    .catch(err => console.log(err));
  }  

// function generateLocalStore(STORE){
//   JSON.parse(STORE);
//   return STORE;
// }

// console.log(STORE);
    
    
       

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

function generateSearchCriteria(data) {

  return `
  <div>
    <input type="checkbox" id="gluten-free-check" name="gluten-free" value="gluten-free">
    <label for="gluten-free">Gluten-Free</label>
  </div>
  <div>
    <input type="checkbox" id="vegan-check" name="vegan" value="vegan">
    <label for="vegan">Vegan</label>
  </div>
  <div>
    <input type="checkbox" id="vegetarian-check" name="vegetarian" value="vegetarian">
    <label for="vegetarian">Vegetarian</label>
  </div>
  `;
}


// RENDERING FUNCTIONS ///////////////////////////////////////

function renderSearchResults(data) {
  // console.log(`renderSearchResults() invoked...`);
  const results = generateSearchResults(data);
  // console.log(results);
  $('.results-list').html(results);
  displayView('results');
}

function renderSearchCriteria(diet) {
  const checkboxesChecked = generateSearchCriteria(diet);
  $('.filter-by-diet').html(checkboxesChecked);
}



// EVENT HANDLERS ////////////////////////////////////////////

// function handleSort() {
//   // TEMP: to test not getting value from sort dropdown
//   // just detecting change/using dropdown 
//   // and hardcoding a sort by 'name'
//   $('select').on('change', event => {
//     sachaSTORE.sort( (a,b) => {
//       if(a.name > b.name) {
//         return 1;
//       }
//       if (b.name > a.name) {
//         return -1;
//       } 
//       return 0;
//     });
//     console.log(sachaSTORE);
//   });

// }


function handleSubmission() {
  console.log(`handleSubmission init`);
  // on submit get values from inputs (area, distance, diet)
  $('.search-form').on('submit', event => {
    event.preventDefault();
    const area = $('.area-input').val();
    const distance = $('.distance-input').val();
    const criteria = $('.search-criteria').val();
    console.log(criteria);
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

    // console.log(area, distance, diet);
    fetchRestaurantInfo(area, distance, diet, criteria);
  });

  // toggle which view to display 
  // (root or results?)
  // but invoke later in different fn... 
  // likely fn fetch() .then(data) else fn render()
  // displayView(view); 
}



// INVOKE INIT
$(init);