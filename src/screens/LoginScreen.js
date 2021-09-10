import React from 'react'
import { Button } from '@material-ui/core'
import '../styles/LoginScreen.css'
import { Formik, Form } from 'formik'
import { AppFormInput } from '../form/AppFormInput'
import { AppSubmit } from '../form/AppSubmit'
import { ValidationLogin } from '../form/validations/loginValidation'

const initialValues = {
  email: '',
  password: ''
}
export const LoginScreen = () => {
  const onSubmit = values => {
    console.log(values)
  }

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={ValidationLogin}
    >
      {({ errors, touched, isSubmitting, setFieldValue }) => {
        return (
          <Form>
            <div className='Container'>
              <section className='sectionContainer'>
                <AppFormInput label='Email' name='email' />
                <AppFormInput label='password' name='password' />

                <article className='ButtonsContainer'>
                  <AppSubmit title='login' />

                  <Button
                    variant='contained'
                    size='small'
                    color='primary'
                    className='WithButton'
                  >
                    Signup
                  </Button>
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
