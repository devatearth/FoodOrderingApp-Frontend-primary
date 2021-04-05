/* react imports */
import React, { Component } from "react";

/* project imports */
import './Checkout.css';
import Header from "../../common/components/header/Header.js";

class Checkout extends Component {
  /* render */
  render() {
    let $this = this;
    let headerProps = {
      routerProps: $this.props
    };
    return (
      <React.Fragment>
        <Header routerProps={headerProps}/>
        <h1>Checkout Page</h1>
      </React.Fragment>
    );
  }
}
export default Checkout;
