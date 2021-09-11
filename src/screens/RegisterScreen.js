import React from 'react'
import Swal from 'sweetalert2'
import { Formik, Form } from 'formik'

import { AppFormInput } from '../form/AppFormInput'
import { AppSubmit } from '../form/AppSubmit'
import { ValidationRegister } from '../form/validations/registerValidation'
import registerUserApi from '../api/registerUserApi'
import '../styles/LoginScreen.css'

const initialValues = {
  email: '',
  password: '',
  name: '',
  age: ''
}

export const RegisterScreen = () => {
  const onSubmit = ({
    email: emailValue,
    password: passwordValue,
    name: nameValue,
    age: ageValue
  }) => {
    registerUserApi(nameValue, emailValue, passwordValue, ageValue).then(
      res => {
        if (res.ok) {
          return Swal.fire('success', 'registered user', 'success')
        } else {
          return Swal.fire('Error', 'An error has occurred', 'error')
        }
      }
    )
  }

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={ValidationRegister}
    >
      {({ errors, touched, isSubmitting, setFieldValue }) => {
        return (
          <Form>
            <div className='Container'>
              <section className='sectionContainer'>
                <AppFormInput label='Name' name='name' />
                <AppFormInput label='Age' name='age' />
                <AppFormInput label='Email' name='email' />
                <AppFormInput label='password' name='password' />

                <article className='ButtonsContainer'>
                  <AppSubmit title=' Signup' />
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
