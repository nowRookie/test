import menus from "./menus"
import users from "./users"
import notes from "./notes"
import files from "./files"

export default (app) => {
	app.use("/", [files, menus, users, notes])
}