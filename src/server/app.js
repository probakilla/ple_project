require("dotenv").config();
const converter = require("./coordinatesConverter");
const fetch = require("node-fetch");
const express = require("express");
const cors = require("cors");
const hbase = require("hbase");

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
  let newLat = 180 - lat;
  let newLng = 360 - lng;
  let coords = newLat.toString() + "-" + newLng.toString();
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

app.get("/debug/:lat/:lng/:zoom.jpg", (req, res, next) => {
  res.setTimeout(0);
  res.set("Content-Type", "image/jpg");
  let lat = Number(req.params.lat);
  let lng = Number(req.params.lng);
  let coords = lat.toString() + "-" + lng.toString();
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
      process.env.POST_NAME
  );
});
