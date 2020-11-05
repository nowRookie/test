import moment from "moment"

const mongoose = require("mongoose")

export default function (eRouter) {
	// schema(定义数据表)，第二个参数表示使用已经存在的documents
	let Schema = mongoose.Schema({
		title: {
			type: String,
			required: true,
		},
		tips: {
			type: Array
		},
		summarize: {
			type: String,
			required: true,
			maxLength: 100,
		},
		content: {
			type: String,
		},
		html: {
			type: String
		},
		time: {
			type: Number
		}
	}, { collection: "notes" })

	// mongoose规定的一个类
	let Model = mongoose.model("notes", Schema)

	// 笔记列表
	eRouter.route("/backend/noteList")
		.get((req, res,) => {
			let pageSize = Number(req.query.pageSize || 10)
			let pageNo = Number(req.query.pageNo || 1)

			Model.find({}, (dbsErr, dbsRes) => {
				if (dbsErr) return res.status(500).send({ code: 201, message: "数据库查询错误" })

				let total = dbsRes.length
				Model.find({}, null, { limit: pageSize, skip: (pageNo - 1) * pageSize, sort: { time: -1 } }, (dbErr, dbRes) => {
					if (dbErr) return res.status(500).send({ code: 201, message: "数据库查询错误" })
					setTimeout(() => {
						res.send({ code: 200, pageSize, pageNo, total, data: dbRes, message: "数据查询成功" })
					}, 500)
				})
			})
		})
	// 笔记
	eRouter.route("/backend/note")
		.get((req, res,) => {
			Model.findById(req.query._id, (dbErr, dbRes) => {
				if (dbErr) return res.status(500).send({ code: 201, message: "数据库查询错误" })
				res.send({ code: 200, data: dbRes, message: "数据查询成功" })
			})
		})
		.post((req, res,) => {
			let model = new Model(Object.assign({}, req.body, { time: Date.now() }))
			// 错误验证
			let validateErr = model.validateSync()
			if (validateErr) {
				res.status(500).send({ code: 201, message: validateErr.errors[Object.keys(validateErr.errors)[0]].message })
				return
			}
			model.save((dbErr) => {
				if (dbErr) {
					res.status(501).send({ code: 201, message: "数据库error" })
					return
				}
				res.send({ code: 200, message: "数据添加成功" })
			})
		})
		.put((req, res,) => {
			let model = new Model(req.body)
			// 错误验证
			let validateErr = model.validateSync()
			if (validateErr) {
				res.status(500).send({ code: 201, message: validateErr.errors[Object.keys(validateErr.errors)[0]].message })
				return
			}
			Model.findByIdAndUpdate(req.body._id, req.body, (dbErr, dbRes) => {
				if (dbErr) {
					res.status(500).send({ code: 201, message: "数据库查询错误" })
					return
				}
				res.send({ code: 200, message: "更新成功" })
			})
		})
		.delete((req, res,) => {
			Model.findByIdAndDelete(req.body._id, (dbErr, dbRes) => {
				if (dbErr) {
					res.status(500).send({ code: 201, message: "数据库查询错误" })
					return
				}
				res.send({ code: 200, message: "删除成功" })
			})
		})
}