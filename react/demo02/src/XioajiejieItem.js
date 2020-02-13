import React, { Component } from 'react';
import PropTypes from 'prop-types';

class XiaojiejieItem extends Component{
    // update 视图更新时会触发
    componentWillReceiveProps() {
        // console.log('componentWillReceiveProps')
    }

    shouldComponentUpdate(nextProps, nextState) {
        // console.log('shouldComponentUpdate')
        // console.log(nextProps, nextState)
       
        return nextProps.content !== this.props.content
    }
    
    componentWillUpdate() {
        // console.log('componentWillUpdate')
    }

    componentDidUpdate() {
        // console.log('componentDidUpdate')
    }


    // componentWillMount
    // render
    // componentDidMount

    // componentWillReceiveProps
    // shouldComponentWillUpdate
    // (nextProps, nextState)
    // if(nextProps.content !== this.props.content)
    // componentWillUpdate
    // render
    // componentDidUpdate
    


    constructor(props) {
        super(props)
        this.removeItem = this.removeItem.bind(this)
    }

    removeItem() {
        this.props.removeItem(this.props.idx)
    }

    render() {
        console.log('render111')
        return (
            <li onClick={this.removeItem}>{this.props.avname}：{this.props.content}</li>
        )
    }
}

XiaojiejieItem.propTypes = {
    content: PropTypes.string,
    idx: PropTypes.number,
    removeItem: PropTypes.func,
    // avname: PropTypes.string.isRequired
}

XiaojiejieItem.defaultProps = {
    avname: '松岛枫'
}


export default XiaojiejieItem;