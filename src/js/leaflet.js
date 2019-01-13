const mymap = L.map('mapid').setView([51.505, -0.09], 13);

L.tileLayer('../../images/limonde.png', {
    maxZoom: 18,
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, ' +
        '<a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
        'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    id: 'mapbox.streets'
}).addTo(mymap);

L.marker([51.5, -0.09]).addTo(mymap)
    .bindPopup("<b>Hello world!</b><br />I am a popup.").openPopup();

const popup = L.popup();

function onMapClick(e) {
    popup
        .setLatLng(e.latlng)
        .setContent("Puta madre")
        .openOn(mymap);
}
mymap.on('click', onMapClick);

function devenirRiche() {
    alert("Swiggity swooty, your account is now empty!")

}

function zidaneMode() {
     document.body.style.backgroundImage = "url('../../images/zidane_1.jpg')";
    L.tileLayer('../../zidane.jpg', {
    maxZoom: 18,
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, ' +
        '<a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
        'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    id: 'mapbox.streets'
    }).addTo(mymap);
}

document.getElementById("btn").addEventListener("click", devenirRiche);
document.getElementById("zidane-btn").addEventListener("click", zidaneMode);
