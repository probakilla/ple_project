import "../css/map.css";
import "../css/index.css";

const L = require("leaflet");
const display = require("./interface");
const map = require("./leaflet");
const API_URL =
  "http://" +
  process.env.POST_NAME +
  ":" +
  process.env.API_PORT +
  "/img/{y}/{x}/{z}";

display.bindButtons();

let mymap = L.map("map").setView([51.505, -0.09], 13);

L.tileLayer(API_URL, {
  maxZoom: 18,
  attribution:
    'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, ' +
    '<a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
    'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
  id: "mapbox.streets"
}).addTo(mymap);
