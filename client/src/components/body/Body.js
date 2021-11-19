import React from 'react'
import { Switch, Route } from 'react-router-dom'
import Login from './auth/Login'
import Register from './auth/Register'
import ActivationEmail from './auth/ActivationEmail'
import NotFound from '../utils/NotFound/NotFound'

import ForgotPass from '../body/auth/ForgotPassword'
import ResetPass from '../body/auth/ResetPassword'
import ResetEmail from '../body/auth/ResetEmail'
import Client from './users/clientList/pages/Clients/Clients'
import Profile from '../body/profile/Profile'
import Users from '../body/users/Users'
import Calendar from '../calendar/calendar'
import EditUser from '../body/profile/EditUser'
import About from './home/About'
import { useSelector } from 'react-redux'

function Body() {
    const auth = useSelector(state => state.auth)
    const { isLogged, isAdmin } = auth
    return (
        <section>
            <Switch>
                <Route path="/" component={isLogged ? Calendar : Login} exact />
                <Route path="/about" component={About} exact />

                <Route path="/login" component={isLogged ? NotFound : Login} exact />
                <Route path="/register" component={isLogged ? NotFound : Register} exact />

                <Route path="/forgot_password" component={isLogged ? NotFound : ForgotPass} exact />
                <Route path="/user/reset/:token" component={isLogged ? NotFound : ResetPass} exact />
                <Route path="/user/resetEmail/:token" component={isLogged ? NotFound : ResetEmail} exact />

                <Route path="/user/activate/:activation_token" component={ActivationEmail} exact />

                <Route path="/profile" component={isLogged ? Profile : ""} exact />
                <Route path="/users" component={isAdmin ? Users : ""} exact />
                <Route path="/clients" component={isAdmin ? Client : ""} exact />


                <Route path="/calendar" component={isLogged ? Calendar : ""} exact />
                <Route path="/edit_user/:id" component={isAdmin ? EditUser : ""} exact />

            </Switch>
        </section>
    )
}

export default Body