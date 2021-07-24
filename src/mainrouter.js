import React from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'
import Home from './user/home'
import Signup from './user/signup'
import Signin from './user/signin'
import Notification from './user/notification'
import Profile from './user/Profile'
import Favourite from './user/favourite'
import EditProfile from './user/editprofile'
import Privateroute from './auth/privateroute'

const mainrouter = () =>
(
    <div>
        {/* <menu /> */}
        <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/signup" component={Signup} />
            <Route exact path="/signin" component={Signin} />
            <Route exact path="/notification/:crypto" component={Notification} />
            <Privateroute exact path="/user/:userId" component={Profile} />
            <Privateroute exact path="/user/edit/:userId" component={EditProfile} />
            <Privateroute exact path="/user/favourite/:userId" component={Favourite} />
            <Redirect to='/' />
        </Switch>
    </div>
)

export default mainrouter;