/* react imports */
import React, { Component } from 'react';
import Modal from 'react-modal';

/* material imports */
import { makeStyles } from '@material-ui/core/styles';
import FastfoodIcon from '@material-ui/icons/Fastfood';
import SearchIcon from '@material-ui/icons/Search';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import Button from '@material-ui/core/Button';
import Tab from '@material-ui/core/Tab';
import TabContext from '@material-ui/lab/TabContext';
import TabList from '@material-ui/lab/TabList';
import TabPanel from '@material-ui/lab/TabPanel';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import FormHelpertext from "@material-ui/core/FormHelperText";
import Snackbar from '@material-ui/core/Snackbar';

/* project imports */
import "./header.scss"; 
import AppUtilities from "../../scripts/common.js";

/* custom styles */
const modalStyles = makeStyles({
  customTabs: {
    width: "50%"
  }
});

/* app icon */
const HeaderAppIcon = () => {
  return (
    <FastfoodIcon className="appIcon"/>
  );
};

/* header search */
const HeaderSearch = (props) => {
  let { searchHandler } = props;
  return (
    <Input 
      onChange={(event) => { searchHandler(event.target.value);}}
      placeholder="Search by Restaurant Name" 
      className="appSearch"
      startAdornment={<SearchIcon className="headerSearchIcon"/>} 
      fullWidth={true}
    />
  );
};

/* login button */
const HeaderLoginButton = (props) => {
  let { onClickHandler } = props;
  return (
    <Button variant="contained" startIcon={<AccountCircleIcon/>}
    onClick={onClickHandler}>
      Login
    </Button>
  );
};

/* login form */
class LoginFormComponent extends Component {
  /* constructor */
  constructor() {
    super();
    this.state = {
      userContactNumber: "",
      userPassword: "",
      contactErrorStatus: "hide",
      passwordErrorStatus: "hide",
      apiError: "hide",
      apiMessage: "Example of some error message"
    };
  };

  /* form reset handler */
  formResetHandler() {
    this.setState({
      userContactNumber: "",
      userPassword: "",
      contactErrorStatus: "hide",
      passwordErrorStatus: "hide",
      apiError: "hide",
    });
  };

  /* hide api error */
  formHideApiError() {
    this.setState({ apiError: "hide"}); 
  }
  
  /* show api error with message */
  formShowApiError(message) {
    this.setState({ apiError: "show", apiMessage: message}); 
  }

  /* login form elements on change handler */
  formOnChangeHandler(event) {
    let name = event.target.name;
    let value = event.target.value;
    let $this = this;
    let { state } = $this;
    
    /* update */
    state[name] = value;
    this.setState({...state});
  };
  
  /* login form submit handler */
  formSubmitHandler(event) {
    event.preventDefault();
    let $this = this;
    let { state:loginForm } = $this;
    let { userContactNumber, userPassword } = loginForm;
    let formStatus = {
      contact: false,
      password: false
    };
    $this.formHideApiError();

    if (userContactNumber !== "" && AppUtilities.isValidContactNumber(userContactNumber)) {
      formStatus.contact = true;
      loginForm.contactErrorStatus = "hide";
    }
    else {
      formStatus.contact = false;
      loginForm.contactErrorStatus = "show";
    }

    if (userPassword !== "" && AppUtilities.isValidPassword(userPassword)) {
      formStatus.password = true;
      loginForm.passwordErrorStatus = "hide";
    }
    else {
      formStatus.password = false;
      loginForm.passwordErrorStatus = "show";
    }

    /* set state as needed */
    $this.setState({ loginForm: loginForm });

    if (formStatus.contact === true && formStatus.password === true) {
      console.log("====> ", userContactNumber, userPassword);
      ///$this.setState({ snackbar: { message: "Logged in successfully!", show: true }});
      $this.formResetHandler();
    }
    else {
      console.log("error");
      //$this.loginFormShowApiError("Hello World - API example message...");
    }
  };

  /* render */
  render() {
    let $this = this;
    return (
      <form className="loginForm" onSubmit={$this.formSubmitHandler.bind($this)} noValidate autoComplete="off">
        <FormControl required centered="true" fullWidth={true}>
          <InputLabel htmlFor="userContactNumber">Contact Number</InputLabel>
          <Input value={$this.state.userContactNumber} name="userContactNumber" id="userContactNumber" type="text" onChange={$this.formOnChangeHandler.bind($this)}/>
          <FormHelpertext className={$this.state.contactErrorStatus}><span className="red">Invalid Contact</span></FormHelpertext>
        </FormControl>
        <br/>
        <br/>
        <FormControl required centered="true" fullWidth={true}>
          <InputLabel htmlFor="userPassword">Password</InputLabel>
          <Input value={$this.state.userPassword} name="userPassword" id="userPassword" type="password" onChange={$this.formOnChangeHandler.bind($this)}/>
          <FormHelpertext className={$this.state.passwordErrorStatus}><span className="red">Required</span></FormHelpertext>
        </FormControl>
        <br/>
        <br/>
        <FormHelpertext className={$this.state.apiError}><span className="red">{$this.state.apiMessage}</span></FormHelpertext>
        <Button variant="contained" color="primary" className="loginButton" type="submit">
          Login
        </Button>
      </form>
    );
  };
};

