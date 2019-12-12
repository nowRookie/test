const express = require("express")
const app = express()
const path = require("path")

// 静态资源
app.use(express.static("static"))
// app.use("/static", express.static(path.join(__dirname, "static")))//这个居然有错

app.get("/", (req, res) => res.send("hello express!"))
app.listen(3000, () => console.log("express is running!"))