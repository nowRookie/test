import React from "react"
export default class Layout extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }
  componentDidMount() {
  }
  render() {
    return (
      <div className="container">
        <canvas style={{ position: "absolute", left: 0, top: 0, zIndex: 500 }}></canvas>
        <div className="menu" style={{ position: "absolute", left: 0, top: 0, zIndex: 501, width: "100%", height: "100%", }}>
          {this.props.children}
        </div>
      </div>
    )
  }
}