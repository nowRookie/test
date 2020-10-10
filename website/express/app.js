import express from "express"
const app = express()
import path from "path"

import { port } from "./config"

// cors跨域处理
import cors from "cors"
app.use(cors())

// body-parser中间件
import bodyParser from 'body-parser'
app.use(bodyParser.json())

// middleware打印log信息
import log from "./middleware/log"
app.use(log())

// 静态资源
app.set('view engine', 'hbs')
app.set("views", process.cwd() + "/template")
app.use(express.static("static"))
app.use(express.static("uploads"))
app.use("/virtual", express.static(path.join(__dirname, "static")))

// 路由
import router from "./router/index"
router(app)

// ueditor百度文本编辑框
import ueditor from "./plugins/ueditor.js"
ueditor(app)

// mongoose连接
import mongoose from 'mongoose';
mongoose.set('useFindAndModify', false)
mongoose.connect('mongodb://localhost/websiteDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// db数据库
const db = mongoose.connection;
db.on('error', () => console.error('connection error:'));
db.once("open", () => {
  app.listen(port, () => console.log(`Example app listening on port ${port}!`))
})