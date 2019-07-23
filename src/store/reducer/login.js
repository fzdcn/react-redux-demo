import * as user from '../actionType/login'

let defaultState = {
  userInfo: sessionStorage.getItem('userInfo')
    ? JSON.parse(sessionStorage.getItem('userInfo'))
    : {},
  token: sessionStorage.getItem('userInfo')
    ? sessionStorage.getItem('userInfo').adminToken
      ? sessionStorage.getItem('userInfo').adminToken
      : null
    : null
}

// 用户消息
export default (state = defaultState, action = {}) => {
  switch (action.type) {
    case user.SAVE_USERINFO:
      action.userInfo
        ? sessionStorage.setItem('userInfo', JSON.stringify(action.userInfo))
        : sessionStorage.setItem('userInfo', null)

      action.userInfo
        ? action.userInfo.adminToken
          ? sessionStorage.setItem('token', action.userInfo.adminToken)
          : sessionStorage.setItem('token', null)
        : sessionStorage.setItem('token', null)
      return {
        ...state,
        ...{ userInfo: action.userInfo, token: action.userInfo.adminToken }
      }
    default:
      return state
  }
}
