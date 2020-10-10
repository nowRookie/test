import express from "express"
const eRouter = express.Router()
import path from "path"
import fs from "fs"

eRouter.get("/index", (req, res, next) => {
	if (req.query.download == "render") {
		res.render("index.hbs", { name: "wang" })
	} else if (req.query.download == "download") {
		res.download(path.join(process.cwd(), "/static/index.html"), "测试.html", err => {
			if (err) {
				console.log(err, process.cwd(), path.join(process.cwd(), "/static/index.html"))
			} else {
				console.log("下载成功那个", process.cwd(), path.join(process.cwd(), "/static/index.html"))
			}
		})
	} else if (req.query.download == "sendFile") {
		res.sendFile("index.html", {
			root: path.join(process.cwd(), "/static"),
			headers: {
				"x-test": Date.now()
			}
		}, err => {
			if (err) {
				console.log(err, process.cwd(), path.join(process.cwd(), "/static/index.html"))
			} else {
				console.log("下载成功那个", process.cwd(), path.join(process.cwd(), "/ueditor/net"))
			}
		})
	} else if (req.query.download == "octet-stream") {
		res.set({
			"Content-Type": "application/octet-stream",
			"Content-Disposition": "attachment; filename=a.txt"
		});
		fs.createReadStream(path.join(process.cwd(), "/ueditor/net/config.json"), { encoding: "utf-8" }).pipe(res);
	}
})

export default eRouter