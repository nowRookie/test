import express from "express"
const app = express()

import { port } from "./config"

// cors跨域处理
import cors from "cors"
app.use(cors())

// body-parser中间件
import bodyParser from 'body-parser'
app.use(bodyParser.json())

// multer处理上传图片
var multer = require('multer')
var upload = multer({ dest: 'uploads/images/' })

// 静态资源
app.use(express.static("static"))
app.use(express.static("uploads"))

// 路由

// ueditor百度文本编辑框
import "./plugins/ueditor.js"

// mongoose连接
import mongoose from 'mongoose';
mongoose.set('useFindAndModify', false)
mongoose.connect('mongodb://localhost/myDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// db数据库
const db = mongoose.connection;
db.on('error', () => console.error('connection error:'));
db.once("open", () => {
  app.listen(port, () => console.log(`Example app listening on port ${port}!`))
})