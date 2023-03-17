import ActionTypes from './actionType'

export const doRequestGetUser = () => {
  return {
    type: ActionTypes.REQ_GET_USER,
  }
}

export const doGetUserResponse = (payload) => {
  return {
    type: ActionTypes.GET_USER_RESPONSE,
    payload,
  }
}

export const doAdd = (payload) => {
  return {
    type: ActionTypes.ADD_USER,
    payload,
  }
}

export const doAddResponse = (payload) => {
  return {
    type: ActionTypes.ADD_USER_RESPONSE,
    payload,
  }
}

export const doUpdate = (payload) => {
  return {
    type: ActionTypes.UPDATE_USER,
    payload,
  }
}

export const doUpdateResponse = (payload) => {
  return {
    type: ActionTypes.UPDATE_USER_RESPONSE,
    payload,
  }
}

export const doDelete = (payload) => {
  return {
    type: ActionTypes.DEL_USER,
    payload,
  }
}

export const doDeleteResponse = (payload) => {
  return {
    type: ActionTypes.DEL_USER_RESPONSE,
    payload,
  }
}

export const doLogin = (payload) => {
  return {
    type: ActionTypes.REQ_GET_LOGIN,
    payload,
  }
}

export const doLoginSuccess = (payload) => {
  return {
    type: ActionTypes.LOGIN_SUCCESS,
    payload,
  }
}

export const doLoginFailed = (payload) => {
  return {
    type: ActionTypes.LOGIN_FAILED,
    payload,
  }
}
