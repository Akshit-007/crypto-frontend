import React from "react"
import { makeStyles } from '@material-ui/core/styles';
import { Link } from "react-router-dom";
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
const MainTable = ({cryptos, addtofav, noFav, handleTimeChange,handleChangecurrency , currency , removefromfav , time, removeFav}) => {
    const classes = useStyles();
    return (
        <>
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
                                {   cryptos.length === 0 ? <div><h3>Fetching Data</h3></div> : 
                                    <>
                                    {
                                        cryptos.map((row) => (
                                            <TableRow key={row.rank} className="tableRow">
                                                <TableCell component="th" scope="row">
                                                    <span className="cryptoData"> {row.rank}</span>
                                                </TableCell>
                                                <TableCell align="left">
                                                    {<img src={row.logo_url} className="coinLogo" alt="img"></img>}
                                                    &nbsp;&nbsp;&nbsp;&nbsp;
                                                    <span className="cryptoData">{row.name}</span>
                                                    &nbsp;&nbsp; 
                                                    {row.currency}
                                                </TableCell>
                                                <Link to={`/notification/${row.currency}`}>
                                                    {isauthenticated() && <TableCell component="th" scope="row">
                                                        <button >Notify</button>
                                                    </TableCell> }
                                                </Link>
                                                <TableCell align="left"> 
                                                    <span className="cryptoData"> 
                                                        {currency === 'USD' ? <>$</> : 
                                                        <>  
                                                            {currency === 'INR' ? <>₹</> : <>ē</>}
                                                        </>}
                                                        &nbsp;&nbsp;
                                                        {row.price < 1 ? parseFloat(row.price).toFixed(5) : 
                                                            parseFloat(row.price).toFixed(2)}
                                                    </span>
                                                </TableCell>
                                                <TableCell align="left"> 
                                                    <span className="cryptoData"> 
                                                        {parseFloat(row.market_cap / 1000000000).toFixed(2)} B
                                                    </span>
                                                </TableCell>
                                                <TableCell align="left"> 
                                                    <span className="cryptoData">
                                                        {   time === '1d' ? 
                                                                <>  {parseFloat(row["1d"].price_change_pct) > 0 ? 
                                                                    <>
                                                                    <span className="increase"><ArrowUpward />&nbsp;{row["1d"].price_change_pct}</span>
                                                                    </>                 : 
                                                                    <>
                                                                    <span className="decrease"><ArrowDownward />&nbsp;{row["1d"].price_change_pct}</span>
                                                                    </>}
                                                                </>           : 
                                                                <>  {parseFloat(row["30d"].price_change_pct) > 0 ? 
                                                                    <>
                                                                    <span className="increase"><ArrowUpward />&nbsp;{row["30d"].price_change_pct}</span>
                                                                    </>                  : 
                                                                    <>
                                                                    <span className="decrease"><ArrowDownward />&nbsp;{row["30d"].price_change_pct}</span>
                                                                    </>}
                                                                </>
                                                        } %
                                                    </span>
                                                </TableCell>
                                                {noFav && isauthenticated() && <TableCell component="th" scope="row">
                                                    <button onClick={() => (addtofav(row.currency))} >Add To Fav</button>
                                                </TableCell> }
                                                {removeFav && isauthenticated() && <TableCell component="th" scope="row">
                                                    <button onClick={() => (removefromfav(row.currency))} >Remove from Fav</button>
                                                </TableCell> }
                                            </TableRow>
                                        ))
                                    }
                                    </>
                                }
                            </TableBody>
                        </Table>
                    </TableContainer>
        </>
    )
}

export default MainTable