import Requests from "./fetchHbase";
import Display from "./interface";

const URL =
  "http://" + process.env.POST_NAME + ":" + process.env.API_PORT + "/img/";
const mapboxAttribution =
  'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, ' +
  '<a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
  'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>';

const L = require("leaflet");
const leafletMap = require("leaflet-map");
const requests = new Requests(URL);
const display = new Display();

L.TileLayer.MyCustomLayer = L.TileLayer.extend({
  getTileUrl: async coords => {
    let img = await requests.fetchImage(coords.y, coords.y, coords.z);
    display.displayImage(img);
  }
});

L.tileLayer.myCustomLayer = (templateUrl, options) => {
  return new L.TileLayer.MyCustomLayer(templateUrl, options);
};

function onMapClick(e) {
  popup
    .setLatLng(e.latlng)
    .setContent("Puta madre")
    .openOn(mymap);
}
class CustomMap {
  onLoad() {
    L.Icon.Default.imagePath = "../../node_modules/leaflet/dist/images/";
    let mymap = L.map("map").setView([51.505, -0.09], 9);
    L.tileLayer
      .myCustomLayer("{x}{y}{z}", {
        minZoom: 0,
        maxZoom: 9,
      })
      .addTo(mymap);
  }
}

export default CustomMap;
