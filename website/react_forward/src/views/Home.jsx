import React from "react"

export default class Home extends React.Component {
	constructor(props) {
		super(props)
		this.state = {}
	}
	handleClick(e) {
	}
	render() {
		return (
			<div className="home" onClick={this.handleClick}>
				<div className="item">1111</div>
			</div>
		)
	}
}