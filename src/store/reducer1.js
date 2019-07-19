import * as user from './action-type'

let defaultState = {
  list: []
}

// 用户消息
export default (state = defaultState, action = {}) => {
  switch (action.type) {
    case user.test:
      return {
        ...state,
        list: [1, 2, 3]
      }
    default:
      return state
  }
}
