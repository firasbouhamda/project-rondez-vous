import React from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import axios from 'axios'
import NotFound from '../utils/NotFound/NotFound'
import Img from './App3.png'



function Header() {
    const auth = useSelector(state => state.auth)

    const { user, isLogged, isAdmin } = auth



    const handleLogout = async () => {
        try {
            await axios.get('/user/logout')
            localStorage.removeItem('firstLogin')
            window.location.href = "/";
        } catch (err) {
            window.location.href = "/";
        }
    }

    const userLink = () => {
        return <li className="drop-nav">
            <Link to="#" className="avatar">
                <img src={user.avatar} alt="" /> {user.name} <i className="fas fa-angle-down"></i>
            </Link>
            <ul className="dropdown">
                <li><Link to="/profile"><i class="fas fa-user"></i>  Profile</Link></li>
                <li>{isAdmin ? <Link to="/calendar"><i class="far fa-calendar-alt"></i> Manage Appointments
                </Link> : <Link to="/calendar"><i class="far fa-calendar-alt"></i> My Appointment List</Link>}</li>
                <li>{isAdmin ? <Link to="/users"><i class="fas fa-users"></i> Users List </Link> : NotFound}</li>
                <li>{isAdmin ? <Link to="/clients"><i class=" fas fa-id-card"></i> Clients List </Link> : NotFound}</li>
                <li><Link to="/logout" onClick={handleLogout}><i class="fas fa-sign-out-alt"></i> Logout</Link></li>
            </ul>
        </li >
    }

    const transForm = {
        transform: isLogged ? "translateY(-5px)" : 0
    }

    return (
        <header>
            <div className="logo">
                <h1><Link to="/"><img src={Img} width="50px" /> APPOINTMENT </Link></h1>
            </div>

            <ul style={transForm}>

                {
                    isLogged
                        ? userLink()
                        : <li><Link to="/about"><i class="far fa-lightbulb"></i> About </Link>
                            <Link to="/login"><i className="fas fa-user"></i> Sign in</Link>
                        </li>


                }

            </ul>
        </header>
    )
}

export default Header