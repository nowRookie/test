const mongoose = require("mongoose")

export default function (eRouter) {
    // schema(定义数据表)，第二个参数表示使用已经存在的documents
    let Schema = mongoose.Schema({
        name: {
            type: String,
            required: true,
            minLength: 6,
            maxLength: 20,
        },
    }, { collection: "menus" })

    // mongoose规定的一个类
    let Model = mongoose.model("Model", Schema)

    // 用户帐号
    eRouter.route("/menu")
        .get((req, res,) => {
            Model.find({}, (dbErr, dbRes) => {
                if (dbErr) return res.status(500).send({ code: 201, message: "数据库查询错误" })
                res.send({ code: 200, data: dbRes, message: "数据查询成功" })
            })
        })
        .post((req, res,) => {
            Model.find({ name: req.body.name }, (dbErr, dbRes) => {
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
                    res.send("数据添加成功")
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
            Model.findByIdAndUpdate(req.body._id, req.body, (dbErr, dbRes) => {
                if (dbErr) {
                    res.status(500).send("数据库查询错误")
                    return
                }
                res.send("更新成功")
            })
        })
        .delete((req, res,) => {
            Model.findByIdAndDelete(req.body._id, (dbErr, dbRes) => {
                if (dbErr) {
                    res.status(500).send("数据库查询错误")
                    return
                }
                res.send("删除成功")
            })
        })
}