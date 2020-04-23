'use strict';
// src: https://leafletjs.com/examples/quick-start/

// [1] initialise map
// [2] setView(geographical coordinates [lat, long], zoomlevel)
// setView() also returns the map object
var mymap = L.map('mapid').setView([51.505, -0.09], 13);
console.log(mymap);

// [3] add a 'tile layer' to add to our map 
// (in this instance using Mapbox Streets tile layer from Mapbox Static Tiles API) * need access token from Mapbox *
L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
  attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
  maxZoom: 18,
  id: 'mapbox/streets-v11',
  tileSize: 512,
  zoomOffset: -1,
  // mapbox.access.token
  accessToken: 'pk.eyJ1IjoiYXJ0aWZpY2lhbGFyZWEiLCJhIjoiY2s5ZGFyYmo2MDFyejNmbGVsOGQ3eWZ5cCJ9.TIWmboj0G4JnLfQ0GhTDdw' 
}).addTo(mymap);

console.log(mymap);