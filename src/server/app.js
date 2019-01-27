require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const coordConv = require("./coordinatesConverter");

let hbasePort = process.env.REST_PORT || "8080";
let apiPort = process.env.API_PORT || "4040";
let postName = process.env.POST_NAME || null;

const DEFAULT_ROW = "default";
const DEFAULT_COL = "zoom:1";

let DEFAULT_TILE = "not founod";

function getDefaultTile() {
    hbase()
	.table(process.env.HBASE_TABLE)
	.row(DEFAULT_ROW)
	.get(DEFAULT_COL, (error, value) => {
	    try {
		let data = value[0].$;
		DEFAULT_TILE = Buffer.from(data, "base64");
	    } catch (error) {
	    }
	})
}

const config = {
  host: process.env.POST_NAME,
  port: process.env.REST_PORT
};

const hbase = require("hbase");

app.use(cors());

app.get("/img/:lat/:lng/:zoom", (req, res) => {
    if (req.params.lat && req.params.lng && req.params.zoom) {
	let coords = coordConv.toFileName(req.params.lat, req.params.lng);
	let zoom = "zoom:" + req.params.zoom;
	res.set("Content-Type", "image/png");
	hbase()
	    .table(process.env.HBASE_TABLE)
	    .row(coords)
	    .get(zoom, (error, value) => {
		if (error) {
		    try {
			let img = DEFAULT_TILE;
			res.send(img);
		    } catch {}
		} else {
		    try {
			let img = value[0].$;
			if (error) console.error(error);
			let data = Buffer.from(img, "base64");
			res.send(data);
		    } catch (err) {
			//console.error(err);
		    }
		}
	    })
    }
})

app.listen(apiPort, () => {
    getDefaultTile();
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
