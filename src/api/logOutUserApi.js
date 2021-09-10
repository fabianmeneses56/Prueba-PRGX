import { apiClient } from './client'

const logOutUserApi = token => {
  return apiClient.post(
    `/user/logout`,
    {},
    { headers: { Authorization: `Bearer ${token}` } }
  )
}

export default logOutUserApi
