require("dotenv").config();
const fetch = require("node-fetch");
const HEADERS = { Accept: "application/json" };
const TABLE = process.env.HBASE_TABLE;
const PNG_METADATA = "data:image/png;base64,";

class HBaseRequests {
  constructor(postName, port) {
    this.url = "http://localhost:" + port;
  }

  async getImage(row, column) {
    let url = this.url + "/" + TABLE + "/" + row + "/" + column;
    return await fetch(url, {
      method: "GET",
      headers: HEADERS
    })
      .then(data => {
        return data.json();
      })
      .then(res => {
        return PNG_METADATA + res.Row[0].Cell[0].$;
      })
      .catch(err => {
        console.error(err.message);
      });
  }
}

module.exports = HBaseRequests;
