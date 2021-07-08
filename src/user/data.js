// import React from 'react'

const API = "https://api.nomics.com/v1/currencies/ticker?key=cbd1795669ba0116a656db6c0fcfbd1f55de6357&ids=BTC,ETH,XRP,SAFEMOON,BTT,DOGE,THETA&interval=1d,30d&convert=USD&per-page=100&page=1"

const fetchCrypto = () => {

    return fetch(API, {
        method: "GET"
    })
    .then((response) => response.json())
    .catch(err => { console.log(err)
    })
}

export default fetchCrypto;