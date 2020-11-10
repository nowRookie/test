const mongoose = require("mongoose")

// schema(定义数据表)，第二个参数表示使用已经存在的documents
let Schema = mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
        minLength: 6,
        maxLength: 20,
        validate: {
            validator: (value) => {
                return /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,20}$/.test(value)
            },
            message: "tags 必填"
        }
    }
}, {
    collection: "users",
    minimize: false,//将会保存空对象
    timestamps: { createdAt: 'createTime', updatedAt: "updateTime" }
})


// mongoose规定的一个类
let Model = mongoose.model("users", Schema)

export default Model