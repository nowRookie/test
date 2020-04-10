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
      modalTitle: "",

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
      }]
    }
  }
  componentDidMount() { }
  modalOk() {
    console.log(this.BaseFormRef)
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
                  <BaseForm ref={this.BaseFormRef} name="luyi"></BaseForm>
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