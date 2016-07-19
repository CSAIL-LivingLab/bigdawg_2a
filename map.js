// initializes the map on the "mapid" div centered on Boston
var mymap = L.map('mapid').setView([-49.5472, 307.312], 2);

// Mapbox Streets tile layer
L.tileLayer(
    'http://server.arcgisonline.com/ArcGIS/rest/services/Ocean_Basemap/MapServer/tile/{z}/{y}/{x}',
    {
    attribution: 'Tiles &copy; Esri &mdash; Sources: GEBCO, NOAA, CHS, OSU, UNH, CSUMB, National Geographic, DeLorme, NAVTEQ, and Esri',
    maxZoom: 13,
    minZoom: 2,
    accessToken: 'pk.eyJ1IjoiYWxhY2FydGVyIiwiYSI6ImdYbndnVUEifQ.u6xXEp3n8BBm_vHj_0jAvQ'
}).addTo(mymap);


function plotStations() {
    for (var i = 0; i < stations.length; i++) {
      var station = stations[i];

      // radius by depth
      var depth = station['bot_depth'];
      var id = station['bodc_station'];
      var radius = (depth*10)+10;  // a number 10-27

      // color circles
      var options = {
        fillOpacity: 0.5,
        color: '#e6002e',
        fillColor: '#ff0033'};

      // Instantiates a circle object given a geographical point, a radius in meters and optionally an options object.
      var circle = L.circle(
        [station['latitude'], station['longitude']], radius, options).addTo(mymap);
      circle.bindPopup('bot_depth: ' + depth + '<br>' + 'bodc_station: ' + id + '<br>');
    }
}

function distance(lat1, lon1, lat2, lon2, unit) {
    // unit is M for Miles, K for Kilometers, N for Nautical miles
    var radlat1 = Math.PI * lat1/180
    var radlat2 = Math.PI * lat2/180
    var theta = lon1-lon2
    var radtheta = Math.PI * theta/180
    var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
    dist = Math.acos(dist)
    dist = dist * 180/Math.PI
    dist = dist * 60 * 1.1515
    if (unit=="K") { dist = dist * 1.609344 }
    if (unit=="N") { dist = dist * 0.8684 }
    return dist
}

plotStations()