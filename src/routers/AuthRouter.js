import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import { LoginScreen } from '../screens/LoginScreen'
import { RegisterScreen } from '../screens/RegisterScreen'

export const AuthRouter = () => {
  return (
    <div>
      <div>
        <Switch>
          <Route exact path='/auth/login' component={LoginScreen} />

          <Route exact path='/auth/register' component={RegisterScreen} />

          <Redirect to='/auth/login' />
        </Switch>
      </div>
    </div>
  )
}
