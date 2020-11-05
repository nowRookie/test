import frontend from "./frontend/index"
import backend from "./backend/index"
import template from "./template/index"
import files from "./files"

export default (app) => {
	// app.use("/", files)
	// app.use("/backend", backend)//后台路由
	// app.use("/frontend", frontend)//前端路由
	// app.use("/template", template)//模版路由
	app.use("/", [files, backend, frontend, template])
}