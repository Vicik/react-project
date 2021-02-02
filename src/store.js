import { createStore, applyMiddleware  } from 'redux'
import thunk from 'redux-thunk' // 中间件
import rootReducer from './reducers'

export default createStore(
  rootReducer,
  applyMiddleware(thunk)
)