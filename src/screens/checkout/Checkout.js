import React, { Component } from "react";
import './Checkout.css';
import Header from '../../common/components/header/Header';
import Grid from "@material-ui/core/Grid";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
//import StepContent from "@material-ui/core/StepContent";
import Typography from "@material-ui/core/Typography";
//import Button from "@material-ui/core/Button";
import { withStyles } from '@material-ui/core/styles';
const customStyles = muiBaseTheme => ({
    root: {
        width: "100%"
    }
})
//To toggle between steps: Delivery and Payment
function getSteps() {
    return ["Delivery", "Payment"];
}
class Checkout extends Component {
    constructor() {
        super();
        this.state = {
            activeStep: 0,
        };
    }
    render() {
        const { classes } = this.props;
        const { activeStep } = this.state;
        const steps = getSteps();
        return (
            <div>
                <Header />
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
                                        </Step>
                                    );
                                })}
                            </Stepper><div className={this.state.changeOption}>View the summary and place your order now!<br />
                                <div >
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