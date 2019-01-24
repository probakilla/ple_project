import Display from "./interface";
import CustomMap from "./leaflet";
import "../css/map.css";
import "../css/index.css";

const mapboxAttribution =
  'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, ' +
  '<a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
  'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>';

const L = require("leaflet");

const display = new Display();
const map = new CustomMap();

document.getElementById("body").onload = map.onLoad();
display.bindButtons();