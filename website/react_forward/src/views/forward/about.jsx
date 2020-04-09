import React from "react"
import { Menu, Button } from 'antd';
import {
  AppstoreOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  PieChartOutlined,
  DesktopOutlined,
  ContainerOutlined,
  MailOutlined,
} from '@ant-design/icons';
import {
  // BrowserRouter as Router,
  // Switch,
  // Route,
  Link
} from "react-router-dom";

const { SubMenu } = Menu;

export default class About extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      collapsed: false
    }
  }

  toggleCollapsed = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  }
  render() {
    return (
      <div className="about row">
        <div style={{ flex: "0 1 auto", }}>
          <div style={{ height: "100%", display: "flex", flexDirection: "column" }}>
            <Menu
              defaultSelectedKeys={['1']} defaultOpenKeys={['sub1']} mode="inline" theme="dark" inlineCollapsed={this.state.collapsed}
              style={{ flex: "1", maxWidth: "200px" }}
            >
              <Menu.Item key="1">
                <PieChartOutlined />
                <span>第1章 发郭德纲电饭锅电饭锅电饭锅电饭锅大股东风格豆腐干的法国等国的股份大股东风格豆腐干的</span>
              </Menu.Item>
              <Menu.Item key="2">
                <DesktopOutlined />
                <Link className="collapsable" to="/admin/news">新闻</Link>
              </Menu.Item>
              <Menu.Item key="3">
                <ContainerOutlined />
                <span>第3章</span>
              </Menu.Item>
              <SubMenu
                key="sub1"
                title={
                  <span>
                    <MailOutlined />
                    <span>第4章</span>
                  </span>
                }
              >
                <Menu.Item key="4-1">第1小节</Menu.Item>
                <Menu.Item key="4-2">第2小节</Menu.Item>
                <Menu.Item key="4-3">第3小节</Menu.Item>
                <Menu.Item key="4-4">第4小节</Menu.Item>
              </SubMenu>
              <SubMenu
                key="sub2"
                title={
                  <span>
                    <AppstoreOutlined />
                    <span>第5章</span>
                  </span>
                }
              >
                <Menu.Item key="5-1">第1节</Menu.Item>
                <Menu.Item key="5-2">第2节</Menu.Item>
                <SubMenu key="5-3" title="第3节">
                  <Menu.Item key="5-3-1">第3-1节</Menu.Item>
                  <Menu.Item key="5-3-2">第3-2节</Menu.Item>
                </SubMenu>
              </SubMenu>
            </Menu>
            <Button type="primary" onClick={this.toggleCollapsed} style={{ height: "40px" }}>
              {React.createElement(this.state.collapsed ? MenuUnfoldOutlined : MenuFoldOutlined)}
            </Button>
          </div>

        </div>
        <div>112</div>
      </div>)
  }
}