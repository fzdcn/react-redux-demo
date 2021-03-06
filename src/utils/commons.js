/**
 * 存储localStoage
 * @param {*} name
 * @param {*} content
 */
export const setStore = (name, content) => {
  if (!name) return
  if (typeof content !== 'string') {
    content = JSON.stringify(content)
  }
  window.localStorage.setItem(name, content)
}

/**
 * 获取localStorage
 * @param {*} name
 */
export const getStore = name => {
  if (!name) return
  return window.localStorage.getItem(name)
}

/**
 * 删除localStorage
 * @param {*} name
 */
export const removeStore = name => {
  if (!name) return
  window.localStorage.removeItem(name)
}

export const baseURL = () => {
  if (process.env.NODE_ENV === 'development') {
    return 'https://adminapi.95epay.com/admin'
  } else if (process.env.NODE_ENV === 'production') {
    return 'https://adminapi.95epay.com/admin'
  }
}
