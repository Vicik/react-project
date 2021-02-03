import React, {Component,Fragment} from 'react';
import { Form, Input, Button, Checkbox,Card } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import './Login.less'
import { connect } from 'react-redux'
import { login } from '../../actions/login'
import { Redirect } from 'react-router-dom'
const mapState = state => ({
  isLogin: state.login.isLogin,
  isLoading: state.login.isLoading
})

@connect(mapState,{ login })
class Login extends Component {
  onFinish = (values) => {
    this.props.login(values)
  }
  render() {
    return (
      this.props.isLogin
        ?
        <Redirect to='/admin'></Redirect>
        :
        <Fragment>
          <Card title='登录' className='qf-login'>
            <Form
              name="normal_login"
              className="login-form"
              initialValues={{
                remember: true,
              }}
              onFinish={this.onFinish}
            >
              <Form.Item
                name="username"
                rules={[
                  {
                    required: true,
                    message: '请输入账号!',
                  },
                ]}
              >
                <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="账号" disabled={this.props.isLoading}/>
              </Form.Item>
              <Form.Item
                name="password"
                rules={[
                  {
                    required: true,
                    message: '请输入密码!',
                  },
                ]}
              >
                <Input
                  prefix={<LockOutlined className="site-form-item-icon" />}
                  type="password"
                  placeholder="密码"
                  disabled={this.props.isLoading}
                />
              </Form.Item>
              <Form.Item>
                <Form.Item name="remember" valuePropName="checked" noStyle>
                  <Checkbox disabled={this.props.isLoading}>记住我</Checkbox>
                </Form.Item>
              </Form.Item>
              <Form.Item>
                <Button type="primary" htmlType="submit" className="login-form-button" loading={this.props.isLoading}>
                  登录
                </Button>
              </Form.Item>
            </Form>
          </Card>
        </Fragment>
    );
  }
}

export default Login;