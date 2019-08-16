import React, { Component } from 'react'
import { Form, Input, Button, Table, Tooltip, Select } from 'antd'
import API from '@/api/Index'
const { Option } = Select
class Index extends Component {
  state = {
    current: 1,
    total: null,
    templateCode: null,
    platformId: null,
    sysTemplateCode: null,
    getPlatFormList: [],
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
  getTableData = async (
    params = {
      pageNo: this.state.current,
      pageSize: 10,
      sysTemplateCode: this.state.sysTemplateCode,
      templateCode: this.state.templateCode,
      platformId: this.state.platformId
    }
  ) => {
    let { data } = await API.getTableData(params)
    this.setState({
      dataSource: data.list,
      total: data.total
    })
  }
  getPlatFormList = async (params = {}) => {
    let { data } = await API.getPlatFormList(params)
    this.setState({
      getPlatFormList: data
    })
  }
  onChange(pageNumber) {
    this.setState({ current: pageNumber }, () => this.getTableData())
  }
  handleSubmit = e => {
    e.preventDefault()
    this.props.form.validateFields((err, values) => {
      this.onChange(1)
    })
  }
  componentDidMount() {
    this.getTableData()
    this.getPlatFormList()
  }
  render() {
    const { getFieldDecorator } = this.props.form
    return (
      <div>
        <div>
          <Form
            layout="inline"
            onSubmit={this.handleSubmit}
            className="search-form"
          >
            <Form.Item label="系统模板号：">
              {getFieldDecorator('sysTemplateCode')(
                <Input
                  onChange={e => {
                    this.setState({ sysTemplateCode: e.target.value })
                  }}
                  allowClear
                  placeholder="请填写系统模板号"
                />
              )}
            </Form.Item>
            <Form.Item label="渠道模板号：">
              {getFieldDecorator('templateCode')(
                <Input
                  onChange={e => {
                    this.setState({ templateCode: e.target.value })
                  }}
                  allowClear
                  placeholder="请填写渠道模板号"
                />
              )}
            </Form.Item>
            <Form.Item label="平台标识：">
              {getFieldDecorator('platformId')(
                <Select
                  onChange={value => {
                    this.setState({ platformId: value })
                  }}
                  placeholder="请填写平台标识"
                  style={{ width: 213 }}
                  allowClear
                >
                  {this.state.getPlatFormList.map((item, index) => (
                    <Option key={index} value={item.id}>
                      {item.platformName}
                    </Option>
                  ))}
                </Select>
              )}
            </Form.Item>
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                className="search-form-button mb20"
              >
                search
              </Button>
            </Form.Item>
          </Form>
        </div>
        <Table
          bordered={true}
          rowKey="id"
          dataSource={this.state.dataSource}
          columns={this.state.columns}
          pagination={{
            showQuickJumper: true,
            current: this.state.current,
            total: this.state.total, //数据总数量
            pageSize: 10, //显示几条一页
            onChange: this.onChange.bind(this)
          }}
        />
      </div>
    )
  }
}
const IndexForm = Form.create({ name: 'normal_Index' })(Index)
export default IndexForm
