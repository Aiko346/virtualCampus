import React from "react";
import ResourcesListFunctionality from "../resourcesList/ResourcesListFunctionality";
import {MuiThemeProvider, withStyles} from "@material-ui/core/styles";
import Button from "../../material-kit-components/CustomButtons/Button.js";

import {makeStyles} from "@material-ui/core/styles";
import Data from "../../../assets/ResourcesData";
import {CustomTheme, EventCardFeatured, Template} from "../..";
import ResourcesCardGridView from "../../cards/ResourcesCards/ResourcesCardGridView.js";
import Carousel from "react-material-ui-carousel";
const FeaturedData = Data.FeaturedData;
const theme = CustomTheme;

const useStyles = () => ({
  text: {
    flexDirection: "column",
    display: "flex",
    marginTop: "12px",
    marginLeft: "-340%",
    marginRight: "25%"
  },
  mainBox: {
    backgroundColor: "#3B5998",
    height: "800px",
    width: "104.2%",
    borderStyle: "solid",
    borderColor: "#3B5998",
    borderWidth: "thick",
    flexDirection: "row",
    display: "flex",
    marginLeft: "-4%"
  },
  subBox: {
    backgroundColor: "#FB750D",
    marginTop: "-5px",
    height: "733px",
    marginLeft: "80%",
    width: "20.6%",
    marginRight: "-0.25%",
    borderColor: "#FB750D",
    borderRadius: "0px 0px 0px 102px"
  },
  cardList: {
    marginTop: "-500px",
    marginLeft: "10%",
    width: "300px",
  },
  card: {
    flexDirection: "column",
    display: "flex",
    marginLeft: "40px",
    marginTop: "25px"
  },
});

class ResourcesFeaturedMobile extends ResourcesListFunctionality {
constructor(props){
  super(props);
  this.state = {
    displayResources: []
  };
}
render() {
  const MAX_RESOURCES_DISPLAYED = 3;
  let value = 0;
  const { classes } = this.props;

    return (
      <MuiThemeProvider theme={theme}>
      <div className={classes.mainBox}>
        <div className={classes.subBox}>
          <div className={classes.text}>
            <h2 style={{fontSize:"2.5em", color:"white", lineHeight:"1.3"}}>Resources</h2>
            <p style={{fontSize: "1em", color:"white"}}>Some of our most popular resources to help you tackle recent events, be mindful of your health, improve your job search, and more.
              <br /><br />
            </p>
          </div>
        </div>
      </div>
      <div className={classes.cardList}>
        <Carousel>
          { Object.keys(FeaturedData).map(key => {
              if(value < MAX_RESOURCES_DISPLAYED){
                let data = FeaturedData[key];
                value = value + 1;
                return(
                  <div style={{overflow:'hidden', width: "100%"}}>
                    <ResourcesCardGridView
                  website={data.links.website}
                  img={data.img}
                  title={data.title}
                  description={data.description}
                  iosLink={data.links.iosLink}
                  androidLink={data.links.androidLink}
                  tags={data.category.tags}
                  category={data.category.category}
                  carousel={true}
                  share/>
                  </div>

                );
              }
          })}
        </Carousel>
      </div>
      <br/><br/>

      </MuiThemeProvider>
    )
  }

}

export default withStyles(useStyles)(ResourcesFeaturedMobile);
