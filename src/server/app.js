require("dotenv").config();
const fetch = require("node-fetch");
const express = require("express");
const cors = require("cors");
const hbase = require("hbase");

let hbasePort = process.env.REST_PORT || "8080";
let apiPort = process.env.API_PORT || "4040";
let postName = process.env.POST_NAME || "young";

const DEFAULT_ROW = "default";
const DEFAULT_COL = "zoom:0";

const config = {
  host: "localhost",
  port: process.env.REST_PORT
};

const ZOOMS = [1, 2, 4, 8, 16, 32, 64, 128, 256, 512];

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
  let zoom = Number(req.params.zoom);
  console.log(zoom)
  let newLat = ZOOMS[zoom] - lat - 1;
  let coords = newLat.toString() + "-" + req.params.lng;
  console.log(coords);
  let zoomCol = "zoom:" + req.params.zoom;
  hbase(config)
    .table(process.env.HBASE_TABLE)
    .row(coords)
    .get(zoomCol, (error, value) => {
      try {
        if (value !== null) {
          let data = value[0].$;
          let image = Buffer.from(data, "base64");
          res.status(200).send(image);
        } else {
          res.status(404).send(DEFAULT_TILE);
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
