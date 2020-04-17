const express = require("express")
const router = express.Router()
const mongoose = require("mongoose")
const fs = require("fs")
const path = require("path")

const imageUrl = "C:\\Users\\Administrator\\Pictures\\Camera Roll\\"

let Schema = mongoose.Schema({
	title: { type: String, required: true },
	summarize: { type: String, required: true },
	time: { type: Date, required: true },
	tags: { type: [String], required: true },
	upload: String
}, { collection: "news" })
let Model = mongoose.model("Model", Schema)

router.get("/images", (req, res, next) => {
	fs.exists(imageUrl + "dog.jpg", (exist) => {
		if (exist) {
			res.writeHead(200, { 'Content-Type': 'image/jpg' })
			res.end(fs.readFileSync(imageUrl + "dog.jpg"))
		}
	})
})

// 新闻
router.route("/news")
	.get((req, res, next) => {
		Model.find({ ...req.query }, (err, dbData) => {
			if (err) res.send(err)
			res.send(dbData)
		})
	})
	.post((req, res, next) => {
		Model.find({ title: req.body.title }, (err, dbData) => {
			if (dbData.length) {
				res.status(500).json({
					type: "error",
					message: "数据库已经存在该数据"
				})
				return
			}
			let model = new Model({ ...req.body })
			model.save((dbErr) => {
				if (dbErr) {
					console.log(dbErr.errors)
					res.status(501).json({
						type: "error",
						message: "数据库error"
					})
					return
				}
				res.json({
					type: "success",
					message: "数据添加成功"
				})
			})
		})
	})
	.put((req, res, next) => { })
	.delete((req, res, next) => { })

module.exports = router