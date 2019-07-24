import React, { Component } from 'react'
import { HashRouter, Switch, Route, Redirect } from 'react-router-dom'
import { Layout, Menu, Icon, Button } from 'antd'
import { connect } from 'react-redux'
import App from '@/App'
import asyncComponent from '@/utils/asyncComponent'
import AuthRouter from './AuthRouter'
import Routes from './Routes'
const { Sider, Content, Header } = Layout
const Login = asyncComponent(() => import('@/pages/login/Login'))
const Nothing = asyncComponent(() => import('@/pages/nothing/Nothing'))
class RouteConfig extends Component {
  constructor(props) {
    super(props)
    this.state = {
      token: props.token,
      username: props.username
    }
  }
  userLogout() {}
  render() {
    return (
      <div className="router">
        <HashRouter>
          <App>
            <Switch>
              <Route exact path="/" name="login" component={Login} />
              <Route path="/login" name="login" component={Login} />
              {/*登录权限控制组件*/}
              {Routes.map((item, index) => {
                return (
                  <AuthRouter
                    key={index}
                    path={item.path}
                    name={item.name}
                    auth={item.auth}
                    component={item.component}
                  />
                )
              })}
              <Route component={Nothing} />
            </Switch>
          </App>
        </HashRouter>
      </div>
    )
  }
}
const mapStateToProps = state => {
  return {
    token: state.userReducer.token,
    username: state.userReducer.userInfo.username
  }
}
export default connect(mapStateToProps)(RouteConfig)
