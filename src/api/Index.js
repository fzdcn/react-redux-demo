import Server from './server'
class Index extends Server {
  async getTableData(params) {
    try {
      return await this.$httpGet('/sms/smsTemplateList', params)
    } catch (err) {
      throw err
    }
  }
  async getPlatFormList(params) {
    try {
      return await this.$httpGet('/platformInfo/option', params)
    } catch (err) {
      throw err
    }
  }
}

export default new Index()
