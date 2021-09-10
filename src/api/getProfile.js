import { apiClient } from './client'

const GetUserApi = token => {
  return apiClient.get(
    `/user/me`,
    {},
    { headers: { Authorization: `Bearer ${token}` } }
  )
}

export default GetUserApi
