import React, {Component,Fragment,createRef} from 'react';
import { Card,Button,Form,Input,DatePicker,Spin,message } from "antd";
import E from 'wangeditor'
import './index.less'
import { getArticle,editArticle } from '../../services'
import monent from 'moment'

//表单布局
const formItemLayout = {
  labelCol: {
    span: 4
  },
  wrapperCol: {
    span: 16
  }
}

//提交按钮布局
const tailLayout = {
  wrapperCol: {
    offset: 4,
    span: 16,
  }
}

class ArticleEdit extends Component {
  constructor() {
    super()
    this.editorRef = createRef()
    this.formRef = createRef()
    this.editor = null
    this.state = {
      isSaving: false
    }
  }

  // 提交表单
  handleFinish = (values) => {
    const data = Object.assign({},values,{createAt: values.createAt.valueOf()})
    this.setState({
      isSaving: true
    })
    editArticle(this.props.match.params.id,data).then(res => {
      message.success(res.msg)
      this.props.history.push('/admin/article')
    }).finally(() => {
      this.setState({
        isSaving: false
      })
    })
  }

  // 初始化编辑器
  initEditor = () => {
    this.editor = new E(this.editorRef.current)
    this.editor.config.onchange = (newHtml) => {
      this.formRef.current.setFieldsValue({
        content: newHtml
      })
    }
    this.editor.create()
  }

  componentDidMount() {
    this.initEditor()
    getArticle(this.props.match.params.id).then(res => {
      this.formRef.current.setFieldsValue({
        title: res.title,
        author: res.author,
        amount: res.amount,
        createAt: monent(res.createAt),
        content: res.content
      })
      this.editor.txt.html(res.content)
    })
  }

  render() {
    return (
      <Fragment>
        <Card title="编辑文章" bordered={false} extra={<Button onClick={this.props.history.goBack}>取消</Button>}>
          <Spin spinning={this.state.isSaving}>
            <Form name="basic" onFinish={this.handleFinish} {...formItemLayout} ref={this.formRef}>
              <Form.Item
                label="标题"
                name="title"
                rules={[
                  {
                    required: true,
                    message: '请输入标题',
                  },
                ]}>
                <Input placeholder='标题'></Input>
              </Form.Item>
              <Form.Item
                label="作者"
                name="author"
                rules={[
                  {
                    required: true,
                    message: '请输入作者姓名',
                  },
                ]}>
                <Input placeholder='作者姓名'></Input>
              </Form.Item>
              <Form.Item
                label="阅读量"
                name="amount"
                rules={[
                  {
                    required: true,
                    message: '请输入阅读量',
                  },
                ]}
              >
                <Input placeholder='阅读量'></Input>
              </Form.Item>
              <Form.Item
                label="创建时间"
                name="createAt"
                rules={[
                  {
                    required: true,
                    message: '请选择时间',
                  },
                ]}
                >
                <DatePicker/>
              </Form.Item>
              <Form.Item
                label="内容"
                name='content'
                rules={[
                  {
                    required: true,
                    message: '内容是必需的',
                  },
                ]}
              >
                <div ref={this.editorRef} className='qf-editor'></div>
              </Form.Item>
              <Form.Item {...tailLayout}>
                <Button type="primary" htmlType="submit">提交</Button>
              </Form.Item>
            </Form>
          </Spin>
        </Card>
      </Fragment>
    );
  }
}

export default ArticleEdit;