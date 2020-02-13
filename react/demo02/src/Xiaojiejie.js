import React, { Component } from 'react';
import './style.css';
import XiaojiejieItem from './XioajiejieItem';
import Boss from './Boss';
import axios from 'axios';

import { CSSTransition, TransitionGroup } from "react-transition-group";


class Xiaojiejie extends Component{

    componentWillMount() {
        // console.log('componentWillMount')
    }

    componentDidMount() {
        // console.log('componentDidMount')
        // 在这里写请求
        // componentWillMount在react-native 会有问题
        axios.get('http://rap2api.taobao.org/app/mock/243499/list').then(res => {
            console.log(res)
            if (res.status === 200) {
                this.setState({
                    list: res.data.data
                })
            }
        }).catch(err => {
            console.log(err)
        })
    }

    constructor(props) {
        super(props)

        this.state = {
            // list: ['按摩', '泡脚'],
            list: [],
            inputVal: 'ds'
        }

        this.addList = this.addList.bind(this)
        this.inputChange = this.inputChange.bind(this)
        this.removeItem = this.removeItem.bind(this)
    }

    addList() {
        let list = JSON.parse(JSON.stringify(this.state.list))
        list.push(this.state.inputVal)
        this.setState({
            list,
            inputVal: ''
        })
    }

    inputChange(e) {
        this.setState({
            inputVal: e.target.value
        })
    }

    removeItem(idx) {
        let list = JSON.parse(JSON.stringify(this.state.list))
        list.splice(idx, 1)


        this.setState({
            list
        })
    }

    render() {
        console.log('render')
        return (
            <div>
                <label htmlFor="jspang">增加服务</label>
                <input id="jspang" value={this.state.inputVal} onChange={this.inputChange}/>
                <button onClick={this.addList}>增加</button>
                <ul>
                    <TransitionGroup>
                        {
                            this.state.list.map((it, idx) => {
                                return (
                                    <CSSTransition
                                        timeout={2000}
                                        classNames="my-node"
                                        unmountOnExit
                                        key={idx+it}
                                        appear
                                    >
                                        <XiaojiejieItem content={it} removeItem={this.removeItem} idx={idx}></XiaojiejieItem>
                                    </CSSTransition>
                                )
                            })
                        }
                    </TransitionGroup>
                </ul>
                <Boss></Boss>
            </div>
        )
    }
}

export default Xiaojiejie;