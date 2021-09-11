import React, { useContext, useEffect, useState } from 'react'
import { Avatar } from '@material-ui/core'
import GetUserApi from '../api/getProfile'
import { GlobalContext } from '../auth/GlobalContext'
import '../styles/ProfileStyles.css'
export const ProfileScreen = () => {
  const { token } = useContext(GlobalContext)
  const [dataProfile, setDataProfile] = useState([])

  useEffect(() => {
    GetUserApi(token).then(res => setDataProfile(res.data))
  }, [token])
  const fisrtLetters = dataProfile.name ? dataProfile.name.slice(0, 2) : []

  return (
    <div className='Contaier'>
      <section className='ContainerSectionWelcome'>
        <h3>Hi {dataProfile.name}</h3>
        <h3>we are very happy to have you back</h3>
      </section>
      <section className='ContainerInfo'>
        <article className='AvatarContainer'>
          <Avatar className='AvatarImage'>{fisrtLetters}</Avatar>
        </article>
        <article className='InsideContainer'>
          <h3 className='TextInfo'>Name : {dataProfile.name}</h3>
          <h3 className='TextInfo'>Email : {dataProfile.email}</h3>
          <h3 className='TextInfo'>Age: {dataProfile.age}</h3>
        </article>
      </section>
    </div>
  )
}
