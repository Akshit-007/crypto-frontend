import React from 'react'
import { Link } from 'react-router-dom'
import '../css/style.css'
import { isauthenticated, signout } from '../auth'
const Nav = () => {
    return (
        <>
            <nav className="nav" >
                <div className="nav-container">
                    <li><Link to="/">Home</Link></li>
                    {!isauthenticated() && (
                        <>
                            <li><Link to='/signup'>signup</Link></li>
                            <li><Link to="/signin">Login</Link></li>
                        </>
                    )}
                    {isauthenticated() && (
                        <>
                            <li><Link to={`/user/${isauthenticated().user._id}`}>{` ${isauthenticated().user.name}`}</Link></li>
                            <li><Link to={`/user/edit/${isauthenticated().user._id}`} >Edit Profile</Link></li>
                            <li><Link to={`/user/favourite/${isauthenticated().user._id}`} >Favourite</Link></li>
                            <li><a href="?" onClick={() => signout(() => this.props.history.push('/'))}>signout</a></li>
                        </>
                    )}
                </div>
            </nav>
        </>
    )
}
export default Nav;