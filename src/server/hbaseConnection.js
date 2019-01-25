require("dotenv").config();
const fetch = require("node-fetch");
const HEADERS = { Accept: "application/json" };
const TABLE = process.env.HBASE_TABLE;
const METADATA = "";

class HBaseRequests {
  constructor(port) {
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
        return METADATA + res.Row[0].Cell[0].$;
      })
      .catch(async err => {
        return await fetch(this.url + "/" + TABLE + "/default/zoom:0", {
          method: "GET",
          headers: HEADERS
        })
          .then(data => {
            return data.json();
          })
          .then(res => {
            return METADATA + res.Row[0].Cell[0].$;
          })
          .catch(err => {
            console.error(err.message);
          });
      });
  }
}

module.exports = HBaseRequests;
