import React, { useState } from "react"
import {
  Button, Form, Select, Input, InputNumber, Switch, Radio, Slider, Upload, Rate, Checkbox, Row, Col, AutoComplete,
  DatePicker, Cascader
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
  const [options, setOptions] = useState(props.options || []);
  return (
    <div>
      <Form
        labelAlign="right"
        labelCol={{ span: 4 }}
        layout="horizontal"
        wrapperCol={{ span: 20 }}
        name="validate_other"
        onFinish={onSubmit}
        size="large"
        initialValues={props.initialValues || {}}
        ref={ref}
        {...props}
      >
        {
          props.items.map((unit, index) => {
            if (unit.type === "input") {
              return (
                <Form.Item key={`col${index}`} style={{ marginBottom: "20px" }}
                  name={unit.key} label={unit.title}
                  rules={unit.required ? [{ required: true, message: `请选择${unit.title}` }] : unit.rules ? [].concat(unit.rules) : []}>
                  <Input></Input>
                </Form.Item>
              )
            }
            else if (unit.type === "number") {
              return (
                <Form.Item key={`col${index}`} style={{ marginBottom: "20px" }}
                  name={unit.key} label={unit.title}
                  rules={unit.required ? [{ required: true, message: `请选择${unit.title}` }] : unit.rules ? [].concat(unit.rules) : []}>
                  <InputNumber min={1} max={10} />
                </Form.Item>
              )
            }
            else if (unit.type === "switch") {
              return (
                <Form.Item key={`col${index}`} style={{ marginBottom: "20px" }} valuePropName="checked"
                  name={unit.key} label={unit.title}
                  rules={unit.required ? [{ required: true, message: `请选择${unit.title}` }] : unit.rules ? [].concat(unit.rules) : []}>
                  <Switch />
                </Form.Item>
              )
            }
            else if (unit.type === "select") {
              return (
                <Form.Item key={`col${index}`} style={{ marginBottom: "20px" }} hasFeedback
                  name={unit.key} label={unit.title}
                  rules={unit.required ? [{ required: true, message: `请选择${unit.title}` }] : unit.rules ? [].concat(unit.rules) : []}
                >
                  <Select placeholder={`请选择${unit.title}`} labelInValue allowClear>
                    {
                      unit.dataList.map((item, num) => {
                        return (
                          <Option key={`item${num}`} value={item.value}>{item.label}</Option>
                        )
                      })
                    }
                  </Select>
                </Form.Item>
              )
            }
            else if (unit.type === "multipleSelect") {
              return (
                <Form.Item key={`col${index}`} style={{ marginBottom: "20px" }}
                  name={unit.key} label={unit.title}
                  rules={unit.required ? [{ required: true, message: `请选择${unit.title}`, type: 'array' }] : unit.rules ? [].concat(unit.rules) : []}
                >
                  <Select mode="multiple" placeholder={`请选择${unit.title}`} labelInValue allowClear>
                    {
                      (unit.dataList || []).map((item, num) => {
                        return (
                          <Option key={`multipleOption${num}`} value={item.value}>{item.label}</Option>
                        )
                      })
                    }
                  </Select>
                </Form.Item>
              )
            }
            else if (unit.type === "autoComplete") {
              return (
                <Form.Item key={`col${index}`} style={{ marginBottom: "20px" }}
                  name={unit.key} label={unit.title}
                  rules={unit.required ? [{ required: true, message: `请选择${unit.title}` }] : unit.rules ? [].concat(unit.rules) : []}
                >
                  <AutoComplete
                    options={options}
                    onSelect={(str) => { console.log("str===", str) }}
                    onSearch={(str) => { setOptions([{ value: "1" }, { value: "2" }, { value: "3" }, { value: "4" }]) }}
                    placeholder="input here"
                  />
                </Form.Item>
              )
            }
            else if (unit.type === "textarea") {
              return (
                <Form.Item key={`col${index}`} style={{ marginBottom: "20px" }}
                  name={unit.key} label={unit.title}
                  rules={unit.required ? [{ required: true, message: `请选择${unit.title}` }] : unit.rules ? [].concat(unit.rules) : []}
                >
                  <TextArea></TextArea>
                </Form.Item>
              )
            }
            else if (unit.type === "date") {
              return (
                <Form.Item key={`col${index}`} style={{ marginBottom: "20px" }}
                  name={unit.key} label={unit.title}
                  rules={unit.required ? [{ required: true, message: `请选择${unit.title}` }] : unit.rules ? [].concat(unit.rules) : []}
                >
                  <DatePicker></DatePicker>
                </Form.Item>
              )
            }
            else if (unit.type === "cascader") {
              return (
                <Form.Item key={`col${index}`} style={{ marginBottom: "20px" }}
                  name={unit.key} label={unit.title}
                  rules={unit.required ? [{ required: true, message: `请选择${unit.title}` }] : unit.rules ? [].concat(unit.rules) : []}
                >
                  <Cascader options={unit.dataList || []}></Cascader>
                </Form.Item>
              )
            }
            else if (unit.type === "slider") {
              return (
                <Form.Item key={`col${index}`} style={{ marginBottom: "20px" }}
                  name={unit.key} label={unit.title}
                  rules={unit.required ? [{ required: true, message: `请选择${unit.title}` }] : unit.rules ? [].concat(unit.rules) : []}>
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
              )
            }
            else if (unit.type === "radio") {
              return (
                <Form.Item key={`col${index}`} style={{ marginBottom: "20px" }}
                  name={unit.key} label={unit.title}
                  rules={unit.required ? [{ required: true, message: `请选择${unit.title}` }] : unit.rules ? [].concat(unit.rules) : []}>
                  <Radio.Group>
                    <Radio value="a">item 1</Radio>
                    <Radio value="b">item 2</Radio>
                    <Radio value="c">item 3</Radio>
                  </Radio.Group>
                </Form.Item>
              )
            }
            else if (unit.type === "radioButton") {
              return (
                <Form.Item key={`col${index}`} style={{ marginBottom: "20px" }}
                  name={unit.key} label={unit.title}
                  rules={unit.required ? [{ required: true, message: `请选择${unit.title}` }] : unit.rules ? [].concat(unit.rules) : []}>
                  <Radio.Group>
                    <Radio.Button value="a">item 1</Radio.Button>
                    <Radio.Button value="b">item 2</Radio.Button>
                    <Radio.Button value="c">item 3</Radio.Button>
                  </Radio.Group>
                </Form.Item>
              )
            }
            else if (unit.type === "checkbox") {
              return (
                <Form.Item key={`col${index}`} style={{ marginBottom: "20px" }}
                  name={unit.key} label={unit.title}
                  rules={unit.required ? [{ required: true, message: `请选择${unit.title}` }] : unit.rules ? [].concat(unit.rules) : []}>
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
              )
            }
            else if (unit.type === "rate") {
              return (
                <Form.Item key={`col${index}`} style={{ marginBottom: "20px" }}
                  name={unit.key} label={unit.title}
                  rules={unit.required ? [{ required: true, message: `请选择${unit.title}` }] : unit.rules ? [].concat(unit.rules) : []}>
                  <Rate allowHalf />
                </Form.Item>
              )
            }
            else if (unit.type === "dragger") {
              return (
                <Form.Item key={`col${index}`} style={{ marginBottom: "20px" }} label={unit.title}>
                  <Form.Item key={`col${index}`} style={{ marginBottom: "20px" }} valuePropName="fileList" getValueFromEvent={normFile} noStyle
                    name={unit.key}
                    rules={unit.required ? [{ required: true, message: `请选择${unit.title}` }] : unit.rules ? [].concat(unit.rules) : []}>
                    <Upload.Dragger name="files" action="/upload.do">
                      <p className="ant-upload-drag-icon">
                        <InboxOutlined />
                      </p>
                      <p className="ant-upload-text">Click or drag file to this area to upload</p>
                      <p className="ant-upload-hint">Support for a single or bulk upload.</p>
                    </Upload.Dragger>
                  </Form.Item>
                </Form.Item>
              )
            }
            else if (unit.type === "upload") {
              return (
                <Form.Item key={`col${index}`} style={{ marginBottom: "20px" }} valuePropName="fileList" getValueFromEvent={normFile} extra="extra info"
                  name={unit.key} label={unit.title}
                  rules={unit.required ? [{ required: true, message: `请选择${unit.title}` }] : unit.rules ? [].concat(unit.rules) : []}
                >
                  <Upload name="logo" action="/upload.do" listType="picture">
                    <Button><UploadOutlined /> Click to upload</Button>
                  </Upload>
                </Form.Item>
              )
            } else if (unit.type === "slot") {
              return (
                <div key={`col${index}`} style={{ marginBottom: "20px" }}></div>
              )
            } else {
              return (
                <div key={`col${index}`} style={{ marginBottom: "20px" }}></div>
              )
            }
          })
        }
        <Col style={{ marginBottom: "20px" }}>
          <Form.Item>
            <Button type="primary" htmlType="submit">Submit</Button>
          </Form.Item>
        </Col>
      </Form>
    </div >
  )
})