import React, { Component } from "react";
import {BrowserRouter as Router, Route} from "react-router-dom";
import Checkout from './checkout/Checkout';
import FoodOrderingApplication from "../FoodOrderingApplication";
class Controller extends Component {


    constructor(){
        super();
        //Provide the url for backend service
        this.baseUrl= "http://localhost:8080/api/";
    }
    
    render(){
        return(
            <Router>
                <div className= "main-container">
                    <Route exact path="/checkout" render={props=> <Checkout {...props} baseUrl={this.baseUrl}/>} />
                    <Route exact path="/" render={props=> <FoodOrderingApplication {...props} baseUrl={this.baseUrl}/>} />
                </div>
            </Router>

        );
    }

}

export default Controller;