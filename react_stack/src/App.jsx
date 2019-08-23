import React from 'react';
import bg from "./assets/images/1.png"

export default class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      bg: bg
    }
  }
  componentDidMount() {
    this.initCanvas()
  }
  initCanvas() {
    let width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth
    let height = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight
    let canvas = document.querySelector(".bg")
    canvas.width = width
    canvas.height = height
    let ctx = canvas.getContext("2d")
    ctx.width = width
    ctx.height = height
    let bg = this.state.bg
    let image = new Image(bg)
    image.src = bg
    ctx.drawImage(image, 0, 0, width, height)
    console.log(image)
  }
  render() {
    return <div className="container">
      <canvas className="bg" ref="bg"></canvas><img src={this.state.bg} alt="" />
    </div>
  }
}
