import React, { useState, useEffect } from 'react'
import '../css/style.css'
import Nav from "./nav.js"
import MainTable from './MainTable';
import { fetchFav, getFav, removeFromFav } from './data';
import { isauthenticated } from '../auth'
import { toast } from 'react-toastify';
import { CircularProgress } from '@material-ui/core';


const Favourite = () => {
    const [cryptos, setCryptos] = useState([])
    const [reload, setReload] = useState(false)
    const [currency, setCurrency] = useState('USD')
    const [time, setTime] = useState('1d')
    const [favString, setFavString] = useState(null)
    const [loading, setLoading] = useState(false)

    setInterval(() => { setReload(!reload) }, 10000);

    function removefromfav(currency) {
        setLoading(true);
        const curr = {
            curr: currency
        }
        toast.error(` ${currency} remove from favourite `, {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,

        });
        const token = isauthenticated().token
        const userId = isauthenticated().user._id
        removeFromFav(curr, userId, token)
            .then(result => {
                console.log(result)
                setFavString(favString.replace(currency, ""))
                setLoading(false)
            })
            .catch(err => {
                console.log(err)
            })
    }

    function fetchString() {

        const token = isauthenticated().token
        const userId = isauthenticated().user._id
        getFav(userId, token)
            .then(result => {
                setFavString(result.fav)
                setLoading(true)
                fetch()
            })
            .catch(err => {
                console.log(err)
            })
    }

    const fetch = () => {
        fetchFav(favString, currency)
            .then(data => {
                setCryptos(data)
                setLoading(false)
            })
            .catch(err => {
                console.log(err)
            })
    }
    useEffect(() => { fetchString() }, [])
    useEffect(() => { setLoading(true); fetch() }, [currency, reload])
    // console.log(cryptos);

    function handleChangecurrency(event) {
        setCurrency(event.target.value);
    }
    function handleTimeChange(event) {
        event.preventDefault();
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

                {loading ? <div className="spinner"><CircularProgress /></div> : <div className="crypto">
                    {cryptos.length === 0 ?
                        <>
                            <h1>Fetching Data...</h1>
                        </>
                        :
                        <MainTable
                            cryptos={cryptos}
                            handleTimeChange={handleTimeChange}
                            handleChangecurrency={handleChangecurrency}
                            currency={currency}
                            time={time}
                            noFav={false}
                            removefromfav={removefromfav}
                            removeFav={true}
                        />
                    }

                </div>}



            </div>


            {/* // New Table */}


        </>
    );
};
export default (Favourite);