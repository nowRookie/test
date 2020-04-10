import React, { useState } from "react"
import {
  Button, Form, Select, Input, InputNumber, Switch, Radio, Slider, Upload, Rate, Checkbox, Row, Col, AutoComplete
} from 'antd';
import { UploadOutlined, InboxOutlined } from '@ant-design/icons';

const { TextArea } = Input;
const { Option } = Select;


const normFile = e => {
  console.log('Upload event:', e);
  if (Array.isArray(e)) {
    return e;
  }
  return e && e.fileList;
};

const onSubmit = (value) => {
  console.log(value)
}

export default React.forwardRef((props, ref) => {
  console.log("props===", props)
  const [options, setOptions] = useState([]);

  return (
    <div>
      <Form
        labelAlign="right"
        labelCol={{ span: 6 }}
        layout="inline"
        wrapperCol={{ span: 18 }}
        name="validate_other"
        onFinish={onSubmit}
        initialValues={{
          rate: 3.5,
        }}
        ref={ref}
        {...props}
      >
        <Row>
          <Col span={props.span || 12} style={{ marginTop: "20px" }}>
            <Form.Item label="Plain Text">
              <span className="ant-form-text">China</span>
            </Form.Item>
          </Col>
          <Col span={props.span || 12} style={{ marginTop: "20px" }}>
            <Form.Item name="Input" label="Input">
              <Input></Input>
            </Form.Item>
          </Col>
          <Col span={props.span || 12} style={{ marginTop: "20px" }}>
            <Form.Item
              name="AutoComplete" label="AutoComplete">
              <AutoComplete
                options={options}
                onSelect={(str) => { console.log("str===", str) }}
                onSearch={(str) => { setOptions([{ value: "1" }, { value: "2" }, { value: "3" }, { value: "4" }]) }}
                placeholder="input here"
              />
            </Form.Item>
          </Col>
          <Col span={props.span || 12} style={{ marginTop: "20px" }}>
            <Form.Item name="Textarea" label="Textarea">
              <TextArea></TextArea>
            </Form.Item>
          </Col>
          <Col span={props.span || 12} style={{ marginTop: "20px" }}>
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
          </Col>
          <Col span={props.span || 12} style={{ marginTop: "20px" }}>
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
          </Col>
          <Col span={props.span || 12} style={{ marginTop: "20px" }}>
            <Form.Item label="InputNumber">
              <Form.Item name="input-number" noStyle>
                <InputNumber min={1} max={10} />
              </Form.Item>
              <span className="ant-form-text"> machines</span>
            </Form.Item>
          </Col>
          <Col span={props.span || 12} style={{ marginTop: "20px" }}>
            <Form.Item name="switch" label="Switch" valuePropName="checked">
              <Switch />
            </Form.Item>
          </Col>
          <Col span={props.span || 12} style={{ marginTop: "20px" }}>
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
          </Col>
          <Col span={props.span || 12} style={{ marginTop: "20px" }}>
            <Form.Item name="radio-group" label="Radio.Group">
              <Radio.Group>
                <Radio value="a">item 1</Radio>
                <Radio value="b">item 2</Radio>
                <Radio value="c">item 3</Radio>
              </Radio.Group>
            </Form.Item>
          </Col>
          <Col span={props.span || 12} style={{ marginTop: "20px" }}>
            <Form.Item name="radio-button" label="Radio.Button">
              <Radio.Group>
                <Radio.Button value="a">item 1</Radio.Button>
                <Radio.Button value="b">item 2</Radio.Button>
                <Radio.Button value="c">item 3</Radio.Button>
              </Radio.Group>
            </Form.Item>
          </Col>
          <Col span={props.span || 12} style={{ marginTop: "20px" }}>
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
          </Col>
          <Col span={props.span || 12} style={{ marginTop: "20px" }}>
            <Form.Item name="rate" label="Rate">
              <Rate />
            </Form.Item>
          </Col>
          <Col span={props.span || 12} style={{ marginTop: "20px" }}>
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
          </Col>
          <Col span={props.span || 12} style={{ marginTop: "20px" }}>
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
          </Col>
          <Col span={props.span || 12} style={{ marginTop: "20px" }}>
            <Form.Item>
              <Button type="primary" htmlType="submit">Submit</Button>
            </Form.Item>
          </Col>
        </Row></Form>
    </div >
  )
})