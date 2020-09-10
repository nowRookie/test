import express from "express"
const app = express()

import path from "path"
import fs from "fs"

var ueditor = require("ueditor")
app.use("/ueditor/ue", ueditor(path.join(__dirname, 'uploads'), function (req, res, next) {
  var actionType = req.query.action
  if (actionType === 'uploadimage' || actionType === 'uploadfile' || actionType === 'uploadvideo') {
    var saveUrl = "images";
    if (actionType === "uploadfile") {
      saveUrl = "files"
    }
    if (actionType === "uploadvideo") {
      saveUrl = "videos"
    }
    res.ue_up(saveUrl);
    res.setHeader('Content-Type', 'text/html');
  }
  else {
    res.setHeader('Content-Type', 'application/json');
    let configUrl = path.resolve(__dirname, "./ueditor/net/config.json")
    fs.readFile(configUrl, function (readErr, buffer) {
      let result = buffer.toString().replace(/\/\*.*\*\//g, "")
      res.jsonp(JSON.parse(result))
    })
  }
}));