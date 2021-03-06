// 百度富文本编辑器
import path from "path"
import fs from "fs"

var ueditor = require("ueditor")

export default (app) => {
  app.use("/ueditor/ue", ueditor(path.join(__dirname, 'uploads'), function (req, res, next) {
    var actionType = req.query.action
    if (actionType === 'uploadimage' || actionType === 'uploadfile' || actionType === 'uploadvideo') {
      var saveUrl = actionType.slice(6) + "s"
      res.ue_up(saveUrl);
      res.setHeader('Content-Type', 'text/html');
    } else {
      res.setHeader('Content-Type', 'application/json');
      let configUrl = path.resolve(__dirname, "../ueditor/net/config.json")
      fs.readFile(configUrl, function (readErr, buffer) {
        let result = buffer.toString().replace(/\/\*.*\*\//g, "")
        res.jsonp(JSON.parse(result))
      })
    }
  }));
}