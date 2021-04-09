import React, { Component } from "react";
import Header from "../../common/components/header/Header.js";
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import ButtonBase from '@material-ui/core/ButtonBase';
import Snackbar from '@material-ui/core/Snackbar';
import './Details.css';
import { IconButton } from "@material-ui/core";

class Details extends Component {
  constructor(props) {
    super(props);
    this.state = {
      resData: [],
      locality: "",
      city: "",
      sum: "0.00",
      snackBarOpen: false,
      cartItems: {
        restaurant: null,
        itemList: [],
        totalPrice: 0,
        totalItemCount: 0,
      },
    };
    this.apiURL = "http://localhost:8080/api/";
  }

  componentWillMount() {
    //API call to get restaurant details by restaurant ID
    let xhr_resDetails = new XMLHttpRequest();
    let dataRes = null;
    //Getting and splitting current url to get restaurant ID
    let temp = this.props.location.pathname;
    let resId = temp.split("/")[2];
    let that = this;
    xhr_resDetails.addEventListener("readystatechange", function () {
      if (this.readyState === 4) {
        const data = JSON.parse(this.responseText);
        that.setState({
          resData: data,
          locality: data.address.locality,
          city: data.address.city,
        });
      }
    });
    xhr_resDetails.open("GET", this.apiURL + "restaurant/" + resId);
    xhr_resDetails.setRequestHeader("Cache-Control", "no-cache");
    xhr_resDetails.send(dataRes);
  }

  render() {
    return (
      <div className="mainDiv">
        <Header logoutHandler={this.loginredirect} baseUrl= "http://localhost:8080/api/"/>


        <div>
          <div className="resMainDiv">
            <div style={{marginLeft:"2.5%",marginRight:"2.5%"}}>

              <Grid item container>
                <Grid item xs={10} >
                  <div >
                    <ButtonBase className="image"disableRipple={true}>
                      <img id="imageDisplay" alt={this.state.resData.restaurant_name} src={this.state.resData.photo_URL}/></ButtonBase>
                  </div>
                </Grid>
              </Grid>

            </div>

            <Grid item xs={6} container >
              <Grid item xs container direction="column" className="screenSize" spacing={2} >

                <Grid item xs>
                  <Typography className="resName">{this.state.resData.restaurant_name}</Typography>
                  <Typography id="LocalityCity"> {this.state.locality}-{this.state.city}</Typography><br/>
                  {(this.state.resData.categories || []).map((category, index) => {
                    return (<Typography key={"span" + category.id} display="inline"
                    className="categories " variant="h6">{category.category_name}, </Typography>
                    );
                  })}
                </Grid>

                <Grid item container spacing={5}>
                  <Grid item xs={7}  >
                    <span style={{fontWeight:"bolder"}} className="cusRating"><i className="fa fa-star"></i> {this.state.resData.customer_rating}</span>
                    <span className="textResDetails" style={{display:"block",color:"grey",fontSize:20}}>AVERAGE RATING BY</span>
                    <span  className="textResDetails" style={{color:"grey",fontSize:20}}><span className="textResDetails" style={{fontWeight:"bolder",color:"grey",fontSize:20}}>{this.state.resData.number_customers_rated} </span>CUSTOMERS</span>
                  </Grid>

                  <Grid item xs={5}>
                    <span style={{fontWeight:"bolder"}} className="cusRating"><i className="fa fa-inr"></i>{this.state.resData.average_price}</span>
                    <span className="textResDetails" style={{display:"block",color:"grey",fontSize:20}}>AVERAGE COST FOR</span>
                    <span className="textResDetails" style={{color:"grey",fontSize:20}}>TWO PEOPLE</span>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </div>
        </div>


        <div className="orderFunction"></div>
        <Snackbar
          key={"snack"}
          anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
          autoHideDuration={3000}
          open={this.state.snackBarOpen}
          onClose={() => this.setState({ snackBarOpen: false })}
          message={<span id="message-id">{this.state.snackBarMessage}</span>}
          action={
            <IconButton color="inherit">
              <CloseIcon />
            </IconButton>
          }
        />
      </div>
    );
  }
}
export default (Details);