import React, { Component } from 'react';
import { Button, Input, Typography, message } from 'antd'
import './App.css'

const { Text } = Typography;

const TimerContent = (props) => {
    const { time, status, handleClick, handleInputChange, handleClickChangeGap, handleClickInit } = props

    //时间初始化
    const hh = parseInt(time / 3600)
    const mm = parseInt((time - hh * 3600) / 60)
    const ss = time - hh * 3600 - mm * 60
    var h = hh < 10 ? `0${hh}` : hh
    var m = mm < 10 ? `0${mm}` : mm
    var s = ss < 10 ? `0${ss}` : ss

    return <div className="content">
        <Text mark style={{ fontSize: '20px' }}>{h + ":" + m + ":" + s}</Text>
        <Button type="primary" danger style={{ marginTop: '20px' }} onClick={handleClick}>{status}</Button>
        <br />
        <Input onChange={(e) => { handleInputChange(e.target.value) }} />
        <Button type="primary" style={{ marginTop: '20px' }} onClick={handleClickChangeGap}>更改时间间隔（毫秒）</Button>
        <Button type="primary" style={{ marginTop: '20px' }} onClick={handleClickInit}>复位</Button>
    </div>

};

class Timer extends Component {

    timer = null

    constructor(props) {
        super(props)
        this.state = {
            time: 0,
            gap: 1000,
            stop: false,
            status: '暂停',
            inputValue: ''
        }
    }

    render() {
        return (
            <TimerContent
                time={this.state.time}
                gap={this.state.gap}
                stop={this.state.stop}
                status={this.state.status}
                handleClick={this.handleClick.bind(this)}
                handleInputChange={this.handleInputChange.bind(this)}
                handleClickChangeGap={this.handleClickChangeGap.bind(this)}
                handleClickInit={this.handleClickInit.bind(this)}
            />
        )
    }
    //点击开始暂停按钮
    handleClick() {
        const stop = !this.state.stop
        console.log(stop)
        this.setState({
            stop: stop,
            status: stop ? "开始" : "暂停"
        })
        if (stop) {
            clearInterval(this.timer)
        } else {
            this.fun_timer()
        }
    }
    //文本框监听
    handleInputChange(val) {
        this.setState({
            inputValue: val
        })
    }
    //改变时间间隔
    handleClickChangeGap() {
        if (this.state.inputValue === '') {
            message.error("时间间隔不能为空")
            return
        }
        this.setState({
            gap: this.state.inputValue
        })
        message.success(`时间间隔为：${this.state.inputValue / 1000}秒`)
        clearInterval(this.timer)
        setTimeout(() => {
            this.fun_timer()
        }, 500)
    }
    //复位
    handleClickInit() {
        this.setState({
            time: 0,
            gap: 1000,
            stop: false,
            status: '暂停'
        })
        clearInterval(this.timer)
        setTimeout(() => {
            this.fun_timer()
        }, 500)
    }
    //开始计时
    fun_timer() {
        this.timer = setInterval(() => {
            this.setState({
                time: this.state.time + this.state.gap / 1000,
            })
        }, this.state.gap)
    }



    //组件即将被挂载到页面的时候自动执行
    UNSAFE_componentWillMount() {
        console.log('componentWillMount')
    }
    //组件被挂载到页面后自动执行
    componentDidMount() {
        console.log('componentDidMount')
        this.fun_timer()

    }
    //组件被更新之前，他会自动被执行
    shouldComponentUpdate() {
        console.log('shouldComponentUpdate')
        // return !this.state.stop
        return true
    }
    /**
     * 组件被更新之前，它会自动执行，但是他在shouldComponentUpdate之后才会执行
     * 如果shouldComponentUpdate返回true它才执行
     * 如果返回false，这个函数就不会被执行了
     */
    UNSAFE_componentWillUpdate() {
        console.log('componentWillUpdate')

    }
    /**
     * 一个组件从父组件接受参数
     * 如果这个组件第一次存在于父组件中，不会执行
     * 如果这个组件之前就已经存在父组件中，才会执行
     */
    UNSAFE_componentWillReceiveProps() {
        console.log('child componentWillReceiveProps')
    }

    //当这个组件即将从页面中剔除的时候，会被执行
    componentWillUnmount() {
        console.log('child componentWillUnmount')
    }
}
export default Timer