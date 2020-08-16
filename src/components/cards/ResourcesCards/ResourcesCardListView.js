
import React, { useState } from "react";
import classNames from "classnames";
import { cardTitle } from "../../../assets/material-kit-assets/jss/material-kit-react";
import { makeStyles } from "@material-ui/core/styles";
import { CustomButton, AddCalendar, CustomTheme } from "../../";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import GridItem from "../../material-kit-components/Grid/GridItem.js";
import GridContainer from "../../material-kit-components/Grid/GridContainer.js";
import EventEmailModal from "../EventEmailModal";
import firebase from "../../../firebase";
import {handleEventClick} from "../eventCardsFeaturedAndCards/commonEventsFuncs"

const useStyles = makeStyles(() => ({
  card: {
    display: "flex",
    flexDirection: "row",
    boxShadow: "none",
    // marginTop: "0px",
    // marginBottom: "5px",
    paddingTop: '15px',
    paddingBottom:'15px',
    margin:0
  },
  nameHeader: {
    fontSize: '1.25vw',
    // position: "absolute",
    color: "black",
    // whiteSpace: "nowrap",
    marginTop: "6px",
    marginLeft: "14px",
    // display:'inline-block'
    fontAlign: "left"
  },
  orgHeader: {
    fontSize: '14px',
    color: '#0072CE',
    // display:'inline-block',
    marginLeft:'5px'
  },
  cardTitle,
  resourceTitle: {
    color: "black",
    position: "relative",
    fontSize: 20,
    paddingLeft: "24px",
    paddingTop: "10px",
  },
  category: {
    color: "gray",
    display:'inline-block',
    marginTop: "1px",
    marginLeft: "20px",
    fontSize: 15,
  },
  tagInfo: {
    marginTop: "3px",
    marginLeft: "4px",
  },
  tagBlock: {
    display: 'inline-block',
    fontSize: '10px',
    marginRight: '10px',
    backgroundColor: '#F2F2F2',
    paddingTop: 2,
    paddingBottom: 1,
    paddingLeft: 12,
    paddingRight: 12,
    borderRadius: "5px",
  },
  cardbody: {
    padding: 10,
    paddingLeft: 20,
    paddingRight: 20
  },
  flexBox: {
    flexDirection: "column",
    marginLeft: "10px",
    marginTop: "3px",
    marginBottom: "3px",
  },
  flexBox2: {
    flexDirection: "column"
  },
  imageBox: {
    // position: "absolute",
    top: "3vw",
    backgroundColor: "#F2F9FD",
    paddingLeft: "0.5%",
    paddingRight: "0.5%",
    borderRadius: "5.51px",
    height: "5vw",
    width: "5%"
  },
  tags: {
    marginLeft: "5px",
    marginTop: "5px"
  },
  image: {
    borderRadius: "5px",
    height: "70px",
    width: "70px",
    // paddginTop:0,
    // paddingBottom: 0,
    // marginTop: "5%",
    display: "inline-block",
    objectFit: "cover"
  },
  blueLine: {
    width: "100%",
    height: "1px",
    backgroundColor: "lightblue"
  },
  websiteButton: {
    position: "absolute",
    bottom: 0,
    marginRight: "25px",
    width: "155px",
    height: "35px"
  },
  joinButton: {
    // position: "absolute",
    // bottom: 0,
    marginRight: "25px",
    width: "155px",
    height: "35px",
    marginTop: "6px"
  }
}));

export default function EventCardDesktop({ ele }) {
  const classes = useStyles();

  const [open, setOpen] = useState(false);

  const openModalHandler = () => {
    setOpen(true)
  };

  const closeDo = () => {
    setOpen(false);
  };

  const handlePopularity = () => {
    handleEventClick(ele, 1)
  };

  return (
      <div style={{width: "100%", marginBottom: "5px"}}>
        <ExpansionPanel onClick={handlePopularity} defaultExpanded={ele.openExpansion}>
          <ExpansionPanelSummary
              expandIcon={<ExpandMoreIcon/>}
              aria-controls="panel1bh-content"
          >
            {/* put outer stuff here */}
            <div className={classes.flexBox}>
              <img className={classes.image} src={ele.img}/>
            </div>
            <div>
              <div className={classes.tags}>
                <GridContainer style={{marginLeft: 0, marginRight: 0}}>
                  <GridItem xs={12} sm={12} md={12}>
                    <div className={classes.tagInfo}>
                      {ele.category.tags.map((tag, ind) => {
                        if (tag !== "") {
                          return (
                              <div className={classes.tagBlock}>{tag}</div>
                          );
                        }
                      })}
                    </div>
                  </GridItem>
                </GridContainer>
              </div>
              <div className={classes.resourceTitle}>
                {ele.title}
                <span className={classes.category}>{ele.category.category}</span>
              </div>
            </div>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails style={{paddingLeft: 0, paddingRight: 0}}>
            {/* put inner stuff here */}
            <GridContainer style={{width: "100%", marginLeft: 0, marginRight: 0}}>
              <GridItem xs={12} sm={12} md={12} style={{paddingBottom: 10, paddingLeft: 25, paddingRight: 25}}>
                <div className={classes.blueLine}/>
              </GridItem>

              <GridItem xs={9} sm={9} md={9}
                        style={{paddingTop: 10, paddingBottom: 10, paddingLeft: 40, paddingRight: 10}}>
                <div style={{color: "black", display: "block", fontSize: "14px"}}>{ele.description}</div>
              </GridItem><GridItem xs={3} sm={3} md={3}>
                {ele.invite_link &&
                <CustomButton onClick={openModalHandler} text={'JOIN EVENT'} newTab color={"blue"} size={"medium"}
                              className={classes.joinButton}/>}
              </GridItem>
            </GridContainer>
            {open && <EventEmailModal open={open} closeDo={closeDo} event={ele} onClick={handlePopularity}/>}
          </ExpansionPanelDetails>
        </ExpansionPanel>

      </div>
  );
}
