import axios from '../config/endpoint2'

const getAll = () => {
  return axios.get('/products')
}

const getAllProcats = () => {
  return axios.get('/procats')
}

const getById = (id) => {
  return axios.get(`/products/byid/${id}`)
}

const create = (data) => {
  return axios.post('/products/create', data)
}

const update = (id, data) => {
  return axios.put(`/products/edit/${id}`, data)
}

const remove = (id) => {
  return axios.delete(`/products/delete/${id}`)
}

const apiMethodProduct = {
  getAll,
  getAllProcats,
  getById,
  create,
  update,
  remove,
}

export default apiMethodProduct
