import React, { Component } from 'react';
import store from './store'
import { changeInputAction, addListAction, deleteItemAction, getThunkAction } from './store/actionCreators'
import TodoListUI from './TodoListUI';

// let data = {
//     inputVal: '',
//     list: ['8点', '9点']
// }

class TodoList extends Component {
    constructor(props) {
        super(props);
        this.state = store.getState();

        this.inputChange = this.inputChange.bind(this)
        this.storeChange = this.storeChange.bind(this)
        this.addList = this.addList.bind(this)
        this.deleteItem = this.deleteItem.bind(this)
        store.subscribe(this.storeChange)

    }
    inputChange(e) {
        store.dispatch(changeInputAction(e.target.value))
    }

    storeChange() {
        this.setState(store.getState())
    }

    addList() {
        store.dispatch(addListAction())
    }

    deleteItem(index) {
        store.dispatch(deleteItemAction(index))
    }

    render() { 
        return ( 
            <TodoListUI
                inputVal={this.state.inputVal}
                inputChange={this.inputChange}
                addList={this.addList}
                deleteItem={this.deleteItem}
                list={this.state.list}
            />
        );
    }

    componentDidMount() {
        // axios.get('http://rap2api.taobao.org/app/mock/243499/list').then(res => {
        //     // console.log(res)
        //     const data = res.data
        //     const action = getListAction(data)
        //     store.dispatch(action)
        // })
        const action = getThunkAction()
        store.dispatch(action)
    }
}
 
export default TodoList;