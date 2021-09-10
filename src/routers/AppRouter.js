import React, { useContext } from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from 'react-router-dom'
import { GlobalContext } from '../auth/GlobalContext'
import { HomeScreen } from '../screens/HomeScreen'
import { AuthRouter } from './AuthRouter'
import { PrivateRoute } from './PrivateRoute'
import { PublicRoute } from './PublicRoute'
export const AppRouter = () => {
  const { token } = useContext(GlobalContext)

  return (
    <Router>
      <div>
        <Switch>
          <PublicRoute
            path='/auth'
            component={AuthRouter}
            isAuthenticated={token}
          />

          <PrivateRoute
            exact
            path='/'
            component={HomeScreen}
            isAuthenticated={token}
          />

          <Redirect to='/auth/login' />
        </Switch>
      </div>
    </Router>
  )
}
