import express from "express"
const eRouter = express.Router()
const fs = require("fs")
const path = require("path")

const checkFile = (ext, allow = true, rule = "png|jpg|jpeg|svg|gif") => {
	// ext文件后缀
	if (!ext) return false
	if (allow) return rule.includes(ext)
	return !rule.includes(ext)
}
const fileFilter = function (req, file, cb) {
	const ext = path.extname(file.originalname).substring(1)//文件后缀名:如zip
	if (checkFile(ext, true, "docx|xlsx|txt|md")) {
		cb(null, true)
	} else {
		cb(null, false);
		cb(new Error('文件类型错误'));
	}
}
const imgFilter = function (req, file, cb) {
	const ext = path.extname(file.originalname).substring(1)//文件后缀名:如zip
	if (checkFile(ext)) {
		cb(null, true)
	} else {
		cb(null, false);
		cb(new Error('文件类型错误'));
	}
}
// multer中间件(主要用来处理multipart/form-data上传文件)
const multer = require('multer')
const uploadImg = multer({
	limits: {
		fileSize: 2 * 1024 * 1024
	},
	fileFilter: imgFilter
}).any()
const uploadFile = multer({
	limits: {
		fileSize: 2 * 1024 * 1024
	},
	fileFilter
}).any()

const imgFolder = "D:\\mongodb_database\\data\\images"
const filesFolder = "D:\\mongodb_database\\data\\files"
// const contentType = "image/jpg,images/jpeg,image/png,image/gif,"

// 图片
eRouter.get("/images*", (req, res, next) => {
	const url = imgFolder + req.params[0]
	fs.exists(url, (exist) => {
		if (!exist) {
			res.status(404).send("")
			return
		}
		res.end(fs.readFileSync(url))
	})
})
eRouter.post("/images*",
	(req, res, next) => {
		uploadImg(req, res, function (err) {
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
// 文件
eRouter.get("/files*", (req, res, next) => {
	const url = filesFolder + req.params[0]
	fs.exists(url, (exist) => {
		if (!exist) {
			res.status(404).send("")
			return
		}
		res.send(fs.readFileSync(url, { encoding: "utf8" }))
	})
})
eRouter.post("/files*",
	(req, res, next) => {
		uploadFile(req, res, function (err) {
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
		let url = filesFolder + req.params[0]
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
			resUrl.push(`/files` + req.params[0] + `/${unit.originalname}`)
			fs.writeFileSync(url + `/${unit.originalname}`, unit.buffer)
		})
		res.json({
			url: resUrl
		})
	})

module.exports = eRouter