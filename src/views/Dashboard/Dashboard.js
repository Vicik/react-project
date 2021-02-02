import React, {Component, Fragment,createRef} from 'react';
import { Card,Row,Col } from 'antd'
import './dashboard.less'
import * as echarts from 'echarts'
import { getArticleAmount } from "../../services";

class Dashboard extends Component {
  constructor() {
    super()
    this.articleAmount = createRef()
  }

  // 初始化echarts
  initArticleChart = () => {
    this.articleChart = echarts.init(this.articleAmount.current)
    getArticleAmount().then(res => {
      const option = {
        xAxis: {
          boundaryGap: false,
          data: res.amount.map(item => item.month)
        },
        yAxis: {
          type: 'value'
        },
        series: [{
          data: res.amount.map(item => item.value),
          type: 'line',
          areaStyle: {}
        }]
      }
      this.articleChart.setOption(option)
    })
  }

  componentDidMount() {
    this.initArticleChart()

  }

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
          <div ref={this.articleAmount} style={{height: '400px'}}></div>
        </Card>
      </Fragment>
    );
  }
}

export default Dashboard;