/* sign up form */
class SignUpFormComponent extends Component {
  /* constructor */
  constructor() {
    super();
    this.state = {
      userFirstName: "",
      userLastName: "",
      userEmail: "",
      userPassword: "",
      userContact: "",
      firstNameErrorStatus: "hide",
      emailErrorStatus: "hide",
      passwordErrorStatus: "hide",
      contactErrorStatus: "hide",
      apiError: "hide",
      apiMessage: "Example of some error message"
    };
  };
  
  /* form on submit handler */
  formOnSubmitHandler(event) {
    event.preventDefault();
    let $this = this;
    $this.formHideApiError();
    
    let { userFirstName:firstName, userLastName:lastName, userEmail:email, userPassword:password, userContact:contact } = $this.state;
    let { state:updatedState } = $this;
    let formStatus = {
      firstName: false,
      email: false,
      password: false,
      contact: false
    };

    if (firstName !== "") {
      updatedState.firstNameErrorStatus = "hide";
      formStatus.firstName = true;
    }
    else {
      updatedState.firstNameErrorStatus = "show";
      formStatus.firstName = false;
    }

    if (email !== "" && AppUtilities.isValidEmail(email)) {
      updatedState.emailErrorStatus = "hide";
      formStatus.email = true;
    }
    else {
      updatedState.emailErrorStatus = "show";
      formStatus.email = false;
    }

    if (password !== "" && AppUtilities.isValidPassword(password)) {
      updatedState.passwordErrorStatus = "hide";
      formStatus.password = true;
    }
    else {
      updatedState.passwordErrorStatus = "show";
      formStatus.password = false;
    }

    if (contact !== "" && AppUtilities.isValidContactNumber(contact)) {
      updatedState.contactErrorStatus = "hide";
      formStatus.contact = true;
    }
    else {
      updatedState.contactErrorStatus = "show";
      formStatus.contact = false;
    }

    /* perform neccessary updates */
    $this.setState({...updatedState});

    if (formStatus.firstName === true && formStatus.email === true && formStatus.password === true && formStatus.contact === true) {
      //$this.formResetHandler();
      $this.props.showSnackbar("Registered successfully! Please login now!", function() {
        $this.props.changeTabHandler("0");
        console.log(firstName, lastName, email, password, contact);
      });
    }
    else {
      console.log("error");
    }
  };

  /* login form reset handler */
  formResetHandler() {
    this.setState({
      userFirstName: "",
      userLastName: "",
      userEmail: "",
      userPassword: "",
      userContact: "",
      firstNameErrorStatus: "hide",
      lastNameErrorStatus: "hide",
      emailErrorStatus: "hide",
      passwordErrorStatus: "hide",
      contactErrorStatus: "hide",
      apiError: "hide",
      apiMessage: "Example of some error message"
    });
  };

  /* hide api error */
  formHideApiError() {
    this.setState({ apiError: "hide"}); 
  }
  
  /* show api error with message */
  formShowApiError(message) {
    this.setState({ apiError: "show", apiMessage: message}); 
  }
  
  /* orm elements on change handler */
  formOnChangeHandler(event) {
    let name = event.target.name;
    let value = event.target.value;
    let $this = this;
    let { state } = $this;
    
    /* update */
    state[name] = value;
    this.setState({...state});
  };

  /* render */
  render() {
    let $this = this;

    return (
      <form className="signUpForm" noValidate autoComplete="off" onSubmit={$this.formOnSubmitHandler.bind($this)}>
        <FormControl required centered="true" fullWidth={true}>
          <InputLabel htmlFor="userFirstName">First Name</InputLabel>
          <Input value={$this.state.userFirstName} name="userFirstName" id="userFirstName" type="text" onChange={$this.formOnChangeHandler.bind($this)}/>
          <FormHelpertext className={$this.state.firstNameErrorStatus}><span className="red">Required</span></FormHelpertext>
        </FormControl>
        <br/>
        <br/>
        <FormControl centered="true" fullWidth={true}>
          <InputLabel htmlFor="userLastName">Last Name</InputLabel>
          <Input value={$this.state.userLastName} name="userLastName" id="userLastName" type="text" onChange={$this.formOnChangeHandler.bind($this)}/>
        </FormControl>
        <br/>
        <br/>
        <FormControl required centered="true" fullWidth={true}>
          <InputLabel htmlFor="userEmail">Email Address</InputLabel>
          <Input value={$this.state.userEmail} name="userEmail" id="userEmail" type="text" onChange={$this.formOnChangeHandler.bind($this)}/>
          <FormHelpertext className={$this.state.emailErrorStatus}><span className="red">Invalid Email</span></FormHelpertext>
        </FormControl>
        <br/>
        <br/>
        <FormControl required centered="true" fullWidth={true}>
          <InputLabel htmlFor="userPassword">Password</InputLabel>
          <Input value={$this.state.userPassword} name="userPassword" id="userPassword" type="text" onChange={$this.formOnChangeHandler.bind($this)}/>
          <FormHelpertext className={$this.state.passwordErrorStatus}><span className="red">
            Password must contain at least one capital letter, one small letter, one number, and one special character
          </span></FormHelpertext>
        </FormControl>
        <br/>
        <br/>
        <FormControl required centered="true" fullWidth={true}>
          <InputLabel htmlFor="userContact">Contact No</InputLabel>
          <Input value={$this.state.userContact} name="userContact" id="userContact" type="text" onChange={$this.formOnChangeHandler.bind($this)}/>
          <FormHelpertext className={$this.state.contactErrorStatus}><span className="red">Required</span></FormHelpertext>
        </FormControl>
        <br/>
        <br/>
        <Button variant="contained" color="primary" className="signUpButton" type="submit">
          Sign Up
        </Button>
      </form>
    );
  };
};

