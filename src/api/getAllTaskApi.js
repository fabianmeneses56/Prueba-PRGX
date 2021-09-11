import { apiClient } from './client'

const getAllTaskApi = token => {
  return apiClient.get(
    `/task`,
    {},
    {
      headers: { Accept: 'application/json', Authorization: `Bearer ${token}` }
    }
  )
}

export default getAllTaskApi
