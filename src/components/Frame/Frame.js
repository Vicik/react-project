import React, {Component} from 'react';
import { Layout, Menu } from 'antd';
import { withRouter } from 'react-router-dom'
import './frame.less'
const { Header, Content, Sider } = Layout;

// 用于获取router的各种属性
@withRouter

class Frame extends Component {
  changeRoute = ({key}) => {
    this.props.history.push(key)
  }
  render() {
    return (
      <Layout style={{minHeight: '100%'}}>
        <Header className="header cs-header">
          <div className="logo" />
        </Header>
        <Layout>
          <Sider width={200} className="site-layout-background">
            <Menu
              mode="inline"
              selectedKeys={[this.props.location.pathname]}
              style={{ height: '100%', borderRight: 0 }}
              onClick={this.changeRoute}
            >
              {
                this.props.menus.map(menu => {
                  const Icon = require('@ant-design/icons')[menu.icon];
                  return <Menu.Item key={menu.pathname}>
                    <Icon style={{fontSize: '18px',position: 'relative',top: '2px'}}/>
                    {menu.title}
                  </Menu.Item>
                })
              }
            </Menu>
          </Sider>
          <Layout style={{ padding: '16px' }}>
            <Content
              className="site-layout-background"
              style={{
                margin: 0,
                backgroundColor: '#fff'
              }}
            >
              {this.props.children}
            </Content>
          </Layout>
        </Layout>
      </Layout>
    );
  }
}

export default Frame;