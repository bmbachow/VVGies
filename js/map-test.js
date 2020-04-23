/* eslint-disable indent */
'use strict';


// src: https://leafletjs.com/examples/quick-start/


//////////////////////////////////////////////////////////////////////////////////////
// INIT //////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////////////////////////////
// [1] initialise map 
// [2] setView(geographical coordinates [lat, long], zoomlevel)
// setView() also returns the map object
var mymap = L.map('mapid').setView([51.505, -0.09], 13);
console.log(mymap);

//////////////////////////////////////////////////////////////////////////////////////
// [3] add a 'tile layer' to add to our map 
//
// Leaflet is provider-agnostic for titles. 
// e.g.
// Mapbox: https://www.mapbox.com/
// Stamen: http://maps.stamen.com/
// Thunderforest: https://www.thunderforest.com/
//
// In this instance using Mapbox Streets tile layer from Mapbox Static Tiles API. 
// * need access token from Mapbox *
//
// [3] add a (mapbox) 'tile layer' to add to our map 
L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
  attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
  maxZoom: 18,
  id: 'mapbox/streets-v11', // mapbox/satellite-v9 // mapbox/streets-v11 
  tileSize: 512,
  zoomOffset: -1,
  // mapbox.access.token
  accessToken: 'pk.eyJ1IjoiYXJ0aWZpY2lhbGFyZWEiLCJhIjoiY2s5ZGFyYmo2MDFyejNmbGVsOGQ3eWZ5cCJ9.TIWmboj0G4JnLfQ0GhTDdw' 
}).addTo(mymap);



//////////////////////////////////////////////////////////////////////////////////////
// THROWING SHAPES & MARKERS /////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////////////////////////////
// [4a] add a marker
var marker = L.marker([51.5, -0.09]).addTo(mymap);

//////////////////////////////////////////////////////////////////////////////////////
// [4b] add a circle
var circle = L.circle([51.508, -0.11], {
  color: 'red',
  fillColor: '#f03',
  fillOpacity: 0.5,
  radius: 500
}).addTo(mymap);


//////////////////////////////////////////////////////////////////////////////////////
// [4c] add a polygon
var polygon = L.polygon([
  [51.509, -0.08],
  [51.503, -0.06],
  [51.51, -0.047]
]).addTo(mymap);



//////////////////////////////////////////////////////////////////////////////////////
// WORKING WITH POP-UPS //////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////////////////////////////
// [5a] add a pop-up
marker.bindPopup("<b>Hello world!</b><br>I am a popup.").openPopup();
circle.bindPopup("I am a circle.");
polygon.bindPopup("I am a polygon.");

// [5b] pop-ups as layers
// var popup = L.popup()
//   .setLatLng([51.5, -0.09])
//   .setContent("I am a standalone popup.")
//   .openOn(mymap);




//////////////////////////////////////////////////////////////////////////////////////
// DEALING WITH EVENTS ///////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////

// Every time something happens in Leaflet, e.g. user clicks on a marker or map zoom changes, the corresponding object sends an event which you can subscribe to with a function. It allows you to react to user interaction:

var popup = L.popup();

function onMapClick(e) {
  popup
    .setLatLng(e.latlng)
    .setContent("You clicked the map at " + e.latlng.toString())
    .openOn(mymap);
}

mymap.on('click', onMapClick);









