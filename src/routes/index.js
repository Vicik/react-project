import {
  Dashboard,
  Login,
  NotFound,
  ArticleList,
  ArticleEdit,
  Settings,
  Notifications,
  NoAuth,
  Profile
} from '../views'

export const mainRouter = [
  {pathname: '/login',component: Login},
  {pathname: '/404',component: NotFound},
]
export const adminRouter = [
  {pathname: '/admin/dasheboard',component: Dashboard,title: '仪表盘',isNav: true,icon: 'DashboardOutlined',roles: ['001','002','003']},
  {pathname: '/admin/article',component: ArticleList,exact: true,title: '文章列表',isNav: true,icon: 'UnorderedListOutlined',roles: ['001','002']},
  {pathname: '/admin/article/edit/:id',component: ArticleEdit,title: '文章编辑',roles: ['001','002']},
  {pathname: '/admin/settings',component: Settings,title: '设置',isNav: true,icon: 'SettingOutlined',roles: ['001']},
  {pathname: '/admin/notifications',component: Notifications,roles: ['001','002','003']},
  {pathname: '/admin/noAuth',component: NoAuth,roles: ['001','002','003']},
  {pathname: '/admin/profile',component: Profile,roles: ['001','002','003']},
]