/* react imports */
import React, { Component } from "react";

/* project imports */
import "./home.scss";
import Header from "../../common/components/header/Header.js";

class Home extends Component {
  /* render */
  render() {
    let $this = this;
    let headerProps = {
      routerProps: $this.props
    };
    return (
      <React.Fragment>
        {/* header */}
        <Header 
          routerProps={headerProps}
          fetchRestaurants={$this.props.fetchRestaurants}
          searchRestaurantsByName={$this.props.searchRestaurantsByName}
        />
        <h1>Home Page</h1>
        {/* template the data here */}
      </React.Fragment>
    );
  }
}
export default Home
