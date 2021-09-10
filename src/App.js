import { useState } from 'react'
import './App.css'
import { GlobalContext } from './auth/GlobalContext'
import { AppRouter } from './routers/AppRouter'
// import { LoginScreen } from './screens/LoginScreen'
// import { RegisterScreen } from './screens/RegisterScreen'

function App() {
  const [token, setToken] = useState(null)
  console.log(token)
  return (
    <>
      <GlobalContext.Provider
        value={{
          token,
          setToken
        }}
      >
        <AppRouter />
      </GlobalContext.Provider>
    </>
  )
}

export default App
