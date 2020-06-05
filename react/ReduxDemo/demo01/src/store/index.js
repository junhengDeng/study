import {createStore, applyMiddleware, compose} from 'redux';
import reducer from './reducer';
import thunk from 'redux-thunk'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;


// const store = createStore(reducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());


const store = createStore(reducer, composeEnhancers(applyMiddleware(thunk)));


export default store;



// const createStore = (reducer) => {
//     let state;
//     let listenters = [];

//     const getState = () => state;

//     const dispatch = action => {
//         state = reducer(state,action)
//         listenters.forEach(listenter => listenter())
//     }

//     const subscribe = listenter => {
//         listenters.push(listenter)
//         return () => {
//             listenters = listenters.filter(l => l !== listenter)
//         }
//     }

//     return {
//         getState,
//         dispatch,
//         subscribe
//     }
// }