import React from "react"
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { Modal, } from 'antd';
// import _ from "lodash"
// import moment from "moment"
// import axios from "axios"

import Layout from "@/layout/Layout"
import UserInfo from "@/layout/UserInfo"
import icon1 from "@/assets/img/logo.svg"

export default class Home extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      // menu弹窗的modal
      menuModalVisible: false,
      menuModalTitle: "",

      // login弹窗的modal
      loginModalVisible: false,
      loginModalTitle: "",

      timer: null,//右下角登录按钮的定时器

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
    // document阻止右键点击
    document.addEventListener("contextmenu", (e) => {
      e.preventDefault()
    })
  }
  onDoubleClick(unit) {
    this.setState({ menuModalVisible: true, menuModalTitle: unit.title })
  }
  // menu的contextmenu事件
  onContextMenu(e, unit) {
  }
  // 菜单menu的modal弹窗
  menuModalOk() { }
  menuModalCancel() {
    this.setState({
      menuModalVisible: false
    })
  }
  // menu弹窗，出来的分类，路由跳转
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
          {/* 菜单menu弹窗 */}
          <Modal
            title={this.state.menuModalTitle}
            visible={this.state.menuModalVisible}
            onOk={this.menuModalOk}
            onCancel={this.menuModalCancel.bind(this)}
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
          {/* 右下角用户信息 */}
          <UserInfo {...this.props}></UserInfo>
        </Layout>
      </div >
    )
  }
}