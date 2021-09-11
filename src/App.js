import { useState } from 'react'
import { GlobalContext } from './auth/GlobalContext'
import { AppRouter } from './routers/AppRouter'

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
