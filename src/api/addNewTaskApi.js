import { apiClient } from './client'

const addNewTaskApi = (descriptionValue, token) => {
  return apiClient.post(
    `/task`,
    {
      description: descriptionValue
    },
    {
      headers: { Accept: 'application/json', Authorization: `Bearer ${token}` }
    }
  )
}

export default addNewTaskApi
