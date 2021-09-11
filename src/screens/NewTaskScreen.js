import React, { useContext } from 'react'
import { Formik, Form } from 'formik'
import Swal from 'sweetalert2'
import { AppFormInput } from '../form/AppFormInput'
import { AppSubmit } from '../form/AppSubmit'
import { addNewTaskValidation } from '../form/validations/addNewTaskValidation'
import addNewTaskApi from '../api/addNewTaskApi'
import { GlobalContext } from '../auth/GlobalContext'

const initialValues = {
  description: ''
}

export const NewTaskScreen = () => {
  const { token } = useContext(GlobalContext)
  const onSubmit = ({ description: descriptionValue }) => {
    addNewTaskApi(descriptionValue, token).then(res => {
      if (res.ok) {
        return Swal.fire('success', 'Task created successfully', 'success')
      } else {
        return Swal.fire('Error', 'An error has occurred', 'error')
      }
    })
  }

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={addNewTaskValidation}
    >
      {({ errors, touched, isSubmitting, setFieldValue }) => {
        return (
          <Form>
            <div className='Container'>
              <section className='sectionContainer'>
                <AppFormInput label='description' name='description' />

                <article className='ButtonsContainer'>
                  <AppSubmit title='Add Task' />
                </article>
              </section>
              <footer className='FooterContainer'>
                <h3 className='textFooter'>Footer</h3>
              </footer>
            </div>
          </Form>
        )
      }}
    </Formik>
  )
}
