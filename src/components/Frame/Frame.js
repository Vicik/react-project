import React, {Component} from 'react'
import { Layout, Menu,Dropdown,Avatar,Badge } from 'antd'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import './frame.less'
import { UserOutlined,DownOutlined } from '@ant-design/icons'
import { getNotifications } from '../../actions/notification'
const { Header, Content, Sider } = Layout

const mapState = state => {
  return {
    notificationsCount: state.notifications.list.filter(item => !item.hasRead).length
  }
}
// 用于获取router的各种属性
@withRouter

@connect(mapState,{ getNotifications })

class Frame extends Component {
  constructor(props) {
    super(props)
  }
  changeRoute = ({key}) => {
    this.props.history.push(key)
  }
  // 点击下拉菜单
  onDropDownMenuClick = ({key}) => {
    this.props.history.push(key)
  }

  componentDidMount() {
    this.props.getNotifications()
  }

  renderMenu = () => (
    <Menu onClick={this.onDropDownMenuClick}>
      <Menu.Item key='/admin/notifications'>
        <Badge dot={!!this.props.notificationsCount}>
          通知中心
        </Badge>
      </Menu.Item>
      <Menu.Item key='/admin/settings'>
        个人设置
      </Menu.Item>
      <Menu.Item key='/admin/logout'>
        退出
      </Menu.Item>
    </Menu>
  )
  render() {
    const pathArr = this.props.location.pathname.split('/')
    pathArr.length = 3
    const selectedKey = pathArr.join('/')
    return (
      <Layout style={{minHeight: '100%'}}>
        <Header className="header cs-header">
          <Dropdown overlay={this.renderMenu()}>
            <Badge count={this.props.notificationsCount} offset={[10,0]}>
              <div style={{display: 'inline-block'}}>
                <Avatar style={{ backgroundColor: '#87d068' }} icon={<UserOutlined />} /><span>欢迎你</span><DownOutlined />
              </div>
            </Badge>
          </Dropdown>
        </Header>
        <Layout>
          <Sider width={200} className="site-layout-background">
            <Menu
              mode="inline"
              selectedKeys={[selectedKey]}
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