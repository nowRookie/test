import express from "express"
const eRouter = express.Router()

import notes from "./notes"
notes(eRouter)

export default eRouter