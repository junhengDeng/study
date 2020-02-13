import { INPUT_CHANGE, ADD_LIST, DELETE_ITEM, GET_LIST } from './actionTypes'
import axios from 'axios'



export const changeInputAction = (value) => ({
    type: INPUT_CHANGE,
    value
})
export const addListAction = () => ({
    type: ADD_LIST
})
export const deleteItemAction = (index) => ({
    type: DELETE_ITEM,
    index
})

export const getListAction = data => ({
    type: GET_LIST,
    data
})

export const getThunkAction = () => {
    return (dispatch) => {
        axios.get('http://rap2api.taobao.org/app/mock/243499/list').then(res => {
            console.log(res)
            const data = res.data
            const action = getListAction(data)
            dispatch(action)
        })
    }
}
