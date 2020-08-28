import React, { useState, useEffect } from "react"
import {
  Table, Tag, Button, Modal, message, Popconfirm
} from 'antd';

import _ from "lodash"
import moment from "moment"
import axios from "axios"

import { PlusOutlined } from '@ant-design/icons';

import Admin from "../Admin"
import BaseForm from "@/layout/BaseForm"

const api = "http://192.168.1.129:8001"

export default function News(props) {
  const baseFormRef = React.createRef();
  const [modalVisible, set_modalVisible] = useState(false)//menu弹窗的modal
  const [modalType, set_modalType] = useState("add")//modal类型
  const [rowParams, set_rowParams] = useState({})
  const [modalTitle, set_modalTitle] = useState("新增新闻")

  const [initialValues, set_initialValues] = useState({})
  const [formItems,] = useState([
    { title: "标题", key: "title", type: "input", data: "110", required: true },
    { title: "简述", key: "summarize", type: "input", data: "110" },
    { title: "时间", key: "time", type: "date", data: "120" },
    { title: "tags", key: "tags", type: "multipleSelect", dataList: [{ label: "综艺", value: 1 }, { label: "明星", value: 2 }, { label: "时尚", value: 3 }], data: "120" },
    {
      title: "图片", key: "upload", type: "upload", data: "130",
      config: {
        listType: "picture-card",
        action: `${api}/images/news/test`,
        data: {
          name: "luyi", age: 18
        },
        multiple: true
      }
    },
    {
      title: "文件", key: "files", type: "uploadFile", data: "130",
      config: {
        // listType: "picture-card",
        action: `${api}/files/news`,
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
  const handleEdit = (params) => {
    axios({
      url: `${api}/admin/news`,
      method: "put",
      data: Object.assign({}, rowParams, params)
    }).then(res => {
      message.success(res.data)
      getList()
    }).catch(err => {
      message.error(err.response.data)
    }).then(() => {
      set_modalVisible(false)
    })
  }
  const handleAdd = (params) => {
    axios({
      url: `${api}/admin/news`,
      method: "post",
      data: params
    }).then(res => {
      message.success(res.data)
      getList()
    }).catch(err => {
      message.error(err.response.data)
    }).then(() => {
      set_modalVisible(false)
    })
  }
  const submit = () => {
    baseFormRef.current.validateFields().then(value => {
      const params = {
        ...value,
        time: value.time ? moment(value.time).format("YYYY-MM-DD HH:mm:ss") : "",
        upload: JSON.stringify(
          _.map(value.upload, unit => {
            return unit.urlTip ? unit.urlTip : unit.response ? unit.response.url[0] : ""
          })
        ),
        files: JSON.stringify(
          _.map(value.files, unit => {
            return unit.urlTip ? unit.urlTip : unit.response ? unit.response.url[0] : ""
          })
        ),
      }
      console.log("value===", value, "params===", params)
      // return
      if (modalType === "edit") {
        handleEdit(params)
        return
      }
      handleAdd(params)
    }).catch(err => {
    })
  }
  const modalCancel = () => {
    set_modalVisible(false)
  }
  const doAdd = () => {
    set_modalType("add")
    set_initialValues({})
    set_modalVisible(true)
  }
  const doView = ({ row }) => {
    props.history.push({
      pathname: "/admin/news_detail",
      // search: "?name=luyi",
      state: {
        ...row
      }
    })
  }
  const doEdit = ({ row }) => {
    set_modalTitle("修改新闻")
    set_modalVisible(true)
    set_modalType("edit")
    set_rowParams(row)
    set_initialValues({
      ...row,
      time: moment(row.time),
      tags: _.map(row.tags, unit => { return { label: unit.label, value: unit.value } }),
      upload: _.map(JSON.parse(row.upload), (unit, index) => {
        return {
          uid: index,
          name: 'dog.jpg',
          status: 'done',
          urlTip: unit,
          url: api + unit,
          thumbUrl: api + unit
        }
      }),
      files: _.map(JSON.parse(row.files), (unit, index) => {
        const nameArr = unit.split("/")
        return {
          uid: index,
          name: nameArr[nameArr.length - 1],
          status: 'done',
          urlTip: unit,
          url: api + unit,
          thumbUrl: api + unit
        }
      }),
    })
  }
  const doRemove = ({ row }) => {
    axios({
      url: `${api}/admin/news`,
      method: "delete",
      data: row
    }).then(res => {
      message.success(res.data)
      getList()
    }).catch(err => {
      message.error(err.response.data)
    })
  }
  const [columns,] = useState([
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
      render(tags, row, index) {
        return (
          <span>
            {(tags || []).map((tag, num) => {
              return (
                <Tag color="green" key={`tag${row._id}${num}`}>
                  {tag.label}
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
      render(value, row, index) {
        return (
          <div>
            <span className="a blue" onClick={() => doView({ value, row, index })}>详情</span>
            <span className="a blue ml20" onClick={() => doEdit({ value, row, index })}>修改</span>
            <Popconfirm
              title="确定删除?" okText="确认" cancelText="取消"
              onConfirm={() => doRemove({ value, row, index })}
            >
              <span className="a blue ml20">删除</span></Popconfirm>
          </div>
        )
      }
    }
  ])
  const [tableData, set_tableData] = useState([])

  useEffect(() => {
    getList()
    return () => { }
  }, [])

  return (
    <div className="news">
      <Admin {...props}>
        <div className="between">
          <div></div>
          <div>
            <Button type="primary" icon={<PlusOutlined />} onClick={doAdd}>add</Button>
            {/* 菜单menu弹窗 */}
            <Modal
              destroyOnClose
              title={modalTitle}
              visible={modalVisible}
              onOk={submit}
              onCancel={modalCancel}
              cancelText="取消"
              okText="确认"
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