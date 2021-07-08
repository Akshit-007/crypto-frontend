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
            .then(data => { setCryptos(data) })
            .catch(err => console.log(err))
    }

    useEffect(() => { fetch() }, [reload])
    console.log(cryptos);
    return (
        <>
            <div className="home">
                <Nav />
                <div className="main-container">
                    <div className="firstrow">
                        <a href="/">#RANK</a>
                        <a href="/">TAG</a>
                        <a href='/'>NAME</a>
                        <a href='/'>PRICE</a>
                        <a href="/">#MARKET CAP</a>
                        <a href='/'>1D CHANGE</a>
                    </div>

                    <div className="all">
                        {
                            cryptos.map((value, key) => (
                                <div className="allrow">
                                    <li>{value.rank}</li>
                                    <li>{value.currency}</li>
                                    {
                                        <li>
                                            <img className="imglogo" src={value.logo_url} alt="" />
                                            {value.name}</li>
                                    }
                                    <li>${value.price < 1 ? parseFloat(value.price).toFixed(5) : (parseFloat(value.price).toFixed(2))}</li>
                                    <li>{parseFloat(value.market_cap / 1000000000).toFixed(2)} B</li>
                                    <li className={value["1d"].price_change_pct * 100 < 0 ? 'red' : 'green'} >{parseFloat(value["1d"].price_change_pct * 100).toFixed(2)}%</li>


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