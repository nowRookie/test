import React from "react"
import _ from "lodash"
import snow from "../assets/js/snow"
import "../assets/js/canvas_snow"

export default class Falling extends React.Component {
	constructor(props) {
		super(props)
		this.state = {

		}
	}
	componentDidMount() {
		snow({
			el: ".falling",
			num: 50,
			beginNum: 20,
			snowImg: require("../assets/images/snow.png")
		})
	}
	render() {
		return (
			<canvas className="falling"></canvas>
		)
	}
}