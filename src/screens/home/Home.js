/* react imports */
import React, { Component } from "react";

/* mateiral ui imports */
import StarIcon from '@material-ui/icons/Star';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';

/* font awesome imports */
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faRupeeSign } from '@fortawesome/free-solid-svg-icons'

/* project imports */
import "./home.scss";
import Header from "../../common/components/header/Header.js";

const ListOfRestaurants = (props) => {
  let { restaurants } = props;
  return (
    <div className="restaurantsContainer">
      {
        restaurants.map(function(obj, index) {
          console.log(obj);
          return (
            <Card className="restaurantCard" key={obj.uuid}>
              <CardMedia image={obj.img} title={obj.name} className="cardMediaHolder"/>
              <CardContent className="cardContent">
                {/* name */}
                <h2>{obj.name}</h2>

                {/* category list */}
                <ul className="categoryList">
                  {
                    obj.tags.map(function(tag, index) {
                      return (
                        <li>{tag}</li>
                      );
                    })
                  }
                </ul>

                {/* footer section */}
                <div className="footer customRow">
                  <div className="segment">
                    <span className="ratingElement">
                      <FontAwesomeIcon className="starIcon" icon={faStar}/>
                      <span className="content">
                        { obj.rating } ({obj.count})
                      </span>
                    </span>
                  </div>
                  <div className="segment">
                    <FontAwesomeIcon className="starIcon" icon={faRupeeSign}/>
                    { obj.cost }
                  </div>
                </div>
              </CardContent>
            </Card>
          )
        })
      }
    </div>
  );
};

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
        {/* template the data here */}
        {
          "restaurants" in $this.props && $this.props.restaurants.length > 0 &&
          <ListOfRestaurants restaurants={$this.props.restaurants}/>
        }
      </React.Fragment>
    );
  }
}
export default Home
