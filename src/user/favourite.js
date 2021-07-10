import React, { useState, useEffect } from 'react'
import '../css/style.css'
import Nav from "./nav"
import {fetchCrypto ,fetchFav , addToFav, getFav }  from './data';
import { makeStyles } from '@material-ui/core/styles';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@material-ui/core';
import { Paper } from '@material-ui/core';
import { ArrowUpward } from '@material-ui/icons';
import { ArrowDownward } from '@material-ui/icons';
import {isauthenticated} from '../auth'

const useStyles = makeStyles({
    table: {
        minWidth: 650,
    },
});



const Favourite = () => {
    const [cryptos, setCryptos] = useState([])
    const [reload, setReload] = useState(false)
    const [currency, setCurrency] = useState('USD')
    const [time, setTime] = useState('1d')

    setInterval(() => { setReload(!reload) }, 10000);

    function fetch() {
        


        const token = isauthenticated().token
        const userId = isauthenticated().user._id
        getFav(userId, token)
        .then(result => {
            fetchFav(result.fav, currency)
            .then(data => {
                setCryptos(data)
            })
            .catch(err => {
                console.log(err)
            })
        })
        .catch(err => {
            console.log(err)
        })
    }

    useEffect(() => { fetch() }, [currency, reload])
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




    const classes = useStyles();
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

                <div className="crypto">

                    <TableContainer component={Paper}>
                        <Table className={classes.table} aria-label="simple table">
                            <TableHead>
                                <TableRow className="tableHead">
                                    <TableCell><span className="headTitle">#</span></TableCell>

                                    <TableCell align="left"><span className="headTitle">NAME</span></TableCell>
                                    <TableCell align="left"><span className="headTitle">PRICE&nbsp;  ({currency})</span></TableCell>
                                    <TableCell align="left"><span className="headTitle">MARKET CAP&nbsp;  ({currency})</span></TableCell>
                                    <TableCell align="left"><span className="headTitle">CHANGE&nbsp;({time})</span></TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {cryptos.length === 0 ? <div><h3>Fetching Data</h3></div> : <>
                                    {cryptos.map((row) => (
                                        <TableRow key={row.rank} className="tableRow">
                                            <TableCell component="th" scope="row">
                                                <span className="cryptoData"> {row.rank}</span>
                                            </TableCell>
                                            <TableCell align="left">{<img src={row.logo_url} className="coinLogo" alt="img"></img>}&nbsp;&nbsp;&nbsp;&nbsp;<span className="cryptoData">{row.name}</span>&nbsp;&nbsp; {row.currency}</TableCell>

                                            <TableCell align="left"> <span className="cryptoData"> {currency === 'USD' ? <>$</> : <>{currency === 'INR' ? <>₹</> : <>ē</>}</>}&nbsp;&nbsp;{row.price < 1 ? parseFloat(row.price).toFixed(5) : (parseFloat(row.price).toFixed(2))}</span>
                                            </TableCell>
                                            <TableCell align="left"> <span className="cryptoData"> {parseFloat(row.market_cap / 1000000000).toFixed(2)} B</span>
                                            </TableCell>
                                            <TableCell align="left"> <span className="cryptoData">{time === '1d' ? <>{parseFloat(row["1d"].price_change_pct) > 0 ? <><span className="increase"><ArrowUpward />&nbsp;{row["1d"].price_change_pct}</span></> : <><span className="decrease"><ArrowDownward />&nbsp;{row["1d"].price_change_pct}</span></>}</> : <>{parseFloat(row["30d"].price_change_pct) > 0 ? <><span className="increase"><ArrowUpward />&nbsp;{row["30d"].price_change_pct}</span></> : <><span className="decrease"><ArrowDownward />&nbsp;{row["30d"].price_change_pct}</span></>}</>} %</span>
                                            </TableCell>
                                        </TableRow>

                                    ))}
                                </>}


                            </TableBody>
                        </Table>
                    </TableContainer>
                </div>

            </div>


            {/* // New Table */}


        </>
    );
};
export default (Favourite);