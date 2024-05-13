mapboxgl.accessToken = 'pk.eyJ1IjoiZGVmcmFuazEiLCJhIjoiY2x1bHZ0OWJyMHlhdjJrcDFsZzlwc3ZxMSJ9.XD1OM3LMVn2qoX9QMqR5Vg'; // access token

const bounds = [ //constraint the map to just Rock Creek West area
    [-77.16192, 38.88541], [-77.01347, 38.98450]
];

// instantiate the map using a bounding box instead of center point and zoom level

const map = new mapboxgl.Map({
    container: 'map', // container ID
    // Choose from Mapbox's core styles, or make your own style with Mapbox Studio
    style: 'mapbox://styles/mapbox/standard', // style URL
    center: [-77.06849, 38.94300], // starting position
    maxBounds: bounds // Set the map's geographical boundaries to the bounds defined above 
});

// when the map is finished it's initial load, add sources and layers.
map.on('load', function () {

    // add a geojson source for the  resi-density layers
    map.addSource('resi-zones-merged-walkshed', {
        type: 'geojson',
        data: 'data/walkshed-resi-zones/resi-zones-merged-walkshed.geojson',
        generateID: true //This adds an ID to each feature
    });

    map.addLayer({
        id: 'low-density-residential',
        type: 'fill',
        source: 'resi-zones-merged-walkshed',
        filter: ['==', 'resi_code', '1'], //Filter features with layer property equal to 'low-density-residential' so you load each one at a time (and give eaceh a different shade/color)...
        paint: {
            'fill-color': '#ffffcc',
            'fill-opacity': [
                'case',
                ['boolean', ['feature-state', 'hover'], false],
                1,  // opacity when hover is true
                0.7, // opacity when hover is false
            ]
        }

    });


    map.addLayer({
        id: 'moderate-density-residential',
        type: 'fill',
        source: 'resi-zones-merged-walkshed',
        filter: ['==', 'resi_code', '2'], //Filter features with layer property equal to 'low-density-residential' so you load each one at a time (and give eaceh a different shade/color)...
        paint: {
            'fill-color': '#fed98e',
            'fill-opacity': [
                'case',
                ['boolean', ['feature-state', 'hover'], false],
                1,  // opacity when hover is true
                0.7, // opacity when hover is false
            ]
        }

    });


    map.addLayer({
        id: 'medium-density-residential',
        type: 'fill',
        source: 'resi-zones-merged-walkshed',
        filter: ['==', 'resi_code', '3'], //Filter features with layer property equal to 'low-density-residential' so you load each one at a time (and give eaceh a different shade/color)...
        paint: {
            'fill-color': '#41b6c4',
            'fill-opacity': [
                'case',
                ['boolean', ['feature-state', 'hover'], false],
                1,  // opacity when hover is true
                0.7, // opacity when hover is false
            ]
        }

    });

    map.addLayer({
        id: 'high-density-residential',
        type: 'fill',
        source: 'resi-zones-merged-walkshed',
        filter: ['==', 'resi_code', '4'], //Filter features with layer property equal to 'low-density-residential' so you load each one at a time (and give eaceh a different shade/color)...
        paint: {
            'fill-color': '#225ea8',
            'fill-opacity': [
                'case',
                ['boolean', ['feature-state', 'hover'], false],
                1,  // opacity when hover is true
                0.7, // opacity when hover is false
            ]
        }

    });



    // add a geojson source for the walksheds
    map.addSource('merged-walkshed', {
        type: 'geojson',
        data: 'data/walksheds/merged-walkshed.geojson',
        generateID: true // This adds an id to each feature
    });

    map.addLayer({
        id: 'friendship-walkshed-layer',
        type: 'fill',
        source: 'merged-walkshed',
        filter: ['==', 'station_code', '1'], // Filter features with layer property equal to 'friendship-walkshed' so you load each one at a time...
        paint: {
            'fill-color': '#003494',
            'fill-opacity': [
                'case',
                ['boolean', ['feature-state', 'hover'], false],
                0.1,  // opacity when hover is true
                0.0 // opacity when hover is false
            ]
        }
    });

    map.addLayer({
        id: 'tenleytown-walkshed-layer',
        type: 'fill',
        source: 'merged-walkshed',
        filter: ['==', 'station_code', '2'], // filter other walksheds...
        paint: {
            'fill-color': '#003494',
            'fill-opacity': [
                'case',
                ['boolean', ['feature-state', 'hover'], false],
                0.1,  // opacity when hover is true
                0.0 // opacity when hover is false
            ]
        }
    });

    map.addLayer({
        id: 'vanness-walkshed-layer',
        type: 'fill',
        source: 'merged-walkshed',
        filter: ['==', 'station_code', '3'], // filter other walksheds...
        paint: {
            'fill-color': '#003494',
            'fill-opacity': [
                'case',
                ['boolean', ['feature-state', 'hover'], false],
                0.1,  // opacity when hover is true
                0.0 // opacity when hover is false
            ]
        }
    });

    map.addLayer({
        id: 'cleveland-walkshed-layer',
        type: 'fill',
        source: 'merged-walkshed',
        filter: ['==', 'station_code', '4'], // filter other walksheds...
        paint: {
            'fill-color': '#003494',
            'fill-opacity': [
                'case',
                ['boolean', ['feature-state', 'hover'], false],
                0.1,  // opacity when hover is true
                0.0 // opacity when hover is false
            ]
        }
    });

    map.addLayer({
        id: 'woodley-walkshed-layer',
        type: 'fill',
        source: 'merged-walkshed',
        filter: ['==', 'station_code', '5'], // filter other walksheds...
        paint: {
            'fill-color': '#003494',
            'fill-opacity': [
                'case',
                ['boolean', ['feature-state', 'hover'], false],
                0.1,  // opacity when hover is true
                0.0 // opacity when hover is false
            ]
        }
    });

    map.addLayer({ // this is adding the walkshed line for all five features at once (which is fine because you don't have to interact with them)
        id: 'merged-walkshed-line',
        type: 'line',
        source: 'merged-walkshed',
        paint: {
            'line-color': '#003594',
            'line-width': 3,
        },
    })

    // this is a variable to store the id of the feature that is currently being hovered.
    let hoveredPolygonId = null

    // Define a custom function to handle hover events on a map layer
    function setupHoverInteraction(layerName) {
        map.on('mousemove', layerName, (e) => {
            // don't do anything if there are no features from this layer under the mouse pointer
            if (e.features.length > 0) {
                // if hoveredPolygonId already has an id in it, set the featureState for that id to hover: false
                if (hoveredPolygonId !== null) {
                    map.setFeatureState(
                        { source: 'merged-walkshed', id: hoveredPolygonId },
                        { hover: false }
                    );
                }

                // set hoveredPolygonId to the id of the feature currently being hovered
                hoveredPolygonId = e.features[0].id;

                // set the featureState of this feature to hover:true
                map.setFeatureState(
                    { source: 'merged-walkshed', id: hoveredPolygonId },
                    { hover: true }
                );

                // make the cursor a pointer to let the user know it is clickable
                map.getCanvas().style.cursor = 'pointer'

                // resets the feature state to the default (nothing is hovered) when the mouse leaves the 'station-boundaries-fill' layer
                map.on('mouseleave', layerName, () => {
                    // set the featureState of the previous hovered feature to hover:false
                    if (hoveredPolygonId !== null) {
                        map.setFeatureState(
                            { source: 'merged-walkshed', id: hoveredPolygonId },
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
    }

    // Call setupHoverInteraction for each layer you want to apply the hover interaction to
    setupHoverInteraction('friendship-walkshed-layer');
    setupHoverInteraction('tenleytown-walkshed-layer');
    setupHoverInteraction('vanness-walkshed-layer');
    setupHoverInteraction('cleveland-walkshed-layer');
    setupHoverInteraction('woodley-walkshed-layer');


    // Call setupClickHandler for each layer you want to attach the click handler to
    setupClickHandler('friendship-walkshed-layer');
    setupClickHandler('tenleytown-walkshed-layer');
    setupClickHandler('vanness-walkshed-layer');
    setupClickHandler('cleveland-walkshed-layer');
    setupClickHandler('woodley-walkshed-layer');

    // Define a custom function to handle click events on a map layer
    function setupClickHandler(layerName) {
        map.on('click', layerName, (e) => {
            // Check if there are features from this layer at the clicked location
            if (e.features.length > 0) {
                // Get the station_name property from the clicked feature
                var station_name = e.features[0].properties.station_name;
                // Get the low_density_percent property from the clicked feature
                var low_density_percent = e.features[0].properties.low_density_percent;
                // Update the info panel content with the clicked station PERCENT
                $('#percent-callout-number').text(`${low_density_percent} `);
                // Update the info panel content with the clicked station FOLLOWING TEXT
                $('#percent-callout-text').text(`of the residential land within a 15-minute walk of the ${station_name} metro station is zoned for low density!`);
            }
        });
    }

    // CLICK ON BUTTONS AND SHOW PERCENT OF LOW DENSITY

    // Define a function to handle button clicks and update info panel content
    function setupButtonClickHandler(stationName,) {
        $(`#${stationName}-button`).on('click', function () {
            // Retrieve station details and low density percentage
            var stationData = findStationData(stationName);
            if (stationData) {
                var station_name = stationData.station_name;
                var low_density_percent = stationData.low_density_percent;

                // Update the info-panel content with the clicked station name and percentage
                updatePercentNumberCallout(low_density_percent);
                updatePercentTextCallout(station_name);

            }
        });
    }

    //button to take you back to full-screen "take you home"
    $('#take-home-button').on('click', function () {
        map.fitBounds([[-77.16192, 38.88541], [-77.01347, 38.98450]])
    });

    // Function to find station data (simulating data retrieval)
    function findStationData(stationName) {
        // This function should simulate fetching station data from your data source
        var stationData = {
            "friendship": {
                "station_name": "Friendship Heights",
                "low_density_percent": "77%"
            },
            "tenleytown": {
                "station_name": "Tenleytown",
                "low_density_percent": "87%"
            },
            "vanness": {
                "station_name": "Van Ness-UD",
                "low_density_percent": "72%"
            },
            "cleveland": {
                "station_name": "Cleveland Park",
                "low_density_percent": "67%"
            },
            "woodley": {
                "station_name": "Woodley Park",
                "low_density_percent": "44%"
            },
            "take-home": {
                "station_name": "Red Line stations in Rock Creek West",
                "low_density_percent": "74%"
            }
        };

        // Return station data for the specified stationName
        return stationData[stationName];
        
    }

    // Function to update the info panel content with station details
    function updatePercentNumberCallout(lowDensityPercent) {
        $('#percent-callout-number').text(`${lowDensityPercent}`);
    }
    function updatePercentTextCallout(stationName, lowDensityPercent) {
        $('#percent-callout-text').text(`of the residential land within a 15-minute walk of the ${stationName} metro station is zoned for low density!`);
    }

    //CLICK ON BUTTONS AND ZOOM, PAN, ROTATE AROUND STATION

    // Define a function to handle button clicks and update map camera settings
    function setupZoomButtonClickHandler(stationName, center, pitch, bearing, zoom) {
        $(`#${stationName}-button`).on('click', function () {
            map.fitBounds(bounds);

            // Set map pitch and bearing (rotation)
            map.easeTo({
                center: center,
                pitch: pitch,
                bearing: bearing,
                zoom: zoom,
                duration: 1000, // Adjust duration as needed
                easing: function (t) {
                    return t;
                }
            });
        });
    }

    // Call setupButtonClickHandler for each metro station button
    setupZoomButtonClickHandler('friendship', [-77.08506, 38.95947], 55, 25, 15.3);
    setupZoomButtonClickHandler('tenleytown', [-77.07923, 38.94806], 55, -25, 15.3);
    setupZoomButtonClickHandler('vanness', [-77.06351, 38.94417], 55, -70, 15.3);
    setupZoomButtonClickHandler('cleveland', [-77.05803, 38.93474], 55, -45, 15.3);
    setupZoomButtonClickHandler('woodley', [-77.05237, 38.92502], 45, -100, 15.3);

    // Call setupButtonClickHandler for each metro station button
    setupButtonClickHandler('friendship', '77%');
    setupButtonClickHandler('tenleytown', '87%');
    setupButtonClickHandler('vanness', '72%');
    setupButtonClickHandler('cleveland', '67%');
    setupButtonClickHandler('woodley', '44%');
    setupButtonClickHandler('take-home', '74%');



    /*ALL OF THESE INSTRUCTIONS ARE ABOUT TOGGLING, DO NOT DELETE, APPLY THEM TO EACH STATION BUTTON LATER


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
    // loop over the stationData array to make a marker for each record
    stationData.forEach(function (stationRecord) {



        //create a marker
        const el = document.createElement('div');
        el.className = 'single-station';
        if (stationRecord.transfer_station === true) {
            el.className = 'transfer-station'
        }

        // create a marker, set the coordinates, add the popup, add it to the map
        new mapboxgl.Marker(el)
            .setLngLat([stationRecord.longitude, stationRecord.latitude])
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

                /* try this to get different line widths per zoom level       
                {
                    stops: [[5, 3], [100, 50]]
                }

                          */
            }
        })



    })

    // disable map zoom when using scroll
    map.scrollZoom.disable();

    const searchJS = document.getElementById('search-js');
    searchJS.onload = function () {
        // Create a new instance of MapboxSearchBox
        const searchBox = new MapboxSearchBox();

        // Set the access token and options for the search box
        searchBox.accessToken = 'pk.eyJ1IjoiZGVmcmFuazEiLCJhIjoiY2x1bHZ0OWJyMHlhdjJrcDFsZzlwc3ZxMSJ9.XD1OM3LMVn2qoX9QMqR5Vg';
        searchBox.options = {
            types: 'address,poi',
            proximity: [-77.06356, 38.94409]
        };

        // Enable marker display on the map
        searchBox.marker = true;
        searchBox.mapboxgl = mapboxgl;

        // Add the search box to the map as a control
        map.addControl(searchBox);
    };
})