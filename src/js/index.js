import "../css/map.css";
import "../css/index.css";
import Map from "./leaflet"
import Display from "./interface"

const MAP_ID = "map";
const map = new Map(MAP_ID);

map.dispMap();
Display.bindButtons();
