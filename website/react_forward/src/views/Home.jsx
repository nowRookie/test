import React from "react"
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { Modal, Button } from 'antd';
// import _ from "lodash"
// import moment from "moment"

import Layout from "@/layout/layout"
import icon1 from "@/assets/img/logo.svg"
import icon2 from "@/assets/img/dog.jpg"

export default class Home extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      // modal
      modalVisible: false,
      modalTitle: "",

      // menu图标
      menu: [
        { icon: icon1, title: "学习笔记", name: "学习笔记", coordinate: [] },
        { icon: icon1, title: "学习笔记", name: "学习笔记", coordinate: [] },
        { icon: icon1, title: "学习笔记", name: "学习笔记", coordinate: [] },
        { icon: icon1, title: "学习笔记", name: "学习笔记", coordinate: [] },
        { icon: icon1, title: "学习笔记", name: "学习笔记", coordinate: [] },
        { icon: icon1, title: "学习笔记", name: "学习笔记", coordinate: [] },
        { icon: icon1, title: "学习笔记", name: "学习笔记", coordinate: [] },
        { icon: icon1, title: "学习笔记", name: "学习笔记", coordinate: [] },
        { icon: icon1, title: "学习笔记", name: "学习笔记", coordinate: [] },
        { icon: icon1, title: "学习笔记", name: "学习笔记", coordinate: [] },
        { icon: icon1, title: "学习笔记", name: "学习笔记", coordinate: [] },
        { icon: icon1, title: "学习笔记", name: "学习笔记", coordinate: [] },
        { icon: icon1, title: "学习笔记", name: "学习笔记", coordinate: [] },
        { icon: icon1, title: "学习笔记", name: "学习笔记", coordinate: [] },
        { icon: icon1, title: "学习笔记", name: "学习笔记", coordinate: [] },
        { icon: icon1, title: "学习笔记", name: "学习笔记", coordinate: [] },
        { icon: icon1, title: "学习笔记", name: "学习笔记", coordinate: [] },
        { icon: icon1, title: "学习笔记", name: "学习笔记", coordinate: [] },
        { icon: icon1, title: "学习笔记", name: "学习笔记", coordinate: [] },
        { icon: icon1, title: "学习笔记", name: "学习笔记", coordinate: [] },
      ]
    }
  }
  componentDidMount() {
    // let clientWidth = document.body.clientWidth
    let clientHeight = document.body.clientHeight || window.innerHeight
    if (clientHeight > 900) {
      let row = 7
      this.state.menu.forEach((unit, index) => {
        unit.coordinate = [Math.floor(index / row), index % row]
      })
      this.setState({
        menu: this.state.menu
      })
    }
    // 阻止右键点击
    document.addEventListener("contextmenu", (e) => {
      e.preventDefault()
    })
  }
  onDoubleClick(unit) {
    this.setState({ modalVisible: true, modalTitle: unit.title })
  }
  onContextMenu(e, unit) {
  }
  userHeaderOver() {
  }
  modalOk() { }
  modalCancel() {
    this.setState({
      modalVisible: false
    })
  }
  menuTo() {
    this.props.history.push({
      pathname: "/about"
    })
  }
  render() {
    return (
      <div className="home">
        <Layout>
          {/* 菜单menu */}
          {
            this.state.menu.map((unit, index) => {
              return (
                <div className="tc icon" key={index} onContextMenu={e => this.onContextMenu(e, unit)} onDoubleClick={e => this.onDoubleClick(unit)} style={{ userSelect: "none", width: "100px", height: "100px", position: "absolute", left: `${(unit.coordinate[0] + 1) * 20 + unit.coordinate[0] * 100}px`, top: `${(unit.coordinate[1] + 1) * 20 + unit.coordinate[1] * 100}px` }} >
                  <img src={unit.icon} alt="" style={{ userDrag: "none", width: "70px", height: "70px" }} />
                  <div>{unit.title}</div>
                </div>
              )
            })
          }
          <Modal
            title={this.state.modalTitle}
            visible={this.state.modalVisible}
            onOk={this.modalOk}
            onCancel={this.modalCancel.bind(this)}
          >
            <div>
              <span className="blue a mt20 ml20" onClick={e => this.menuTo()}>canvas</span>
              <span className="blue a mt20 ml20" onClick={e => this.menuTo()}>Typescript</span>
              <span className="blue a mt20 ml20" onClick={e => this.menuTo()}>js</span>
              <span className="blue a mt20 ml20" onClick={e => this.menuTo()}>node</span>
              <span className="blue a mt20 ml20" onClick={e => this.menuTo()}>webpack</span>
            </div>
          </Modal>
          {/* 右上角日历 */}
          <div className="calendar">
            <Calendar
              calendarType="US"
              locale="en"
              onChange={this.onChange}
              value={this.state.date}
            />
          </div>
          {/* 右下角登录 */}
          <div className="userTool">
            <div className="oh userHeader" onMouseOver={this.userHeaderOver.bind(this)}>userHeader icon</div>
            <div className="backward">backward</div>
            <div className="login">login</div>
            <div className="background">background</div>
          </div>
        </Layout>
      </div>
    )
  }
}