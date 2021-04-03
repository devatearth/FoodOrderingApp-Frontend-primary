import React, { Component } from "react";
import './Checkout.css';
import Header from '../../common/components/header/Header';
{ console.log("checkout page hitted") }
class Checkout extends Component {

    render() {
        return (
            <div>
                <Header />
                <p>Checkot page</p>
            </div>
        );
    }
}
export default (Checkout);