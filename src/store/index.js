import { createStore, applyMiddleware, combineReducers } from 'redux'
import userReducer from './reducer/login'
import thunk from 'redux-thunk'

let reducer = combineReducers({
  userReducer
})
let store = createStore(reducer, applyMiddleware(thunk))
export default store
