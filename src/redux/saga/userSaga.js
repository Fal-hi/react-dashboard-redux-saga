import { call, put } from 'redux-saga/effects'
import apiMethod from '../../api/apiMethod'
import {
  doAddResponse,
  doDeleteResponse,
  doGetUserResponse,
  doLoginFailed,
  doLoginSuccess,
  doUpdateResponse,
} from '../action/actionReducer'

function* handleGetAllUser() {
  try {
    const result = yield call(apiMethod.getAll)
    yield put(doGetUserResponse(result.data))
  } catch (error) {
    yield put(doGetUserResponse({ message: error }))
  }
}

function* handleAddUser(action) {
  try {
    const result = yield call(apiMethod.create, action.payload)
    yield put(doAddResponse(result.data))
  } catch (error) {
    yield put(doAddResponse({ message: error }))
  }
}

function* handleUpdateUser(action) {
  try {
    const result = yield call(
      apiMethod.update,
      action.payload.id,
      action.payload.data,
    )
    yield put(doUpdateResponse(result.data))
  } catch (error) {
    yield put(doUpdateResponse({ message: error }))
  }
}

function* handleDelUser(action) {
  try {
    const result = yield call(apiMethod.remove, action.payload)
    yield put(doDeleteResponse(result.data))
  } catch (error) {
    yield put(doDeleteResponse({ message: error }))
  }
}

function* handleLogin(action) {
  try {
    const result = yield call(apiMethod.login, action.payload)
    console.log(result)
    localStorage.setItem('token', result.data.access_token)
    yield put(doLoginSuccess(result.data))
  } catch (error) {
    yield put(
      doLoginFailed({
        message: error.response.data.message,
      }),
    )
  }
}

export {
  handleGetAllUser,
  handleAddUser,
  handleUpdateUser,
  handleDelUser,
  handleLogin,
}
