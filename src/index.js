import React from 'react';
import ReactDOM from 'react-dom';
import './index.less';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { ConfigProvider } from 'antd'; // 全局配置
import zhCN from 'antd/lib/locale/zh_CN'; // 引入中文包

import { BrowserRouter as Router, Route, Switch,Redirect } from 'react-router-dom'
import { mainRouter } from './routes'
ReactDOM.render(
  // <React.StrictMode>
    <ConfigProvider  locale={zhCN}>
      <Router>
        <Switch>
          <Route path='/admin'  render={(routerProps) => {
            return <App {...routerProps} />
          }} />
          {
            mainRouter.map(route => {
              return <Route path={route.pathname} key={route.pathname} component={route.component}/>
            })
          }
          <Redirect to='/admin' from='/' exact></Redirect>
          <Redirect to='/404' ></Redirect>
        </Switch>
      </Router>
    </ConfigProvider>,
  // </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
