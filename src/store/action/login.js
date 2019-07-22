import * as user from '../actionType/login'

// 保存用户消息
export const saveUserInfo = userInfo => {
  return {
    type: user.SAVE_USERINFO,
    userInfo
  }
}

// 修改用户信息
export const modifyUserInfo = (key, value) => {
  return {
    type: user.MODIFY_USERINFO,
    key,
    value
  }
}
