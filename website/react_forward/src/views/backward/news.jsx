import React from "react"
import {
  Table, Tag, Button, Modal
} from 'antd';

import _ from "lodash"
import moment from "moment"
import axios from "axios"

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
                {(tags || []).map(tag => {
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
      tableData: [],

      formItems: [
        { title: "标题", key: "title", type: "input", data: "110" },
        { title: "简述", key: "summarize", type: "input", data: "110" },
        { title: "时间", key: "time", type: "date", data: "120" },
        { title: "tags", key: "tags", type: "multipleSelect", dataList: [{ label: "综艺", value: 1 }, { label: "明星", value: 2 }, { label: "时尚", value: 3 }], data: "120" },
        { title: "图片", key: "upload", type: "upload", data: "130" },
      ]
    }
  }
  componentDidMount() {
    this.getList()
  }
  getList(params = {}) {
    axios({ url: "http://192.168.1.129:8001/admin/news", method: "get", params }).then(res => {
      console.log("axios res===", res)
      let data = res.data
      this.setState({
        tableData: data
      })
    }).catch(err => {
      console.log("axios err===", err)
    })
  }
  modalOk() {
    console.log(this.BaseFormRef)
    this.BaseFormRef.current.validateFields().then(value => {
      const params = {
        ...value,
        time: moment(value.time).format("YYYY-MM-DD HH:mm:ss"),
        tags: _.map(value.tags, unit => {
          return unit.label
        })
      }
      console.log("value===", params)
      // return
      axios({
        url: "http://192.168.1.129:8001/admin/news",
        method: "post",
        data: params
      }).then(res => {
        console.log("axios res===", res)
      }).catch(err => {
        console.log("axios err===", err)
      })
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
          <Table rowKey="_id" columns={this.state.columns} dataSource={this.state.tableData} />
        </Admin>
      </div>
    )
  }
}