import { makeStyles } from "@material-ui/core/styles";
import classNames from "classnames";
import React from "react";
import landingImage from "../../assets/images/home/MainGraphic.png";
import HostEventPic from "../../assets/images/home/HostEventPic.png";
import Mentoring1 from "../../assets/images/home/BlueWave1.png";
import Mentoring2 from "../../assets/images/home/BlueWave2.png";
import BlmImage from "../../assets/images/home/BlmImage.png";
import Bubbles1 from "../../assets/images/home/Bubbles1.png";
import Bubbles2 from "../../assets/images/home/Bubbles2.png";
import Bubbles3 from "../../assets/images/home/Bubbles3.png";
import OrangeBlob from "../../assets/images/home/OrangeBlob.png";
import BlueBlob from "../../assets/images/home/BlueBlob.png";
import styles from "../../assets/material-kit-assets/jss/material-kit-react/views/landingPage.js";
import { CustomButton, CustomHeader, MetaData, Subtitle, Title} from "./../../components";
import HomeEvents from './HomeEvents';
import HomeResourcesList from "./HomeResourcesList.js";
import { Helmet } from 'react-helmet';
import InstagramEmbed from 'react-instagram-embed';
import Orange from "./orange.svg";
import Blue from "./blue.svg";
import IconButton from '@material-ui/core/IconButton';
import DownArrow from '@material-ui/icons/ExpandMore';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import GridContainer from "../material-kit-components/Grid/GridContainer";
import GridItem from "../material-kit-components/Grid/GridItem";
import InstaIcon from '@material-ui/icons/Instagram';
import FacebookIcon from '@material-ui/icons/Facebook';
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import MailOutlineIcon from '@material-ui/icons/MailOutline';

const useStyles = makeStyles(styles);

