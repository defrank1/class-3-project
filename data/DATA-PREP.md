The following data sources were used in this data directory:

planning-areas/rock-creek-west.geojson: one of the ten planning areas in DC, which was modified from a DC Open Data download of all ten.

planning-areas/inverted-rock-creek-west.geojson: inverged polygon of planning-areas/rock-creek-west.geojson.

residential-zones.geojson: a modified geojson file from DC Open Data, with all non-residential land use removed, and an extra field added to categorize land use by their residential land use specifically. 

resi-zones-rock-creek-west.geojson: residential-zones.geojson, restricted to only be for the planning area rock-creek-west.geojson

walksheds/merged-walkshed.geojson, walksheds/friendship-walkshed.geojson, etc.: created using the QGIS TravelTime plugin, to show either one station or all five stations ('merged') 15-minute walkshed radius.

walkshed-resi-zones/resi-zones-merged-walkshed.geojson, etc.: a combination of the resi-zones-rock-creek-west layer and each walkshed layer, creating a walkshed-restricted map of residential land use around each station.