import React, { useState, useEffect } from 'react'
import '../css/style.css'
import MainTable from './MainTable'
import Newsletter from "./Newsletter.js"
import Footer from "./footer"
import Nav from "./nav.js"
import { fetchCryptoUSD, fetchCryptoINR, fetchCryptoEUR, addToFav, addToSub, getSub, removeFromSub } from './data';
import { isauthenticated } from '../auth'
import { toast } from 'react-toastify';
import { CircularProgress } from '@material-ui/core';


const Home = () => {
    const [cryptos, setCryptos] = useState([])
    const [reload, setReload] = useState(false)
    const [currency, setCurrency] = useState('USD')
    const [time, setTime] = useState('1d')
    const [load, setLoad] = useState(false)
    const [sub, setSub] = useState("")
    const [subCheck, setSubCheck] = useState(false)

    setInterval(() => { setReload(!reload) }, 30000);

    const fetch = (currency) => {

        if (currency === "USD") {
            fetchCryptoUSD()
                .then(data => { setCryptos(data) }, setLoad(false))
                .catch(err => console.log(err))
        }
        else if (currency === "INR") {
            fetchCryptoINR()
                .then(data => { setCryptos(data) }, setLoad(false))
                .catch(err => console.log(err))
        }
        else {
            fetchCryptoEUR()
                .then(data => { setCryptos(data) }, setLoad(false))
                .catch(err => console.log(err))
        }

    }

    useEffect(() => { fetch(currency) }, [reload], [currency])
    // console.log(cryptos);

    function handleChangecurrency(event) {
        setLoad(true);
        setCurrency(event.target.value);
    }
    function addtofav(currency) {
        const curr = {
            curr: currency
        }
        const token = isauthenticated().token
        const userId = isauthenticated().user._id
        addToFav(curr, userId, token)
            .then(result => {
                console.log(result)
                toast.info(result.check === true ? `${result.message}` : ` ${currency} Added to favourite :)`, {
                    position: "top-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    style: {
                        fontSize: 15,
                        backgroundColor: result.check === true ? `orange` : ``
                    }
                });
            })
            .catch(err => {
                console.log(err)
            })
    }

    function addtoSub(e) {
        e.preventDefault()
        const subemail = {
            sub: sub,
        }
        const token = isauthenticated().token
        const userId = isauthenticated().user._id
        addToSub(subemail, userId, token)
            .then(result => {
                console.log(result)
                setSubCheck(true)
            })
            .catch(err => {
                console.log(err)
            })
    }


    function removefromSub(e) {
        e.preventDefault()
        const token = isauthenticated().token
        const userId = isauthenticated().user._id
        removeFromSub(userId, token)
            .then(result => {
                setSubCheck(false)
                setSub("")
            })
            .catch(err => {
                console.log(err)
            })
    }

    function handleTimeChange(event) {
        event.preventDefault();
        setLoad(true)
        setTime(event.target.value);
        // console.log(time);

        let a = document.getElementById('day');
        let b = document.getElementById('month');

        if (event.target.id === 'day') {
            a.style.backgroundColor = "green";
            a.style.color = "white";
            b.style.backgroundColor = "white";
            b.style.color = "black";
        }
        else {
            a.style.backgroundColor = "white";
            a.style.color = "black";
            b.style.backgroundColor = "green";
            b.style.color = "white";
        }

    }

    useEffect(() => {
        if (isauthenticated()) {
            getSub(isauthenticated().user._id, isauthenticated().token)
                .then(result => {
                    setSub(result.subemail)
                    setSubCheck(result.sub)
                })
                .catch(err => console.log(err))
        }
    }, [])

    return (
        <>
            <div className="home">
                <Nav />
                <br />
                <br />


                <div className="chooseOption">

                    <form >
                        <button value="1d" className="timebtn" id="day" onClick={handleTimeChange}>1 day</button>&nbsp;
                        <button value="30d" className="timebtn" id="month" onClick={handleTimeChange}>1 month</button>

                        &nbsp;  &nbsp;  &nbsp;  &nbsp;
                        <label for="currency" className="currencyLabel">Choose a currency:</label>
                        <select name="currency" id="currency" onChange={handleChangecurrency}>
                            <option value="USD">USD</option>
                            <option value="INR">INR</option>
                            <option value="EUR">EUR</option>

                        </select>
                    </form>
                </div>
                <br />
                <br />
                <br />
                <br />
                <br />
                {load ? <div className="spinner"><CircularProgress /></div> : <div className="crypto">
                    {cryptos.length === 0 ? (
                        <>
                            <h1>Fetching data...</h1>
                        </>
                    ) : <MainTable
                        cryptos={cryptos}
                        addtofav={addtofav}
                        handleTimeChange={handleTimeChange}
                        handleChangecurrency={handleChangecurrency}
                        currency={currency}
                        time={time}
                        noFav={true}
                        removeFav={false}
                    />
                    }
                </div>
                }
                <br />
                <br />
                <br />
                <br />
                <br />


            </div>

            <Newsletter
                addtoSub={addtoSub}
                removefromSub={removefromSub}
                sub={sub}
                setSub={setSub}
                subCheck={subCheck}
                setSubCheck={setSubCheck}
            />
            <Footer />


        </>
    );
};
export default (Home);