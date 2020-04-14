import React from "react"
import {
  Table, Tag, Button, Modal
} from 'antd';

import { PlusOutlined } from '@ant-design/icons';

import Admin from "./Admin"
import BaseForm from "@/layout/BaseForm"

export default class News extends React.Component {
  BaseFormRef = React.createRef();
  constructor(props) {
    super(props)
    this.state = {
      // menu弹窗的modal
      modalVisible: false,
      modalTitle: "新增新闻",

      // table相关
      columns: [
        {
          title: '标题',
          dataIndex: 'title',
        },
        {
          title: '简述',
          dataIndex: 'summarize',
        },
        {
          title: '时间',
          dataIndex: 'time',
        },
        {
          title: 'tags',
          dataIndex: 'tags',
          render(tags) {
            return (
              <span>
                {tags.map(tag => {
                  return (
                    <Tag color="green" key={tag}>
                      {tag}
                    </Tag>
                  );
                })}
              </span>
            )
          },
        },
        {
          title: "操作",
          dataIndex: 'operate',
          render(val) {
            return (
              <div>
                <span className="a blue">修改</span>
              </div>
            )
          }
        }
      ],
      dataSource: [{
        key: 1,
        title: "标题1",
        time: "2020-04-09",
        sketch: `London, Park Lane no. 1`,
        summarize: "概述",
        tags: ["综艺", "明星", "时尚"],
      }],

      formItems: [
        { title: "测试input", key: "input", type: "input", data: "110" },
        { title: "测试select", key: "select", type: "select", dataList: [], data: "120" },
        { title: "测试multipleSelect", key: "multipleSelect", type: "multipleSelect", data: "120" },
        { title: "测试autoComplete", key: "autoComplete", type: "autoComplete", data: "120" },
        { title: "测试textarea", key: "textarea", type: "textarea", data: "120" },
        { title: "测试date", key: "date", type: "date", data: "120" },
        { title: "测试cascader", key: "cascader", type: "cascader", data: "120" },
        { title: "测试number", key: "number", type: "number", data: "120" },
        { title: "测试switch", key: "switch", type: "switch", data: "120" },
        { title: "测试slider", key: "slider", type: "slider", data: "120" },
        { title: "测试radio", key: "radio", type: "radio", data: "120" },
        { title: "测试radioButton", key: "radioButton", type: "radioButton", data: "120" },
        { title: "测试radionButton", key: "radionButton", type: "radionButton", data: "120" },
        { title: "测试checkbox", key: "checkbox", type: "checkbox", data: "120" },
        { title: "测试rate", key: "rate", type: "rate", data: "120" },
        { title: "测试upload", key: "upload", type: "upload", data: "130" },
        { title: "测试dragger", key: "dragger", type: "dragger", data: "120" },
      ]
    }
  }
  componentDidMount() {
    setTimeout(() => {
      let item = this.state.formItems[1]
      item.dataList = [{ label: "测试1", value: "测试1" }, { label: "测试2", value: "测试2" }]
      this.setState({
      })
    }, 3000)
  }
  modalOk() {
    console.log(this.BaseFormRef)
    this.BaseFormRef.current.validateFields().then(value => {
      console.log("value===", value)
    }).catch(err => {
      console.log("err===", err)
    })
  }
  modalCancel() {
    this.setState({
      modalVisible: false
    })
  }
  addOne() {
    this.setState({
      modalVisible: true
    })
  }
  onSubmit() { }
  render() {
    return (
      <div className="news">
        <Admin {...this.props}>
          <div className="between">
            <div></div>
            <div>
              <Button type="primary" icon={<PlusOutlined />} onClick={this.addOne.bind(this)}>add</Button>
              {/* 菜单menu弹窗 */}
              <Modal
                title={this.state.modalTitle}
                visible={this.state.modalVisible}
                onOk={this.modalOk.bind(this)}
                onCancel={this.modalCancel.bind(this)}
                width={800}
              >
                <div>
                  <BaseForm ref={this.BaseFormRef} name="luyi" items={this.state.formItems} initialValues={{ rate: 4.5 }}></BaseForm>
                </div>
              </Modal>
            </div>
          </div>
          <Table columns={this.state.columns} dataSource={this.state.dataSource} />
        </Admin>
      </div>
    )
  }
}