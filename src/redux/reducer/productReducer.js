import ActionTypes from '../action/actionType'

const initialState = {
  products: [],
  message: '',
  refresh: '',
  productCategory: [],
}

function productReducers(state = initialState, action) {
  const { type, payload } = action

  switch (type) {
    case ActionTypes.GET_PRODUCTS_RESPONSE:
      // console.log(payload.data)
      // console.log(payload.data.productCategory)
      return {
        state,
        products: payload.product.data,
        productCategory: payload.productCategory.data,
        message: payload.message,
        refresh: true,
      }
    case ActionTypes.GET_PROCATS_RESPONSE:
      return { state, productCategory: payload.data.productCategory }
    case ActionTypes.ADD_PRODUCT_RESPONSE:
      return { message: payload.message, refresh: false }
    case ActionTypes.UPDATE_PRODUCT_RESPONSE:
      return { message: payload.message, refresh: false }
    case ActionTypes.DEL_PRODUCT_RESPONSE:
      return { message: payload.message, refresh: false }
    default:
      return state
  }
}

export default productReducers
