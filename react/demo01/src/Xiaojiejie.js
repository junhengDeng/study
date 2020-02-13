import React, {
    Component
} from 'react'
import './style.css'
import XiaojiejieItem from './XiaojiejieItem'
import axios from 'axios'

class Xiaojiejie extends Component {
    constructor(props) {
        super(props)
        this.state = {
            inputVal: '',
            list: [
                '基础按摩',
                '精油推油'
            ]
        }
    }

    componentWillMount() {
        console.log('componentWillMount-----组件将挂载页面的时刻')
    }

    componentDidMount() {
        console.log('componentDidMount-----组件挂载页面的完成时刻')

        axios.post('https://web-api.juejin.im/v3/web/wbbr/bgeda').then(res => {
            console.log(res.data)
        }).catch(err => {
            console.log(err)
        })
    }


    shouldComponentUpdate() {
        console.log('shouldComponentUpdate')

        return true
    }

    componentWillUpdate() {
        console.log('componentWillUpdate')
    }



    inputChange(e) {
        this.setState({
            inputVal: this.input.value
        })
    }

    addList() {
        this.setState({
            list: [...this.state.list, this.state.inputVal],
            inputVal: ''
        }, () => {
            console.log()
        })
    }

    removeItem(idx) {
        let list = JSON.parse(JSON.stringify(this.state.list)).splice(idx, 1)
        this.setState({
            list: list
        })
    }

    render() {
        console.log('render-----组件挂载中')

        return ( <
            div >
            <
            label htmlFor = "jspang" > < /label> <
            input id = "jspang"
            value = {
                this.state.inputVal
            }
            onChange = {
                this.inputChange.bind(this)
            }
            ref = {
                input => this.input = input
            }
            /> <
            button onClick = {
                this.addList.bind(this)
            } > 增加服务 < /button> <
            ul > {
                this.state.list.map((it, idx) => {
                    return ( <
                        XiaojiejieItem key = {
                            idx + it
                        }
                        content = {
                            it
                        }
                        index = {
                            idx
                        }
                        deleteItem = {
                            this.removeItem.bind(this)
                        }
                        />
                    )
                })
            } <
            /ul> < /
            div >
        )
    }
}

export default Xiaojiejie