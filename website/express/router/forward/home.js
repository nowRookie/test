const express = require("express")
const router = express.Router()
const fs = require("fs")
const path = require("path")

// multer中间件(主要用来处理multipart/form-data上传文件)
const checkFile = (ext, allow = true, rule = "png|jpg|jpeg|svg|gif") => {
	// ext文件后缀
	if (!ext) return false
	if (allow) return rule.includes(ext)
	return !rule.includes(ext)
}
const fileFilter = function (req, file, cb) {
	const ext = path.extname(file.originalname).substring(1)
	if (checkFile(ext)) {
		cb(null, true)
	} else {
		cb(null, false);
		cb(new Error('文件类型错误'));
	}
}
const multer = require('multer')
const upload = multer({
	limits: {
		fileSize: 2 * 1024 * 1024
	},
	fileFilter
}).any()

const imgFolder = "D:\\mongodb_database\\data\\images"
const contentType = "image/jpg,images.jpeg,image/png,image/gif,"

router.get("/images*", (req, res, next) => {
	const url = imgFolder + req.params[0]
	fs.exists(url, (exist) => {
		if (!exist) {
			res.status(404).send("")
			return
		}
		// res.writeHead(200, { 'Content-Type': contentType })
		res.end(fs.readFileSync(url))
	})
})
// 上传图片
router.post("/images*",
	(req, res, next) => {
		upload(req, res, function (err) {
			if (err instanceof multer.MulterError) {
				if (err.code == "LIMIT_FILE_SIZE") {
					res.status(500).send("文件不能超过2M")
				}
			} else if (err) {
				res.status(500).send(err.message)
			} else {
				next()
			}
		})
	},
	(req, res, next) => {
		const files = req.files
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
		let resUrl = []
		files.forEach((unit, index) => {
			resUrl.push(`/images` + req.params[0] + `/${unit.originalname}`)
			fs.writeFileSync(url + `/${unit.originalname}`, unit.buffer)
		})
		res.json({
			url: resUrl
		})
	})

router.get("/", (req, res, next) => {
	res.send("router.js implement")
})

module.exports = router