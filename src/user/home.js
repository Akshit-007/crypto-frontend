import React from 'react'
import '../css/style.css'
import Nav from "./nav"

const Home = () => {
    return (
        <>
            <div className="home">
                <Nav />
                <div className="main-container">
                    <div className="firstrow">
                        <a>#</a>
                        <a>NAME</a>
                        <a>PRICE</a>
                        <a>1D CHANGE</a>
                    </div>
                    <div className="all">
                        <div className="allrow">
                            <li>#</li>
                            <li>NAME</li>
                            <li>PRICE</li>
                            <li>1D CHANGE</li>
                        </div>
                        <div className="allrow">
                            <li>#</li>
                            <li>NAME</li>
                            <li>PRICE</li>
                            <li>1D CHANGE</li>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};
export default (Home);