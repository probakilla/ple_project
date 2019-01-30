import * as L from "leaflet";
import "proj4leaflet";
import display from "./interface";
const mercator = require("mercator-projection");
const DEFAULT_ZOOM = 9;
const DEFAULT_VIEW = [81.279718, -1494.261475]
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
