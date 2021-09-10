import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import { HomeScreen } from '../screens/HomeScreen'
import { Test1 } from '../screens/Test1'

export const AllPublicRoutes = () => {
  return (
    <div>
      <div>
        <Switch>
          <Route exact path='/public/homeScreen' component={HomeScreen} />

          <Route exact path='/public/Test1' component={Test1} />

          <Redirect to='/public/homeScreen' />
        </Switch>
      </div>
    </div>
  )
}
