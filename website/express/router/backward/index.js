import express from "express"
const eRouter = express.Router()
const mongoose = require("mongoose")

// schema(定义数据表)
let Schema = mongoose.Schema({
	title: { type: String, required: [true, "title 必填"] },
	summarize: { type: String, required: [true, "summarize 必填"] },
	time: { type: Date, required: [true, "time 必填"] },
	tags: {
		type: [mongoose.Schema.Types.Mixed],
		validate: {
			validator: (value) => { return value.length },
			message: "tags 必填"
		}
	},
	upload: String,
	files: {
		type: String,
		validate: {
			validator: (value, cb) => {
				let arr = JSON.parse(value)
				return arr.length == 1
			},
			message: "内容文件有误，仅支持一个内容文件"
		}
	}
}, { collection: "news" })

// 数据表定义方法
Schema.methods.test = () => {
	console.log("testing!!!")
}

// mongoose规定的一个类
let Model = mongoose.model("Model", Schema)

// 调用数据表方法
let testModel = new Model()
testModel.test()

// 新闻
eRouter.route("/news")
	.get((req, res, next) => {
		Model.find(req.query, (dbErr, dbRes) => {
			if (dbErr) return res.status(500).send("数据库错误")
			res.send(dbRes)
		})
	})
	.post((req, res, next) => {
		Model.find({ title: req.body.title }, (dbErr, dbRes) => {
			if (dbErr) {
				res.status(500).send("数据库查询错误")
				return
			}
			if (dbRes.length) {
				res.status(500).send("数据库已经存在该数据")
				return
			}
			let model = new Model(req.body)
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
	.put((req, res, next) => {
		let model = new Model(req.body)
		// 错误验证
		let validateErr = model.validateSync()
		if (validateErr) {
			res.status(500).send(validateErr.errors[Object.keys(validateErr.errors)[0]].message)
			return
		}
		Model.findByIdAndUpdate(req.body._id, req.body, (dbErr, dbRes) => {
			if (dbErr) {
				res.status(500).send("数据库查询错误")
				return
			}
			res.send("更新成功")
		})
	})
	.delete((req, res, next) => {
		Model.findByIdAndDelete(req.body._id, (dbErr, dbRes) => {
			if (dbErr) {
				res.status(500).send("数据库查询错误")
				return
			}
			res.send("删除成功")
		})
	})

export default eRouter