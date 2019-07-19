import { createStore, applyMiddleware, combineReducers } from 'redux'
import userReducer from './reducer'
import reducer1 from './reducer1'
import thunk from 'redux-thunk'

let reducer = combineReducers({
  userReducer,
  reducer1
})
let store = createStore(reducer, applyMiddleware(thunk))
export default store
