import React, { useState } from "react"

import BaseForm from "./BaseForm"

export default (props) => {
	const [formItems, setFormItems] = useState([
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
	])
	return (
		<div>
			<BaseForm items={formItems} {...props}></BaseForm>
		</div>
	)
}