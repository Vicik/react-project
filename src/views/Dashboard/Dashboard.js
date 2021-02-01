import React, {Component, Fragment} from 'react';
import { Card,Row,Col } from 'antd'
import './dashboard.less'

class Dashboard extends Component {
  render() {
    return (
      <Fragment>
        <Card title='概览' bordered={false}>
          <Row gutter={16}>
            <Col className="gutter-row" span={6}>
              <div style={{padding: '8px 0', backgroundColor: '#29b6f6'}}>col-6</div>
            </Col>
            <Col className="gutter-row" span={6}>
              <div style={{padding: '8px 0', backgroundColor: '#AB47BC'}}>col-6</div>
            </Col>
            <Col className="gutter-row" span={6}>
              <div style={{padding: '8px 0', backgroundColor: '#FF7043'}}>col-6</div>
            </Col>
            <Col className="gutter-row" span={6}>
              <div style={{padding: '8px 0', backgroundColor: '#43A047'}}>col-6</div>
            </Col>
          </Row>
        </Card>
        <Card title='文章浏览量' bordered={false}>

        </Card>
      </Fragment>
    );
  }
}

export default Dashboard;