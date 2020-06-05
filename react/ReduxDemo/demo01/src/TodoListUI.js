// 1.有状态组件

// import React, { Component } from 'react';
// import {List, Input, Button} from 'antd';

// class TodoListUI extends Component {
//     render() { 
//         return (  
//             <div>
//                 <div>
//                     <Input value={this.props.inputVal} style={{margin:'10px',width:'300px'}} onChange={this.props.inputChange}/>
//                     <Button onClick={this.props.addList} >增加任务</Button>
//                 </div>
//                 <div>
//                     <List
//                         bordered
//                         style={{margin:'10px',width:'300px'}}
//                         dataSource={this.props.list}
//                         renderItem={(it,idx) => <List.Item onClick={() => this.props.deleteItem(idx)}>{it}</List.Item>}  
//                     ></List>
//                 </div>
//             </div> 
//         );
//     }
// }

// 2. 无状态组件，不需要继承,性能更高，尽可能用无状态组件
import React from 'react';
import 'antd/dist/antd.css';
import {List, Input, Button} from 'antd';

const TodoListUI = (props) => {
    return (  
        <div>
            <div>
                <Input value={props.inputVal} style={{margin:'10px',width:'300px'}} onChange={props.inputChange}/>
                <Button onClick={props.addList} >增加任务</Button>
            </div>
            <div>
                <List
                    bordered
                    style={{margin:'10px',width:'300px'}}
                    dataSource={props.list}
                    renderItem={(it,idx) => <List.Item onClick={() => props.deleteItem(idx)}>{it}</List.Item>}  
                ></List>
            </div>
        </div> 
    );
}

 
export default TodoListUI;