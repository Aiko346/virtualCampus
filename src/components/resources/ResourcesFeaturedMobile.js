import classNames from "classnames";
import React from "react";
import {MuiThemeProvider} from "@material-ui/core/styles";
import Carousel from 'react-material-ui-carousel'
import {Paper} from '@material-ui/core'
import Button from "../material-kit-components/CustomButtons/Button.js";

import {makeStyles} from "@material-ui/core/styles";
import Data from "../../assets/ResourcesData";
import {ResourcesCard, CustomTheme, CustomButton} from "..";
const FeaturedData = Data.FeaturedData;
const theme = CustomTheme;


const containerStyles = makeStyles(() => ({
  container: {
    position: 'relative',
    left: '3.8%',
    right: '3.56%',
    top: '2.78%',
    bottom: '2.94%',

    background: 'linear-gradient(0deg, rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4))',
    filter: 'blur(15px) contrast(125%) brightness(75%)',
  },
  img: {
    position: 'absolute',
    left: '8%',
    right: '8%',
    top: '8%',
  },
  card: {
    position: 'absolute',
    left: '8%',
    right: '8%',
    top: '40.31%',
    bottom: '14%',
    background: '#FFFFFF',
  },
  category: {
    position: 'absolute',
    left: '7.55%',
    right: '7.55%',
    top: '7.81%',
    bottom: '58.82%',
    fontFamily: 'Poppins',
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: '12px',
    lineHeight: '21px',
    color: '#000000'
  },
  title: {
    position: 'relative',
    fontFamily: 'Poppins',
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: 'vw',
    lineHeight: 'vh',
    color: '#0072CE'
  },
  button: {
    background: '#FFFFFF',
    position: 'relative',
    marginLeft: '3%',
    bottom: '42.65%',
    borderRadius: '30px',
    zIndex: 10,
    fontFamily: 'Poppins',
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: '8px',
    lineHeight: '20px',
    textAlign: 'center',
  },
  description: {
    position: 'relative',
    fontFamily: 'Poppins',
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: '11px',
    lineHeight: 'vh',
    color: '#000000'
  },
}));

function Item(props) {
  const contStyle = containerStyles();
  return (
      <div>props</div>
  )
}

export default function ResourcesFeaturedMobile() {
  const contStyle = containerStyles();
  return (
    <MuiThemeProvider theme={theme}>
    <Carousel>
        {
            Object.keys(FeaturedData).map(key => {
              let data = FeaturedData[key];
              console.log(data);
              return (
                  <div style={{overflow:'hidden'}}>
                    <img src={data.img} alt={data.img} height={'500px'} width={'100%'} className={contStyle.container} style={{imageRendering: 'crisp-edges'}}/>
                    <img src={data.img} alt={data.img} height={'180px'} width={'84%'} className={contStyle.img}/>
                    <div className={contStyle.card} >
                      <p className={contStyle.category}>
                        {data.category.category
                          .split(' ')
                          .map(function(word) {
                              return word[0].toUpperCase() + word.substr(1);
                          })
                          .join(' ')
                        }

                        <p className={contStyle.title}>
                        {data.title}
                        </p>

                        <p>
                          {data.category.tags.map(ele => {
                            return (
                              <Button className={contStyle.button} style={{width: '53px', height: '21px'}}>
                                {ele}
                              </Button>
                            )
                          })}
                        </p>

                        <p className={contStyle.description} style={{marginTop: 10, position:'relative'}}>
                          {data.description}
                        </p>

                        <p>
                          <CustomButton text={"Explore!"} href={data.links.website}
                            color={"orange"} size={"medium"} style={{marginTop: 3, position:'relative'}}/>
                        </p>

                      </p>

                    </div>
                  </div>
              )

            })
        }
    </Carousel>
    </MuiThemeProvider>
  )
}
