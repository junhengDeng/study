import {
    INPUT_CHANGE,
    ADD_LIST,
    DELETE_ITEM,
    GET_LIST
} from './actionTypes'

const defaultState = {
    inputVal: '',
    list: ['8点', '9点']
}


export default (state = defaultState, action) => {
    let newState = JSON.parse(JSON.stringify(state))

    switch (action.type) {
        case INPUT_CHANGE:
            newState.inputVal = action.value
            break;
        case ADD_LIST:
            newState.list.push(state.inputVal)
            newState.inputVal = ''
            break;
        case DELETE_ITEM:
            newState.list.splice(action.index, 1)
            break;
        case GET_LIST:
            // newState.list.splice(action.index, 1)
            console.log(action)
            newState.list = action.data.data
            break;
        default:
    }
    return newState
}