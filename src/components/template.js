import React from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
// @material-ui/core components
import { createMuiTheme, makeStyles, MuiThemeProvider } from "@material-ui/core/styles";
import {Toolbar} from "@material-ui/core";
// import vcg from "../assets/img/virtual-campus-graphic.png";
import im from "../assets/img/virtual-campus-graphic3.png";
import "../assets/material-kit-assets/scss/material-kit-react.scss?v=1.8.0";


// core components
import Parallax from "./material-kit-components/Parallax/Parallax.js";
import Header from "./material-kit-components/Header/Header.js";
import HeaderLinks from "./material-kit-components/Header/HeaderLinks.js";
import CustomHeader from "./CustomHeader";


import Card from "./material-kit-components/Card/Card.js";
import styles from "../assets/material-kit-assets/jss/material-kit-react/views/landingPage.js";
const customStyle = makeStyles(() => ({
  parallax: {
    height: "250px",
    backgroundPosition: "50% 30%"
  },
  container: {
    padding: "50px"
  },
  main: {
    // marginTop:50
    paddingTop:50,
    height: '100%'
  }
}));


const breakpointValues = {
  xs: 0,
  sm: 650,
  md: 1200,
  lg: 1400,
  xl: 1400,
};
const theme = createMuiTheme({ breakpoints: { values: breakpointValues } });
// Sections for this page


const useStyles = makeStyles(styles);

export default function Template(props) {
  const classes = useStyles();
  const custStyle = customStyle();
  const { children } = props;
  return (
    <MuiThemeProvider theme={theme}>
    <div>
      <CustomHeader active={props.active} brand={'VIRTUAL CAMPUS'}></CustomHeader>
      <div className={classNames(classes.mainOther, custStyle.main)}>
        <div className={classNames(classes.container)} style={{paddingTop: "50px"}}>
          {children}
          <div style={{marginBottom: "50px"}}/>
        </div>
      </div>
    </div>
    </MuiThemeProvider>
  );
}
