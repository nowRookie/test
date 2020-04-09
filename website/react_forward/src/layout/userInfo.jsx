import React from "react"
import { Modal, Form, Input, Button, Checkbox } from 'antd';

export default class Admin extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }
  componentDidMount() { }
  // login的modal弹窗
  loginModalOk() {
    this.props.history.push({
      pathname: "/admin"
    })
  }
  loginModalCancel() {
    this.setState({
      loginModalVisible: false
    })
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
    this.setState({
      timer: setTimeout(() => {
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
    })
  }
  // 登录弹窗失败
  onSubmitFailed() { }
  // 登录弹窗submit
  onSubmit() {
  }
  render() {
    return (
      <div>
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
      </div>
    )
  }
}