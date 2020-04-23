import React, { useEffect } from "react"
import Admin from "../Admin"
import axios from "axios"
import marked from "marked"
import { message } from "antd"
import "github-markdown-css"

const api = "http://192.168.1.129:8001"
export default (props) => {
    const getFile = () => {
        const filesUrl = JSON.parse(props.location.state.files)[0]
        axios({
            url: api + filesUrl
        }).then(res => {
            let data = res.data
            document.getElementById("content").innerHTML = marked(data)
        }).catch(err => {
            message.error(err.response.message)
        })
    }
    useEffect(() => {
        getFile()
        return () => { }
    }, [])
    return (
        <div className="news_detail">
            <Admin>
                <h1>新闻详情</h1>
                <div id="content" className="markdown-body"></div>
            </Admin>
        </div>
    )
}