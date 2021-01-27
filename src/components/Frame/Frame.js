import React, {Component} from 'react';
import { Layout, Menu, Breadcrumb } from 'antd';
import './frame.less'
const { Header, Content, Sider } = Layout;
class Frame extends Component {
  render() {
    return (
      <Layout>
        <Header className="header cs-header">
          <div className="logo" />
        </Header>
        <Layout>
          <Sider width={200} className="site-layout-background">
            <Menu
              mode="inline"
              defaultSelectedKeys={['1']}
              defaultOpenKeys={['sub1']}
              style={{ height: '100%', borderRight: 0 }}
            >
              {
                this.props.menus.map(menu => {
                  return <Menu.Item key={menu.pathname}>{menu.title}</Menu.Item>
                })
              }
            </Menu>
          </Sider>
          <Layout style={{ padding: '0 24px 24px' }}>
            <Breadcrumb style={{ margin: '16px 0' }}>
              <Breadcrumb.Item>Home</Breadcrumb.Item>
              <Breadcrumb.Item>List</Breadcrumb.Item>
              <Breadcrumb.Item>App</Breadcrumb.Item>
            </Breadcrumb>
            <Content
              className="site-layout-background"
              style={{
                padding: 24,
                margin: 0,
                minHeight: 280,
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