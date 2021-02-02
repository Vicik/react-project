import actionTypes from "../actions/actionTypes";
const initState = {
  isLoading: false,
  list: []
}

export default ( state = initState, action) => {
  switch (action.type) {
    case actionTypes.RECIVED_NOTIFICATIONS:
      return {
        ...state,
        list: action.payload.list
      }
    case actionTypes.START_LOADING:
      return {
        ...state,
        isLoading: true
      }
    case actionTypes.FINISH_LOADING:
      return {
        ...state,
        isLoading: false
      }
    case actionTypes.MARK_NOTIFICATION_AS_READ:
      const { list } = state
      const newList = list.map(item => {
        if(item.id === action.payload.id) {
          item.hasRead = true
        }
        return item
      })
      return {
        ...state,list: newList
      }
    case actionTypes.MARK_ALL_NOTIFICATION_AS_READ:
      const newAllList = state.list.map(item => {
        item.hasRead = true
        return item
      })
      return {
        ...state,list: newAllList
      }
    default:
      return state
  }
}