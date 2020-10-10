import moment from "moment"
module.exports = (options) => {
	return (req, res, next) => {
		let time = moment(new Date()).format("YYYY-MM-DD HH:mm:ss")
		console.log("===================")
		console.log(time)
		console.log("url=", req.url)
		console.log("headers=", req.headers)
		console.log("params=", req.params)
		console.log("query=", req.query)
		console.log("body=", req.body)
		console.log("===================")
		next()
	}
}