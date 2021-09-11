import * as Yup from 'yup'

export const updateProfileValidation = Yup.object().shape({
  name: Yup.string().required('Name is required.'),
  age: Yup.string().required('Age is required.')
})
