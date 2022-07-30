const fs = require("fs");
const path = require("path");
const express = require("express");
const app = express();

app.use(express.urlencoded({ extended: false }));

app.get("/", function (req, res) {
  res.send(
    '<form action = "/store-user" method = "POST"><label>Username: </label><input name= "username"></input><button>Submit</button></form>'
  );
});

app.post("/store-user", function (req, res) {
  const userName = req.body.username;
  const filePath = path.join(__dirname, "data", "users.json");
  const fileData = fs.readFileSync(filePath);
  const existingFile = JSON.parse(fileData);
  existingFile.push(userName);
  fs.writeFileSync(filePath, JSON.stringify(existingFile));
  res.send("<h1>Username Stored!</h1>");
});

app.get("/users", function (req, res) {
  const filePath = path.join(__dirname, "data", "users.json");
  const fileData = fs.readFileSync(filePath);
  const existingFile = JSON.parse(fileData);
  let responseData = "<ul>";
  for (const user of existingFile) {
    responseData += "<li>" + user + "</li>";
  }
  responseData += "</ul>";
  res.send(responseData);
});

app.listen(3000);
