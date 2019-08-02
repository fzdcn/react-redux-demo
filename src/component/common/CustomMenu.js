import React from 'react'
import { connect } from 'react-redux'
import { Link, withRouter } from 'react-router-dom'
import { Menu, Icon } from 'antd'
class CustomMenu extends React.Component {
  state = {
    openKeys: [],
    selectedKeys: []
  }

  renderMenuItem = ({ url, icon, name }) => {
    return (
      <Menu.Item key={url}>
        <Link to={url}>
          {icon && <Icon type={icon} />}
          <span>{name}</span>
        </Link>
      </Menu.Item>
    )
  }
  renderSubMenu = ({ url, icon, name, subs }) => {
    return (
      <Menu.SubMenu
        key={url}
        title={
          <span>
            {icon && <Icon type={icon} />}
            <span>{name}</span>
          </span>
        }
      >
        {subs &&
          subs.map(item => {
            return item.subs && item.subs.length > 0
              ? this.renderSubMenu(item)
              : this.renderMenuItem(item)
          })}
      </Menu.SubMenu>
    )
  }
  onOpenChange = openKeys => {
    //此函数的作用只展开当前父级菜单（父级菜单下可能还有子菜单）
    console.log(openKeys)
    this.setState({
      openKeys
    })
    // //最新展开的菜单
    // const latestOpenKey = openKeys[openKeys.length - 1]
    // //判断最新展开的菜单是不是父级菜单，若是父级菜单就只展开一个，不是父级菜单就展开父级菜单和当前子菜单
    // //因为我的子菜单的key包含了父级菜单，所以不用像官网的例子单独定义父级菜单数组，然后比较当前菜单在不在父级菜单数组里面。
    // //只适用于3级菜单
    // if (latestOpenKey.includes(openKeys[0])) {
    //   this.setState({
    //     openKeys
    //   })
    // } else {
    //   this.setState({
    //     openKeys: [latestOpenKey]
    //   })
    // }
  }
  onClick = ({ key }) => {
    this.setState({ selectedKeys: [key] })
  }
  menusTree = pathname => {
    this.props.menus.forEach((item, index, arr) => {
      if (item.url === pathname) {
        this.setState({
          selectedKeys: [pathname]
        })
      } else if (item.subs && item.subs.length > 0) {
        item.subs.forEach((item1, index, arr) => {
          if (item1.url === pathname) {
            this.setState({
              selectedKeys: [pathname],
              openKeys: [item.url]
            })
          } else if (item1.subs && item1.subs.length > 0) {
            item1.subs.forEach((item2, index, arr) => {
              if (item2.url === pathname) {
                this.setState({
                  selectedKeys: [pathname],
                  openKeys: [item.url, item1.url]
                })
              }
            })
          }
        })
      }
    })
  }
  componentDidMount() {
    // 防止页面刷新侧边栏又初始化了
    const pathname = this.props.location.pathname.split('/').join('')
    this.menusTree(pathname)
  }

  render() {
    const { openKeys, selectedKeys } = this.state
    const defaultProps = this.props.collapsed ? {} : { openKeys }
    return (
      <div>
        <div style={styles.logo} />
        <Menu
          onClick={this.onClick}
          onOpenChange={this.onOpenChange}
          selectedKeys={selectedKeys}
          {...defaultProps}
          mode="inline"
          theme="dark"
        >
          {this.props.menus &&
            this.props.menus.map(item => {
              return item.subs && item.subs.length > 0
                ? this.renderSubMenu(item)
                : this.renderMenuItem(item)
            })}
        </Menu>
      </div>
    )
  }
}
const styles = {
  logo: {
    height: '32px',
    background: 'rgba(255, 255, 255, .2)',
    margin: '16px'
  }
}

const mapStateToProps = state => {
  return {
    menus: state.userReducer.menus
  }
}
export default connect(
  mapStateToProps,
  null
)(withRouter(CustomMenu))