/* header modal section */
const HeaderModalSection = (props) => {
  let classes = modalStyles();
  let { tabIndexValue, tabIndexOnChange, modalIsOpen, showSnackbar, changeTabHandler, modalCloser } = props;
  return (
    <Modal
      isOpen={modalIsOpen}
      onRequestClose={modalCloser}
      className="appHeaderModal"
    >
      <TabContext value={tabIndexValue}>
        <TabList onChange={(event, newValue) => {tabIndexOnChange(newValue)}}>
          <Tab label="Login" value="0" className={classes.customTabs}/>
          <Tab label="Sign Up" value="1" className={classes.customTabs}/>
        </TabList>
        <TabPanel value="0">
          <LoginFormComponent showSnackbar={showSnackbar}/>
        </TabPanel>
        <TabPanel value="1">
          <SignUpFormComponent showSnackbar={showSnackbar} changeTabHandler={changeTabHandler}/>
        </TabPanel>
      </TabContext>
    </Modal>
  );
};

/* main */
class Header extends Component {
  constructor() {
    super();
    this.state = {
      activeTab: "1",
      modalIsOpen: false,
      snackbar: {
        show: false,
        message: ""
      }
    };
  }

  /* component will mount - based on the props sent from the top level food application component, necesary 
     action will be taken */
  componentWillMount() {
    let $this = this;
    if ("fetchRestaurants" in $this.props) {
      $this.props.fetchRestaurants();
    }
  }

  /* tabs on change handler */
  tabsOnChangeHandler(tabIndexToShow) {
    this.setState({activeTab: tabIndexToShow});
  }

  /* on click handler */
  onClickHandler(event) {
    let $this = this;
    $this.modalOpener();
  }

  /* snackbar closer */
  snackbarCloser() {
    this.setState({ snackbar: { ...this.state.snackbar, show: false }});
  }

  /* snackbar show */
  snackbarShower(messageString, callback) {
    this.setState({ snackbar: { message: messageString, show: true }});
    if (typeof callback === "function") {
      callback();
    }
  }

  /* open modal */
  modalCloser() {
    this.setState({modalIsOpen: false});
  };

  /* close modal */
  modalOpener() {
    this.setState({modalIsOpen: true});
  };

  /* render */
  render() {
    let $this = this;
    let { routerProps } = $this.props.routerProps;
    return (
      <React.Fragment>
        {/* nav section */}
        <nav>
          <div className="customRow">
            <div className="segment">
              <HeaderAppIcon/>
            </div>
            <div className="segment">
              {/* search feature only applicable in the home page and other pages will not be rendered */}
              {
                routerProps.location.pathname === "/" &&
                <HeaderSearch searchHandler={$this.props.searchRestaurantsByName}/>
              }
              {/* search feature only applicable in the home page and other pages will not be rendered */}
            </div>
            <div className="segment">
              <HeaderLoginButton onClickHandler={this.onClickHandler.bind(this)}/>
            </div>
          </div>
        </nav>
        
        {/* modal section */}
        <HeaderModalSection 
          modalIsOpen={this.state.modalIsOpen}
          modalCloser={this.modalCloser.bind(this)}
          tabIndexValue={this.state.activeTab} 
          tabIndexOnChange={this.tabsOnChangeHandler.bind(this)}
          showSnackbar={this.snackbarShower.bind(this)}
          changeTabHandler={this.tabsOnChangeHandler.bind(this)}
        />

        {/* snackbar */}
        <Snackbar message={this.state.snackbar.message} open={this.state.snackbar.show} anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
        autoHideDuration={4000} onClose={this.snackbarCloser.bind(this)}/>
      </React.Fragment>
    );
  }
}
export default Header;
