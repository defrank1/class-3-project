mapboxgl.accessToken = 'pk.eyJ1IjoiZGVmcmFuazEiLCJhIjoiY2x1bHZ0OWJyMHlhdjJrcDFsZzlwc3ZxMSJ9.XD1OM3LMVn2qoX9QMqR5Vg';
var mapOptions = {
    container: 'map', // container ID
    style: 'mapbox://styles/mapbox/standard', // standard basemap
    center: [-77.02861, 38.89836], // starting position [lng, lat]
    zoom: 10.4, // starting zoom,
}


// instantiate the map
const map = new mapboxgl.Map(mapOptions);

// add a navitation control
const nav = new mapboxgl.NavigationControl();
map.addControl(nav, 'top-right');

// wait! don't execute this code until the map is finished it's initial load
map.on('load', () => {



    // list all the layers on the map in the console
    console.log(
        map.getStyle().layers
    )

    // loop over the stationData array to make a marker for each record
    stationData.forEach(function (stationRecord) {

        // create a popup to attach to the marker
        const popup = new mapboxgl.Popup({
            offset: 24,
            anchor: 'bottom'
        }).setText(
            `${stationRecord.station_name} is a WMATA metro station on the ${stationRecord.station_line} Line`
        );
        const el = document.createElement('div');
        el.className = 'single-station';
        if (stationRecord.transfer_station === true) {
            el.className = 'transfer-station'
        }

        // create a marker, set the coordinates, add the popup, add it to the map
        new mapboxgl.Marker(el)
            .setLngLat([stationRecord.longitude, stationRecord.latitude])
            .setPopup(popup)
            .addTo(map);
    })

    // loop over the lineData array to make a rail line for each record
    lineData.forEach(function (lineRecord) {

        // create a line, set the coordinates, add it to the map
        new mapboxgl.addLayer({
        id: 'bluea1line',
        type: 'lineString',
        source: 'js/station-data/js',
        layout: {
'line-cap': 'round',
'line-join': 'round'

        },
        paint: {
            'line-color': '#888',
        'line-width': 5
    }
    })
})})
