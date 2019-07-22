import Server from './server'
class API extends Server {
  /**
   *  用途：获取验证码
   */
  async getCaptchaCode() {
    try {
      return await this.$httpGet('/utils/getCaptcha', {})
    } catch (err) {
      throw err
    }
  }
  async goLogin(params) {
    try {
      return await this.$httpPost('/login/submit', params)
    } catch (err) {
      throw err
    }
  }
}

export default new API()
