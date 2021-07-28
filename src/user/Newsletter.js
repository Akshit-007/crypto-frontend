import React from 'react';
import '../css/newsletter.css';
const Newsletter = ({ sub, setSub, setSubCheck, subCheck, addtoSub, removefromSub }) => {
    return (
        <div className="newsletter">
            <div className="newsletter_content">

                <div className="newsletter_heading">Stay updated with daily<span className="bold_content"> Cypto news</span> </div>
                <div className="newsletter_description">Just subscribe to our newsletter and stay updated with current crypto news </div>
                <div className="newsletter_from">
                    {subCheck === false ? (
                        <form>
                            <input className="nletter_input" type="text" onChange={e => setSub(e.target.value)} placeholder="Enter your email address" />&nbsp;&nbsp;&nbsp;&nbsp;<button className="nletter_btn" onClick={addtoSub}>Subscribe now</button>
                        </form>
                    ) : (
                        <>
                            <h3>Already Subscribe for NewsLetter.. with {sub}</h3>&nbsp;&nbsp;&nbsp;&nbsp;<button className="nletter_btn" onClick={removefromSub}>UnSubscribe now</button>
                        </>
                    )}
                </div>
            </div>

            <div className="newsletter_image">
                <div className="n_image"></div></div>
        </div>
    )
}

export default Newsletter;