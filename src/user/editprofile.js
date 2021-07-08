import React, { Component } from 'react';
import '../css/Login.css'
import { isauthenticated } from '../auth';
import '../css/editprofile.css'
import { Link } from 'react-router-dom';
import { read, update, updateuserhomepage  } from './apiuser';
import { Redirect } from 'react-router-dom';
class EditProfile extends Component {

    constructor() {
        super()
        this.state =
        {
            id: "",
            name: "",
            email: "",
            redirecttoprofile: false,
            error:"",
            loading:false,
            address: "",
            gender:"",
        }
    }

    init = (userId) => {
        const token = isauthenticated().token
        read(userId, token)
            .then(data => {
                if (data.error)
                    this.setState({ redirecttoprofile: true })
                else
                    this.setState({
                        id: data._id, name: data.name, email: data.email, error: '' , address: data.address,
                        gender:data.gender,
                    });
            });
    };

    componentDidMount() {
        this.userData = new FormData()
        const userId = this.props.match.params.userId
        this.init(userId)
    }

    isvalid = () => {
        const { name, email } = this.state
        if (name.length === 0) {
            this.setState({ error: "name is required" , loading: false });
            return false;
        }
        if(!/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/i.test(email)) 
        {
            this.setState({ error: "email is not valid please enter valid email" , loading: false });
            return false;
        }
        return true;
    }

    handlechange = (name) => event => {
        this.setState({error: ""})
        const value =  event.target.value
        this.userData.set(name,value);
        this.setState({ [name]: value });
    };


    clicksubmit = event => {
        event.preventDefault();
        this.setState({loading: true});
        if (this.isvalid()) {
            const userId = this.props.match.params.userId;
            const token = isauthenticated().token;
            update(userId, token, this.userData).then(data => 
            {
                // console.log(data);
                if (data.error) this.setState({ error: data.error });
                else            updateuserhomepage( data, () => { this.setState({redirecttoprofile: true }); } );
            });
        }
    };

    signupform = (name, email ,address) =>
    (
        <div className="container position" style={{height: '72vh' 
        , marginBottom: '20px'
        }}>
            <div className="formContent" style={{ 
                marginTop:'-80px'
        }} >
                <form  >
                    <div className="form-group">
                        <input onChange={this.handlechange("name")} type="text" className="ept" id="name" placeholder="name" value={name} />
                    </div>
                    <div className="form-group">
                        <input onChange={this.handlechange("email")} type="email" className="ept" id="login" placeholder="Login-ID" value={email} />
                    </div> 
                    <div className="form-group">
                        <textarea onChange={this.handlechange("address")} type="text" className="ept" placeholder="address" value={address} />
                    </div>
                    <div className="form-group">
                    <fieldset className="FieldSet ept">
                        Gender:
                        <input type='radio'  onClick={this.handlechange("gender")}  value='male' className="edit-img-profile" name='gender' />Male
                        <input type='radio' onClick={this.handlechange("gender")}  value='female' className="edit-img-profile" name='gender'/>Female
                    </fieldset>
                    </div>
                    
                    <button onClick={this.clicksubmit} className="edit-btn1" type="submit">UPDATE</button>
                </form>
            </div>
        </div>
    )


    render() {
        const { id, name, email, redirecttoprofile, error , loading , address,gender} = this.state;

        if (redirecttoprofile)
            return <Redirect to={`/user/${id}`} />;

        return (
            <div className="container">
                 <button className="wbtn123 wbtn1123 wishlistb "><Link to='/'>BACK TO HOME</Link></button>
                 <h1 className="wishlist0 ">EDIT PROFILE</h1>
                <div className="alert alert-danger" style={{ display: error ? "" : "none" }}>
                    {error}
                </div>

                {loading ? (<div className=" text-center">
                        <h2 className="loginnameh2">Loading....</h2>
                    </div>)
                        : ("")
                }
                {this.signupform(name, email, address,gender)}
            </div>
        );
    }
}

export default EditProfile;