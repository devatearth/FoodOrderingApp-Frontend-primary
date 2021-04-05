/* react imports */
import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";

/* project imports */
import Controller from "./screens/Controller.js"
import Home from "./screens/home/Home.js";
import Checkout from "./screens/checkout/Checkout.js";
import SampleData from "./common/data/sample-data.js";

class FoodOrderingApplication extends Component {
  constructor() {
    super();
    this.state = {
      data: [],
      template: []
    };
    this.baseUrl= "http://localhost:8080/api/";
  }

  /* fetches the restaurant data before the app is loaded and rendered */
  fetchRestaurants() {
    let $this = this;
    $this.setState({data: SampleData(), template: SampleData()}, function() {
      console.log($this.state);
    });
  };

  /* helps to perform the necessary search on the set of restaurant data and filter */
  searchRestaurantsByName(name) {
    let { data } = this.state;
    let newTemplateData = data.filter(function(restaurant, index) {
      return restaurant.name.toLowerCase().indexOf(name.toLowerCase()) !== -1; 
    });
    this.setState({template: newTemplateData});
  }

  /* render */
  render() {
    let $this = this;
    let arrayOfRestaurantsToRender = $this.state.template;
    return (
      <React.Fragment>
        <Router>
          <div className= "main-container">
            {/* home */}
            <Route exact path="/" render={(props) => 
              <Home {...props} baseUrl={this.baseUrl} 
                restaurants={arrayOfRestaurantsToRender} 
                fetchRestaurants={$this.fetchRestaurants.bind($this)}
                searchRestaurantsByName={$this.searchRestaurantsByName.bind($this)}
              />
            }/>

            {/* checkout */}
            <Route exact path="/checkout" render={(props) => <Checkout {...props} baseUrl={this.baseUrl}/>} />
          </div>
        </Router>
      </React.Fragment>
    );
  }
}
export default FoodOrderingApplication;
