import axios from 'axios'
const isDev = process.env.NODE_ENV === 'development'
const services = axios.create({
  baseURL: isDev ? 'http://rap2api.taobao.org/app/mock/176929':'',
})
services.interceptors.request.use((config) => {
  config.data = Object.assign({},config.data, {
    // authToken: window.localStorage.getItem('authToken')
    authToken: 'listeeedaefegeefd'
  })
  return config
})

services.interceptors.response.use(res => {
   if(res.data.code === 200) {
     return res.data.data
   }else{
     // return
   }
})
// 获取文章列表
export const getArticles = (offset=0,limited=20) => {
  return services.post('/api/v1/articleList',{
    offset,limited
  })
}
// 通过id删除文章
export const deleteArticle = (id) => {
  return services.post('/api/v1/articleDelete',{
    id
  })
}

// 通过ID获取文章
export const getArticle = (id) => {
  return services.post(`/api/v1/article/${id}`)
}

// 修改文章
export const editArticle = (id,data) => {
  return services.post(`/api/v1/articleEdit/${id}`,data)
}

// 文章浏览量统计
export const getArticleAmount = () => {
  return services.post('/api/v1/articleAmount')
}

// 获取通知的列表
export const getNotificationList = () => {
  return services.post('/api/v1/notifications')
}