import React, { Component } from 'react';
import PropTypes from 'prop-types';

class XiaojiejieItem extends Component {
    constructor(props) {
        super(props);
        this.state = {  }

        this.handleClick = this.handleClick.bind(this)
    }

    componentWillReceiveProps() {
        console.log('child-componentWillReceiveProps')
    }

    shouldComponentUpdate(nextProps, nextState) {
        return nextProps.content !== this.props.content
    }

    render() { 
        return (  
            <li onClick={this.handleClick}>
             {this.props.avname}为你做-{this.props.content}</li>
        );
    }

    handleClick() {
        console.log(this.props)
        this.props.deleteItem(this.props.index)
    }
}

XiaojiejieItem.propTypes={
    content: PropTypes.string,
    index: PropTypes.number,
    deleteItem: PropTypes.func,
    // avname: PropTypes.string.isRequired,
}

XiaojiejieItem.defaultProps = {
    avname: '松岛枫'
}
 
export default XiaojiejieItem;