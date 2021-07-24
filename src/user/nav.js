import React from 'react'
import { Link } from 'react-router-dom'
import '../css/style.css'
import foodlogohome from './food-logo.PNG'
import { isauthenticated, signout } from '../auth'
const Nav = () => {
    return (
        <>
            <nav className="navbar" >
                <div className="navbar-container">
                    <div className="logomain1">
                        <img src={foodlogohome} alt="food-logo" className="logomain" />
                    </div>
                    <div className="rightside">
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
                                <li><Link to={`/user/favourite/${isauthenticated().user._id}`} >Favourite</Link></li>
                                <li><a href="?" onClick={() => signout(() => this.props.history.push('/'))}>signout</a></li>
                            </>
                        )}
                    </div>
                </div>
            </nav>
        </>
    )
}
export default Nav;