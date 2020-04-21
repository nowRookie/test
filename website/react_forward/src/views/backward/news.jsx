import React, { useState } from "react"
import {
  Table, Tag, Button, Modal, message
} from 'antd';

import _ from "lodash"
import moment from "moment"
import axios from "axios"

import { PlusOutlined } from '@ant-design/icons';

import Admin from "./Admin"
import BaseForm from "@/layout/BaseForm"

const api = "http://192.168.1.129:8001"

export default function News(props) {
  const baseFormRef = React.createRef();
  const [modalVisible, set_modalVisible] = useState(false)//menu弹窗的modal
  const [modalTitle, set_modalTitle] = useState("新增新闻")
  const [columns, set_columns] = useState([
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
  ])
  const [tableData, set_tableData] = useState([])

  const [initialValues, set_initialValues] = useState({})
  const [formItems, set_formItems] = useState([
    { title: "标题", key: "title", type: "input", data: "110", disabled: true, required: true },
    { title: "简述", key: "summarize", type: "input", data: "110" },
    { title: "时间", key: "time", type: "date", data: "120" },
    { title: "tags", key: "tags", type: "multipleSelect", dataList: [{ label: "综艺", value: 1 }, { label: "明星", value: 2 }, { label: "时尚", value: 3 }], data: "120" },
    {
      title: "图片", key: "upload", type: "upload", data: "130", required: true,
      config: {
        listType: "picture-card",
        action: `${api}/images/news/test`,
        data: {
          name: "luyi", age: 18
        },
        multiple: true
      }
    },
  ])
  const getList = (params = {}) => {
    axios({ url: `${api}/admin/news`, method: "get", params }).then(res => {
      let data = res.data
      set_tableData(data)
    }).catch(err => {
      message.error(err.response.data)
    })
  }
  getList()
  const modalOk = () => {
    baseFormRef.current.validateFields().then(value => {
      const params = {
        ...value,
        time: value.time ? moment(value.time).format("YYYY-MM-DD HH:mm:ss") : "",
        tags: _.map(value.tags, unit => {
          return unit.label
        })
      }
      console.log("value===", params)
      return
      axios({
        url: `${api}/admin/news`,
        method: "post",
        data: params
      }).then(res => {
        set_modalVisible(false)
        message.success(res.data)
        getList()
      }).catch(err => {
        set_modalVisible(false)
        message.error(err.response.data)
      })
    }).catch(err => {
    })
  }
  const modalCancel = () => {
    set_modalVisible(false)
  }
  const addOne = () => {
    set_initialValues({
      title: 33,
      time: moment("2020-09-11"),
      tags: [{ value: 2 }, { value: 3 }],
      upload: [{
        uid: '-1',
        name: 'dog.jpg',
        status: 'done',
        url: `${api}/images/dog.jpg`,
        thumbUrl: `${api}/images/dog.jpg`
      }]
    })
    set_modalVisible(true)
  }
  const onSubmit = () => { }

  return (
    <div className="news">
      <Admin {...props}>
        <div className="between">
          <div></div>
          <div>
            <Button type="primary" icon={<PlusOutlined />} onClick={addOne}>add</Button>
            {/* 菜单menu弹窗 */}
            <Modal
              destroyOnClose
              title={modalTitle}
              visible={modalVisible}
              onOk={modalOk}
              onCancel={modalCancel}
              width={800}
            >
              <div>
                <BaseForm ref={baseFormRef} name="luyi" items={formItems}
                  disabled={false}
                  initialValues={initialValues}></BaseForm>
              </div>
            </Modal>
          </div>
        </div>
        <img src={`${api}/images/dog.jpg`} alt="" width="400" />
        <Table rowKey="_id" columns={columns} dataSource={tableData} />
      </Admin>
    </div>
  )
}