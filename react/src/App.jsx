import React from 'react';
import { Switch, Route, Link } from "react-router-dom"
import _ from "lodash"
import Falling from "./components/falling"
import routersArr from "./source/router.js"
import { bgImg1, bgImg2 } from "./source/images"

const routers = [];
(function deep(arr) {
  _.map(arr, (item, i) => {
    routers.push(item)
    if (item.children && item.children.length) {
      _.each(item.children, (list, index) => {
        if (item.path !== "/") {
          list.path = item.path + list.path
        }
      })
      deep(item.children)
    }
  })
})(routersArr)

export default class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      width: window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth,
      height: window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight,
      bgImg: bgImg2,//背景图片
    }
  }
  componentDidMount() {
    this.initBgImg()
  }
  // 初始化背景图片
  initBgImg() {
    let width = this.state.width
    let height = this.state.height
    let canvas = document.querySelector(".bgImg")
    canvas.width = width
    canvas.height = height
    let ctx = canvas.getContext("2d")
    ctx.width = width
    ctx.height = height
    let bgImg = this.state.bgImg
    let image = new Image(bgImg)
    image.src = bgImg
    image.onload = function () {
      ctx.drawImage(image, 0, 0, width, height, 0, 0, width, height)
    }
  }
  // 阻止右键点击
  stopRightClick(e) {
    e.preventDefault()
  }
  render() {
    return (
      <div className="container" onContextMenu={this.stopRightClick.bind(this)}>
        {/* 花絮 */}
        <Falling></Falling>
        {/* 背景图 */}
        <canvas className="block bgImg" ref="bgImg"></canvas>
        {/* 内容页 */}
        <div className="content-page">
          <Switch>
            {
              _.map(routers, (item, i) => {
                return <Route path={item.path} key={item.key} component={item.component} exact={item.exact}></Route>
              })
            }
          </Switch>
        </div>
        {/* 底部 */}
        <footer>
          <i className="cf microsoft">&#xe617;</i>
        </footer>
      </div>
    )
  }
}
