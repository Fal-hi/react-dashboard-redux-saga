import { takeEvery, all } from 'redux-saga/effects'
import ActionTypes from '../action/actionType'
import {
  handleAddUser,
  handleDelUser,
  handleGetAllUser,
  handleLogin,
  handleUpdateUser,
} from './userSaga'
import {
  handleAddProducts,
  handleDelProducts,
  handleGetAllProducts,
  handleUpdateProducts,
} from './productSaga'

// function* = fungsi generator
export default function* watchAll() {
  yield all([
    takeEvery(ActionTypes.REQ_GET_LOGIN, handleLogin),
    takeEvery(ActionTypes.REQ_GET_USER, handleGetAllUser),
    takeEvery(ActionTypes.ADD_USER, handleAddUser),
    takeEvery(ActionTypes.UPDATE_USER, handleUpdateUser),
    takeEvery(ActionTypes.DEL_USER, handleDelUser),
    takeEvery(ActionTypes.REQ_GET_PRODUCT, handleGetAllProducts),
    takeEvery(ActionTypes.ADD_PRODUCT, handleAddProducts),
    takeEvery(ActionTypes.UPDATE_PRODUCT, handleUpdateProducts),
    takeEvery(ActionTypes.DEL_PRODUCT, handleDelProducts),
  ])
}
