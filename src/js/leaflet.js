import * as L from "leaflet";
import display from "./interface";

const DEFAULT_VIEW = [-64.646232, -1493.764326]
const MAX_ZOOM = 9;
const MIN_ZOOM = 1;
const ATTRIBUTION =
  'Zidane Data; <a href="http://www.zidane.com/">Zidane</a>' +
  " Le meilleur joueur";
const API_URL =
  "http://" +
  process.env.POST_NAME +
  ":" +
  process.env.API_PORT +
  "/img/{y}/{x}/{z}.jpg";

class CustomMap {
  constructor(divId) {
    this.divId = divId;
  }
  dispMap() {
    let map = L.map(this.divId, {
      maxZoom: MAX_ZOOM,
      minZoom: MIN_ZOOM
    }).setView(DEFAULT_VIEW, MAX_ZOOM);

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
