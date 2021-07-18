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

const fetchFav = (fav, currency) => {

    const API = `https://api.nomics.com/v1/currencies/ticker?key=bd3ef17b17e9b8152a9c539636b718bceade570c&ids=${fav}&interval=1d,30d&convert=${currency}`

    return fetch(API, {
        method: "GET"
    })
    .then((response) => response.json())
    .catch(err => {
        console.log(err)
    })
}


const addToFav = (curr, userId, token) => {
    return fetch(`${process.env.REACT_APP_API_URL}/addToFav/${userId}`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(curr)
    })
    .then(response => { console.log(response); return response.json() })
    .catch(err => console.log(err))
}

const removeFromFav = (curr, userId, token) => {
    return fetch(`${process.env.REACT_APP_API_URL}/removeFromFav/${userId}`, {
        method: "PUT",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(curr)
    })
    .then(response => { console.log(response); return response.json() })
    .catch(err => console.log(err))
}

const getFav = (userId, token) => {
    return fetch(`${process.env.REACT_APP_API_URL}/getFav/${userId}`, {
        method: "GET",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        }
    })
    .then(response => { console.log(response); return response.json() })
    .catch(err => console.log(err))
}

const postNotify = (notify, userId, token) => {
    return fetch(`${process.env.REACT_APP_API_URL}/notification/${userId}`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(notify)
    })
    .then(response => { console.log(response); return response.json() })
    .catch(err => console.log(err))
}
export {fetchCrypto ,fetchFav , addToFav, getFav ,postNotify , removeFromFav } ;