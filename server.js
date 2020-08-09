const express = require("express");
const path = require("path");
const port = process.env.PORT || 3000;

const app = express();

app.use(express.static(path.join(__dirname, "build")));

app.get("/api/hello", function (req, res) {
  res.send({ message: "hello, world" });
});

app.get("/*", function (req, res) {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});
app.listen(port);
