// 组件按需加载
import Loadable from 'react-loadable'
import { Loading } from '../components'

const Dashboard = Loadable({
  loader: () => import('./Dashboard/Dashboard'),
  loading: Loading,
})
const Login = Loadable({
  loader: () => import('./Login/Login'),
  loading: Loading,
})
const NotFound = Loadable({
  loader: () => import('./NotFound/NotFound'),
  loading: Loading,
})
const ArticleList = Loadable({
  loader: () => import('./Article/ArticleList'),
  loading: Loading,
})
const ArticleEdit = Loadable({
  loader: () => import('./Article/ArticleEdit'),
  loading: Loading,
})
const Settings = Loadable({
  loader: () => import('./Settings/Settings'),
  loading: Loading,
})
export {
  Dashboard,
  Login,
  NotFound,
  ArticleList,
  ArticleEdit,
  Settings
}
// import Dashboard from "./Dashboard/Dashboard";
// import Login from "./Login/Login"
// import NotFound from "./NotFound/NotFound";
// import ArticleList from "./Article/ArticleList";
// import ArticleEdit from "./Article/ArticleEdit";
// import Settings from "./Settings/Settings";
//
// export {
//   Dashboard,
//   Login,
//   NotFound,
//   ArticleList,
//   ArticleEdit,
//   Settings
// }
