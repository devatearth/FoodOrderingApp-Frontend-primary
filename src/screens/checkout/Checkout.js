import React, { Component } from "react";
import './Checkout.css';
import Header from '../../common/components/header/Header';
import Grid from "@material-ui/core/Grid";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import StepContent from "@material-ui/core/StepContent";
import Typography from "@material-ui/core/Typography";
import { withStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Button from "@material-ui/core/Button";
import { FormControl, InputLabel, Input, Select, AppBar } from "@material-ui/core";
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormLabel from '@material-ui/core/FormLabel';
const customStyles = muiBaseTheme => ({
    root: {
        width: "100%"
    }, button: {
        marginTop: muiBaseTheme.spacing(),
        marginRight: muiBaseTheme.spacing()
    }, step: {
        marginBottom: muiBaseTheme.spacing(5)
    },
    iconContainer: {
        transform: "scale(2)",
        marginRight: muiBaseTheme.spacing(5)
    }
})
//To toggle between steps: Delivery and Payment
function getSteps() {
    return ["Delivery", "Payment"];
}
//Applying Tab display style
function TabContainer(props) {
    return (
        <Typography component={'div'} variant={'body2'} style={{ padding: 8 * 3 }}>
            {props.children}
        </Typography>
    );
}
class Checkout extends Component {
    constructor() {
        super();
        this.state = {
            activeStep: 1,
            changeOption: "dispNone",
            value: 0,
            dataPayments: {
                paymentMethods: [{ 'id': 1, 'payment_name': 'COD' }]
            },
            paymentMethod: "",
            onNewAddress: false,
        };
    }
    //To toggle between "Existing Address" and "New Address" tabs
    tabChangeHandler = (event, value) => {
        this.setState({ value })
    };
    //Handling and storing change of payment method value
    handleChange = (event) => {
        this.setState({ paymentMethod: event.target.value })
        sessionStorage.setItem("paymentMethod", event.target.value);
    }
    onExistingAddressTab = () => {
        this.setState({ onNewAddress: false });
    }
    onNewAddressTab = () => {
        this.setState({ onNewAddress: true });
    }
    handleNext = () => {
        if (this.state.onNewAddress === true) {
            //do nothing
        } else {
            if (this.state.activeStep === 1) {
                this.setState(state => ({
                    activeStep: this.state.activeStep + 1,
                    changeOption: "dispText"
                }));
            } else {
                this.setState(state => ({
                    activeStep: this.state.activeStep + 1,
                    changeOption: "dispNone"
                }));
            }
        }
    };
    //Called to back one step Payment to Delivery
    handleBack = () => {
        this.setState(state => ({
            activeStep: this.state.activeStep - 1
        }));
    };
    getStepContent = (step) => {

        switch (step) {
            case 0:
                return (
                    <div>
                        <AppBar position={"static"}>
                            <Tabs value={this.state.value} onChange={this.tabChangeHandler}>
                                <Tab onClick={this.onExistingAddressTab} label="Existing Address" />
                                <Tab onClick={this.onNewAddressTab} label="New Address" />
                            </Tabs>
                        </AppBar>
                    </div>
                );
            case 1:
                return (
                    <div>
                        <FormControl component="fieldset" >
                            <FormLabel component="legend">Select Mode of Payment</FormLabel>
                            <RadioGroup
                                aria-label="Payment Method"
                                name="payment"
                                value={this.state.paymentMethod}
                                onChange={this.handleChange}
                            >
                                {this.state.dataPayments.paymentMethods.map((payMethod, index) => (
                                    <FormControlLabel value={payMethod.id} control={<Radio />} label={payMethod.payment_name} key={index} />
                                ))}
                            </RadioGroup>
                        </FormControl>
                    </div>
                )
            default:
                return "Unknown step";
        }
    }
    render() {
        const { classes } = this.props;
        const { activeStep } = this.state;
        const steps = getSteps();
        return (
            <div>
                <Header modalIsOpen={false} />
                <Grid container spacing={1}>
                    <Grid item xs={12} md={8}>
                        <div className={classes.root}>
                            <Stepper activeStep={activeStep} orientation="vertical">
                                {steps.map(label => {
                                    return (
                                        <Step key={label} className={classes.step}>
                                            <StepLabel classes={{ iconContainer: classes.iconContainer }}>
                                                <Typography component={'div'} variant={"h5"}>
                                                    {label}
                                                </Typography>
                                            </StepLabel>
                                            <StepContent>
                                                <Typography component={'div'}>{this.getStepContent(activeStep)}</Typography>
                                                <div>
                                                    <div>
                                                        <Button style={{ fontSize: "20px" }} disabled={activeStep === 0} onClick={this.handleBack} className={classes.button}>
                                                            Back
                                                        </Button>
                                                        <Button variant="contained" color="primary" onClick={this.handleNext} className={classes.button}>
                                                            {activeStep === steps.length - 1 ? "Finish" : "Next"}
                                                        </Button>
                                                    </div>
                                                </div>
                                            </StepContent>
                                        </Step>
                                    );
                                })}
                            </Stepper><div className={this.state.changeOption}>View the summary and place your order now!<br />
                                <div>
                                </div>
                            </div>
                        </div>
                    </Grid>
                </Grid>
            </div>
        );
    }
}
export default withStyles(customStyles)(Checkout);