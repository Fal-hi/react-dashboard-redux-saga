import axios from '../config/endpoint'

const getAll = () => {
  return axios.get('/users')
}

const getById = (id) => {
  return axios.get(`/users/byid/${id}`)
}

const create = (data) => {
  return axios.post('/users/create', data)
}

const update = (id, data) => {
  return axios.put(`/users/edit/${id}`, data)
}

const remove = (id) => {
  return axios.delete(`/users/delete/${id}`)
}

const login = (data) => {
  return axios.post('/users/login', data)
}

const apiMethod = {
  getAll,
  getById,
  create,
  update,
  remove,
  login,
}

export default apiMethod
