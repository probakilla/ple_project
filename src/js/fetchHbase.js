require('dotenv').config();
const URL = 'http://' + process.env.POST_NAME + ':' + process.env.API_PORT + '/img/';
const HEADERS = {'Accept': 'application/json'};
const MAX_LAT = 90;
const MAX_LONG = 180;

function displayMessage(msg) {
    document.getElementById('uri-disp').innerHTML = msg;
}

function correctLat(lat) {
    let ret = '';
    if (lat < 0) {
	res += 'S';
	lat *= -1;
    } else {
	res += 'N';
    }
    return ret + (lat > MAX_LAT) ? MAX_LAT : lat;
}

function correctLong(lng) {
    let ret = '';
    if (lng < 0) {
	res += 'W';
	lat *= -1;
    } else {
	res += 'E';
    }
    return ret + (lng > MAX_LONG) ? MAX_LONG : lng;
}

function buildRequestURI(lat, lng, zoom) {
    let uri = correctLat(lat) + correctLong(lng);
    return uri + zoom;
}

async function fetchImage(lat, lng, zoom) {
    const url = URL + buildRequestURI(lat, lng, zoom);
    displayMessage('Fetching url : ' + url);
    return await fetch(url, {
	method: 'GET',
	headers: HEADERS
    }).then(data => {
	return data.json();
    }).then(response => {
	return response.Row[0].Cell[0].$;
    }).catch(err => {
	console.error(err.message);
    });
}
