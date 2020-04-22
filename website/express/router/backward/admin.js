const express = require("express")
const router = express.Router()
const mongoose = require("mongoose")
const fs = require("fs")
const path = require("path")

const imgFolder = "D:\\mongodb_database\\data\\images"
const contentType = "image/jpg,images.jpeg,image/png,image/gif,"

let Schema = mongoose.Schema({
	title: { type: String, required: true },
	summarize: { type: String, required: true },
	time: { type: Date, required: [true, "time 必填"] },
	tags: {
		type: [mongoose.Schema.Types.Mixed],
		validate: {
			validator: (value) => { return value.length },
			msg: "tags 必填"
		}
	},
	upload: String
}, { collection: "news" })
let Model = mongoose.model("Model", Schema)

// 新闻
router.route("/news")
	.get((req, res, next) => {
		Model.find({ ...req.query }, (dbErr, dbData) => {
			if (dbErr) return res.status(500).send("数据库错误")
			res.send(dbData)
		})
	})
	.post((req, res, next) => {
		Model.find({ title: req.body.title }, (dbErr, dbData) => {
			if (dbData.length) {
				res.status(500).send("数据库已经存在该数据")
				return
			}
			let model = new Model({ ...req.body })
			// 错误验证
			let validateErr = model.validateSync()
			if (validateErr) {
				res.status(500).send(validateErr.errors[Object.keys(validateErr.errors)[0]].message)
				return
			}
			model.save((dbErr) => {
				if (dbErr) {
					res.status(501).send("数据库error")
					return
				}
				res.send("数据添加成功")
			})
		})
	})
	.put((req, res, next) => { })
	.delete((req, res, next) => { })

module.exports = router