import * as user from '../actionType/login'

let defaultState = {
  userInfo: sessionStorage.getItem('userInfo')
    ? JSON.parse(sessionStorage.getItem('userInfo'))
    : {},
  token: sessionStorage.getItem('userInfo')
    ? JSON.parse(sessionStorage.getItem('userInfo')).adminToken
      ? JSON.parse(sessionStorage.getItem('userInfo')).adminToken
      : null
    : null,
  menus: sessionStorage.getItem('menus')
    ? JSON.parse(sessionStorage.getItem('menus'))
    : []
}

// 用户消息
export default (state = defaultState, action = {}) => {
  switch (action.type) {
    case user.SAVE_USERINFO:
      action.userInfo
        ? sessionStorage.setItem('userInfo', JSON.stringify(action.userInfo))
        : sessionStorage.setItem('userInfo', {})

      action.userInfo
        ? action.userInfo.adminToken
          ? sessionStorage.setItem('token', action.userInfo.adminToken)
          : sessionStorage.setItem('token', null)
        : sessionStorage.setItem('token', null)
      return {
        ...state,
        ...{
          userInfo: action.userInfo,
          token: action.userInfo.adminToken
        }
      }
    case user.SAVE_MENU:
      action.menus[0].subs
        ? sessionStorage.setItem('menus', JSON.stringify(action.menus[0].subs))
        : sessionStorage.setItem('menus', [])
      return {
        ...state,
        ...{
          menus: action.menus[0].subs
        }
      }
    case user.LOGIN_OUT:
      sessionStorage.removeItem('menus')
      sessionStorage.removeItem('userInfo')
      sessionStorage.removeItem('token')
      return {
        ...state
      }
    default:
      return state
  }
}
