import React, {Component} from 'react'
import './style.css'

class Xiaojiejie extends Component{
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

    inputChange(e) {
        this.setState({
            inputVal: e.target.value
        })
    }

    addList() {
        this.setState({
            list: [...this.state.list, this.state.inputVal],
            inputVal: ''
        })
    }

    removeItem(idx) {
        let list = JSON.parse(JSON.stringify(this.state.list)).splice(idx, 1)
        this.setState({
            list: list
        })
    }
    
    render() {
        return (
            <div>
                <input value={this.state.inputVal} onChange={this.inputChange.bind(this)}/><button onClick={this.addList.bind(this)}>增加服务</button>
                <ul>
                    {
                        this.state.list.map((it, idx) => {
                            return <li key={idx+it} onClick={this.removeItem.bind(this,idx)}>{it}</li>
                        })
                    }
                </ul>
            </div>
        )
    }
}

export default Xiaojiejie