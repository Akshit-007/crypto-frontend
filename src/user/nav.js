import React from 'react'
import { Link } from 'react-router-dom'
import '../css/style.css'
import foodlogohome from './food-logo.PNG'
import { isauthenticated, signout } from '../auth'
const Nav = () => {
    return (
        <>
            <nav className="navbar" >
                <div className="demoname">
                    <h1>Crypto Tracker</h1>
                </div>
                <div className="navbar-container container">
                    <input type="checkbox" className='checkBox' />
                    <div className="hamburger-lines">
                        <span className="line line1"></span>
                        <span className="line line2"></span>
                        <span className="line line3"></span>
                    </div>
                    <div className="menu-items">
                        <div className="left">
                            <h1>Crypto Tracker</h1>
                        </div>
                        <div className="right">
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
                </div>
            </nav>
        </>
    )
}
export default Nav;