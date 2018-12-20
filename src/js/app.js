const express = require("express");
const path = require("path");
const app = express();

app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  res.status(200).send("Hello");
});


app.listen(4040, () => {
  console.log("Listening on port 4040...")
});
