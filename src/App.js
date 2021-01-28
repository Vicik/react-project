import React, {Component, Fragment} from 'react';
import { Route,Switch,Redirect } from 'react-router-dom'
import { adminRouter } from './routes'
import { Frame } from './components'
const menus = adminRouter.filter(route => route.isNav === true)
class App extends Component {

  render() {
    return (
      <Fragment>
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
      </Fragment>
    );
  }
}

export default App;