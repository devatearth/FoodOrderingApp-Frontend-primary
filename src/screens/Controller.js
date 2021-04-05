import React, { Component } from "react";
import Checkout from './checkout/Checkout';
import FoodOrderingApplication from "../FoodOrderingApplication";
class Controller extends Component {


    constructor(){
        super();
        //Provide the url for backend service
    }
    
    render(){
        return(
            {/*
            <Router>
                <div className= "main-container">
                    <Route exact path="/checkout" render={props=> <Checkout {...props} baseUrl={this.baseUrl}/>} />
                    <Route exact path="/" render={props=> <FoodOrderingApplication {...props} baseUrl={this.baseUrl}/>} />
                </div>
            </Router>
            */}

        );
    }

}

export default Controller;
