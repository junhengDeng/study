import React, { Component } from 'react';
import { CSSTransition } from "react-transition-group";

class Boss extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            isShow: true
         }
         this.toToggle = this.toToggle.bind(this)
    }
    render() { 
        return ( 
            <div>
                <CSSTransition
                    in={this.state.isShow}
                    timeout={2000}
                    classNames="my-node"
                    unmountOnExit
                >
                    <div>Boss级人物-孙悟空</div>
                </CSSTransition>
                
                    <div><button onClick={this.toToggle}>召唤Boss</button></div>
            </div>
         );
    }

    toToggle() {
        this.setState({
            isShow: !this.state.isShow
        })
    }
}
 
export default Boss;