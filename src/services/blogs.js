import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = newToken => {
  token = `bearer ${newToken}`
}

const getAll = async () => {
  const request = await axios.get(baseUrl)
  return request.data
}

const create = async newObject => {
  const config = {
    headers: { Authorization: token }
  }

  const response = await axios.post(baseUrl, newObject, config)
  return response.data
}

const update = async newObject => {
  const config = {
    headers: { Authorization: token }
  }

  const response = await axios.put(baseUrl + '/' + newObject.id ,newObject, config)
  return response.data
}

const deleteBlog = async newObject => {
  const config = {
    headers: { Authorization: token }
  }
  console.log('test', newObject)

  const response = await axios.delete(baseUrl + '/' + newObject.id , config)
  return response.data

}

export default { getAll, setToken, create, update, deleteBlog }