import React from 'react'
import CustomMenu from './CustomMenu'

const menus = [
  {
    title: '首页',
    icon: 'index',
    key: '/index'
  },
  {
    title: '基本组件',
    icon: 'laptop',
    key: '/index/general',
    subs: [
      { key: '/index/general/button', title: '按钮', icon: '' },
      { key: '/index/general/icon', title: '图标', icon: '' }
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
          { key: '/index/entry/form/basic-form', title: '基础表单', icon: '' },
          { key: '/index/entry/form/step-form', title: '分步表单', icon: '' }
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
      { key: '/index/feedback/notification', title: '通知提醒框', icon: '' },
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
    key: '/about'
  }
]

class SiderNav extends React.Component {
  render() {
    return (
      <div>
        <div style={styles.logo} />
        <CustomMenu menus={menus} />
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

export default SiderNav
