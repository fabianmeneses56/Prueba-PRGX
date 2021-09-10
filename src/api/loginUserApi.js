import { apiClient } from './client'

const loginUserApi = (emailValue, passwordValue) => {
  return apiClient.post(
    `/user/login`,
    {
      email: emailValue,
      password: passwordValue
    },
    { headers: { Accept: 'application/json' } }
  )
}

export default loginUserApi
