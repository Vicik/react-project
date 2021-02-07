import actionTypes from '../actions/actionTypes'
const userInfo = JSON.parse(window.localStorage.getItem('userinfo')) || JSON.parse(window.sessionStorage.getItem('userinfo'))
const initState = {
  id: '',
  displayName: userInfo ? userInfo.username : '',
  avatar: '',
  role: userInfo ? userInfo.role : '',
  isLogin: Boolean(window.localStorage.getItem('authToken')) || Boolean(window.sessionStorage.getItem('authToken')),
  isLoading: false,
}
const login = (state = initState, action) => {
  switch (action.type) {
    case actionTypes.START_LOGIN:
      return {
        ...state,
        isLoading: true
      }
    case actionTypes.LOGIN_SUCCESS:
      return {
        ...state,
        displayName: action.payload.userInfo.username,
        isLoading: false,
        isLogin: true,
        role: action.payload.userInfo.role
      }
    case actionTypes.LOGIN_FAILED:
      return{
        displayName: '',
        avatar: '',
        role: '',
        isLogin: false,
        isLoading: false
      }
    default:
      return state
  }
}
export default login