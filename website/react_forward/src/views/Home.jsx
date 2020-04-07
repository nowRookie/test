import React from "react"
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { Modal, Form, Input, Button, Checkbox } from 'antd';
// import _ from "lodash"
// import moment from "moment"

import Layout from "@/layout/layout"
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
    this.setState({ modalVisible: true, modalTitle: unit.title })
  }
  // menu的contextmenu事件
  onContextMenu(e, unit) {
  }
  // 右下角用户按钮，mouseover事件
  userHeaderOver() {
    this.closeTimer()
    // backward按钮
    document.getElementsByClassName("backward")[0].style.left = "-16px"
    document.getElementsByClassName("backward")[0].style.top = "-56px"
    document.getElementsByClassName("backward")[0].style.opacity = 1
    document.getElementsByClassName("backward")[0].style.transform = "rotate(-360deg)"
    // login按钮
    document.getElementsByClassName("login")[0].style.left = "-56px"
    document.getElementsByClassName("login")[0].style.top = "-16px"
    document.getElementsByClassName("login")[0].style.opacity = 1
    document.getElementsByClassName("login")[0].style.transform = "rotate(-360deg)"
    // background按钮
    document.getElementsByClassName("background")[0].style.left = "-52px"
    document.getElementsByClassName("background")[0].style.top = "42px"
    document.getElementsByClassName("background")[0].style.opacity = 1
    document.getElementsByClassName("background")[0].style.transform = "rotate(-360deg)"
  }
  // 右下角用户按钮，mouseout事件
  userHeaderOut() {
    this.state.timer = setTimeout(() => {
      // backward按钮
      document.getElementsByClassName("backward")[0].style.left = "10px"
      document.getElementsByClassName("backward")[0].style.top = "10px"
      document.getElementsByClassName("backward")[0].style.opacity = 0
      document.getElementsByClassName("backward")[0].style.transform = "rotate(0deg)"
      // login按钮
      document.getElementsByClassName("login")[0].style.left = "10px"
      document.getElementsByClassName("login")[0].style.top = "10px"
      document.getElementsByClassName("login")[0].style.opacity = 0
      document.getElementsByClassName("login")[0].style.transform = "rotate(0deg)"
      // background按钮
      document.getElementsByClassName("background")[0].style.left = "10px"
      document.getElementsByClassName("background")[0].style.top = "10px"
      document.getElementsByClassName("background")[0].style.opacity = 0
      document.getElementsByClassName("background")[0].style.transform = "rotate(0deg)"
    }, 500)
  }
  // 关闭定时器
  closeTimer() {
    clearTimeout(this.state.timer)
  }
  // 登录login
  login() {
    this.setState({
      loginModalVisible: true
    })
  }
  // 菜单menu的modal弹窗
  menuModalOk() { }
  menuModalCancel() {
    this.setState({
      menuModalVisible: false
    })
  }
  // login的modal弹窗
  loginModalOk() { this.loginModalCancel() }
  loginModalCancel() {
    this.setState({
      loginModalVisible: false
    })
  }
  // 登录弹窗失败
  onSubmitFailed() { }
  // 登录弹窗submit
  onSubmit() { }
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
          {/* 右下角登录 */}
          <div className="userTool">
            {/* 用户头像 */}
            <div className="oh userHeader" onMouseOut={this.userHeaderOut.bind(this)} onMouseOver={this.userHeaderOver.bind(this)}>userHeader icon</div>
            {/* backward */}
            <div onMouseOut={this.userHeaderOut.bind(this)} onMouseOver={this.closeTimer.bind(this)} className="backward">backward</div>
            {/* login */}
            <div onClick={this.login.bind(this)} onMouseOut={this.userHeaderOut.bind(this)} onMouseOver={this.closeTimer.bind(this)} className="login">login</div>
            {/* background */}
            <div onMouseOut={this.userHeaderOut.bind(this)} onMouseOver={this.closeTimer.bind(this)} className="background">background</div>
          </div>
          {/* 登录弹窗 */}
          <Modal
            title={this.state.loginModalTitle}
            visible={this.state.loginModalVisible}
            onOk={this.loginModalOk.bind(this)}
            onCancel={this.loginModalCancel.bind(this)}
          >
            <div>
              <Form
                labelCol={{ span: 8 }}
                name="basic"
                initialValues={{ remember: true }}
                onFinish={this.onSubmit.bind(this)}
                onFinishFailed={this.onSubmitFailed.bind(this)}
              >
                <Form.Item
                  label="Username"
                  name="username"
                  rules={[{ required: true, message: 'Please input your username!' }]}
                >
                  <Input allowClear={true} />
                </Form.Item>
                <Form.Item
                  label="Password"
                  name="password"
                  rules={[{ required: true, message: 'Please input your password!' }]}
                >
                  <Input.Password allowClear={true} />
                </Form.Item>
                <Form.Item name="remember" valuePropName="checked">
                  <Checkbox>Remember me</Checkbox>
                </Form.Item>
                <Form.Item>
                  <Button type="primary" htmlType="submit">Submit</Button>
                </Form.Item>
              </Form>
            </div>
          </Modal>
        </Layout>
      </div >
    )
  }
}