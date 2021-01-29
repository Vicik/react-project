import React, {Component,Fragment} from 'react';
import moment from 'moment';
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
      total: 0,
      isLoading: false
    }
  }
  getData = () =>  {
    this.setState({
      isLoading: true
    })
    getArticles().then(res => {
      let keys = Object.keys(res.list[0])
      let columns = keys.map(item => {
        if(item === 'amount') {
          return {
            title: titleDisplayMap[item],
            key: item,
            render: (text,record) => { // 对每一列的内容进行特殊处理/格式化
              const { amount } = record
              return <Tag color={amount > 200 ? 'red' : 'green'}>{record.amount}</Tag>
            }
          }
        }
        if(item === 'createAt') {
          return{
            title: titleDisplayMap[item],
            key: item,
            render: (text,record) => { // 对每一列的内容进行特殊处理/格式化
              const { createAt } = record
              return moment(createAt).format('YYYY年MM月DD日 HH:mm:ss')
            }
          }
        }
        return {
          title: titleDisplayMap[item],
          dataIndex: item,
          key: item
        }
      })
      columns.push({
        title: '操作',
        key: 'actions',
        render: (text,record) => { // 对每一列的内容进行特殊处理/格式化
          return <Fragment><Button size='small' type='primary'>编辑</Button><Button size='small' danger>删除</Button></Fragment>
        }
      })
      this.setState({
        total: res.total,
        dataSource: res.list,
        columns: columns
      })
    }).catch(err => {

    }).finally(() => {
      this.setState({
          isLoading: false
        }
      )
    })
  }

  componentDidMount() {
    this.getData()
  }

  render() {
    return (
      <Fragment>
        <Card title="文章列表" bordered={false} extra={<Button>导出excel</Button>}>
          <Table
            rowKey={record => record.id}
            dataSource={this.state.dataSource}
            columns={this.state.columns}
            pagination={{total: this.state.total,hideOnSinglePage: true}}
            loading={this.state.isLoading}
          />
        </Card>
      </Fragment>
    );
  }
}

export default ArticleList;