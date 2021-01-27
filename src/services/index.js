import axios from 'axios'

const ajax = axios.create({
  baseURL: '',
})

export const getTodos = () => {
  return ajax.get()
}