import { combineReducers } from 'redux'
import { configureStore } from '@reduxjs/toolkit'
import userReducers from '../reducer/userReducer'
import productReducers from '../reducer/productReducer'
import rootSaga from '../saga/index'
import createSagaMiddleware from '@redux-saga/core'

const saga = createSagaMiddleware()
const reducer = combineReducers({
  userReducers,
  productReducers,
})

const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }).concat(saga),
})

saga.run(rootSaga)

export default store
