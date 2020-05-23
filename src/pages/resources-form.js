import React, { Component } from "react";
import * as Survey from "survey-react";
import "survey-react/survey.css";
import "../components/form.css";
import Template from "../components/all/Template";

import $ from "jquery";
import {CustomButton} from "../components";
window["$"] = window["jQuery"] = $;

export { MyQuestion } from "../components/MyQuestion.js";

Survey.StylesManager.applyTheme("default");

class ResourcesForm extends Component {
 constructor(props) {
  super(props)
  this.state = {}
  this.onCompleteComponent = this.onCompleteComponent.bind(this)
 }

 onCompleteComponent = (result) => {
  this.setState({
   isCompleted: true
  })
  const resultAsString = JSON.stringify(result.data);
  console.log(resultAsString);
 }

 onValueChanged(result) {
  console.log("value changed!");
 }

 render() {
  //var model = new Survey.Model(this.json);
  const myCSS = {
    navigationButton: "button btn-lg"
  };

  const json = {
   pages: [
    {
     name: "Resource Submission Form",
     elements: [
      {
       type: "text",
       name: "Name",
       title: "What is your name?",
       hideNumber: true,
       isRequired: true
      },
      {
       type: "text",
       name: "Email",
       title: "What is your email?",
       hideNumber: true,
       isRequired: true
      },
      {
       type: "text",
       name: "Provide a short description of your project (1-2 sentences). This will be displayed on the website along with your project.",
       hideNumber: true,
       isRequired: true
      },
      {
       type: "checkbox",
       name: "question3",
       title: "What category would you like your project to be tagged to?",
       description: "If a category is not selected, we will choose one.",
       hideNumber: true,
       hasOther: true,
       choices: [
        {
         value: "item1",
         text: "Social"
        },
        {
         value: "item2",
         text: "Mental Health"
        },
        {
         value: "item3",
         text: "Housing"
        },
        {
         value: "item4",
         text: "COVID"
        },
        {
         value: "item5",
         text: "International Students"
        },
        {
         value: "item6",
         text: "Jobs / Internships"
        }
       ],
       otherText: "Other"
      },
      {
       type: "text",
       name: "Project Website",
       hideNumber: true
      },
      {
       type: "text",
       name: "App Links, if the project is an App (Android and/or iOS)",
       hideNumber: true
      },
      {
       type: "text",
       name: "Social Media Links",
       description: "In the following format: (Name: Link)",
       hideNumber: true
      },
      {
       type: "text",
       name: "Shareable Links for Pictures / Logo",
       description: "Ex. Google Drive, imgur, or any other links. If an image is not provided, we will default to an image.",
       hideNumber: true
      }
     ]
    }
   ]
  };

  const surveyRender = !this.state.isCompleted ? (
      <div>
        <h3 style={{textAlign: "center", color: "#0072CE"}}>Add a New Resource</h3>
        <div>
         <a style={{textAlign: "left", color: "#0072CE"}}>Thank you for your interest in sharing your project through
          CVC. Please fill out the following form so we can thoroughly promote your resource on our website!</a>
        </div>
       <div style={{ minHeight: "20px" }}/>
       <Survey.Survey
          showNavigationButtons={false}
          //css={myCSS}
          json={json}
          showCompletedPage={false}
          onComplete={this.onCompleteComponent}
      />
       <div style={{ textAlign: "center" }}>
            <CustomButton text={"Submit"} color={"orange"} size={"medium"} onClick={this.onCompleteComponent}/>
       </div>
      </div>
  ) : null;

  const onSurveyCompletion = this.state.isCompleted ? (
      <div style={{textAlign: "center"}}>
       <div className="message">Thank you!</div>
       <div className="blurb">
        We look forward to promoting your resource on CVC! If there is anything that needs to be updated, please reach out to us.
       </div>
       <div className="contact">
          Questions? Contact us at: <a style={{ textAlign: "center", color: "#4284C8" }}
                        href={"mailto:columbiavirtualcampus@gmail.com"}>columbiavirtualcampus@gmail.com</a>
       </div>
      </div>
  ) : null;

  return (
      <Template active={'resources'}>
       <div className="Form">
        <div>
         {surveyRender}
         {onSurveyCompletion}
        </div>
       </div>
      </Template>
  );
 }
}

export default ResourcesForm;