// import React from 'react'


const fetchCrypto = (currency) => {

    const API = `https://api.nomics.com/v1/currencies/ticker?key=cbd1795669ba0116a656db6c0fcfbd1f55de6357&interval=1d,30d&convert=${currency}&per-page=100&page=1`

    return fetch(API, {
        method: "GET"
    })
        .then((response) => response.json())
        .catch(err => {
            console.log(err)
        })
}

export default fetchCrypto;