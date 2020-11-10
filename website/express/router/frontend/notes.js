const mongoose = require("mongoose")

export default function (eRouter) {
	// schema(定义数据表)，第二个参数表示使用已经存在的documents
	let Schema = mongoose.Schema({}, { collection: "notes" })

	// mongoose规定的一个类
	let Model = mongoose.model("frontendNotes", Schema)

	// 笔记列表
	eRouter.route("/frontend/noteList")
		.get((req, res,) => {
			let pageSize = Number(req.query.pageSize || 10)
			let pageNo = Number(req.query.pageNo || 1)

			Model.find({ classifyId: req.query.classifyId }, (dbsErr, dbsRes) => {
				if (dbsErr) return res.status(500).send({ code: 201, message: "数据库查询错误" })

				let total = dbsRes.length
				Model.find({ classifyId: req.query.classifyId }, null, { limit: pageSize, skip: (pageNo - 1) * pageSize, sort: { time: -1 } }, (dbErr, dbRes) => {
					if (dbErr) return res.status(500).send({ code: 201, message: "数据库查询错误" })
					setTimeout(() => {
						res.send({ code: 200, pageSize, pageNo, total, data: dbRes, message: "数据查询成功" })
					}, 500)
				})
			})
		})
	// 笔记
	eRouter.route("/frontend/note")
		.get((req, res,) => {
			Model.findById(req.query._id, (dbErr, dbRes) => {
				if (dbErr) return res.status(500).send({ code: 201, message: "数据库查询错误" })
				res.send({ code: 200, data: dbRes, message: "数据查询成功" })
			})
		})
	// 最新文章
	eRouter.route("/frontend/recentNote").get((req, res) => {
		Model.find({}, null, { limit: 10, sort: { time: -1 } }, (dbErr, dbRes) => {
			if (dbErr) return res.status(500).send({ code: 201, message: "数据库查询错误" })
			res.send({ code: 200, data: dbRes, message: "数据查询成功" })
		})
	})
}