import * as user from '../actionType/login'

let userInfo = localStorage.getItem('userInfo')
  ? JSON.parse(localStorage.getItem('userInfo'))
  : {}
let defaultState = {
  userInfo: {}
}

// 用户消息
export default (state = defaultState, action = {}) => {
  switch (action.type) {
    case user.SAVE_USERINFO:
      localStorage.setItem('userInfo', JSON.stringify(action.userInfo))
      return {
        ...state,
        ...{ userInfo: action.userInfo }
      }
    default:
      return state
  }
}
