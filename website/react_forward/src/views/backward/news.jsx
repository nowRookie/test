import React from "react"
import {
  Table, Tag, Button, Modal,
  Form,
  Select,
  InputNumber,
  Switch,
  Radio,
  Slider,
  Upload,
  Rate,
  Checkbox,
  Row,
  Col,
} from 'antd';

import { PlusOutlined, UploadOutlined, InboxOutlined } from '@ant-design/icons';
import Admin from "./admin"

const { Option } = Select;
const normFile = e => {
  console.log('Upload event:', e);
  if (Array.isArray(e)) {
    return e;
  }
  return e && e.fileList;
};

export default class News extends React.Component {
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
  modalOk() { }
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
        <Admin>
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
              >
                <div>
                  <Form
                    name="validate_other"
                    onFinish={this.onSubmit.bind(this)}
                    initialValues={{
                      rate: 3.5,
                    }}
                  >
                    <Form.Item label="Plain Text">
                      <span className="ant-form-text">China</span>
                    </Form.Item>
                    <Form.Item
                      name="select"
                      label="Select"
                      hasFeedback
                      rules={[{ required: true, message: 'Please select your country!' }]}
                    >
                      <Select placeholder="Please select a country">
                        <Option value="china">China</Option>
                        <Option value="usa">U.S.A</Option>
                      </Select>
                    </Form.Item>
                    <Form.Item
                      name="select-multiple"
                      label="Select[multiple]"
                      rules={[{ required: true, message: 'Please select your favourite colors!', type: 'array' }]}
                    >
                      <Select mode="multiple" placeholder="Please select favourite colors">
                        <Option value="red">Red</Option>
                        <Option value="green">Green</Option>
                        <Option value="blue">Blue</Option>
                      </Select>
                    </Form.Item>
                    <Form.Item label="InputNumber">
                      <Form.Item name="input-number" noStyle>
                        <InputNumber min={1} max={10} />
                      </Form.Item>
                      <span className="ant-form-text"> machines</span>
                    </Form.Item>
                    <Form.Item name="switch" label="Switch" valuePropName="checked">
                      <Switch />
                    </Form.Item>
                    <Form.Item name="slider" label="Slider">
                      <Slider
                        marks={{
                          0: 'A',
                          20: 'B',
                          40: 'C',
                          60: 'D',
                          80: 'E',
                          100: 'F',
                        }}
                      />
                    </Form.Item>
                    <Form.Item name="radio-group" label="Radio.Group">
                      <Radio.Group>
                        <Radio value="a">item 1</Radio>
                        <Radio value="b">item 2</Radio>
                        <Radio value="c">item 3</Radio>
                      </Radio.Group>
                    </Form.Item>
                    <Form.Item name="radio-button" label="Radio.Button">
                      <Radio.Group>
                        <Radio.Button value="a">item 1</Radio.Button>
                        <Radio.Button value="b">item 2</Radio.Button>
                        <Radio.Button value="c">item 3</Radio.Button>
                      </Radio.Group>
                    </Form.Item>
                    <Form.Item name="checkbox-group" label="Checkbox.Group">
                      <Checkbox.Group>
                        <Row>
                          <Col span={8}>
                            <Checkbox value="A" style={{ lineHeight: '32px' }}>A</Checkbox>
                          </Col>
                          <Col span={8}>
                            <Checkbox value="B" style={{ lineHeight: '32px' }} disabled>B</Checkbox>
                          </Col>
                          <Col span={8}>
                            <Checkbox value="C" style={{ lineHeight: '32px' }}>C</Checkbox>
                          </Col>
                          <Col span={8}>
                            <Checkbox value="D" style={{ lineHeight: '32px' }}>D</Checkbox>
                          </Col>
                          <Col span={8}>
                            <Checkbox value="E" style={{ lineHeight: '32px' }}>E</Checkbox>
                          </Col>
                          <Col span={8}>
                            <Checkbox value="F" style={{ lineHeight: '32px' }}>F</Checkbox>
                          </Col>
                        </Row>
                      </Checkbox.Group>
                    </Form.Item>
                    <Form.Item name="rate" label="Rate">
                      <Rate />
                    </Form.Item>
                    <Form.Item
                      name="upload"
                      label="Upload"
                      valuePropName="fileList"
                      getValueFromEvent={normFile}
                      extra="extra info"
                    >
                      <Upload name="logo" action="/upload.do" listType="picture">
                        <Button><UploadOutlined /> Click to upload</Button>
                      </Upload>
                    </Form.Item>
                    <Form.Item label="Dragger">
                      <Form.Item name="dragger" valuePropName="fileList" getValueFromEvent={normFile} noStyle>
                        <Upload.Dragger name="files" action="/upload.do">
                          <p className="ant-upload-drag-icon">
                            <InboxOutlined />
                          </p>
                          <p className="ant-upload-text">Click or drag file to this area to upload</p>
                          <p className="ant-upload-hint">Support for a single or bulk upload.</p>
                        </Upload.Dragger>
                      </Form.Item>
                    </Form.Item>
                    <Form.Item wrapperCol={{ span: 12, offset: 6 }}>
                      <Button type="primary" htmlType="submit">Submit</Button>
                    </Form.Item>
                  </Form>
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