import React, { Component } from 'react';
import { isauthenticated } from '../auth'
import { Redirect, Link } from 'react-router-dom'
import { read } from './apiuser'
import "../css/profile.css"
import Nav  from "./nav"
class Profile extends Component {

    constructor() {
        super()
        this.state = {
            user: "",
            redirecttosignin: false,
        }
    }

    init = (userId) => {
        const token = isauthenticated().token
        read(userId, token)
            .then(data => {
                if (data.error)
                    this.setState({ redirecttosignin: true })
                else
                    this.setState({ user: data })
            });
    };

    componentDidMount() {
        const userId = this.props.match.params.userId
        this.init(userId)
    }

    render() {
        const { redirecttosignin, user } = this.state
        if (redirecttosignin) return <Redirect to="/signin" />

        return (
            <>
                <Nav />
                <div className="UserPageContainer">
                    <div className="Name">
                        <h3 className="UserName">{user.name}</h3>
                        <div className="container">
                            <ul className="UserMenu">
                                <Link className="Link" to={`/user/edit/${user._id}`} >
                                    Edit Profile
                                    </Link>
                            </ul>
                        </div>
                    </div>
                    <div className="UserDetailSection">
                        <h2 className="MainTitle">Your Detail</h2>
                        <div className="UserDetail container">
                            <table>
                                <tbody>
                                    <tr>
                                        <td className="Title">
                                            <h3>Email</h3>
                                        </td>
                                        <td>
                                            <p className="value">{user.email}</p>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="Title">
                                            <h3>Address</h3>
                                        </td>
                                        <td>
                                            <p className="value">{user.address}</p>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="Title">
                                            <h3>Gender</h3>
                                        </td>
                                        <td>
                                            <p className="value"> {user.gender}</p>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="Title">
                                            <h3>Joining Date</h3>
                                        </td>
                                        <td>
                                            <p className="value">{` ${new Date(user.created).toDateString()} `} </p>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </>
        );
    }
}

export default Profile;