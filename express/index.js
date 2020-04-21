const express = require("express")
const app = express()
const path = require("path")
console.log(path.extname("a.b.c.d"))
// 静态资源
app.use(express.static("static"))
// app.use("/static", express.static(path.join(__dirname, "static")))//这个居然有错

app.get("/", (req, res) => res.send("hello express!"))
app.listen(8000, () => console.log("express is running!"))