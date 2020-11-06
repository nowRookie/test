import express from "express"
const eRouter = express.Router()

// 用户
import users from "./users.js"
users(eRouter)

// 菜单
import menus from "./menus.js"
menus(eRouter)

// 笔记
import notes from "./notes.js"
notes(eRouter)

export default eRouter