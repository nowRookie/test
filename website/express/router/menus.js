import express from "express"
const eRouter = express.Router()
import menuModel from "../model/menu.js"

// 菜单
eRouter.route("/backend/menu")
	.post((req, res,) => {
		menuModel.find({ menuName: req.body.menuName }, (dbErr, dbRes) => {
			if (dbErr) {
				res.status(500).send({ code: 201, message: "数据库查询错误" })
				return
			}
			if (dbRes.length) {
				res.status(500).send({ code: 201, message: "数据库已经存在该数据" })
				return
			}
			let menu = new menuModel(req.body)
			// 错误验证
			let validateErr = menu.validateSync()
			if (validateErr) {
				res.status(500).send({ code: 201, message: validateErr.errors[Object.keys(validateErr.errors)[0]].message })
				return
			}
			menu.save((dbErr) => {
				if (dbErr) {
					res.status(501).send({ code: 201, message: "数据库error" })
					return
				}
				res.send({ code: 200, message: "数据添加成功" })
			})
		})
	})
	.put((req, res,) => {
		let menu = new menuModel(req.body)
		// 错误验证
		let validateErr = menu.validateSync()
		if (validateErr) {
			res.status(500).send(validateErr.errors[Object.keys(validateErr.errors)[0]].message)
			return
		}
		menuModel.findByIdAndUpdate(req.body.id, req.body, (dbErr, dbRes) => {
			if (dbErr) {
				res.status(500).send({ code: 200, message: "数据库查询错误" })
				return
			}
			res.send({ code: 200, message: "更新成功" })
		})
	})
	.delete((req, res,) => {
		let idList = req.body.id
		let isDbErr = false
		for (let i = 0; i < idList.length; i++) {
			menuModel.findByIdAndDelete(idList[i], (dbErr, dbRes) => {
				if (dbErr) {
					isDbErr = true;
				}
			})
		}
		if (isDbErr) {
			res.status(500).send({ code: 201, message: "数据库查询错误" })
			return
		}
		res.send({ code: 200, message: "删除成功" })
	})

// 菜单
eRouter.route("/backend/menuList")
	.get((req, res,) => {
		menuModel.find({}, (dbErr, dbRes) => {
			if (dbErr) return res.status(500).send({ code: 201, message: "数据库查询错误" })
			res.send({ code: 200, data: dbRes, message: "数据查询成功" })
		})
	})

export default eRouter