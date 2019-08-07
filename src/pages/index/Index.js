import React, { Component } from 'react'
import { Table, Tooltip, Input, Select, Button } from 'antd'
import API from '@/api/Index'
const { Option } = Select
class Index extends Component {
  state = {
    form: {},
    pageNo: 1,
    total: null,
    dataSource: [],
    columns: [
      {
        title: '系统模板号',
        dataIndex: 'sysTemplateCode',
        key: 'sysTemplateCode'
      },
      {
        title: '渠道模板号',
        dataIndex: 'templateCode',
        key: 'templateCode'
      },
      {
        title: '短信说明',
        dataIndex: 'explain',
        key: 'explain'
      },
      {
        title: '短信模板内容',
        dataIndex: 'content',
        key: 'content',
        onCell: () => {
          return {
            style: {
              maxWidth: 200,
              overflow: 'hidden',
              whiteSpace: 'nowrap',
              textOverflow: 'ellipsis',
              cursor: 'pointer'
            }
          }
        },
        render: text => (
          <Tooltip placement="topLeft" title={text}>
            {text}
          </Tooltip>
        )
      }
    ]
  }
  handleChange(value) {
    console.log(`selected ${value}`)
  }
  getTableData = async params => {
    let { data } = await API.getTableData(params)
    this.setState({
      dataSource: data.list,
      total: data.total
    })
  }
  onChange(pageNumber) {
    this.setState({ pageNo: pageNumber }, () =>
      this.getTableData({
        pageNo: this.state.pageNo,
        pageSize: 10
      })
    )
  }
  componentDidMount() {
    this.getTableData({
      pageNo: this.state.pageNo,
      pageSize: 10
    })
  }
  render() {
    return (
      <div>
        <div>
          <Button type="primary" icon="search">
            Search
          </Button>
        </div>
        <div className="search mt15 mb10">
          <Input
            className="mr10 mb10"
            style={{ width: 160 }}
            placeholder="系统模板号："
          />
          <Input
            className="mr10 mb10"
            style={{ width: 160 }}
            placeholder="渠道模板号："
          />
          <Select
            className="mr10 mb10"
            style={{ width: 160 }}
            onChange={this.handleChange}
            placeholder="平台标识："
          >
            <Option value="jack">Jack</Option>
            <Option value="lucy">Lucy</Option>
            <Option value="Yiminghe">yiminghe</Option>
          </Select>
        </div>
        <Table
          bordered={true}
          rowKey="id"
          dataSource={this.state.dataSource}
          columns={this.state.columns}
          pagination={{
            total: this.state.total, //数据总数量
            pageSize: 10, //显示几条一页
            onChange: this.onChange.bind(this)
          }}
        />
      </div>
    )
  }
}

export default Index
