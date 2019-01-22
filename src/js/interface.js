function devenirRiche() {
    alert("Swiggity swooty, your account is now empty!");
}

function zidaneMode() {
    document.body.style.backgroundImage = "url('../../images/zidane_1.jpg')";
    let zidane_tile = L.tileLayer('../../zidane.jpg', {
    maxZoom: 18,
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, ' +
        '<a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
        'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    id: 'mapbox.streets'
    });
}

document.getElementById("btn").addEventListener("click", devenirRiche);
document.getElementById("zidane-btn").addEventListener("click", zidaneMode);
