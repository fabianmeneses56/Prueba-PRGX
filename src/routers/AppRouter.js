import React, { useContext } from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from 'react-router-dom'
import { GlobalContext } from '../auth/GlobalContext'
import { HomeScreen } from '../screens/HomeScreen'
import { ProfileScreen } from '../screens/ProfileScreen'
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
          <Route exact path='/home/profile' component={ProfileScreen} />

          <Redirect to='/auth/login' />
        </Switch>
      </div>
    </Router>
  )
}
