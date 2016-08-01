// initializes the map on the "mapid" div centered on Boston
var mymap = L.map('mapid').setView([10, 320], 3);
var popup = L.popup();

// Mapbox Streets tile layer
L.tileLayer(
    'http://server.arcgisonline.com/ArcGIS/rest/services/Ocean_Basemap/MapServer/tile/{z}/{y}/{x}', {
        attribution: 'Tiles &copy; Esri &mdash; Sources: GEBCO, NOAA, CHS, OSU, UNH, CSUMB, National Geographic, DeLorme, NAVTEQ, and Esri',
        maxZoom: 13,
        minZoom: 2,
        id: 'alacarter.jh6di32d',
        accessToken: 'pk.eyJ1IjoiYWxhY2FydGVyIiwiYSI6ImdYbndnVUEifQ.u6xXEp3n8BBm_vHj_0jAvQ'
    }).addTo(mymap);


function plotStations(stations) {
    for (var i = 0; i < stations.length; i++) {
        station = stations[i];

        var depth = station['bot_depth'];
        var id = station['bodc_station'];
        var sampleCount = station['sample_count'];

        // null values are passed back as the string "null"
        if (depth == "null"){
            depth = 1;
        }
        var radius = (depth * 10) + 10; // a number 10-27

        latitude = Number(station['latitude']);
        longitude = Number(station['longitude']);

        // color circles
        var options = {
            fillOpacity: 0.5,
            color: '#e6002e',
            fillColor: '#ff0033'
        };

        // Instantiates a circle object given a geographical point, a radius in meters and optionally an options object.
        var circle = L.circle(
            [latitude, longitude], radius, options).addTo(mymap);

        var popup = 'Station ID: ' + id + '<br />Bot Depth: ' + depth + '<br />Latitude: ' + latitude + '<br />Longitude: ' + longitude
        circle.bindPopup(popup);
    }
}


function distanceBetweenCoordinates(lat1, lon1, lat2, lon2, unit) {
    // unit is M for Miles, K for Kilometers, N for Nautical miles
    var radlat1 = Math.PI * lat1 / 180
    var radlat2 = Math.PI * lat2 / 180
    var theta = lon1 - lon2
    var radtheta = Math.PI * theta / 180
    var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
    dist = Math.acos(dist)
    dist = dist * 180 / Math.PI
    dist = dist * 60 * 1.1515
    if (unit == "K") { dist = dist * 1.609344 }
    if (unit == "N") { dist = dist * 0.8684 }
    return dist
}

// sqlString: a sql query (with no bigdawg outer syntax
// callback: function to call with result rows as the input
// result format: [{"field1":"val","field2":"val",...},{"field1":"val",...},...]
function bdRelationalQuery(sqlString, callback) {
    var queryString = "bdrel(" + sqlString + ");";
    bdRaw(queryString, callback);
};

// bigDawgQuery: a fully-functional big dawg query (with all necessary syntax)
// callback: function to call with result rows as the input
// result format: [{"field1":"val","field2":"val",...},{"field1":"val",...},...]
function bdRaw(bigDawgQuery, callback) {
    //console.log(queryString);
    $.post("http://localhost:8080/bigdawg/query", JSON.stringify(bigDawgQuery), function(result) {
        var lines = result.split("\n");
        //console.log(lines);
        var rows = [];
        var fields = lines[0].split("\t");
        for (var i = 1; i < lines.length; i++) {
            var line = lines[i];
            if (line.length > 0) {
                var row = {};
                var vals = line.split("\t")
                for (var j = 0; j < vals.length; j++) {
                    row[fields[j]] = vals[j];
                }
                rows.push(row);
            }
        }
        callback(rows);
    });
};

