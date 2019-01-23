const mapboxAttribution = 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, ' +
        '<a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
        'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>'

L.TileLayer.MyCustomLayer = L.TileLayer.extend({
    getTileUrl: async (coords) => {
	let img = await fetchImage(coords.y, coords.y, coords.z);
	displayImage(img);
	return img;
    }
});

L.tileLayer.myCustomLayer = (templateUrl, options) => {
    return new L.TileLayer.MyCustomLayer(templateUrl, options);
}

function onMapClick(e) {
    popup
        .setLatLng(e.latlng)
        .setContent("Puta madre")
        .openOn(mymap);
}

function onLoad() {
    let mymap = L.map('mapid').setView([51.505, -0.09], 9);
    L.tileLayer.myCustomLayer('{x}{y}{z}', {
	minZoom: 0,
	maxZoom: 9,
	attribution: mapboxAttribution
    }).addTo(mymap);
}
