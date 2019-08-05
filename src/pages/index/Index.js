import React, { Component } from 'react'
import { Table } from 'antd'
import API from '@/api/Index'

class Index extends Component {
  state = {
    dataSource: [],
    columns: [
      {
        title: '平台标识',
        dataIndex: 'platformId',
        key: 'platformId'
      },
      {
        title: '系统模板号',
        dataIndex: 'sysTemplateCode',
        key: 'sysTemplateCode'
      },
      {
        title: '渠道模板号',
        dataIndex: 'templateCode',
        key: 'templateCode'
      }
    ]
  }
  getTableData = async params => {
    let { data } = await API.getTableData(params)
    this.setState({
      dataSource: data.list
    })
  }
  componentDidMount() {
    this.getTableData({
      pageNo: 1,
      pageSize: 20
    })
  }
  render() {
    return (
      <div>
        <Table
          pagination={false}
          dataSource={this.state.dataSource}
          columns={this.state.columns}
        />
      </div>
    )
  }
}

export default Index
