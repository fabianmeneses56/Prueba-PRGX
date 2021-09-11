import { apiClient } from './client'

const updateTaskApi = (token, taskId) => {
  return apiClient.put(
    `/task/${taskId}`,
    {
      completed: true
    },
    {
      headers: { Accept: 'application/json', Authorization: `Bearer ${token}` }
    }
  )
}

export default updateTaskApi
