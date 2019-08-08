import React, { Component } from 'react'
import { Form, Input, Button, Table, Tooltip, Select } from 'antd'
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
  handleSubmit = e => {
    e.preventDefault()
    this.props.form.validateFields((err, values) => {
      console.log(err, values)
    })
  }
  componentDidMount() {
    this.getTableData({
      pageNo: this.state.pageNo,
      pageSize: 10
    })
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
                <Input allowClear placeholder="请填写系统模板号" />
              )}
            </Form.Item>
            <Form.Item label="渠道模板号：">
              {getFieldDecorator('templateCode')(
                <Input allowClear placeholder="请填写渠道模板号" />
              )}
            </Form.Item>
            <Form.Item label="平台标识：">
              {getFieldDecorator('platformId')(
                <Select allowClear>
                  <Option value="male">male</Option>
                  <Option value="female">female</Option>
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
