import { create } from 'apisauce'

export const apiClient = create({
  baseURL: 'https://api-nodejs-todolist.herokuapp.com'
  //   headers: { Accept: 'application/json' }
  //   baseURL: process.env.DEV
})
