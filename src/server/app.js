require("dotenv").config();
const express = require("express");
const fs = require("fs");
const app = express();
const cors = require("cors");
const asyncHandler = require("./asyncHandler");
const FILE_NAME = "images/img.jpeg";
const FILE_PATH = __dirname + "../../../";

let hbasePort = process.env.REST_PORT || "8080";
let apiPort = process.env.API_PORT || "4040";
let postName = process.env.POST_NAME || null;

if (postName === null) {
  throw new Error("Please configure the correct .env file");
}

const HBase = require("./hbaseConnection");
const hbase = new HBase(hbasePort);

const options = {
  root: FILE_PATH,
  headers: {
    "x-timestamp": Date.now(),
    "x-send": true
  }
};

app.use(cors());

app.get(
  "/img/:row/:col",
  asyncHandler(async (req, res, next) => {
    if (req.params.row && req.params.col) {
      const row = req.params.row;
      const col = req.params.col;
      let data = await hbase.getImage(row, col);
      fs.writeFile(FILE_NAME, data, "base64", writeError => {
        if (writeError) throw writeError;
        console.info("file has been saved");
        res.sendFile(FILE_NAME, options, sendError => {
          if (sendError) {
            next(sendError);
          } else {
            console.info("Img sent: ", FILE_NAME);
          }
        });
        res.on("finish", () => {
          if (!fs.existsSync(FILE_NAME)) {
            console.error(FILE_NAME, " does not exists");
          } else {
            setTimeout(() => {
              try {
                fs.unlinkSync(FILE_NAME);
                console.info(FILE_NAME, " was deleted");
              } catch (error) {
                console.error("Error removing ", FILE_NAME);
              }
            }, 000);
          }
        });
      });
    }
  })
);

app.listen(apiPort, () => {
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
