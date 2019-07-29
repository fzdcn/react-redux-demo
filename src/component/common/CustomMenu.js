import React from 'react'
import { Link, withRouter } from 'react-router-dom'
import { Menu, Icon } from 'antd'
class CustomMenu extends React.Component {
  state = {
    openKeys: [],
    selectedKeys: [],
    menus: [
      {
        title: '首页',
        icon: 'index',
        key: '/index'
      },
      {
        title: '基本组件',
        icon: 'laptop',
        key: '/contact',
        subs: [
          { key: '/contact', title: '按钮', icon: '' },
          { key: '/about', title: '图标', icon: '' }
        ]
      },
      {
        title: '导航组件',
        icon: 'bars',
        key: '/index/navigation',
        subs: [
          { key: '/index/navigation/dropdown', title: '下拉菜单', icon: '' },
          { key: '/index/navigation/menu', title: '导航菜单', icon: '' },
          { key: '/index/navigation/steps', title: '步骤条', icon: '' }
        ]
      },
      {
        title: '输入组件',
        icon: 'edit',
        key: '/index/entry',
        subs: [
          {
            key: '/index/entry/form',
            title: '表单',
            icon: '',
            subs: [
              {
                key: '/index/entry/form/basic-form',
                title: '基础表单',
                icon: ''
              },
              {
                key: '/index/entry/form/step-form',
                title: '分步表单',
                icon: ''
              }
            ]
          },
          { key: '/index/entry/upload', title: '上传', icon: '' }
        ]
      },
      {
        title: '显示组件',
        icon: 'desktop',
        key: '/index/display',
        subs: [
          { key: '/index/display/carousel', title: '轮播图', icon: '' },
          { key: '/index/display/collapse', title: '折叠面板', icon: '' },
          { key: '/index/display/list', title: '列表', icon: '' },
          { key: '/index/display/table', title: '表格', icon: '' },
          { key: '/index/display/tabs', title: '标签页', icon: '' }
        ]
      },
      {
        title: '反馈组件',
        icon: 'message',
        key: '/index/feedback',
        subs: [
          { key: '/index/feedback/modal', title: '对话框', icon: '' },
          {
            key: '/index/feedback/notification',
            title: '通知提醒框',
            icon: ''
          },
          { key: '/index/feedback/spin', title: '加载中', icon: '' }
        ]
      },
      {
        title: '其它',
        icon: 'bulb',
        key: '/index/other',
        subs: [
          { key: '/index/other/animation', title: '动画', icon: '' },
          { key: '/index/other/gallery', title: '画廊', icon: '' },
          { key: '/index/other/draft', title: '富文本', icon: '' },
          { key: '/index/other/chart', title: '图表', icon: '' },
          { key: '/index/other/loading', title: '加载动画', icon: '' },
          { key: '/index/other/404', title: '404', icon: '' },
          { key: '/index/other/springText', title: '弹性文字', icon: '' }
        ]
      },
      {
        title: '关于',
        icon: 'info-circle-o',
        key: '/about1'
      }
    ]
  }

  renderMenuItem = ({ key, icon, title }) => {
    return (
      <Menu.Item key={key}>
        <Link to={key}>
          {icon && <Icon type={icon} />}
          <span>{title}</span>
        </Link>
      </Menu.Item>
    )
  }
  renderSubMenu = ({ key, icon, title, subs }) => {
    return (
      <Menu.SubMenu
        key={key}
        title={
          <span>
            {icon && <Icon type={icon} />}
            <span>{title}</span>
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
    console.log(openKeys)
    //此函数的作用只展开当前父级菜单（父级菜单下可能还有子菜单）
    this.setState({
      openKeys
    })
  }
  onClick = ({ key }) => {
    // this.setState({ selectedKeys: [key] })
    console.log(this.state.selectedKeys)
  }
  onSelect = ({ item, key, keyPath, selectedKeys, domEvent }) => {
    console.log({ item, key, keyPath, selectedKeys, domEvent })
  }

  componentDidMount() {
    // 防止页面刷新侧边栏又初始化了
    const pathname = this.props.location.pathname
    //获取当前所在的目录层级
    const rank = pathname.split('/')
    switch (rank.length) {
      case 2: //一级目录
        this.setState({
          selectedKeys: [pathname]
        })
        break
      case 5: //三级目录，要展开两个subMenu
        this.setState({
          selectedKeys: [pathname],
          openKeys: [rank.slice(0, 3).join('/'), rank.slice(0, 4).join('/')]
        })
        break
      default:
        this.setState({
          selectedKeys: [pathname],
          openKeys: [pathname.substr(0, pathname.lastIndexOf('/'))]
        })
    }
  }

  render() {
    const { openKeys, selectedKeys } = this.state
    const defaultProps = this.props.collapsed ? {} : { openKeys }
    return (
      <div>
        <div style={styles.logo} />
        <Menu
          onClick={this.onClick}
          onSelect={this.onSelect}
          onOpenChange={this.onOpenChange}
          inlineCollapsed={!this.props.collapsed}
          selectedKeys={selectedKeys}
          {...defaultProps}
          mode="inline"
          theme="dark"
        >
          {this.state.menus &&
            this.state.menus.map(item => {
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

export default withRouter(CustomMenu)
