import React from 'react'
import { TextField, Button } from '@material-ui/core'
import '../styles/LoginScreen.css'
import { Link } from 'react-router-dom'
import { Formik, Field, Form, ErrorMessage } from 'formik'
import { AppFormInput } from '../form/AppFormInput'
import { AppSubmit } from '../form/AppSubmit'
import { ValidationRegister } from '../form/validations/registerValidation'
import registerUserApi from '../api/registerUserApi'

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
    registerUserApi(nameValue, emailValue, passwordValue, ageValue).then(res =>
      console.log(res)
    )
  }
  console.log(process.env.DEV)
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
