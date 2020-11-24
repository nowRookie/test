const mongoose = require("mongoose")

// schema(定义数据表)，第二个参数表示使用已经存在的documents
let Schema = mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    classifyId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "menus"
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
    },
    wordIndex: {
        type: String,
        index: true
    }
}, {
    collection: "notes",
    autoIndex: true,//测试 index
    minimize: false,//将会保存空对象
    timestamps: { createdAt: 'createTime', updatedAt: "updateTime" }
})

Schema.index({ html: 1, time: -1 })

// mongoose规定的一个类
let Model = mongoose.model("notes", Schema)

Model.on('index', function (error) {
    if (error) {
        console.log(error)
    }
});

export default Model