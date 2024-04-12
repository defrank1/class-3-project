

mapboxgl.accessToken = 'pk.eyJ1IjoiZGVmcmFuazEiLCJhIjoiY2x1bHZ0OWJyMHlhdjJrcDFsZzlwc3ZxMSJ9.XD1OM3LMVn2qoX9QMqR5Vg';

var mapOptions = {
    container: 'map-container', // container ID
    style: 'mapbox://styles/mapbox/light-v11', // light basemap
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
        color = '#BF0D3E'
    }
    if (stationRecord.station_line === 'Orange') { // CHANGE THESE TO OTHER LINES LATER
        color = '#ED8B00'
    }
    if (stationRecord.station_line === 'Blue') {
        color = '#009CDE'
    }
    if (stationRecord.station_line === 'Green') {
        color = '#00B140'
    }
    if (stationRecord.station_line === 'Yellow') {
        color = '#FFD100'
    }
    if (stationRecord.station_line === 'Silver') {
        color = '#919D9D'
    }

    // create a popup to attach to the marker
    const popup = new mapboxgl.Popup({
        offset: 24,
        anchor: 'bottom'
    }).setText(
        `${stationRecord.station_name} is a 🚇 station on the ${stationRecord.station_line}`
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