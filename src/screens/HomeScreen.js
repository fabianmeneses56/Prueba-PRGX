import React, { useContext } from 'react'
import { Button } from '@material-ui/core'
import logOutUserApi from '../api/logOutUserApi'
import { GlobalContext } from '../auth/GlobalContext'
import { useHistory } from 'react-router-dom'

export const HomeScreen = () => {
  const history = useHistory()

  const { token, setToken } = useContext(GlobalContext)

  const logOutSession = () => {
    logOutUserApi(token).then(res => {
      if (res.data.success) {
        setToken(null)
        storageLogOut()
      }
    })
  }

  const storageLogOut = async () => {
    ;(await process.browser) && window.sessionStorage.removeItem('secret_key')
  }

  const ViewProfile = () => {
    history.push('/home/profile')
  }
  return (
    <div>
      <h1>hola mundo</h1>
      <Button
        variant='contained'
        size='small'
        color='secondary'
        className='WithButton'
        onClick={logOutSession}
      >
        LogOut
      </Button>
      <Button
        variant='contained'
        size='small'
        color='primary'
        className='WithButton'
        onClick={ViewProfile}
      >
        Profile
      </Button>
    </div>
  )
}
