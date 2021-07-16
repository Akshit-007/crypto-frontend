import React from 'react';
import './newsletter.css';
const Newsletter = () => {
    return (
        <div className="newsletter">
            <div className="newsletter_content">

                <div className="newsletter_heading">Stay updated with daily<span className="bold_content"> Cypto news</span> </div>
                <div className="newsletter_description">Just subscribe to our newsletter and stay updated with current crypto news </div>
                <div className="newsletter_from">
                    <form>
                        <input className="nletter_input" type="text" placeholder="Enter your email address" />&nbsp;&nbsp;&nbsp;&nbsp;<button className="nletter_btn">Subscribe now</button>
                    </form>
                </div>
            </div>

            <div className="newsletter_image">
                <div className="n_image"></div></div>
        </div>
    )
}

export default Newsletter;