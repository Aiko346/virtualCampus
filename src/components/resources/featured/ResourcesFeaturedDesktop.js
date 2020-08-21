import React from "react";
import ResourcesListFunctionality from "../resourcesList/ResourcesListFunctionality";
import {MuiThemeProvider} from "@material-ui/core/styles";
import Button from "../../material-kit-components/CustomButtons/Button.js";

import {makeStyles} from "@material-ui/core/styles";
import Data from "../../../assets/ResourcesData";
import {CustomTheme, CustomButton, Search} from "../..";
import FeaturedResourcesCardDesktop from "../../cards/FeaturedResourcesCardDesktop.js";
const FeaturedData = Data.FeaturedData;
const theme = CustomTheme;

const containerStyles = makeStyles(() => ({
  container: {
    position: 'relative',
    display: 'block',
    background: 'linear-gradient(0deg, rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4))',
    filter: 'blur(15px) contrast(125%) brightness(75%)',
  },
  img: {
    position: 'absolute',
    left: '0%',
    top: '7.91%',
    objectFit: 'cover',
  },
  card: {
    position: 'absolute',
    left: '3.4%',
    right: '62.74%',
    top: '7.91%',
    bottom: '14.5%',
    background: '#FFFFFF',
  },
  category: {
    position: 'absolute',
    left: '7.55%',
    right: '7.55%',
    top: '7.81%',
    bottom: '77.93%',
    fontFamily: 'Poppins',
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: '1.2vw',
    lineHeight: '30px',
    color: '#000000'
  },
  title: {
    position: 'relative',
    fontFamily: 'Poppins',
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: '2vw',
    lineHeight: 'vh',
    color: '#0072CE'
  },
  button: {
    background: 'rgba(255, 255, 255, 0.85)',
    position: 'relative',
    marginLeft: '3%',
    borderRadius: '5px',
    zIndex: 10,
    fontFamily: 'Poppins',
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: '10px',
    lineHeight: '10px',
    textAlign: 'center',
  },
  description: {
    position: 'relative',
    fontFamily: 'Poppins',
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: 'vw',
    lineHeight: '17px',
    color: '#000000',
    paddingTop: '5px'
  },
}));

class ResourcesFeaturedDesktop extends ResourcesListFunctionality {
constructor(props){
  super(props);
  this.state = {
    displayResources: []
  };
}
render() {
  const MAX_EVENTS_DISPLAYED = 3;
  let value = 0;

    return (
      <MuiThemeProvider theme={theme}>
      <div style={{backgroundColor: "#3B5998",
          height: "600px",
          width: "107.2%",
          borderStyle: "solid",
          borderColor: "#3B5998",
          borderWidth: "thick",
          flexDirection: "row",
          display: "flex",
          marginLeft: "-4%"}}
          >
          <div style={{marginLeft: "6%", color:"white", textAlign: "left"}}>
            <h2 style={{fontSize:40}}>Featured Resources</h2>
            <p style={{fontSize: 20}}>blah blah blah.
              <br /><br />
            </p>
            <div style={{width:'82%', marginTop: '3%', display: 'inline-block', textAlign: "center", verticalAlign: 'middle'}}>
                <Search data={this.state.myResourcesDisplay}
                    ref={input => this.inputElement = input}
                    onClick={(val) => { this.searchFunc(val) }}
                    onCancel={() => { this.searchFunc('') }}
                    placeholder={"Search all resources"}
                    style={{height:'70%'}}
                />
                </div>
          </div>
          <div style={{backgroundColor: "#FB750D",
            paddingTop: "0px",
            height: "550px",
            width: "57.8%",
            marginLeft: "20%",
            borderColor: "#FB750D",
            borderRadius: "0px 0px 0px 102px"
          }}>
          <div style={{flexDirection: "column", display: "flex", marginLeft: "-150px", marginTop: "25px"}}>
          { Object.keys(FeaturedData).map(key => {
              if(value < MAX_EVENTS_DISPLAYED){
                let data = FeaturedData[key];
                value = value + 1;
                console.log(value);
                return(<div style={{flexDirection: "column", display: "flex", marginLeft: "40px", marginTop: "10px"}}>
                  <FeaturedResourcesCardDesktop
                  website={data.links.website}
                  img={data.img}
                  title={data.title}
                  description={data.description}
                  iosLink={data.links.iosLink}
                  androidLink={data.links.androidLink}
                  tags={data.category.tags}
                  category={data.category.category}
                  share/>
                  </div>
                );
              }
          })}
          </div>
          </div>
      </div>



      </MuiThemeProvider>
    )
  }

}
export default ResourcesFeaturedDesktop;
