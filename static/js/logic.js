// var newYorkCoords = [40.73, -74.0059];
// var mapZoomLevel = 12;

// Create the createMap function.
function createMap(bikeStations) {



  // Create the tile layer that will be the background of our map.
  let street = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  })

  // Create a baseMaps object to hold the lightmap layer.
  let baseMaps = {
        Street: street
    };

  // Create an overlayMaps object to hold the bikeStations layer.
  let overlayMaps = {
    Bike_Stations: bikeStations
  }
  
  // Create the map object with options.
  let myMap = L.map("map-id", {
    center: [40.73, -74.0059],
    zoom: 12
  });
  // Create a layer control, and pass it baseMaps and overlayMaps. Add the layer control to the map.
  L.control.layers(baseMaps, overlayMaps).addTo(myMap)} 

// Create the createMarkers function.
function createMarkers(response) {

  // Pull the "stations" property from response.data.
  let stations = response.data.stations;

  // Initialize an array to hold the bike markers.
  let markers = []

  // Loop through the stations array.
  for (var i = 0; i < stations.length; i++) {
    markers.push(
      L.marker([stations[i].lat, stations[i].lon]).bindPopup("<h1>" + stations[i].name + "</h1>")
    );
  }
    // For each station, create a marker, and bind a popup with the station's name.

    // Add the marker to the bikeMarkers array.

  // Create a layer group that's made from the bike markers array, and pass it to the createMap function.
  let bikelayer = L.layerGroup(markers);
  createMap(bikelayer);
}
// Perform an API call to the Citi Bike API to get the station information. Call createMarkers when it completes.
const url = "https://gbfs.citibikenyc.com/gbfs/en/station_information.json"

d3.json(url).then(function(response) {
  createMarkers(response)
  console.log(response)
}) 


