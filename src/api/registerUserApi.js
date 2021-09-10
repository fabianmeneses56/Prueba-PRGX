import { apiClient } from './client'

const registerUserApi = (nameValue, emailValue, passwordValue, ageValue) => {
  return apiClient.post(
    `/user/register`,
    {
      name: nameValue,
      email: emailValue,
      password: passwordValue,
      age: Number(ageValue)
    },
    { headers: { Accept: 'application/json' } }
  )
}

export default registerUserApi
