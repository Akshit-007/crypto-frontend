import React, { useState, useEffect } from "react"
import Navbar from "./nav.js"
import { postNotify } from './data'
import { isauthenticated } from '../auth'
import '../css/notify.css';

import { TabContent, TabPane, Nav, NavItem, NavLink, Card, Button, CardTitle, CardText, Row, Col } from 'reactstrap';
import classnames from 'classnames';





const Notification = ({ match, props }) => {
    const [crypto, setCrypto] = useState("")
    const [upper, setUpper] = useState(null)
    const [lower, setLower] = useState(null)
    const [activeTab, setActiveTab] = useState('1');

    const toggle = tab => {
        if (activeTab !== tab) setActiveTab(tab);
    }


    const submit = (e) => {
        e.preventDefault()
        const notify = {
            currency: crypto,
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
            <Navbar />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <div className="notify">
                <div className="notifyHead">We will <span className="b_notify">Notify </span>you whenever your Crypto Coin reaches at <span className="b_notify">your desired value  !!</span></div>
                <br />
                <br />
                <div className="notify_info">
                    <div className="notify_info_head">Your current coin is : <span className="b_notify">{crypto} coin</span></div>
                    <br /> <br /> <div className="notify_buy_sell">

                        <Nav tabs>
                            <NavItem>
                                <NavLink
                                    className={classnames({ active: activeTab === '1' }) + " n_buy "}

                                    onClick={() => { toggle('1'); }}
                                >
                                    Buy
                                </NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink
                                    className={classnames({ active: activeTab === '2' }) + " n_sell "}

                                    onClick={() => { toggle('2'); }}
                                >
                                    Sell
                                </NavLink>
                            </NavItem>
                        </Nav>
                        <TabContent activeTab={activeTab}>
                            <TabPane tabId="1">
                                <Row>
                                    <Col sm="12">
                                        <Card body>
                                            <form >

                                                <label for="lbound" className="label_buy">Buying Price</label><br /><br />
                                                <input className="label_input" type="text" value={lower} onChange={e => setLower(e.target.value)} placeholder="Enter Your Amount" /> <span className="sign">$</span><br /><br />
                                                <div className="info">*It will notify when the actual price is less than or equal to the input value</div>
                                            </form>
                                        </Card>

                                    </Col>
                                </Row>
                            </TabPane>
                            <TabPane tabId="2">
                                <Row>
                                    <Col sm="12">
                                        <Card body>
                                            <form >
                                                <label for="ubound" className="label_buy">Selling Price</label><br /><br />
                                                <input className="label_input" type="text" value={upper} onChange={e => setUpper(e.target.value)} placeholder="Enter Your Amount" /> <span className="sign">$</span><br /><br />
                                                <div className="info">*It will notify when the actual price is more than or equal to the input value</div>
                                            </form>

                                        </Card>
                                    </Col>

                                </Row>
                            </TabPane>
                        </TabContent>

                    </div>
                    <br />
                    <br />
                    <br />
                    <form >

                        <button onClick={submit} className="notifyButton">Notify Me</button>
                    </form>
                </div>

            </div>

        </>
    )
}
export default Notification