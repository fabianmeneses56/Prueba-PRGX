import React, { useContext } from 'react'
import { Button } from '@material-ui/core'
import { Formik, Form } from 'formik'
import Swal from 'sweetalert2'
import { useHistory } from 'react-router-dom'

import { AppFormInput } from '../form/AppFormInput'
import { AppSubmit } from '../form/AppSubmit'
import { ValidationLogin } from '../form/validations/loginValidation'
import loginUserApi from '../api/loginUserApi'
import { GlobalContext } from '../auth/GlobalContext'

import '../styles/LoginScreen.css'

const initialValues = {
  email: '',
  password: ''
}
export const LoginScreen = () => {
  const { setToken } = useContext(GlobalContext)
  const history = useHistory()
  const onSubmit = ({ email: emailValue, password: passwordValue }) => {
    loginUserApi(emailValue, passwordValue).then(res => {
      if (res.ok) {
        setToken(res.data.token)
        saveTokenOnSessionStorage(res.data.token)
        return Swal.fire('success', 'successfully logged in', 'success')
      } else {
        return Swal.fire('Error', 'An error has occurred', 'error')
      }
    })
  }

  const saveTokenOnSessionStorage = value => {
    if (process.browser) {
      window.sessionStorage.setItem('secret_key', value)
    }
  }
  const register = () => {
    history.push('/auth/register')
  }
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={ValidationLogin}
    >
      {() => {
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
                    onClick={register}
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
