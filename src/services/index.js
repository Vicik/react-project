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
export const getArticles = () => {
  return services.post('/api/v1/articleList')
}