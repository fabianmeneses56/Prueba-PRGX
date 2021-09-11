import * as Yup from 'yup'

export const addNewTaskValidation = Yup.object().shape({
  description: Yup.string().required('description is required.')
})
