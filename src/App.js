import React, {Component, Fragment} from 'react';
import { Route,Switch,Redirect } from 'react-router-dom'
import { adminRouter } from './routes'
import { Frame } from './components'
import { connect } from 'react-redux'

const mapState = state => ({
  isLogin: state.login.isLogin,
  role: state.login.role
})
const menus = adminRouter.filter(route => route.isNav === true)

@connect(mapState)

class App extends Component {
  render() {
    return (
      this.props.isLogin ?
      <Fragment>
        <Frame menus={menus}>
          <Switch>
            {adminRouter.map(route => {
              return <Route key={route.pathname}  exact={route.exact} path={route.pathname} render={(routerProps) => {
                const hasPermission = route.roles.includes(this.props.role)
                console.log(this.props.role)
                return hasPermission ? <route.component {...routerProps}/> : <Redirect to='/admin/noAuth'></Redirect>
              }
              }/>
            })}
            <Redirect to={adminRouter[0].pathname} from='/admin' exact />
            <Redirect to='/404'/>
          </Switch>
        </Frame>
      </Fragment>
        : <Redirect to='/login'></Redirect>
    );
  }
}

export default App;