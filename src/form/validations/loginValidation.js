import * as Yup from 'yup'

export const ValidationLogin = Yup.object().shape({
  password: Yup.string().required('password is required.'),
  email: Yup.string().required('email is required.')
})
