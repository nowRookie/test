import React from "react"
import { Menu, Button } from 'antd';

import UserInfo from "@/layout/UserInfo"

import {
  AppstoreOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  PieChartOutlined,
  DesktopOutlined,
  // ContainerOutlined,
  // MailOutlined,
} from '@ant-design/icons';
import {
  // BrowserRouter as Router,
  // Switch,
  // Route,
  Link
} from "react-router-dom";

const { SubMenu } = Menu;

export default class Admin extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      collapsed: false
    }
  }
  componentDidMount() {
  }
  toggleCollapsed = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  }
  render() {
    return (
      <div className="admin row">
        {/* menu */}
        <div style={{ flex: "0 1 auto", }}>
          <div style={{ height: "100%", display: "flex", flexDirection: "column" }}>
            <Menu
              defaultSelectedKeys={[]} mode="inline" theme="dark" inlineCollapsed={this.state.collapsed}
              style={{ flex: "1", maxWidth: "200px" }}
            >
              <Menu.Item key="1">
                <PieChartOutlined />
                <Link className="collapsable" to="/admin/news">新闻</Link>
              </Menu.Item>
              <Menu.Item key="2">
                <DesktopOutlined />
                <span>背景</span>
              </Menu.Item>
              <SubMenu
                key="sub2"
                title={
                  <span>
                    <AppstoreOutlined />
                    <span>menu菜单</span>
                  </span>
                }
              >
                <Menu.Item key="5-1">node.js</Menu.Item>
                <Menu.Item key="5-2">Typescript</Menu.Item>
                <SubMenu key="5-3" title="canvas">
                  <Menu.Item key="5-3-1">1、canvas动画</Menu.Item>
                  <Menu.Item key="5-3-2">2、canvas基本用法</Menu.Item>
                </SubMenu>
              </SubMenu>
            </Menu>
            <Button type="primary" onClick={this.toggleCollapsed} style={{ height: "40px" }}>
              {React.createElement(this.state.collapsed ? MenuUnfoldOutlined : MenuFoldOutlined)}
            </Button>
          </div>
        </div>
        {/* container */}
        <div style={{ flex: "1", padding: "20px", overflow: "hidden scroll" }}>
          {
            this.props.children ?
              <div>{this.props.children}</div>
              : <div>admin后台</div>
          }
        </div>
        <UserInfo {...this.props}></UserInfo>
      </div>)
  }
}