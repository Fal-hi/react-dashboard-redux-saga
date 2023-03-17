import { call, put } from 'redux-saga/effects'
import apiMethodProduct from '../../api/apiMethodProduct'
import {
  doAddResponse,
  doDeleteResponse,
  doGetProductResponse,
  doUpdateResponse,
} from '../action/actionReducerProduct'

function* handleGetAllProducts() {
  try {
    const result = yield call(apiMethodProduct.getAll)
    const result2 = yield call(apiMethodProduct.getAllProcats)
    yield put(
      doGetProductResponse({
        product: result.data,
        productCategory: result2.data,
      }),
    )
  } catch (error) {
    yield put(doGetProductResponse({ message: error }))
  }
}

function* handleAddProducts(action) {
  try {
    const result = yield call(apiMethodProduct.create, action.payload)
    yield put(doAddResponse(result.data))
  } catch (error) {
    yield put(doAddResponse({ message: error }))
  }
}

function* handleUpdateProducts(action) {
  try {
    const result = yield call(
      apiMethodProduct.update,
      action.payload.id,
      action.payload.data,
    )
    yield put(doUpdateResponse(result.data))
  } catch (error) {
    yield put(doUpdateResponse({ message: error }))
  }
}

function* handleDelProducts(action) {
  try {
    const result = yield call(apiMethodProduct.remove, action.payload)
    yield put(doDeleteResponse(result.data))
  } catch (error) {
    yield put(doDeleteResponse({ message: error }))
  }
}

export {
  handleGetAllProducts,
  handleAddProducts,
  handleUpdateProducts,
  handleDelProducts,
}
