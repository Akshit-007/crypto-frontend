import React, { useState , useEffect } from 'react';
import '../css/Login.css'
import { isauthenticated } from '../auth';
import '../css/editprofile.css'
import { Link } from 'react-router-dom';
import { read, update, updateuserhomepage  } from './apiuser';
import { Redirect } from 'react-router-dom';
let userData;
const EditProfile = (props) => {

    const [id, setId] = useState('');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [redirecttoprofile, setRedirecttoprofile] = useState(false);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [address, setAddress] = useState('');
    const [gender, setGender] = useState('');

    const init = (userId) => {
        const token = isauthenticated().token
        read(userId, token)
            .then(data => {
                if (data.error) setRedirecttoprofile(true)
                else
                    {
                        setId(data._id); setName(data.name); setEmail(data.email); 
                        setError(''); setAddress(data.address); setGender(data.gender)
                    };
            });
    };
    useEffect(() =>
    {
        userData = new FormData();
        const userId = props.match.params.userId
        init(userId)
    })

    const isvalid = () => {
        if (name.length === 0) {
            setError("name is required"); setLoading(false);
            return false;
        }
        if(!/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/i.test(email)) 
        {
            setError("email is not valid please enter valid email");  setLoading(false);
            return false;
        }
        return true;
    }

    const handlechangen = e => {    setName({ name: e.target.value });  };
    const handlechangee = e => {    setEmail({ email: e.target.value });  };
    const handlechangea = e => {    setAddress({ address: e.target.value });  };
    const handlechangeg = e => {    setGender({ gender: e.target.value });  };


    const clicksubmit = event => {
        event.preventDefault();
        setLoading(true);
        if (isvalid()) {
            const userId = props.match.params.userId;
            const token = isauthenticated().token;
            update(userId, token, userData).then(data => 
            {
                 console.log(data);
                if (data.error) setError(data.error);
                else            updateuserhomepage( data, () => { setRedirecttoprofile(true) } );
            });
        }
    };

    const signupform = (name, email ,address) =>
    (
        <div className="container position" style={{height: '72vh' 
        , marginBottom: '20px'
        }}>
            <div className="formContent" style={{ 
                marginTop:'-80px'
        }} >
                <form  >
                    <div className="form-group">
                        <input onChange={handlechangen} type="text" className="ept" id="name" placeholder="name" value={name} />
                    </div>
                    <div className="form-group">
                        <input onChange={handlechangee} type="email" className="ept" id="login" placeholder="Login-ID" value={email} />
                    </div> 
                    <div className="form-group">
                        <textarea onChange={handlechangea} type="text" className="ept" placeholder="address" value={address}  />
                    </div>
                    <div className="form-group">
                    <fieldset className="FieldSet ept">
                        Gender:
                        <input type='radio'  onClick={handlechangeg}  value='male' name='gender' />Male
                        <input type='radio' onClick={handlechangeg}  value='female'  name='gender'/>Female
                    </fieldset>
                    </div>
                    
                    <button onClick={clicksubmit} className="edit-btn1" type="submit">UPDATE</button>
                </form>
            </div>
        </div>
    )

    if(redirecttoprofile)     return <Redirect to={`/user/${id}`} />;
    
    return (
            <div className="container">
                 <button className="wbtn123   "><Link to='/'>BACK TO HOME</Link></button>
                 <h1 className="wishlist0 ">EDIT PROFILE</h1>
                <div className="alert alert-danger" style={{ display: error ? "" : "none" }}>
                    {error}
                </div>

                {loading ? (<div className=" text-center">
                        <h2 className="loginnameh2">Loading....</h2>
                    </div>)
                        : ("")
                }
                {signupform(name, email, address,gender)}
            </div>
        );
}


export default EditProfile;