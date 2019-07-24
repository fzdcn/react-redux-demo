import React, { Component } from 'react'
import { withRouter } from 'react-router'
import { connect } from 'react-redux'
import { Route, Redirect } from 'react-router-dom'
import { Layout, Menu, Icon, Button } from 'antd'
const { Sider, Content, Header } = Layout
class AuthRouter extends Component {
  constructor(props) {
    super(props)
    this.state = {
      token: props.token,
      username: props.username,
      auth: props.auth
    }
  }
  render() {
    const { component: Component, ...rest } = this.props
    console.log(this.props)
    return (
      <div>
        <Layout>
          <Button className="layout-header">
            <h2 className="logo">欢迎你, {this.state.username}</h2>
          </Button>
        </Layout>
        <Route
          {...rest}
          render={props =>
            !this.state.auth ? (
              <Component {...props} />
            ) : this.state.token ? (
              <Component {...props} />
            ) : (
              <Redirect
                to={{
                  pathname: '/login',
                  state: { from: props.location }
                }}
              />
            )
          }
        />
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

export default connect(
  mapStateToProps,
  null
)(AuthRouter)
