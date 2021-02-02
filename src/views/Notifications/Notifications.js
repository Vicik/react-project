import React, {Component,Fragment} from 'react';
import {Card,Button,List,Badge,Spin} from "antd";
import { connect } from 'react-redux'
import { markNotificationAsRead,markAllNotificationAsRead } from '../../actions/notification'
const mapState = state => {
  return {
    list: state.notifications.list,
    isLoading: state.notifications.isLoading
  }
}
@connect(mapState,{ markNotificationAsRead,markAllNotificationAsRead })
class Notifications extends Component {
  render() {
    return (
      <Fragment>
        <Spin spinning={this.props.isLoading}>
          <Card title='通知中心' bordered={false} extra={<Button disabled={this.props.list.every(item => item.hasRead)} onClick={this.props.markAllNotificationAsRead}>全部标记为已读</Button>}>
            <List
              itemLayout="horizontal"
              dataSource={this.props.list}
              renderItem={item => (
                <List.Item extra={item.hasRead ? null : <Button onClick={this.props.markNotificationAsRead.bind(this,item.id)}>标记为已读</Button>}>
                  <List.Item.Meta
                    title={<Badge dot={!item.hasRead}>{item.title}</Badge>}
                    description={item.desc}
                  />
                </List.Item>
              )}
            />
          </Card>
        </Spin>
        </Fragment>
    );
  }
}

export default Notifications;