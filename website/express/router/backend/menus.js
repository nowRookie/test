const mongoose = require("mongoose")

export default function (eRouter) {
	// schema(定义数据表)，第二个参数表示使用已经存在的documents
	let Schema = mongoose.Schema({
		menuName: {
			type: String,
			required: true,
			minLength: 6,
			maxLength: 20,
		},
		menuUrl: {
			type: String,
			required: true,
		},
		parentId: {
			type: String,
			required: true
		}
	}, { collection: "menus" })

	// 创建虚拟值
	Schema.virtual("full").get(function () {
		return this.menuName + this.menuUrl
	})

	// mongoose规定的一个类
	let Model = mongoose.model("menus", Schema)

	// 菜单
	eRouter.route("/backend/menu")
		.post((req, res,) => {
			Model.find({ menuName: req.body.menuName }, (dbErr, dbRes) => {
				if (dbErr) {
					res.status(500).send({ code: 201, message: "数据库查询错误" })
					return
				}
				if (dbRes.length) {
					res.status(500).send({ code: 201, message: "数据库已经存在该数据" })
					return
				}
				let model = new Model(req.body)
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
		})
		.put((req, res,) => {
			let model = new Model(req.body)
			// 错误验证
			let validateErr = model.validateSync()
			if (validateErr) {
				res.status(500).send(validateErr.errors[Object.keys(validateErr.errors)[0]].message)
				return
			}
			Model.findByIdAndUpdate(req.body.id, req.body, (dbErr, dbRes) => {
				if (dbErr) {
					res.status(500).send({ code: 200, message: "数据库查询错误" })
					return
				}
				res.send({ code: 200, message: "更新成功" })
			})
		})
		.delete((req, res,) => {
			let idList = req.body.id
			idList.forEach(unit => {
				Model.findByIdAndDelete(unit, (dbErr, dbRes) => {
					if (dbErr) {
						res.status(500).send({ code: 201, message: "数据库查询错误" })
						return
					}
					res.send({ code: 200, message: "删除成功" })
				})
			})
		})

	// 菜单
	eRouter.route("/backend/menuList")
		.get((req, res,) => {
			Model.find({}, (dbErr, dbRes) => {
				if (dbErr) return res.status(500).send({ code: 201, message: "数据库查询错误" })
				res.send({ code: 200, data: dbRes, message: "数据查询成功" })
			})
		})

}