import { apiClient } from './client'

const deleteTaskApi = (token, taskId) => {
  return apiClient.delete(
    `/task/${taskId}`,
    {},
    {
      headers: { Accept: 'application/json', Authorization: `Bearer ${token}` }
    }
  )
}

export default deleteTaskApi
