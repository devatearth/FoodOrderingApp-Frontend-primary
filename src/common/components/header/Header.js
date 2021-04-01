/* react imports */
import React, { Component } from 'react';

/* material imports */
import FastfoodIcon from '@material-ui/icons/Fastfood';

/* project imports */
import "./header.scss"; 

class Header extends Component {
  render() {
    return (
      <React.Fragment>
        <nav>
          <div className="customRow">
            <div className="segment">
              <FastfoodIcon className="appIcon"/>
            </div>
            <div className="segment">
            </div>
          </div>
        </nav>
      </React.Fragment>
    );
  }
}
export default Header;
