import React from 'react'
import {Redirect, Route , Switch} from 'react-router-dom'
import Home from './user/home'
import Signup from './user/signup'
import Signin  from './user/signin'
import Profile  from './user/Profile'
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
            <Privateroute exact path="/user/:userId" component={Profile} />
            <Privateroute exact path="/user/edit/:userId" component={EditProfile} />
            <Redirect to='/' />
        </Switch>
    </div>
)

export default mainrouter;