import {
  Dashboard,
  Login,
  NotFound,
  ArticleList,
  ArticleEdit,
  Settings
} from '../views'

export const mainRouter = [
  {pathname: '/login',component: Login},
  {pathname: '/404',component: NotFound},
]
export const adminRouter = [
  {pathname: '/admin/dasheboard',component: Dashboard,title: '仪表盘',isNav: true},
  {pathname: '/admin/article',component: ArticleList,exact: true,title: '文章列表',isNav: true},
  {pathname: '/admin/article/edit/:id',component: ArticleEdit,title: '文章编辑',isNav: true},
  {pathname: '/admin/settings',component: Settings,title: '设置',isNav: true},
]