import ActionTypes from '../action/actionType'

const initialState = {
  users: [],
  message: '',
  refresh: '',
  login: '',
}

function userReducers(state = initialState, action) {
  const { type, payload } = action

  switch (type) {
    case ActionTypes.LOGIN_SUCCESS:
      return { login: true, payload }
    case ActionTypes.LOGIN_FAILED:
      return { login: false, message: payload.message, payload }
    case ActionTypes.GET_USER_RESPONSE:
      return { state, users: payload, refresh: true }
    case ActionTypes.ADD_USER_RESPONSE:
      return { message: payload.message, refresh: false }
    case ActionTypes.UPDATE_USER_RESPONSE:
      return { message: payload.message, refresh: false }
    case ActionTypes.DEL_USER_RESPONSE:
      return { message: payload.message, refresh: false }
    default:
      return state
  }
}

export default userReducers
