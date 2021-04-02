/* react imports */
import React, { Component } from 'react';

/* project imports */
import Header from "./common/components/header/Header.js";
import SampleData from "./common/data/sample-data.js";

class FoodOrderingApplication extends Component {
  constructor() {
    super();
    this.state = {
      data: null,
      template: null
    };
  }

  /* fetches the restaurant data before the app is loaded and rendered */
  componentWillMount() {
    this.setState({data: SampleData(), template: SampleData()});
  }

  /* helps to perform the necessary search on the set of restaurant data and filter */
  searchByName(name) {
    let { data } = this.state;
    let newTemplateData = data.filter(function(restaurant, index) {
      return restaurant.name.toLowerCase().indexOf(name.toLowerCase()) !== -1; 
    });

    this.setState({template: newTemplateData});
  }

  /* render */
  render() {
    return (
      <React.Fragment>
        <Header searchHandler={this.searchByName.bind(this)}/>
      </React.Fragment>
    );
  }
}
export default FoodOrderingApplication;
