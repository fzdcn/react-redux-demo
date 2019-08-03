import * as user from '../actionType/login'

// 保存用户消息
export const saveUserInfo = userInfo => {
  return {
    type: user.SAVE_USERINFO,
    userInfo
  }
}
// 保存菜单栏目
export const saveMenu = menus => {
  return {
    type: user.SAVE_MENU,
    menus
  }
}

// 退出
export const loginOut = () => {
  return {
    type: user.LOGIN_OUT
  }
}
