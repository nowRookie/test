import express from "express"
const eRouter = express.Router()
import noteModel from "../model/noteModel.js"

// 笔记列表
eRouter.route("/api/noteList")
	.get((req, res,) => {
		let pageSize = Number(req.query.pageSize || 10)
		let pageNo = Number(req.query.pageNo || 1)

		noteModel.find({ classifyId: req.query.classifyId }, (dbsErr, dbsRes) => {
			if (dbsErr) return res.status(500).send({ code: 201, message: "数据库查询错误" })

			let total = dbsRes.length
			noteModel.find({ classifyId: req.query.classifyId }, null, { limit: pageSize, skip: (pageNo - 1) * pageSize, sort: { time: -1 } }, (dbErr, dbRes) => {
				if (dbErr) return res.status(500).send({ code: 201, message: "数据库查询错误" })
				setTimeout(() => {
					res.send({ code: 200, pageSize, pageNo, total, data: dbRes, message: "数据查询成功" })
				}, 500)
			})
		})
	})
// 笔记
eRouter.route("/api/note")
	.get((req, res,) => {
		noteModel.findById(req.query._id, (dbErr, dbRes) => {
			if (dbErr) return res.status(500).send({ code: 201, message: "数据库查询错误" })
			res.send({ code: 200, data: dbRes, message: "数据查询成功" })
		})
	})
	.post((req, res,) => {
		let note = new noteModel(Object.assign({}, req.body, { time: Date.now() }))
		// 错误验证
		let validateErr = note.validateSync()
		if (validateErr) {
			res.status(500).send({ code: 201, message: validateErr.errors[Object.keys(validateErr.errors)[0]].message })
			return
		}
		note.save((dbErr) => {
			if (dbErr) {
				res.status(501).send({ code: 201, message: "数据库error" })
				return
			}
			res.send({ code: 200, message: "数据添加成功" })
		})
	})
	.put((req, res,) => {
		let note = new noteModel(req.body)
		// 错误验证
		let validateErr = note.validateSync()
		if (validateErr) {
			res.status(500).send({ code: 201, message: validateErr.errors[Object.keys(validateErr.errors)[0]].message })
			return
		}
		noteModel.findByIdAndUpdate(req.body._id, req.body, (dbErr, dbRes) => {
			if (dbErr) {
				res.status(500).send({ code: 201, message: "数据库查询错误" })
				return
			}
			res.send({ code: 200, message: "更新成功" })
		})
	})
	.delete((req, res,) => {
		noteModel.findByIdAndDelete(req.body._id, (dbErr, dbRes) => {
			if (dbErr) {
				res.status(500).send({ code: 201, message: "数据库查询错误" })
				return
			}
			res.send({ code: 200, message: "删除成功" })
		})
	})
// 最新笔记
eRouter.get("/api/recentNote", (req, res) => {
	noteModel.find({}, null, { limit: 10, sort: { createTime: -1 } }).populate({
		path: "classifyId"
	}).exec((err, dbRes) => {
		if (err) {
			res.status(500).send({ code: 201, message: "数据库查询错误" })
			return
		}
		res.send({
			code: 200, data: dbRes, message: "数据查询成功"
		})
	})
})
export default eRouter