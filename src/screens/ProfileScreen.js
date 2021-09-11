import React, { useContext, useEffect, useState } from 'react'
import { Avatar } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

import GetUserApi from '../api/getProfile'
import { GlobalContext } from '../auth/GlobalContext'
import { GoBackButtom } from '../components/GoBackButtom'
import { deepOrange } from '@material-ui/core/colors'

import '../styles/ProfileStyles.css'

const useStyles = makeStyles(theme => ({
  orange: {
    color: theme.palette.getContrastText(deepOrange[500]),
    backgroundColor: deepOrange[500],
    width: 60,
    height: 60
  }
}))
export const ProfileScreen = () => {
  const { token } = useContext(GlobalContext)
  const [dataProfile, setDataProfile] = useState([])
  const classes = useStyles()
  useEffect(() => {
    GetUserApi(token).then(res => setDataProfile(res.data))
  }, [token])
  const fisrtLetters = dataProfile.name ? dataProfile.name.slice(0, 2) : []

  return (
    <div className='generalContainer'>
      <div>
        <GoBackButtom />
        <h3 className='textFooter'>New Task</h3>
      </div>
      <div className='Contaier'>
        <section className='ContainerSectionWelcome'>
          <h3>Hi {dataProfile.name}</h3>
          <h3>we are very happy to have you back</h3>
        </section>
        <section className='ContainerInfo'>
          <article className='AvatarContainer'>
            <Avatar className={classes.orange}>{fisrtLetters}</Avatar>
          </article>
          <article className='InsideContainer'>
            <h3 className='TextInfo'>Name : {dataProfile.name}</h3>
            <h3 className='TextInfo'>Email : {dataProfile.email}</h3>
            <h3 className='TextInfo'>Age: {dataProfile.age}</h3>
          </article>
        </section>
      </div>
      <footer className='FooterContainer'>
        <h3 className='textFooter'>Footer</h3>
      </footer>
    </div>
  )
}
