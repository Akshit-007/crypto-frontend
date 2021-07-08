import React, { Component } from 'react';
import { Link , Redirect } from 'react-router-dom'
import '../css/Login.css'
import {signin , authenticate } from '../auth'
import Nav from "./nav"

class Signin extends Component {

    constructor() {
        super()
        this.state =
        {
            email: "",
            password: "",
            error: "",
            redirecttorefer: false,
            loading: false
        }
    }
    handlechange = (name) => event => {
        this.setState({ error: "" })
        this.setState({ [name]: event.target.value })
    };

    clicksubmit = event => {
        event.preventDefault();
        this.setState({ loading: true })
        const { email, password } = this.state;
        const user = { email, password };
        //console.log(user);
        signin(user).then(data => {
            if (data.error)
                this.setState({ error: data.error, loading: false });
            else {
                authenticate(data, () => {
                    this.setState({ redirecttorefer: true })
                })
            }
        });
    };

    signinform = (email, password) =>
    (
        <>
            <div className="formContent">
                <form>
                    <div className="form-group">
                        <input onChange={this.handlechange("email")} type="email" className="ept" id="login" placeholder="Email-ID" value={email} />
                    </div>
                    <div className="form-group">
                        <input onChange={this.handlechange("password")} type="password" id="password" className="ept" placeholder="Password"
                            value={password} />
                    </div>
                    <div className="bottom-button">
                    <button onClick={this.clicksubmit} className="login-btn" type="submit">Log In</button>
                    <Link className="alreadyhaveaccount" to="./signup" >Don't have an account?</Link>
                    </div>
                </form>
            </div>
        </>
    )

    render() 
    {
        const { email, password, error, redirecttorefer, loading } = this.state

        if (redirecttorefer)
            return <Redirect to="/" />
        return (

            <div className="position" style={{height:'100vh'}}>
                
                <Nav/>

                <div className="formContent">
                    <h2 className="loginnameh2"> SIGN-IN </h2>
                    <div className="alert alert-danger" style={{ display: error ? "" : "none" }}>
                        {error}
                    </div>
                    {loading ? (<div className=" text-center">
                        <h2 className="loginnameh2">Loading....</h2>
                    </div>)
                        : ("")
                    }
                    {this.signinform(email, password)}
                </div>
            </div>
        );
    }
}

export default Signin;