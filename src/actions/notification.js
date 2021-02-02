import actionTypes from "./actionTypes";
import { getNotificationList } from '../services'

const startLoading = () => {
  return {
    type: actionTypes.START_LOADING
  }
}

const finishLoading = () => {
  return {
    type: actionTypes.FINISH_LOADING
  }
}

export const markNotificationAsRead = (id) => {
  return dispatch => {
    dispatch(startLoading())
    dispatch({
      type: actionTypes.MARK_NOTIFICATION_AS_READ,
      payload: {
        id
      }
    })
    dispatch(finishLoading())
  }
}

export const markAllNotificationAsRead = () => {
  return dispatch => {
    dispatch(startLoading())
    dispatch({
      type: actionTypes.MARK_ALL_NOTIFICATION_AS_READ,
    })
    dispatch(finishLoading())
  }
}

export const getNotifications = () => {
  return dispatch => {
    dispatch(startLoading())
    getNotificationList().then(res => {
      dispatch({
        type: actionTypes.RECIVED_NOTIFICATIONS,
        payload: {
          list: res.list
        }
      })
      dispatch(finishLoading())
    })
  }
}