import * as L from "leaflet";
import "proj4leaflet";
import display from "./interface";
const mercator = require("mercator-projection");
const DEFAULT_ZOOM = 9;
const DEFAULT_VIEW = [78.362161, -1542.925415]
const MAX_ZOOM = 9;
const ATTRIBUTION =
  'Zidane Data; <a href="http://www.zidane.com/">Zidane</a>' +
  " Le meilleur joueur";

const API_URL =
  "http://" +
  process.env.POST_NAME +
  ":" +
  process.env.API_PORT +
  "/img/{y}/{x}/{z}.jpg";

L.TileLayer.CustomLayer = L.TileLayer.extend({
  getTileUrl: coords => {
    let point = mercator.fromPointToLatLng({ x: coords.x, y: coords.y });
    console.log(point);
    return (
      "http://young:9696/img/" +
      point.lat +
      "/" +
      point.lng +
      "/zoom:" +
      coords.z +
      ".jpg"
    );
  }
});

L.tileLayer.CustomLayer = () => {
  return new L.TileLayer.CustomLayer();
};

class CustomMap {
  constructor(divId) {
    this.divId = divId;
  }
  dispMap() {
    let map = L.map(this.divId, {
      maxZoom: 9,
      minZoom: 0
    }).setView(DEFAULT_VIEW, 9);

    L.tileLayer(API_URL, {
        attribution: ATTRIBUTION
      })
      .addTo(map);

    map.on("click", (event) => {
      display.displayMessage(event.latlng.toString());
    })
  }
}

export default CustomMap;
