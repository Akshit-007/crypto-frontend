import React from 'react';
import './footer.css';
const Footer = () => {
    return (
        <div className="footer-cpyrt">
            <div className="footer">

                <div className="left_footer">
                    <div className="footer_info">
                        <div className="footer_head">Crypto Tracker</div><br /><br />
                        <div className="footer_about"> We are leading company in crypto market.We have helped many organisation in the sector of investing.We are helping many people to invest in crypto at ease.</div><br /><br />
                        <div className="social_media">
                            <i className='fab fa-facebook-f'></i>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            <i className='fab fa-instagram'></i>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            <i className='fab fa-linkedin-in'></i>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            <i className='fab fa-youtube'></i>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        </div>
                    </div>
                </div>
                <div className="right_footer">
                    <div className="contact_footer">
                        <div className="contact_head">Contact-Us</div>
                        <br /><br />
                        <div clasName="contact_info">
                            <p>  <i class='fas fa-phone ficon'></i> &nbsp; 9999999999<br /><br />
                                <i class='fas fa-envelope ficon'></i> &nbsp; cryptotracker@gmail.com<br /><br />
                                <i class='fa fa-home ficon'></i> &nbsp; 10-SkyHigh complex, Bombay 11111,India<br /><br />
                            </p>
                        </div>
                    </div>

                </div>


            </div>
            <div className="copyright">Copyright &#169; 2021 All Rights Reserved by Crypto Tracker</div>
        </div>
    )
}

export default Footer;





