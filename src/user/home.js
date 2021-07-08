import React, { useState, useEffect } from 'react'
import '../css/style.css'
import Nav from "./nav"
import fetchCrypto from './data';
const Home = () => {
    const [cryptos, setCryptos] = useState([])
    const [reload, setReload] = useState(false)

    setInterval(() => { setReload(!reload) }, 10000);

    const fetch = () => {
        fetchCrypto()
            .then(data => {
                setCryptos(data)
            })
            .catch(err => console.log(err))
    }

    useEffect(() => {
        fetch()
    }, [reload])
    return (
        <>
            <div className="home">
                <Nav />
                <div className="main-container">
                    <div className="firstrow">
                        <a href="/">#</a>
                        <a href='/'>NAME</a>
                        <a href='/'>PRICE</a>
                        <a href='/'>1D CHANGE</a>
                    </div>

                    <div className="all">
                        {
                            cryptos.map((value, key) => (
                                <div className="allrow">
                                    <li>{value.currency}</li>
                                    <li>{value.name}</li>
                                    <li>{value.price < 1 ? (value.price) : (Math.trunc(value.price))}</li>
                                    <li>{value.rank}</li>

                                </div>
                            ))
                        }
                    </div>
                </div>
            </div>
        </>
    );
};
export default (Home);