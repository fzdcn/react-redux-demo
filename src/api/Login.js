import Server from './server'
class Login extends Server {
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
  async loginOut() {
    try {
      return await this.$httpGet('/login/logout', {})
    } catch (err) {
      throw err
    }
  }
}

export default new Login()