const manualSt = makeStyles(() => ({
  toAll: {
    fontFamily: 'Poppins',
    fontStyle: 'normal',
    fontWeight: 'normal',
    lineHeight: 'min(3.1rem, 5vw)',
    fontSize: 'min(3.0rem, 3.3vw)',
    color: '#0072CE',
  },
  toAllSubHeading: {
    fontSize: 'min(.95rem, 1.35vw)',
    maxWidth: '58%',
    marginTop: "min(.7rem, 1.3vw)",
    marginBottom: "min(1.5rem, 2vw)",
    lineHeight: 'min(1.4rem, 1.9vw)',
    color: '#000000',
  },
  toAllSubHeadingUpEvents: {
    marginTop: ".5rem",
    marginBottom: "1.25rem",
    maxWidth: 'min(60rem, 72vw)',
    margin: "auto",
    color: '#000000',
  },
  toAllPrimary: {
    color: "#0072CE",
    fontSize: 'min(3.0rem, 3.3vw)',
    marginTop: '0px',
    marginBottom: '0px',
    position: 'relative',
  },
  toAllSecondary: {
    color: "#BFD8E9",
    marginBottom: '0px',
  },
  buttonSpan: {
    marginLeft: '1vw',
    marginRight: '1vw',
    fontSize: '20px'
  },
  landingText: {
    margin: 0,
    float: 'left',
    marginLeft: 'min(9%, 15vw)',
    marginTop: "min(9%, 15vh)",
    textAlign: 'left',
  },
  landing: {
    background: `url(${landingImage})`,
    //backgroundSize: 'max(min(90vw, 160vh), 250px) max(76vh, 100px)',
    // backgroundSize: 'max(min(80vw, 120vh), 250px) auto',
    //backgroundSize: 'max(min(92vw, 132vh), 262px) auto',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center max(90%, 100px)',
    height: "max(95vh, 31vw)",
    width: "100%",
  },
  eventsSection: {
    flexDirection: "column",
    position: "relative",
  },
    hostsSection: {
        flexDirection: "column",
        position: "relative",
        backgroundImage: `url(${HostEventPic})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "100% auto"
    },
  eventPic: {
    height: "100%",
    width: "100%",
    objectFit: "cover"
  },
  eventText: {
    position: "relative",
    backgroundColor: "rgba(0,0,0,0.5)",
    color:"white",
    textAlign: "center",
    lineHeight: '2.5vw',
    marginTop: "15px",
  },
  resourcesSection: {
    position: 'relative'
  },
  button: {
      boxShadow: 'none',
      fontSize: '1.1rem',
      width: 150,
      backgroundColor: 'white',
      paddingTop: 10,
      paddingBottom: 10,
      color: '#F1945B !important',
      marginLeft: "37.5%"
  },
  button2: {
      boxShadow: 'none',
      fontSize: '1.1rem',
      width: 150,
      paddingTop: 10,
      paddingBottom: 10,
      color: '#F1945B !important',
      marginLeft: "37.5%"
  },
  socialSection: {
    textAlign: "center",
  },
  largeIcon: {
    width: "100px",
    height: "100px",
    marginLeft: "50%",
    marginBottom: "-20px"
  },
  upcomingEventsBox: {
    width: "555px",
    height: '500px',
    borderRadius: '50px',
    marginLeft: '-375px',
    backgroundColor: "#0072CE",
    marginBottom: "200px",
    marginTop: "200px",
  },
  eventsBox: {
    width: "1200px",
    height: '724px',
    borderRadius: '50px',
    marginTop: "-840px",
    marginLeft: '300px',
    backgroundColor: "#D7EEF9",
    marginBottom: "200px",

  },
  hostEventPicBox: {
    background: `url(${HostEventPic})`,
    backgroundRepeat: 'no-repeat',
    width: "62%",
    height: "149%",
    marginLeft: "120px"

  },
  mentoring1: {
    background: `url(${Mentoring1})`,
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    marginTop: "200px",
    height: "300px",
    width: "100%",
    marginLeft: "8px",
  },
  mentoring2: {
    background: `url(${Mentoring2})`,
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    height: "400px",
    width: "100%",
    marginLeft: "8px",
    marginBottom: "200px"
  },
  blmImage: {
    background: `url(${BlmImage})`,
    backgroundRepeat: 'no-repeat',
    height: "100%",
    width: "100%",
    marginLeft: "250px",
    marginBottom: "360px",
    marginTop: "150px"
  },
  bubbles1: {
    marginLeft: "10px",
  },
  bubbles2: {
    marginLeft: "240px",
  },
  bubbles3: {
    marginLeft: "310px",
  },
  blueBlob: {
    width: "100%",
    height: "950px"
  },
  orangeBlob: {
    width: "60%",
    height: "975px",
    marginTop: "-1000px"
  },
  insta: {
    width: "50%",
    height: "100vh",
    backgroundColor: "#F6C09F",
    color: "black",
    float: "left",
    padding:"0px",
    marginTop: "0px",
  },
  fabo: {
    width: "50%",
    height: "100vh",
    backgroundColor: "#82B7E8",
    color: "white",
    float: "right",
    padding:"0px",
    margin: "0px",
  },
  footer: {
    width: "100%",
    height: "250px",
    backgroundColor: "#0072CE",
    color: "white",
    marginTop: "100px"
  }

}));


export default function HomeDesktop() {
  const classes = useStyles();
  var manual;
  manual = manualSt();
  return (
    <div style={{ background: "white" }}>
      <Helmet>
            <script async={true} defer={true} crossOrigin="anonymous" src="https://connect.facebook.net/en_US/sdk.js#xfbml=1&version=v6.0&appId=2186738638294469&autoLogAppEvents=1" />
      </Helmet>
      <MetaData title={'Columbia Virtual Campus'} />
      <CustomHeader active={''} brand={''}/>
      <div className={classNames(manual.landing)}>
        <div className={classNames(manual.landingText)}>
          <h1 className={classNames(manual.toAll, manual.toAllSecondary)}>
            Stay connected through
              </h1>
          <h1 className={classNames(manual.toAll, manual.toAllPrimary)}>
            Columbia Virtual Campus
              </h1>
          <h1 className={classNames(manual.toAllSubHeading)}>
              Your one stop-shop for all things social, career, academic, and well-being. Thank us later.
              </h1>
          <CustomButton href={"/events"} text={'EXPLORE'} color={"orange"} size={"large"} />
        </div>
      </div>

      <div style={{ marginBottom: "2.5vh", background: "transparent" }} />
      <div className={classNames(classes.main, manual.eventsSection)} style={{ textAlign: 'left' }}>
        <div id="explore" style={{marginLeft: "7%", marginRight: "7%", width:"86%"}}>
          <IconButton className={classNames(manual.largeIcon)}>
              <DownArrow style={{color: "#ACD8F1", fontSize: 70}}/>
          </IconButton>
        </div>
      </div>

      <Container>
      <GridContainer style={{width: '100%'}}>
        <GridItem xs={5} sm={5} md={5} lg={5}
        style={{width: '100%', height: '500px',
            borderRadius: '50px',
            backgroundColor: "#0072CE",
            marginLeft: "-255px",
            marginBottom: "200px",
            marginTop: "200px",}}>

            <p style={{color: "white", fontSize: "48px", marginLeft: "110px", marginTop: "80px"}}> Upcoming Events </p>
            <p style={{color: "white", fontSize: "20px", marginLeft: "110px", }}> Find out what's happening on campus, virtually.</p>
            <div style={{marginLeft: "110px", marginTop: "50px"}}>
              <CustomButton href={'/events'}  text={'SEE ALL EVENTS'}
              color={"white2"} size={"large"} />
            </div>

        </GridItem>

        <GridItem xs={11} sm={11} md={11} lg={11}
        style={{width: "100%",
            height: '724px',
            borderRadius: '50px',
            marginLeft: "170px",
            marginRight: "-500px",
            marginTop: "90px",
            backgroundColor: "#D7EEF9"}}>
            <div style={{marginLeft: "100px", marginTop: "100px"}}>
              <HomeEvents />
            </div>
        </GridItem>

      </GridContainer>
      </Container>

      <GridContainer>
        <GridItem xs={5} sm={5} md={5} lg={5}
          style = {{textAlign: "right"}}>

          <h2 style={{color:"#0072CE", fontSize: "48px"}}>Want to host an event?</h2>
          <p style={{color:"black", fontSize: "20px", marginLeft: "230px"}}>Looking to host your own event on Columbia Virtual Campus? Answer some questions to <strong>start leading.</strong></p>
          <br/>
          <CustomButton href={'/add-new-event'}  text={'HOST AN EVENT'}
          color={"orange"} size={"large"}/>
        </GridItem>

        <GridItem xs={7} sm={7} md={7} lg={7}>
          <div className={classNames(manual.hostEventPicBox)}> </div>
        </GridItem>
      </GridContainer>

          <div className={manual.mentoring1}>
            <GridContainer>
              <GridItem xs={5} sm={5} md={5} lg={5}>
                <div className={manual.blmImage}> </div>
              </GridItem>
            </GridContainer>
          </div>
          <div className={manual.mentoring2}>
            <GridContainer>
              <GridItem xs={7} sm={7} md={7} lg={7}
                style={{marginLeft: "750px", marginTop: "-150px", color: "black"}}>
                <h1 style={{fontSize: "48px"}}> Or check out</h1>
                <h1 style={{fontSize: "48px"}}> Our Mentorship Program</h1>
                <h3> DONATE WHAT YOU CAN</h3>
                <h3 style={{marginTop: "-10px", marginBottom: "25px"}}> for 30 minutes with any mentor!</h3>
                <p> Columbia Virtual Campus is offering a one-on-one mentorship </p>
                <p style={{marginTop: "-10px"}}> service in which 100% of fees are donated to organizations </p>
                <p style={{marginTop: "-10px"}}> supporting the black community. </p>
                <CustomButton href={'/coding-interviews'}  text={'SCHEDULE A SESSION'}
                color={"orange2"} size={"large"} style={{marginTop: "25px"}}/>
              </GridItem>
            </GridContainer>
          </div>


      <div style={{display: 'in-line'}}>
        <h1 style={{color: "#0072CE", fontSize: "48px", marginLeft: "100px"}}> Take a look at our Resources!</h1>
        <CustomButton href={'/resources'}  text={'SEE ALL RESOURCES'}
            color={"orange"} size={"large"} style={{marginLeft: "1300px", marginTop: "-100px"}}/>
        <HomeResourcesList />
      </div>


      <div style={{ marginBottom: "200px" }} />

        {/*<div style={{height: "100vh"}}>
          <div className={classNames(manual.insta2, manual.instaBg)}  style={{paddingTop:"50px", zIndex:"1"}} />
          <div className={classNames(manual.fabo2, manual.faboBg)}  style={{paddingTop:"50px", zIndex:"0"}} />*/}

        {/*<div className={manual.socialSection} style={{position: "relative", height: "0px", top: "-850px", zIndex:"3"}}>*/}

        <div>
          <img className={manual.bubbles1} src={Bubbles1}/>
          <img className={manual.bubbles2} src={Bubbles2}/>
          <img className={manual.bubbles3} src={Bubbles3}/>
        </div>

        <div>
          <img className={manual.blueBlob} src={BlueBlob}/>
          <img className={manual.orangeBlob} src={OrangeBlob}/>
          <div style={{marginTop:"-775px", marginLeft: "250px"}}>
              <div style={{ border:"none"}}>
                  <InstagramEmbed
                      url='https://www.instagram.com/p/CBHN4GMlSkD/'
                      maxWidth={320}
                      hideCaption={true}
                      containerTagName='div'
                      protocol=''
                      injectScript
                      onLoading={() => {}}
                      onSuccess={() => {}}
                      onAfterRender={() => {}}
                      onFailure={() => {}}
                  />
              </div>
              <div style={{marginLeft: "50px", marginTop: "50px", color: "black", borderColor: "black"}}>
                      <CustomButton href={"https://www.instagram.com/columbiavirtualcampus/"} text={'INSTAGRAM'}
                            startIcon={<InstaIcon />} color={"black"} size={"large"} />
              </div>
          </div>

          <div style={{marginTop: "-650px", marginLeft: "1150px"}}>
              <div style = {{ border:"none"}}
                       className="fb-page"
                       data-href="https://www.facebook.com/columbiavirtualcampus/"
                       data-tabs="timeline"
                       data-width="320"
                       data-height="527"
                       data-small-header="true"
                       data-adapt-container-width="true"
                       data-hide-cover="false"
                       data-show-facepile="false"
                  >
              </div>
              <div style={{marginTop: "50px", marginLeft: "55px"}}>
                  <CustomButton href={"https://www.facebook.com/columbiavirtualcampus/"} text={'FACEBOOK'}
                      startIcon={<FacebookIcon />} color={"black2"} size={"large"}/>
              </div>
          </div>
        </div>

        <div className={manual.footer} />
            <h2 style={{color: "white", fontSize: "36px", marginTop: "-180px", marginLeft: "80px"}}> Columbia Virtual Campus </h2>
            <h2 style={{color: "white", fontSize: "26px", marginTop: "0px", marginLeft: "80px"}}> Columbia, <i>virtually</i>.</h2>
        <div style={{color: "white", marginTop: "-105px", fontSize: "14px", marginLeft: "780px"}}>
            <a href={""} style={{color: "white"}}> Home </a> <br/>
            <a href={"/coding-interviews"} style={{color: "white"}}> Coding Interviews </a> <br/>
            <a href={"/events"} style={{color: "white"}}> Socialize </a> <br/>
            <a href={"/resources"} style={{color: "white"}}> Resources </a> <br/>
            <a href={"/about-us"} style={{color: "white"}}> About Us </a> <br/>
            <a href={"/contact-us"} style={{color: "white"}}> Contact Us </a> <br/>
        </div>

        <div style={{color: "white", marginTop: "-145px", fontSize: "14px", marginLeft: "980px"}}>
            <a href={"/events/add-new-event"} style={{color: "white"}}> Host an Event </a> <br/>
            <a href={"/resources/add-new-resource"} style={{color: "white"}}> Add a Resource </a> <br/>
            <a href={"/coding-interviews/add-interviewer"} style={{color: "white"}}> Be a Mock Interviewer </a> <br/>
        </div>

        <div>
          <IconButton className={classNames(manual.largeIcon)} style={{marginLeft: "1200px", marginTop: "-100px"}} href={"https://www.instagram.com/columbiavirtualcampus/"}>
              <InstaIcon style={{color: "white", fontSize: 70}}/>
          </IconButton>
          <IconButton className={classNames(manual.largeIcon)} style={{marginLeft: "1290px", marginTop: "-150px"}} href={"https://www.facebook.com/columbiavirtualcampus/"}>
              <FacebookIcon style={{color: "white", fontSize: 70}}/>
          </IconButton>
          <IconButton className={classNames(manual.largeIcon)} style={{marginLeft: "1380px", marginTop: "-200px"}} href={"https://www.linkedin.com/company/columbia-virtual-campus/"}>
              <LinkedInIcon style={{color: "white", fontSize: 70}}/>
          </IconButton>
          <IconButton className={classNames(manual.largeIcon)} style={{marginLeft: "1470px", marginTop: "-245px"}} href={"mailto:columbiavirtualcampus@gmail.com"}>
              <MailOutlineIcon style={{color: "white", fontSize: 70}}/>
          </IconButton>
        </div>
    </div>
  )
};
