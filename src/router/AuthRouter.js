import React, { Component } from 'react'
import { Layout, Menu, Icon, Button } from 'antd'
import { Route, Redirect, NavLink } from 'react-router-dom'
import { connect } from 'react-redux'
import CustomMenu from '@/component/common/CustomMenu'
const { Sider, Header, Content } = Layout
const { SubMenu } = Menu
class AuthRouter extends Component {
  constructor(props) {
    super(props)
    this.state = {
      token: props.token,
      username: props.username,
      auth: props.auth,
      collapsed: false
    }
  }
  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed
    })
  }
  render() {
    const { component: Component, ...rest } = this.props
    return (
      <div>
        <Layout>
          <Sider
            style={{
              overflow: 'auto',
              height: '100%',
              position: 'fixed',
              left: 0
            }}
            collapsible={true}
            collapsed={this.state.collapsed}
            width={200}
          >
            <CustomMenu collapsed={this.state.collapsed} />
          </Sider>
          <Layout
            style={
              !this.state.collapsed ? { marginLeft: 200 } : { marginLeft: 80 }
            }
          >
            <Header style={{ padding: 0, position: 'fixed', width: '100%' }}>
              <Icon
                style={styles.trigger}
                className="trigger"
                type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
                onClick={this.toggle}
              />
            </Header>
            <Content
              style={{
                padding: '20px 10px 20px',
                overflow: 'initial',
                marginTop: '64px'
              }}
            >
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
            </Content>
          </Layout>
        </Layout>
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

const styles = {
  trigger: {
    fontSize: '25px',
    color: '#fff',
    lineHeight: '64px',
    padding: '0 24px',
    cursor: 'pointer',
    transition: 'color 0.3s'
  }
}
export default connect(
  mapStateToProps,
  null
)(AuthRouter)
