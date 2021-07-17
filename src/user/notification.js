import React, {useState, useEffect} from "react"
import { postNotify } from './data'
import {isauthenticated} from '../auth'

const Notification = ({match}) => {
    const [crypto, setCrypto] = useState("")
    const [upper, setUpper] = useState(null)
    const [lower, setLower] = useState(null)

    const submit = (e) => {
        e.preventDefault()
        const notify = {
            currency : crypto,
            upper: upper,
            lower: lower
        }
        const token = isauthenticated().token
        const userId = isauthenticated().user._id

        postNotify(notify, userId, token)
        .then((data) => {
            console.log(data)
            setUpper("")
            setLower("")
        })
        .catch(err => console.log(err))
        
    }

    useEffect(() => {
        setCrypto(match.params.crypto)
    }, [])
    return (
        <>
            <h1>{crypto}</h1><br/>
            <h1>enter value in $</h1>
            <form >
            <label for="ubound">upper bound:</label><br/>
            <input type="text" value={upper} onChange={e => setUpper(e.target.value)}/><br/>
            <label for="lbound">Lower bound:</label><br/>
            <input type="text" value={lower} onChange={e => setLower(e.target.value)} /><br/><br/>
            <button onClick={submit} >Notify Me</button>
            </form>
        </>
    )
}
export default Notification