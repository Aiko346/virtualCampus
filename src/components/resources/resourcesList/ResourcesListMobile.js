import AddResourceMobile from "./AddResourceExpansion.js";
import GridItem from "../../material-kit-components/Grid/GridItem";
import GridContainer from "../../material-kit-components/Grid/GridContainer";
import React from "react";
import Button from "../../material-kit-components/CustomButtons/Button";

import {ResourcesCardGridView, Heading, CustomButton, Search, ResourcesCardListView} from "../..";
import ResourcesListFunctionality from "./ResourcesListFunctionality"
import {CoolerButton} from "./ResourcesListFunctionality"
import {CircularProgress, Select, MenuItem, IconButton} from '@material-ui/core';
import GridOnIcon from "@material-ui/icons/GridOn";
import ViewListIcon from "@material-ui/icons/ViewList";

class ResourcesListMobile extends ResourcesListFunctionality {
  constructor(props) {
    super(props);
    this.state = {...this.state, activeTags: ""}
  }

  handleClick(tagName){
    this.setState({
      activeTags: tagName
    });
  }

  handleClickView(isGridView){
    this.setState({
      gridView: isGridView
    });
  }

  render() {
    return (
      <div>
        <div style={{textAlign:'center'}}>
          {Object.keys(this.state.resourcesDict).sort().map(category => {
            return (
              <Button size="small"
                      active={(this.state.activeTags === category)}
                      simple
                      style={{
                        backgroundColor: (this.state.activeTags === category) ? "#F2F2F2" : "white",
                        position: 'relative',
                        marginLeft:"2%",
                        marginRight:"2%",
                        marginTop: '3%',
                        borderRadius: '10px',

                        fontFamily: 'Poppins',
                        fontStyle: 'normal',
                        fontWeight: 'normal',
                        fontSize: '11px',
                        lineHeight: '14px',
                        color: '#0072CE'
                      }}
                      onClick={() =>{
                        this.setDisplay.bind(this, category)();
                        this.handleClick.bind(this)(category);
                      }}
                      value={{category}}
              >{category}</Button>
            );
          })}
        </div>

        <div style={{width:'64%', marginTop: '3%', display: 'inline-block', textAlign: "center", verticalAlign: 'middle'}}>
            <Search data={this.state.myResourcesDisplay}
                ref={input => this.inputElement = input}
                onClick={(val) => { this.searchFunc(val) }}
                onCancel={() => { this.searchFunc('') }}
                placeholder={"Search resources"}
            />
        </div>
        <div style={{width:'17%', marginLeft:'3%', marginTop: '3%', display: 'inline-block', textAlign: "center", verticalAlign: 'middle'}}>
            <Select
              labelId="label"
              id="select"
              value={this.state.selection}
              onChange={this.handleChange}
            >
              <MenuItem value={1}>Sort by</MenuItem>
              <MenuItem value={2}>Alphabetical</MenuItem>
            </Select>
        </div>
        <div style={{width:'2%', marginTop: '3%', display: 'inline-block', textAlign: "center", verticalAlign: 'middle'}}>
            <IconButton onClick={this.handleClickView.bind(this, true)}>
                <GridOnIcon style={{fill: "#0072CE"}}/>
            </IconButton>
        </div>
        <div style={{width:'2%', marginLeft:'4%', marginTop: '3%', display: 'inline-block', textAlign: "center", verticalAlign: 'middle'}}>
            <IconButton onClick={this.handleClickView.bind(this, false)}>
                <ViewListIcon style={{fill: "#0072CE"}}/>
            </IconButton>
        </div>

        <div style={{
              textAlign:'center',
              color: 'red',
              marginTop: '3%',
            }}
        >{this.state.searchError}</div>

        <hr style={{border: "1px solid #0072CE", marginTop: '6%'}} />

        <Heading color={'blue'}
                 style={{textAlign:'center', marginTop: '30px'}}
        >{this.state.category}</Heading>

        <div style={{
              textAlign:'center',
              marginTop: '15px',
              paddingLeft: '20px',
              paddingRight: '20px'
            }}
        >{this.state.description}</div>

        <GridContainer style={{width: '100%'}}>
          <GridItem style={{marginLeft: '3%', marginRight: '3%', marginBottom:'20px'}}>
            {this.state.tagsDisplay.sort().map((data, idx) => {
              return (
                <CoolerButton key={idx} style={{
                                marginTop: 5,
                                marginBottom: 5,
                                marginLeft: 10,
                                fontSize: 'min(1.5vw, 9px)',
                              }}
                              onClick={this.setTagDisplay.bind(this, data)}
                              otherClickOption={this.deleteTagDisplay.bind(this, data)}
                              category={this.state.category}
                              val={data}
                />
              );
            })}
          </GridItem>
          <AddResourceMobile />
          <GridItem>
            <GridContainer style={{paddingLeft: '30px', paddingRight: '5px', marginTop: '20px'}}>
              {this.activityIndicator && <CircularProgress style={{ marginLeft: '50%' }} /> }
              {!this.activityIndicator && this.state.gridView && this.state.resourcesDisplay.map(data => {
                return (
                  <GridItem xs={12}
                            sm={6}
                            md={4}
                            style={{marginBottom: "40px", marginTop: "10px"}}
                  >
                    <ResourcesCardGridView
                      website={data.links.website}
                      img={data.img}
                      title={data.title}
                      description={data.description}
                      iosLink={data.links.iosLink}
                      androidLink={data.links.androidLink}
                      tags={data.category.tags}
                      share
                    />
                  </GridItem>
                );

              })}
              {!this.state.activityIndicator && !this.state.gridView && this.state.resourcesDisplay.map(data => {
                return (
                  <GridItem style={{marginBottom: "20px", marginTop: "5px"}}>
                    <ResourcesCardListView
                      ele = {data}
                      key={data.id}
                    />
                  </GridItem>
                );

              })}
            </GridContainer>
          </GridItem>
        </GridContainer>
      </div>
    );
  }
}

export default ResourcesListMobile;
