import { useContext, useEffect } from 'react'
import { GlobalContext } from '../auth/GlobalContext'
import { useHistory } from 'react-router-dom'

export const useRedirectLogged = () => {
  const history = useHistory()
  const { token } = useContext(GlobalContext)

  useEffect(() => {
    if (token) {
      history.push('/')
    } else {
      restoreToken()
    }
  }, [token])

  const restoreToken = async () => {
    const restoredToken =
      (await process.browser) && window.sessionStorage.getItem('secret_key')
    if (restoredToken) {
      console.log('token restored (logged previously)')
      history.push('/')
    }
  }
}
