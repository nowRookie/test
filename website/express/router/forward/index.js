import express from "express"
const eRouter = express.Router()

eRouter.get("/", (req, res, next) => {
	res.send({
		name: "zhang",
		age: 18,
		gender: "male"
	})
})

export default eRouter