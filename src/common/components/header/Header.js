/* react imports */
import React, { Component } from 'react';

/* material imports */
import { withStyles } from '@material-ui/core/styles';
import FastfoodIcon from '@material-ui/icons/Fastfood';
import SearchIcon from '@material-ui/icons/Search';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import Input from '@material-ui/core/Input';
import Button from '@material-ui/core/Button';

/* project imports */
import "./header.scss"; 

/* header styles */
const headerStyles = theme => ({
  headerLoginButton: {
    marginTop: "5px"
  }
});

/* app icon */
const HeaderAppIcon = () => {
  return (
    <FastfoodIcon className="appIcon"/>
  );
};

/* header search */
const HeaderSearch = () => {
  return (
    <Input placeholder="Search by Restaurant Name" className="appSearch"
    startAdornment={<SearchIcon className="headerSearchIcon"/>} fullWidth={true}/>
  );
};

/* login button */
const HeaderLoginButton = (props) => {
  return (
    <Button variant="contained" startIcon={<AccountCircleIcon/>}>
      Login
    </Button>
  );
};

/* main */
class Header extends Component {
  render() {
    let { classes } = this.props;
    return (
      <React.Fragment>
        <nav>
          <div className="customRow">
            <div className="segment">
              <HeaderAppIcon/>
            </div>
            <div className="segment">
              <HeaderSearch/>
              <HeaderLoginButton customCss={classes}/>
            </div>
          </div>
        </nav>
      </React.Fragment>
    );
  }
}
export default Header;
