const mongoose = require("mongoose")

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
    },
    willFrontShow: {
        type: Boolean,
    }
}, {
    collection: "menus",
    minimize: false,//将会保存空对象
    timestamps: { createdAt: 'createTime', updatedAt: "updateTime" }
})

// 创建虚拟值
Schema.virtual("full").get(function () {
    return this.menuName + this.menuUrl
})
// 创建实例方法new Model().findSimilarTypes(function(dbErr,dbRes){})
Schema.methods.findSimilarTypes = function (cb) {
    return this.model('menus').find({ type: this.type }, cb);
};
// 创建静态方法Model.findByName(name,function(dbErr,dbRes){})
Schema.statics.findByName = function (name, cb) {
    return this.find({ name: new RegExp(name, 'i') }, cb);
};
// 创建链式查询Model.find().byName('fido')
Schema.query.byName = function (name) {
    return this.find({ name: new RegExp(name, 'i') });
};

// mongoose规定的一个类
let Model = mongoose.model("menus", Schema)

export default Model