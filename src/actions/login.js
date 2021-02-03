import actionTypes from "./actionTypes";
// import { loginRequest } from '../services'

const startLogin = () => {
  return {
    type: actionTypes.START_LOGIN
  }
}

const loginSuccess = (userInfo) => {
  return {
    type: actionTypes.LOGIN_SUCCESS,
    payload: {
      userInfo
    }
  }
}

const loginFailed = () => {
  window.localStorage.removeItem('userinfo')
  window.localStorage.removeItem('authToken')
  window.sessionStorage.removeItem('userinfo')
  window.sessionStorage.removeItem('authToken')
  return {
    type: actionTypes.LOGIN_FAILED
  }
}

export const login = (userInfo) => {
  return dispatch => {
    dispatch(startLogin())
    dispatch(loginSuccess(userInfo))
    if(userInfo.remember === true) {
      window.localStorage.setItem('userinfo',JSON.stringify(userInfo))
      window.localStorage.setItem('authToken','123der')
    }else{
      window.sessionStorage.setItem('userinfo',JSON.stringify(userInfo))
      window.sessionStorage.setItem('authToken','123der')
    }
    // 发送登录请求
    // loginRequest(userInfo).then(res => {
    //   console.log(res)
    // })
  }
}

export const logout = () => {
  return dispatch => {
    dispatch(loginFailed())
  }
}