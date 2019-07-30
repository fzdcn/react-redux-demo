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
        key: '/contact1',
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
    //此函数的作用只展开当前父级菜单（父级菜单下可能还有子菜单）
    if (openKeys.length === 0 || openKeys.length === 1) {
      this.setState({
        openKeys
      })
      return
    }
    //最新展开的菜单
    const latestOpenKey = openKeys[openKeys.length - 1]
    //判断最新展开的菜单是不是父级菜单，若是父级菜单就只展开一个，不是父级菜单就展开父级菜单和当前子菜单
    //因为我的子菜单的key包含了父级菜单，所以不用像官网的例子单独定义父级菜单数组，然后比较当前菜单在不在父级菜单数组里面。
    //只适用于3级菜单
    if (latestOpenKey.includes(openKeys[0])) {
      this.setState({
        openKeys
      })
    } else {
      this.setState({
        openKeys: [latestOpenKey]
      })
    }
  }
  // componentWillReceiveProps(nextProps) {
  //   //当点击面包屑导航时，侧边栏要同步响应
  //   const pathname = nextProps.location.pathname
  //   if (this.props.location.pathname !== pathname) {
  //     this.setState({
  //       selectedKeys: [pathname]
  //     })
  //   }
  // }
  onClick = ({ key }) => {
    this.setState({ selectedKeys: [key] })
    console.log(this.state.openKeys)
  }
  componentDidMount() {
    // 防止页面刷新侧边栏又初始化了
    const pathname = this.props.location.pathname
    // this.state.menus.forEach((item,index,arr) =>{
    //   if(item.subs && item.subs.length > 0){
    //     console.log(item.subs)
    //   }
    // })
    // 获取当前所在的目录层级
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
          onOpenChange={this.onOpenChange}
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
