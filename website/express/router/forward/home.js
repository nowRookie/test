const express = require("express")
const router = express.Router()
const fs = require("fs")
const path = require("path")

const imgFolder = "D:\\mongodb_database\\data\\images"
const contentType = "image/jpg,images.jpeg,image/png,image/gif,"

router.get("/images*", (req, res, next) => {
	const url = imgFolder + req.params[0]
	fs.exists(url, (exist) => {
		if (!exist) {
			res.status(404).send("")
			return
		}
		res.writeHead(200, { 'Content-Type': contentType })
		res.end(fs.readFileSync(url))
	})
})
router.post("/images*", (req, res, next) => {
	console.log("####", req.body.name)
	console.log("$$$$$$$$$$$$$$", req.files)
	return
	const file = req.body.file
	console.log("file===", req.body)
	let time = Date.now()
	let url = imgFolder + req.params[0]
	if (req.params[0]) {
		function mkdirsSync(dirname) {
			if (fs.existsSync(dirname)) {
				return true;
			} else {
				if (mkdirsSync(path.dirname(dirname))) {
					fs.mkdirSync(dirname);
					return true;
				}
			}
		}
		mkdirsSync(url)
	}
	fs.writeFileSync(url + `/${time}.png`, Math.random().toString())
	let resUrl = req.params[0] + `/${time}.png`
	res.json({
		url: resUrl
	})
})

router.get("/", (req, res, next) => {
	res.send("router.js implement")
})

module.exports = router