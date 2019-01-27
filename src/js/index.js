import "../css/map.css";
import "../css/index.css";
const Map = require("./leaflet");
const Display = require("./interface");

const MAP_ID = "mapid";

const map = new Map(MAP_ID);
Display.bindButtons();
