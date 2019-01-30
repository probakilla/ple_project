require("dotenv").config();
const converter = require("./coordinatesConverter");
const fetch = require("node-fetch");
const express = require("express");
const cors = require("cors");
const hbase = require("hbase");

let hbasePort = process.env.REST_PORT || "8080";
let apiPort = process.env.API_PORT || "4040";
let postName = process.env.POST_NAME || null;

const DEFAULT_ROW = "default";
const DEFAULT_COL = "zoom:0";

const config = {
  host: "localhost",
  port: process.env.REST_PORT
};

let DEFAULT_TILE = "";

const app = express();
app.use(cors());

function getDefaultTileHBase() {
  hbase(config)
    .table(process.env.HBASE_TABLE)
    .row(DEFAULT_ROW)
    .get(DEFAULT_COL, (error, value) => {
      if (value !== null) {
        let data = value[0].$;
        DEFAULT_TILE = Buffer.from(data, "base64");
      }
    });
}

app.get("/img/:lat/:lng/:zoom.jpg", (req, res, next) => {
  res.setTimeout(0);
  res.set("Content-Type", "image/jpg");
  let lat = Number(req.params.lat);
  let lng = Number(req.params.lng);
  let newLat = 180 - (lat + 90);
  let coords = newLat.toString() + "-" + lng.toString();
  console.log(coords);
  let zoom = "zoom:" + req.params.zoom;
  hbase(config)
    .table(process.env.HBASE_TABLE)
    .row(coords)
    .get(zoom, (error, value) => {
      try {
        if (value !== null) {
          let data = value[0].$;
          let image = Buffer.from(data, "base64");
          res.send(image);
        } else {
          res.send(DEFAULT_TILE);
        }
      } catch {}
    });
});

let server = app.listen(apiPort, () => {
  getDefaultTileHBase();
  console.log(
    "====== API LINSTENING ======" +
      "\n" +
      "API listening on port : " +
      apiPort +
      "\n" +
      "HBase requests on port : " +
      hbasePort +
      "\n" +
      "Post name set to : " +
      postName
  );
});