function bdText(bigDawgTextQuery, callback){
    var queryString = "bdtext(classdb55, cruise_reports_TedgeT('" + bigDawgTextQuery + ",',:));";
    $.post("http://localhost:8080/bigdawg/query", JSON.stringify(queryString), function(result) {
        // remove the first two lines, which just are ["started script!!", "doing query"]
        rows = [];
        var lines = result.trim().split("\n");
        var lines = lines.slice(2,lines.length);

        for (var i = 0; i < lines.length; i++){
            var line = lines[i];
            var columns = line.split("\t");

            var match = columns[0];
            var accumuloDoc = columns[1];
            var page = parseInt(columns[2]);

            rows.push({
                'match': match,
                'accumuloDoc': accumuloDoc,
                'numberOfMentions': page});
        }

        callback(rows)
    });

}

// curl -X POST -d "bdtext(classdb55, cruise_reports_TedgeT('word|deep,',:));" http://localhost:8080/bigdawg/query
// curl -X POST -d "bdtext(classdb55, cruise_reports_TedgeT('word|Paleoceanographic,',:));" http://localhost:8080/bigdawg/query
// curl -X POST -d "bdtext(classdb55, cruise_reports_Tedge('UK40S_page_99,',:));" http://localhost:8080/bigdawg/query

function highlightCoordinates(idArray) {
    for (var i = 0; i < idArray.length; i++) {
        id = idArray[i];

        var circle = L.circle(
            [station['latitude'], station['longitude']], radius, options)
    }
}

function onMapClick(e) {
    // onMapClick, find all stations within n miles of the click
    var lat = e.latlng['lat']
    var lng = e.latlng['lng']

    var nearbyStations = []
    for (var i = 0; i < stations.length; i++) {
        var station = stations[i];
        var distance = distanceBetweenCoordinates(
            lat, lng, station['latitude'], station['longitude'], 'K');

        if (distance <= 500) {
            nearbyStations.push(station);
        }
    }

    var content = "You clicked the map at " + e.latlng.toString() + "<br />" + nearbyStations.length.toString();
    popup
        .setLatLng(e.latlng)
        .setContent(content)
        .openOn(mymap);

    console.log(nearbyStations);
}

function bindInput(){
    var inputbox = $('#shiplogid')
    inputbox.on('keypress', function(event) {

        if(event.which === 13){
            console.log('enter pressed');
            searchAccumulo("word|" + inputbox.val())
        }

    });
}

function searchAccumulo(searchTerm){
    bdText(searchTerm, function(data){displayText(data)})
}

function displayText(rows){
    var resultdiv = $('#resultsid');
    $('.row').empty();

    for (var i = 0; i < rows.length; i++) {
        var row = rows[i];
        var match = row['match'].split('|')[1];
        var accumuloDoc = row['accumuloDoc'];
        var numberOfMentions = row['numberOfMentions'];

        // format the accumulo document name, extract the page, make a link, etc
        var arr = accumuloDoc.split('_');
        var page = accumuloDoc[accumuloDoc.length-1];
        var docName = arr[0] + '_' + arr[1];
        var link = 'http://localhost/pdfjs/web/viewer.html?file=' + docName + '.pdf#search=' + match;
        
        var docLink = '<a href="' + link + '" target="_blank">' + arr[0] + ', page ' + page + '</a>';
        var string = '<tr class="row">' + '<td>' + match + '</td><td>' + docLink + '</td><td>' + numberOfMentions + '</tr>';

        resultdiv.append(string);
    }

    console.log(rows[0])
}

bindInput();
mymap.on('click', onMapClick);



// bdRelationalQuery(
//     "SELECT count(s.bodc_station), s.longitude, s.latitude, s.bot_depth AS sample_count FROM sampledata.station_info AS s, sampledata.main AS m WHERE s.bodc_station = m.bodc_station GROUP BY s.",
//    function(data){plotStations(data)})

bdRelationalQuery(
    "SELECT s.bodc_station, s.longitude, s.latitude, s.bot_depth FROM sampledata.station_info AS s",
    function(data){
        plotStations(data);
    });

searchAccumulo('word|boat');

// bdText(
//     "word|boat",
//     function(data){console.log(data)});

// This will fail
// bdText(
//     "word|ewfopijfe",
//     function(data){console.log(data)});