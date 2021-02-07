import React, {Component,Fragment} from 'react';
import moment from 'moment';
import XLSX from 'xlsx'
import {
  Card,Button,Table,Tag,Modal,message,Tooltip
} from 'antd'

import { getArticles,deleteArticle } from "../../services";
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
      isLoading: false,
      offset: 0, // 每页数据第一条数据的索引
      limited: 10,
      visible: false, // 删除弹窗
      deleteArticleTite: null, // 删除的文章标题
      deleteArticleId: null, // 删除的文章ID
    }
  }

  //获取列表数据
  getData = () =>  {
    this.setState({
      isLoading: true
    })
    getArticles(this.state.offset,this.state.limited).then(res => {
      let columns = this.formatColumns(res.list[0])
      console.log(this)
      if(!this.updater.isMounted(this)) return
      this.setState({
        total: res.total,
        dataSource: res.list,
        columns: columns
      })
    }).finally(() => {
      if(!this.updater.isMounted(this)) return
      this.setState({
          isLoading: false
        }
      )
    })
  }

   // 格式化列数据
  formatColumns = (colums) => {
    let keys = Object.keys(colums)
    let columns = keys.map(item => {
      if(item === 'amount') {
        return {
          title: titleDisplayMap[item],
          key: item,
          render: (text,record) => { // 对每一列的内容进行特殊处理/格式化
            const { amount } = record
            return <Tooltip title='阅读量'><Tag color={amount > 200 ? 'red' : 'green'}>{record.amount}</Tag></Tooltip>
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
        return <Fragment><Button size='small' type='primary' onClick={this.toEdit.bind(this,record.id)}>编辑</Button><Button size='small' danger onClick={this.openDeleteArticle.bind(this,record)}>删除</Button></Fragment>
      }
    })
    return columns
  }

  // 分页切换
  onPageChange = (page,pagesize) => {
    this.setState({
      offset: pagesize * (page - 1)
    },() => {
      this.getData()
    })
  }

  // 导出excel
  toExcel = () => {
    const data = Object.keys(this.state.dataSource[0])
    const dataSource = this.state.dataSource.reduce((result,cur) => {
      let values = [cur.id,cur.title,cur.author,cur.amount,moment(cur.createAt).format('YYYY年MM月DD日 HH:mm:ss')]
      result.push(values)
      return result
    },[])
    const ws = XLSX.utils.aoa_to_sheet([data,...dataSource])
    const wb = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(wb,ws,'SheetJS')
    XLSX.writeFile(wb,'导出数据.xlsx')
  }

  // 删除指定文章
  openDeleteArticle = (record) => {
    this.setState({
      visible: true,
      deleteArticleTitle: record.title,
      deleteArticleId: record.id
    })
  }

  // 确定删除
  confirmDelete = () => {
    deleteArticle(this.state.deleteArticleId).then((res) => {
      this.setState({
        visible: false,
      })
      message.success(res.msg)
      this.getData()
    })
  }

  // 关闭删除弹窗
  cancelDelete = () => {
    this.setState({
      visible: false
    })
  }

  // 跳转到文章详情页进行编辑
  toEdit = (id) => {
    this.props.history.push('/admin/article/edit/' + id)
  }

  componentDidMount() {
    this.getData()
  }

  render() {
    return (
      <Fragment>
        <Card title="文章列表" bordered={false} extra={<Button onClick={this.toExcel}>导出excel</Button>}>
          <Table
            rowKey={record => record.id}
            dataSource={this.state.dataSource}
            columns={this.state.columns}
            pagination={{total: this.state.total,hideOnSinglePage: true,onChange: this.onPageChange}}
            loading={this.state.isLoading}
          />
        </Card>
        <Modal title='提示' visible={this.state.visible} onCancel={this.cancelDelete} onOk={this.confirmDelete}>
          <p>是否确定删除{this.state.deleteArticleTitle}</p>
        </Modal>
      </Fragment>
    )
  }
}

export default ArticleList