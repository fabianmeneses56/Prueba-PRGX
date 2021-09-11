import React, { useContext, useState, useEffect } from 'react'
import { Formik, Form } from 'formik'
import Swal from 'sweetalert2'

import { AppFormInput } from '../form/AppFormInput'
import { AppSubmit } from '../form/AppSubmit'
import { GlobalContext } from '../auth/GlobalContext'
import GetUserApi from '../api/getProfile'
import { updateProfileValidation } from '../form/validations/updateProfileValidation'
import updateProfileApi from '../api/updateProfileApi'
import { GoBackButtom } from '../components/GoBackButtom'

const initialValues = {
  name: '',
  age: ''
}

export const ProfileSettingsScreen = () => {
  const { token } = useContext(GlobalContext)
  const [dataProfile, setDataProfile] = useState([])

  useEffect(() => {
    GetUserApi(token).then(res => setDataProfile(res.data))
  }, [token])

  const onSubmit = ({ name: nameValue, age: ageValue }) => {
    updateProfileApi(nameValue, ageValue, token).then(res => {
      if (res.ok) {
        return Swal.fire('success', 'user updated successfully', 'success')
      } else {
        return Swal.fire('Error', 'An error has occurred', 'error')
      }
    })
  }
  return (
    <div className='generalContainer'>
      <div>
        <GoBackButtom />
        <h3 className='textFooter'>Profile Settings</h3>
      </div>
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={updateProfileValidation}
      >
        {() => {
          return (
            <Form>
              <div className='Container'>
                <section className='sectionContainer'>
                  <AppFormInput
                    label='Name'
                    name='name'
                    preloadedInfoFromBackend={dataProfile.name}
                  />
                  <AppFormInput
                    label='Age'
                    name='age'
                    preloadedInfoFromBackend={dataProfile.age}
                  />

                  <article className='ButtonsContainer'>
                    <AppSubmit title=' Edit Profile' />
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
    </div>
  )
}
