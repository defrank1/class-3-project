

mapboxgl.accessToken = 'pk.eyJ1IjoiZGVmcmFuazEiLCJhIjoiY2x1bHZ0OWJyMHlhdjJrcDFsZzlwc3ZxMSJ9.XD1OM3LMVn2qoX9QMqR5Vg';

var mapOptions = {
    container: 'map-container', // container ID
    style: 'mapbox://styles/mapbox/standard', // standard basemap
    center: [-77.02861, 38.89836], // starting position [lng, lat]
    zoom: 10.4, // starting zoom,
}

// instantiate the map
const map = new mapboxgl.Map(mapOptions);

// add a navitation control
const nav = new mapboxgl.NavigationControl();
map.addControl(nav, 'top-right');

// loop over the stationData array to make a marker for each record
stationData.forEach(function (stationRecord) {

    var color

    // use if statements to assign colors based on stationData.station_line
    
    if (stationRecord.station_line === 'Red') {
        color = '#11111'
    }
    if (stationRecord.station_line === 'Orange') { // Leave these black, but figure out how to make the markers "metro dots"
        color = '#11111'
    }
    if (stationRecord.station_line === 'Blue') {
        color = '#11111'
    }
    if (stationRecord.station_line === 'Green') {
        color = '#11111'
    }
    if (stationRecord.station_line === 'Yellow') {
        color = '#11111'
    }
    if (stationRecord.station_line === 'Silver') {
        color = '#11111'
    }

    // create a popup to attach to the marker
    const popup = new mapboxgl.Popup({
        offset: 24,
        anchor: 'bottom'
    }).setText(
        `${stationRecord.station_name} is a 🚇 station on the ${stationRecord.station_line} Line`
    );

    // create a marker, set the coordinates, add the popup, add it to the map
    new mapboxgl.Marker({
        scale: 0.65,
        color: color
    })
        .setLngLat([stationRecord.longitude, stationRecord.latitude])
        .setPopup(popup)
        .addTo(map);
})