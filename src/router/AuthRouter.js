import React, { Component } from 'react'
import { Layout, Menu, Icon, Button } from 'antd'
import { Route, Redirect, NavLink } from 'react-router-dom'
import { connect } from 'react-redux'
const { Sider, Content } = Layout
const { SubMenu } = Menu
class AuthRouter extends Component {
  constructor(props) {
    super(props)
    this.state = {
      token: props.token,
      username: props.username,
      auth: props.auth
    }
  }
  state = {
    openKeys: [],
    selectedKeys: []
  }
  handleOpenChange = keys => {
    let openKeys = []
    if (keys.length) {
      openKeys = keys.slice(-1)
    }
    this.setState({ openKeys })
  }
  setHighLightKeys = props => {
    const { pathname } = props.location
    let selectedKey = ''
    let openKey = ''
    if (pathname) {
      openKey = pathname.substr(1).split('/')[0]
      selectedKey = pathname.substr(1).replace('/', '.')
      // 对于类似 '/product/' 路由作特殊处理
      if (selectedKey.substr(-1) === '.') {
        selectedKey = selectedKey.substring(0, selectedKey.length - 1)
      }
    }
    this.setState({
      openKeys: [openKey],
      selectedKeys: [selectedKey]
    })
  }

  componentDidMount() {
    console.log(this.props)
    this.setHighLightKeys(this.props)
  }

  componentWillReceiveProps(nextProps) {
    this.setHighLightKeys(nextProps)
  }
  render() {
    const { openKeys, selectedKeys } = this.state
    const { component: Component, ...rest } = this.props
    return (
      <div>
        <Layout>
          <Button className="layout-header">
            <h2 className="logo">欢迎你, {this.state.username}</h2>
          </Button>
        </Layout>
        <Layout>
          <Sider width={200}>
            <Menu
              mode="inline"
              openKeys={openKeys}
              selectedKeys={selectedKeys}
              onOpenChange={this.handleOpenChange}
              style={{ height: '100%', borderRight: 0 }}
            >
              <SubMenu
                key="product"
                title={
                  <span>
                    <Icon type="user" />
                    商品管理
                  </span>
                }
              >
                <Menu.Item key="product">
                  <NavLink to="/product">商品列表</NavLink>
                </Menu.Item>
              </SubMenu>
              <SubMenu
                key="input"
                title={
                  <span>
                    <Icon type="user" />
                    自定义输入组件
                  </span>
                }
              >
                <Menu.Item key="input">
                  <NavLink to="/input">自定义输入组件</NavLink>
                </Menu.Item>
              </SubMenu>
              <SubMenu
                key="sub2"
                title={
                  <span>
                    <Icon type="laptop" />
                    subnav 2
                  </span>
                }
              >
                <Menu.Item key="5">option5</Menu.Item>
                <Menu.Item key="6">option6</Menu.Item>
                <Menu.Item key="7">option7</Menu.Item>
                <Menu.Item key="8">option8</Menu.Item>
              </SubMenu>
              <SubMenu
                key="sub3"
                title={
                  <span>
                    <Icon type="notification" />
                    subnav 3
                  </span>
                }
              >
                <Menu.Item key="9">option9</Menu.Item>
                <Menu.Item key="10">option10</Menu.Item>
                <Menu.Item key="11">option11</Menu.Item>
                <Menu.Item key="12">option12</Menu.Item>
              </SubMenu>
            </Menu>
          </Sider>
          <Content
            style={{ margin: 24, minHeight: 280, backgroundColor: 'white' }}
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
