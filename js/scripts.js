

mapboxgl.accessToken = 'pk.eyJ1IjoiZGVmcmFuazEiLCJhIjoiY2x1bHZ0OWJyMHlhdjJrcDFsZzlwc3ZxMSJ9.XD1OM3LMVn2qoX9QMqR5Vg';
var mapOptions = {
    container: 'map', // container ID
    style: 'mapbox://styles/mapbox/standard', // standard basemap
    center: [-77.02861, 38.89836], // starting position [lng, lat]
    zoom: 10.4, // starting zoom,
}

// instantiate the map
const map = new mapboxgl.Map(mapOptions);

// a rough polygon of NY state border, hand-drawn in geojson.io
var redlineline = {
    "type": "FeatureCollection",
    "features": [
      {
        "type": "Feature",
        "properties": {},
        "geometry": {
          "coordinates": [
                    [
                        [
                            -77.05142159827537,
                            38.923537689351264
                          ],
                          [
                            -77.06499044288512,
                            38.94674138797188
                          ],
                          [
                            -77.07910946840825,
                            38.94677559605742
                          ],
                          [
                            -77.08667715248745,
                            38.96268421761414
                          ]
                    ]
                ],
                "type": "LineString"
            }
        }
    ]
}

// add a navitation control
const nav = new mapboxgl.NavigationControl();
map.addControl(nav, 'top-right');

// wait! don't execute this code until the map is finished it's initial load
map.on('load', () => {

    // add a geojson source for the dummy data
    map.addSource('redlineline', {
        "type": "geojson",
        "data": redlineline
    })
    // add a line layer using this dummy data
    map.addLayer({
        'id': 'redlineline-line',
        'type': 'line',
        'source': 'redlineline',
        'layout': {},
        'paint': {
            'line-color': 'red',
            'line-width': 15,
            'line-dasharray': [2, 2]
        }
    }, );

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
})});
