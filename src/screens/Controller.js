import React, { Component } from "react";
import {BrowserRouter as Router, Route} from "react-router-dom";
import Details from "../screens/details/Details";



class Controller extends Component {


    constructor(){
        super();
        //will have to be replaced with the provided url
        this.baseUrl= "http://localhost:8080/api/";
    }
    

    render(){
        return(
            <Router>
                <div className= "main-container">

                    <Route exact path="/restaurant/:id" render={props=> <Details {...props} baseUrl={this.baseUrl}/>} />
                   
                </div>
            </Router>

        );
    }

}

export default Controller;