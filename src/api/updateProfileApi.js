import { apiClient } from './client'

const updateProfileApi = (nameValue, ageValue, token) => {
  return apiClient.put(
    `/user/me`,
    {
      name: nameValue,
      age: Number(ageValue)
    },
    {
      headers: { Accept: 'application/json', Authorization: `Bearer ${token}` }
    }
  )
}

export default updateProfileApi
