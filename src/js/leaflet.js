const L = require("leaflet");
const DEFAULT_POS = [51.505, -0.09];
const DEFAULT_ZOOM = 9;
const MAX_ZOOM = 9;
const ATTRIBUTION =
      'Map data &copy; ' +
      '<a href="https://www.openstreetmap.org/">OpenStreetMap</a>' +
      ' contributors, ' +
      '<a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
      'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>';
      
const API_URL =
      "http://" + process.env.POST_NAME + ":" +
      process.env.API_PORT + "/img/{y}/{x}/{z}/";

class CustomMap {
    constructor(divId) {
        let mymap = L.map(divId).setView(DEFAULT_POS, DEFAULT_ZOOM);
        L.tileLayer(API_URL, {
            maxZoom: MAX_ZOOM,
            attribution:
            'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, ' +
                '<a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
                'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        }).addTo(mymap);	
    }
}

module.exports = CustomMap;
