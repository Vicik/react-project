import React, {Component} from 'react';
import { Route,Switch,Redirect } from 'react-router-dom'
import { adminRouter } from './routes'
import { getTodos } from './services'
import { Frame } from './components'
const menus = adminRouter.filter(route => route.isNav === true)
class App extends Component {
  componentDidMount() {
    console.log(getTodos)
  }

  render() {
    return (
      <div>
        <Frame menus={menus}>
          <Switch>
            {adminRouter.map(route => {
              return <Route key={route.pathname}  exact={route.exact} path={route.pathname} render={(routerProps) => {
                return <route.component {...routerProps}/>
              }
              }/>
            })}
            <Redirect to={adminRouter[0].pathname} from='/admin' exact />
            <Redirect to='/404'/>
          </Switch>
        </Frame>
      </div>
    );
  }
}

export default App;