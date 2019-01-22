const mapboxAttribution = 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, ' +
        '<a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
        'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>'
const PNG_METADATA = 'data:image/png;base64;';

L.TileLayer.MyCustomLayer = L.TileLayer.extend({
    getTileUrl: async (coords) => {
	let img = PNG_METADATA + await fetchImage(coords.y, coords.y, coords.z);
	console.log(img);
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
	maxZoom: 9
    }).addTo(mymap);
}

(async() => {
    // TMP PENDANT QUE HBASE EST CASSE
    return null;
    // TMP PENDANT QUE HBASE EST CASSE
    
    const img = 'data:image/png;base64,' + fetchImage('69', '-069', '9');
    const greyscale = L.tileLayer('../../images/limonde.png', {
	maxZoom: 18,
	attribution: mapboxAttribution,
	id: 'MapID'
    });

    const streets = L.tileLayer(img, {
	id: 'MapID',
	attibution: mapboxAttribution,
	maxZoom: 18
    });

    let mymap = L.map('mapid', {
	center: [51.505, -0.09],
	zoom: 13,
	layers: [greyscale, streets]
    });

    mymap.on('click', onMapClick);

    L.marker([51.5, -0.09]).addTo(mymap)
	.bindPopup("<b>Hello world!</b><br />I am a popup.").openPopup();

    const popup = L.popup();
})();
