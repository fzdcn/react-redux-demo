import './login.styl'
import React from 'react'
import { connect } from 'react-redux'
import { Form, Icon, Input, Button, Checkbox, Row, Col, message } from 'antd'
import API from '@/api/api'
import { saveUserInfo,saveMenu } from '@/store/action/login'
class Login extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      captcha: '',
      userName: '',
      passWord: ''
    }
  }
  handleSubmit = e => {
    e.preventDefault()
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values)
        this.login(values)
      }
    })
  }
  login = async params => {
    let data = await API.goLogin(params)
    if (data.code === '02') {
      message.warn(data.message)
      this.getCaptchaCode()
    } else {
      this.props.saveUserInfo(data.data.admin)
      this.props.saveMenu(data.data.adminMenuList)
      if (this.props.location.state) {
        this.props.history.replace(this.props.location.state.from.pathname)
      } else {
        this.props.history.replace('/index')
      }
    }
  }
  // 验证码
  getCaptchaCode = async () => {
    let { data } = await API.getCaptchaCode()
    this.setState({ captcha: data })
  }
  componentDidMount() {
    console.log(this.props)
    this.getCaptchaCode()
  }
  render() {
    const { getFieldDecorator } = this.props.form
    return (
      <div className="login">
        <Form onSubmit={this.handleSubmit} className="login-form">
          <Form.Item>
            {getFieldDecorator('username', {
              rules: [
                { required: true, message: 'Please input your username!' }
              ]
            })(
              <Input
                allowClear
                prefix={
                  <Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />
                }
                placeholder="userName"
              />
            )}
          </Form.Item>
          <Form.Item>
            {getFieldDecorator('password', {
              rules: [
                { required: true, message: 'Please input your Password!' }
              ]
            })(
              <Input
                allowClear
                prefix={
                  <Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />
                }
                type="password"
                placeholder="passWord"
              />
            )}
          </Form.Item>
          <Form.Item>
            <Row gutter={10}>
              <Col span={16}>
                {getFieldDecorator('captcha', {
                  rules: [
                    {
                      required: true,
                      message: 'Please input the captcha you got!'
                    }
                  ]
                })(
                  <Input
                    allowClear
                    placeholder="Please input the captcha you got!"
                  />
                )}
              </Col>
              <Col className="text-right" span={8}>
                <Button style={{ width: '85px' }} onClick={this.getCaptchaCode}>
                  {this.state.captcha ? this.state.captcha : '错误'}
                </Button>
              </Col>
            </Row>
          </Form.Item>
          <Button
            style={{ width: '100%' }}
            type="primary"
            htmlType="submit"
            className="login-form-button mb20"
          >
            Log in
          </Button>
          <Form.Item>
            {getFieldDecorator('remember', {
              valuePropName: 'checked',
              initialValue: true
            })(<Checkbox>Remember me</Checkbox>)}
            <a className="login-form-forgot" href="#">
              forgot password
            </a>
            &nbsp;&nbsp;Or&nbsp;&nbsp;<a href="">register now!</a>
          </Form.Item>
        </Form>
      </div>
    )
  }
}
const LoginForm = Form.create({ name: 'normal_login' })(Login)
const mapDispatchToProps = dispatch => {
  return {
    saveUserInfo: userInfo => dispatch(saveUserInfo(userInfo)),
    saveMenu: menuInfo => dispatch(saveMenu(menuInfo))
  }
}
export default connect(
  null,
  mapDispatchToProps
)(LoginForm)
