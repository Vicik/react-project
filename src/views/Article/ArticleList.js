import React, {Component,Fragment} from 'react';
import {
  Card,Button,Table,Tag
} from 'antd'

import { getArticles } from "../../services";

const titleDisplayMap = {
  id: 'id',
  title: '标题',
  author: '作者',
  amount: '阅读量',
  createAt: '创建时间'
}

class ArticleList extends Component {
  constructor() {
    super()
    this.state = {
      dataSource: [],
      columns: [],
      total: 0
    }
  }
  getData = () =>  {
    getArticles().then(res => {
      let keys = Object.keys(res.list[0])
      let columns = keys.map(item => {
        if(item === 'amount') {
          return {
            title: titleDisplayMap[item],
            key: item,
            render: (text,record) => {
              const { amount } = record
              return <Tag color={amount > 200 ? 'red' : 'green'}>{record.amount}</Tag>
            }
          }
        }
        return {
          title: titleDisplayMap[item],
          dataIndex: item,
          key: item
        }
      })
      this.setState({
        total: res.total,
        dataSource: res.list,
        columns: columns
      })
    })
  }

  componentDidMount() {
    this.getData()
  }

  render() {
    return (
      <Fragment>
        <Card title="文章列表" bordered={false} extra={<Button>导出excel</Button>}>
          <Table rowKey={record => record.id} dataSource={this.state.dataSource} columns={this.state.columns} pagination={{total: this.state.total,hideOnSinglePage: true}}/>
        </Card>
      </Fragment>
    );
  }
}

export default ArticleList;