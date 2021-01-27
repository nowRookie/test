import React, { useEffect, useState } from 'react';
import { Slider, Switch, Button } from 'antd';
import styles from './index.less';
import Modal from "@/components/modal"
import { connect } from "umi"

const Test = ({ global, dispatch }) => {
    const [value, setvalue] = useState(0)
    const [defaultValue, setdefaultValue] = useState(0)
    const onChange = val => {
        console.log(val)
    }
    const add = () => {
        console.log(1111)
        return value + 1
    }
    useEffect(() => {
        // setTimeout(() => {
        //     dispatch({
        //         type: "global/save",
        //         payload: { name: 123 }
        //     })
        // }, 3000)
    }, [])
    return (
        <div>
            <Modal></Modal>
            <h1>test</h1>
            <h3>{global.name}</h3>
            <Slider defaultValue={defaultValue} max={32} min={26} onChange={onChange} />
            <h1>{value}</h1>
            <h2>{add()}</h2>
            <Button onClick={() => { setvalue(value + 1) }}>点我+1</Button>
        </div>
    );
}
export default connect((scope) => {
    // console.log("===============", scope)
    let { global } = scope
    return { global }
})(Test)
