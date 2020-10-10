import forward from "./forward/index"
import backward from "./backward/index"
import template from "./template/index"
import files from "./files"

export default (app) => {
	app.use("/", files)
	app.use("/backward", backward)//后台路由
	app.use("/forward", forward)//前端路由
	app.use("/template", template)//模版路由
}