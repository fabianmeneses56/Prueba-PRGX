import * as Yup from 'yup'

export const ValidationLogin = Yup.object().shape({
  password: Yup.string()
    .required('password is required.')
    .min(7, 'minimum 7 characters'),
  email: Yup.string().required('email is required.')
})
