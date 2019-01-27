const requests = require("./fetchHbase");
const display = require("./interface");

const L = require("leaflet");
const DEFAULT_ICON = "../../node_modules/leaflet/dist/images/";
const DEFAULT_POS = [51.505, -0.09];
const DEFAULT_ZOOM = 5;
const API_URL =
  "http://" +
  process.env.POST_NAME +
  ":" +
  process.env.API_PORT +
  "/img/{y}/{x}/{z}";

L.TileLayer.MyCustomLayer = L.TileLayer.extend({
  getTileUrl: async coords => {
    let img = await requests.fetchImage(coords.y, coords.x, coords.z);
    display.displayImage(img);
    return img;
  }
});

L.tileLayer.myCustomLayer = (templateUrl, options) => {
  return new L.TileLayer.MyCustomLayer(templateUrl, options);
};

class CustomMap {
  createMap(tagId) {
    L.Icon.Default.imagePath = DEFAULT_ICON;
    let mymap = L.map(tagId).setView(DEFAULT_POS, DEFAULT_ZOOM);
    L.tileLayer(API_URL, {
      attribution: "swagg",
      maxZoom: 9,
      id: "swaggmap"
    }).addTo(mymap);
  }
}

module.exports = new CustomMap();
