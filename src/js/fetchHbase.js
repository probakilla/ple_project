const URL = 'http://ripoux:4040/img/';
const HEADERS = {'Accept': 'application/json'}

function displayMessage(msg) {
    document.getElementById('uri-disp').innerHTML = msg;
}

function buildRequestURI(lat, lng, zoom) {
    let uri = (lat < 0) ?
	'S' + (lat * -1) :
	'N' + lat;
    uri += (lng < 0) ?
	'W' + (lng * -1) :
	'E' + lng;
    return uri + zoom;
}

async function fetchImage(lat, lng, zoom) {
    const url = URL + buildRequestURI(lat, lng, zoom);
    displayMessage('Fetching url : ' + url);
    // TMP PARCE QUE HBASE EST CASSE !!!
    return 'coucou';
    // TMP
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
