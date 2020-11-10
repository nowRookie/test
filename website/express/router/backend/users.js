import Model from "../../model/user"

export default function (eRouter) {
    // 用户帐号
    eRouter.route("/backend/users")
        .get((req, res,) => {
            Model.find(req.query, (dbErr, dbRes) => {
                if (dbErr) return res.status(500).send({ code: 201, message: "数据库查询错误" })
                res.send(dbRes)
            })
        })
        .post((req, res,) => {
            Model.find({ username: req.body.username }, (dbErr, dbRes) => {
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
    // 登录
    eRouter.post("/backend/login", (req, res) => {
        Model.find({ username: req.body.username }, (dbErr, dbRes) => {
            if (dbErr) return res.status(500).send({ code: 201, message: "数据库查询错误" })
            if (!dbRes.length) {
                res.status(500).send({ code: 201, message: "数据库不存在该用户" })
                return
            }
            let user = dbRes[0]
            if (user.password !== req.body.password) {
                res.status(500).send({ code: 201, message: "密码错误" })
                return
            }
            res.send({ code: 200, data: { username: user.username, password: user.password }, message: "请求成功" })
        })
    })
}