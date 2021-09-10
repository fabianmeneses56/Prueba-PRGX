import { apiClient } from './client'

const registerUserApi = (name, email, password, age) => {
  return apiClient.post(
    `/user/register`,
    {
      name: 'edison fabian',
      email: 'fabian59@hotmail.com',
      password: '123456789',
      age: 20
    }
    // { headers: { 'Content-Type': 'application/json' } }
  )
}

// curl --location --request POST 'https://api-nodejs-todolist.herokuapp.com/user/register' \
// --header 'Content-Type: application/json' \
// --data-raw '{
// 	"name": "Muhammad Nur Ali",
// 	"email": "muh.nurali43@gmail.com",
// 	"password": "12345678",
// 	"age": 20
// }'

export default registerUserApi
