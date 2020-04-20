const express = require('express')
const app = express()
const port = 8001

// cors跨域处理
const cors = require("cors")
app.use(cors())

// body-parser中间件
// const bodyParser = require('body-parser')
// app.use(bodyParser.json())

// multer中间件(主要用来处理form上传文件)
const multer = require('multer')
const upload = multer()
app.use(upload.any())

// 路由
const forwardRouter = require("./router/forward/home")
const backwardRouter = require("./router/backward/admin")
app.use("/", forwardRouter)
app.use("/admin", backwardRouter)

// mongoose连接
const mongoose = require('mongoose');
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