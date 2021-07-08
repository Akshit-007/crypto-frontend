import React, { Component } from 'react';
import '../css/Login.css'
import { signup } from '../auth'
import { Link } from 'react-router-dom'
import '../css/style.css'
import Nav from "./nav"
class Signup extends Component {

    constructor() {
        super()
        this.state =
        {
            name: "",
            email: "",
            password: "",
            cpassword: "",
            address:"",
            error: "",
            open: false
        }
    }
    // aa function ma je change kariye e event ma assign thay che etle event lakhvu pade
    handlechange = (name) => event => {
        this.setState({ error: "" })
        this.setState({ [name]: event.target.value })
    };


    clicksubmit = event => {
        event.preventDefault();
        const { name, email, password , cpassword , address} = this.state;
        const user = { name, email, password , cpassword , address };
        // console.log(user);
        signup(user).then(data => {
            if (data.error)
                this.setState({ error: data.error });
            else
                this.setState({
                    error: "",
                    name: "",
                    email: "",
                    password: "",
                    cpassword: "",
                    address: "",
                    open: true
                });
        });
    };

    signupform = (name, email, password , cpassword , address) =>
    (

        <>
            <div className="formContent">
                <form>
                    <div className="form-group">
                        <input onChange={this.handlechange("name")} type="text" className="ept" id="name" placeholder="Username" value={name} />

                    </div>
                    <div className="form-group">
                        <input onChange={this.handlechange("email")} type="email" className="ept" id="login" placeholder="Email-ID" value={email} />
                    </div>
                    <div className="form-group">
                        <input onChange={this.handlechange("password")} type="password" id="password" className="ept" placeholder="Password"
                            value={password} />
                    </div>
                    <div className="form-group">
                        <input onChange={this.handlechange("cpassword")} type="password" id="cpassword" className="ept" placeholder="confirm Password"
                            value={cpassword} />
                    </div>
                    <div className="form-group">
                    <textarea onChange={this.handlechange("address")} type="text" className="ept" placeholder="address" value={address} />
                    </div>
                    <div className="bottom-button">
                    <button onClick={this.clicksubmit} className="login-btn" type="submit">SIGN UP</button>
                    <div id="formFooter"><Link to="/signin"  className="alreadyhaveaccount">Already have an ACCOUNT?</Link></div>
                    </div>
                </form>
            </div>
        </>
    )

    render() {
        const { name, email, password, cpassword, address ,  error, open } = this.state
        return (

            <div className="position">

                <Nav/>

                <div className="formContent formContent1 ">
                    <h2 className="loginnameh2"> SIGN UP </h2>

                    <div className="alert alert-danger big-font-1" style={{ display: error ? "" : "none" }}>
                        {error}
                    </div>

                    <div className="alert alert-info big-font-1" style={{ display: open ? "" : "none" }}>
                        New account has successfully created.please {" "} <Link to="/signin">sign in</Link>.
                    </div>

                    {this.signupform(name, email, password , cpassword , address)}
                </div>
            </div>
        );
    }
}

export default Signup;