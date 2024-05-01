mapboxgl.accessToken = 'pk.eyJ1IjoiZGVmcmFuazEiLCJhIjoiY2x1bHZ0OWJyMHlhdjJrcDFsZzlwc3ZxMSJ9.XD1OM3LMVn2qoX9QMqR5Vg'; // access token

// instantiate the map using a bounding box instead of center point and zoom level

const map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/light-v11',
    bounds: [[-77.10972, 38.90469],[-77.03636, 38.97227]]
});

// when the map is finished it's initial load, add sources and layers.
map.on('load', function () {

    // add a geojson source for the Rock Creek West walkshed boundaries
    map.addSource('station-boundaries', {
        type: 'geojson',
        data: 'data/merged-walkshed.geojson',
        generateId: true // this will add an id to each feature, this is necessary if we want to use featureState (see below)
    })

    // first add the fill layer, using a match expression to give each a unique color based on its station_code property
    map.addLayer({
        id: 'station-boundaries-fill',
        type: 'fill',
        source: 'station-boundaries',
        paint: {
            'fill-color': [
                'match',
                ['get', 'station_code'],
                '1',
                '#003494',
                '2',
                '#003494',
                '3',
                '#003494',
                '4',
                '#003494',
                '5',
                '#003494',
                '#ccc'
            ],
            // use a case expression to set the opacity of a polygon based on featureState
            'fill-opacity': [
                'case',
                ['boolean', ['feature-state', 'hover'], false],
                0.8,  // opacity when hover is false
                0.4 // opacity when hover is true
            ]
        }
    })

    // add station outlines after the fill layer, so the outline is "on top" of the fill
    map.addLayer({
        id: 'station-boundaries-line',
        type: 'line',
        source: 'station-boundaries',
        paint: {
            'line-color': '#003594',
            'line-width': 1.5, 
        },
    })

    // this is a variable to store the id of the feature that is currently being hovered.
    let hoveredPolygonId = null

    // whenever the mouse moves on the 'station-boundaries-fill' layer, we check the id of the feature it is on top of, and set featureState for that feature.  The featureState we set is hover:true or hover:false
    map.on('mousemove', 'station-boundaries-fill', (e) => {
        // don't do anything if there are no features from this layer under the mouse pointer
        if (e.features.length > 0) {
            // if hoveredPolygonId already has an id in it, set the featureState for that id to hover: false
            if (hoveredPolygonId !== null) {
                map.setFeatureState(
                    { source: 'station-boundaries', id: hoveredPolygonId },
                    { hover: false }
                );
            }

            // set hoveredPolygonId to the id of the feature currently being hovered
            hoveredPolygonId = e.features[0].id;

            // set the featureState of this feature to hover:true
            map.setFeatureState(
                { source: 'station-boundaries', id: hoveredPolygonId },
                { hover: true }
            );

            // make the cursor a pointer to let the user know it is clickable
            map.getCanvas().style.cursor = 'pointer'

            // resets the feature state to the default (nothing is hovered) when the mouse leaves the 'station-boundaries-fill' layer
            map.on('mouseleave', 'station-boundaries-fill', () => {
                // set the featureState of the previous hovered feature to hover:false
                if (hoveredPolygonId !== null) {
                    map.setFeatureState(
                        { source: 'station-boundaries', id: hoveredPolygonId },
                        { hover: false }
                    );
                }

                // clear hoveredPolygonId
                hoveredPolygonId = null;

                // set the cursor back to default
                map.getCanvas().style.cursor = ''
            });

        }
    });

    // if the user clicks the 'station-boundaries-fill' layer, extract properties from the clicked feature, using jQuery to write them to another part of the page.
    map.on('click', 'station-boundaries-fill', (e) => {
        console.log('SOMEONE CLICKED THE MAP', e.features[0].properties.station_name)
        // get the station_name from the first item in the array e.features
        var station_name = e.features[0].properties.station_name

        // insert the station name into the sidebar using jQuery
        $('#station').text(`You clicked ${station_name}!`)
    });

    // listen for a click on a specific button and use fitBounds to change the map's camera view.
    $('#friendship-button').on('click', function () {
        map.fitBounds([[-77.10243, 38.95183],[-77.07210, 38.97202]])
    })

    $('#tenleytown-button').on('click', function () {
        map.fitBounds([[-77.09763, 38.93428],[-77.06189, 38.96172]])
    })

    $('#vanness-button').on('click', function () {
        map.fitBounds([[-77.07883, 38.93144],[-77.05159, 38.95414]])
    })

    $('#cleveland-button').on('click', function () {
        map.fitBounds([[-77.07161, 38.92349],[-77.04557, 38.94429]])
    })

    $('#woodley-button').on('click', function () {
        map.fitBounds([[-77.06945, 38.91659],[-77.04105, 38.93510]])
    })



// add a variable to keep track of the visible state of the station layers
let stationVisible = true

// when the toggle button is clicked, check stationVisible to get the current visibility state, update the layer visibility to reflect the opposite of the current state.
$('#take-home').on('click', function () {
    map.fitBounds([[-77.10972, 38.90469],[-77.03636, 38.97227]])
})

    /*ALL OF THESE INSTRUCTIONS ARE ABOUT TOGGLING, DO NOT DELETE, APPLY THEM TO EACH STATION BUTTON 


    // by default we will set the layers to visible
    let value = 'visible' 

    // if the layers are already visible, set their visibility to 'none'
    if (stationVisible === true) {
        value = 'none'
    }

    // use setLayoutProperty to apply the visibility (either 'visible' or 'none' depending on the logic above)
    map.setLayoutProperty('station-boundaries-fill', 'visibility', value)
    map.setLayoutProperty('station-boundaries-line', 'visibility', value)

    // flip the value in station_Visible to reflect the new state. (if true, it becomes false, if false it becomes true)
    stationVisible = !stationVisible
})

*/

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
    map.addLayer({
        id: lineRecord.properties.id,
        type: 'line',
        source: {
            type: 'geojson',
            data: lineRecord
        },
        layout: {
            'line-cap': 'round',
            'line-join': 'round'

        },
        paint: {
            'line-color': lineRecord.properties.color,
            'line-width': 15
        }
    })


})
})
