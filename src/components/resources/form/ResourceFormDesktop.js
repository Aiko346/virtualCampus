import React from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { FormControlLabel, Radio, LinearProgress } from '@material-ui/core';
import { RadioGroup } from 'formik-material-ui';
import FormikField from "../../FormikField/FormikField"
// import "../components/form.css"
import { CheckboxWithLabel } from 'formik-material-ui';
import FileUploadBtn from '../../FormikField/FileUploadBtn'
import Button from '@material-ui/core/Button';

import Grid from '@material-ui/core/Grid';
import classNames from "classnames";
import { makeStyles } from "@material-ui/core/styles";
import styles from "../../../assets/material-kit-assets/jss/material-kit-react/views/landingPage.js";
import {CustomHeader, Template} from "../.."
import Container from '@material-ui/core/Container';
import firebase from "../../../firebase";
import Categories from "./FormCategories"
//import {CustomButton} from "../../index";
import CustomFooter from "../../all/CustomFooter";
import CustomRadioButtonSet from "../../form-components/CustomRadioButtonSet";
import CustomRadioButton from "../../form-components/CustomRadioButton";
import { STAND_ALONE_MONTH_LETTERS } from "timezonecomplete";

const useStyles = makeStyles(styles);
const manualSt = makeStyles(() => ({
    toAll: {
        fontFamily: 'Poppins',
        fontStyle: 'normal',
        fontWeight: 'normal',
        // marginBottom: '12px'
    },
    title: {
        fontSize: '36px',
        lineHeight: '54px',
        color: '#0072CE',
        width: '435px',
        height: '66px',
        left: '55px',
        top: '101px',
    },
    subtitle: {
        fontSize: '20px',
        lineHeight: '30px',
        color: '#0072CE',
        width: '243px',
        height: '30px',
        left: '584px',
        top: '114px',
    },
    detail: {
        width: '400px',
        height: '63px',
        left: '55px',
        color: '#000000',
        fontSize: '14px',
        lineHeight: '21px',
    },
    section: {
        margin: '15px 0'
    },
    uploadBtn: {
        right: '5.42%',
        top: '25.72%',
        bottom: '70.59%',
        borderRadius: '10px',
        boxSizing: "border-box",
        color: '#0072CE !important',
        border: "1px solid #0072CE",
        "&:hover,&:focus": {
            color: 'white !important',
            backgroundColor: '#0072CE',
            boxShadow: "0 14px 26px -12px #0072CE50"
        },
        fontSize: 'min(2vw, 15px)',
        padding: "1vh min(2vw,20px)",
        margin: "1vh 0 0 0",
        willChange: "box-shadow, transform",
        transition:
            "box-shadow 0.2s cubic-bezier(0.4, 0, 1, 1), background-color 0.2s cubic-bezier(0.4, 0, 0.2, 1)",
        textAlign: "center",
        whiteSpace: "nowrap",
        verticalAlign: "middle",
        touchAction: "manipulation",
        cursor: "pointer",
        background: "#FFFFFF",
        width: "121px",
        height: "36px",
        marginLeft: '-10px',
        marginTop: '16px'
    },
    formField: {
        fontSize: '14px',
        lineHeight: '21px',
    },
    submitBtn: {
        borderRadius: '10px',
        width: "100%",
        color: '#FB750D !important',
        boxSizing: "border-box",
        border: "1px solid #FB750D",
        "&:hover,&:focus": {
            color: 'white !important',
            backgroundColor: '#F1945B',
            boxShadow: "0 14px 26px -12px #FB750D50"
        },
        fontSize: 'min(2vw, 15px)',
        padding: "1vh min(2vw,15px)"
    },
    categoryBtn: {
        right: '25px',
        borderRadius: '100px',
        color: '#0072CE !important',
        border: "1px solid #0072CE",
        "&:hover,&:focus": {
            color: 'white !important',
            backgroundColor: '#0072CE',
            boxShadow: "0 14px 26px -12px #0072CE50"
        },
        fontSize: 'min(1vw, 12px)',
        textTransform: 'none',
        marginLeft: '12px'
    },
    dot: {
        fontSize: '16pt',
        color: '#FD6464',
        borderRadius: '50%',
        position: 'absolute',
        width: '5px',
        height: '5px',
        marginLeft: '16px',
        paddingTop: '5px'
    },
}));

// set an init value first so the input is "controlled" by default
const initVal = {
    name: '',
    email: '',
    project_name: '',
    desc: '',
    image_file: '',
    image_link: '',
    project_link: '',
    comments: '',
    category: '',
    agree: '',
};

const validationSchema = Yup.object().shape({
    name: Yup.string()
        .min(5, 'Too Short')
        .required('Required'),
    email: Yup.string()
        .email('Please enter a valid email address')
        .required('Required'),
    project_link: Yup.string()
        .url('Please enter a valid URL')
        .required('Required'),
    project_name: Yup.string()
        .required('Required'),
    desc: Yup.string()
        .required('Required')
        .max('250', "Please enter less than 250 characters"),
    agree: Yup.boolean('True')
        .required(),

    // added category validation for radio group
    category: Yup.string()
        .required()

});

const ResourceFormDesktop = (props) => {
    const classes = useStyles();
    const manual = manualSt();
    //const [value, setValue] = React.useState(''); //current category on
    const [error, setError] = React.useState(false);
    var category = Object.keys(Categories);
    const [states, setStates] = React.useState( //states of buttons for category
        () => {
        let setup = {};
        category.forEach(ele => setup[ele] = false);
        setup['other']=false;
        return setup;
        }
    ); 
    /*const handleChange = (event) => {
        setValue(event.target.value);
        
      }; */
    
   

    
    // added state variable to keep track of current category
    //var state = {};
    //category.forEach(ele => state[ele] = false);
    var tags = Categories;
    //state['other']=false; 
    //setState(state);


    const submitHandler = (values, {resetForm}) => {
        
        // had to create new object to upload to firestore
        var new_entry = {
            
            // added name and email fields for new entries--
            // useful info to store in Firestore moving forward

            name: "",
            email: "",

            category: {
                category: "",
                tags: [],
            },
            
            description: "",
            img: "",
            links: {
                androidLink: "",
                cardLink: "",
                facebook: "",
                iosLink: "",
                website: "",
            },
            reviewed: false,
            title: ""
        };

        // created a variable called id to track the tags, since difference categories could have the same name for a tag
        var id = '';
        // alert(values['category'])

        // category['category'] field
        if (values['category']!='7other'){
            id = values['category'].toString()[0];
            new_entry["category"]["category"] = values['category'].slice(1);    
        }

        // case in which selected category is 'other'
        else
        {
            if(values['other category'])
            {
                id = values['other category'].toString()[0];
                new_entry["category"]["category"] = values['other category'].toString();
            }
            else
            {
                new_entry["category"]["category"] = values['category'].slice(1);    

            }
            
        }
        
        for (var prop in values) {
            
            // finding tags
            var tag_idx = prop.indexOf('tag');
            if (tag_idx != -1)
            {
                if (prop[0]=='7')
                {
                    new_entry['category']['tags'].push(values[prop]);
                }
                else if (prop[0] == id)
                {
                    new_entry['category']['tags'].push(prop.slice(tag_idx + 3));
                }

            }

            // name field
            if (prop === 'name' || prop === 'email')
            {
                new_entry[prop] = values[prop];
            }
            
            // etc.
            if (prop === "desc")
            {
                new_entry["description"] = values[prop];
            }
            else if (prop === "image_link")
            {
                new_entry["img"] = values[prop];
            }
            else if (prop === "project_name")
            {
                new_entry["title"] = values[prop];
            }
            else if (prop === "project_link")
            {
                new_entry["links"]["website"] = values[prop];                    
            }

                  
          }
        
        // checking number of selected tags
        if (new_entry["category"]["tags"].length > 2)
        {
            // too many
            alert("Please select at most two tags");
            var values2 = values
            for (var prop in values) {
            
                // finding tags
                var tag_idx = prop.indexOf('tag');
                if (tag_idx != -1)
                {
                    delete values2[prop];
    
                }
            }
            
            resetForm({values: values2});
           
        }
        else if (new_entry["category"]["tags"].length == 0)
        {
            // too few
            alert("Please select at least one tag");
            resetForm({values: values});
            
            
        }
        
        else
        {
            // calling function uploadData to send to firestore
            uploadData(new_entry);
            
            // redirecting to Thank You page
            window.location.replace("/thank-you");

        }
        
        
    };
    // changed upload path to new 'resource' collection, and added an update resource_list functionality
    function uploadData(values)
    {
        var category = values["category"]["category"];
        var db = firebase.firestore();
        var resourceDoc = db.collection("resource").doc(category);
        
        var title = values["title"]

        // you can directly update arrays in Firestore! 
        resourceDoc.update({
            resource_list: firebase.firestore.FieldValue.arrayUnion(title)
        });
        var name = "resource/" + category + "/resources";
        var newResourceRef = db.collection(name);
        newResourceRef.add(values);
        
    }
    

    // now that posting image files isn't an option, this function is obsolete....?
    function uploadImage(values) {
        const r = new XMLHttpRequest();
        const d = new FormData();
        // const e = document.getElementsByClassName('input-image')[0].files[0]
        // var u
        const clientID = 'df36f9db0218771';

        d.append('image', values["img"]);

        // Boilerplate for POST request to Imgur
        r.open('POST', 'https://api.imgur.com/3/image/');
        r.setRequestHeader('Authorization', `Client-ID ${clientID}`);
        r.onreadystatechange = function () {
            if (r.status === 200 && r.readyState === 4) {
                let res = JSON.parse(r.responseText);
                // this is the link to the uploaded image
                let imgur = `https://i.imgur.com/${res.data.id}.png`;

                values["img"] = imgur;
                uploadData(values);
            }
        };
        // send POST request to Imgur API
        r.send(d);
    }

    return (
        <div>
            <Template title={'Add New Resource'} active={"resources"} brand={"VIRTUAL CAMPUS"}>
                <div className={classNames(classes.mainOther, manual.main)}>
                    <Container maxWidth='lg'>

                            <Grid container spacing={10}>
                                <Grid item xs={4}>
                                    <div style={{
                                        fontFamily: "Poppins", fontStyle: "normal", fontWeight: "normal",
                                        fontSize: "36px", lineHeight: "54px", color: "#0072CE"
                                    }}>
                                        Add a New Resource
                              </div>
                                    <div style={{
                                        fontFamily: "Poppins", fontStyle: "normal", fontWeight: "normal",
                                        fontSize: "14px", lineHeight: "21px"
                                    }}>
                                        Thank you for your interest in sharing your resource through CVC.
                                        Please fill out the following form so we can thoroughly promote your resource on our website!
                              </div>
                                    <div style={{
                                        fontFamily: "Poppins", fontStyle: "normal", fontWeight: "normal",
                                        fontSize: "14px", lineHeight: "21px", paddingTop: "66px"
                                    }}>
                                        Questions? Contact us at <br />
                                        <a href='mailto:columbiavirtualcampus@gmail.com'>columbiavirtualcampus@gmail.com</a>.
                              </div>
                            </Grid>
                            <Grid item xs={8}>
                                <Formik initialValues={initVal} onSubmit={(values) => {submitHandler(values);}} validationSchema={validationSchema}>
                                    {({ dirty, isValid, errors, touched, values, setFieldValue }) => {
                                        return (
                                            
                                            <Form>

                                                <div className={manual.section}>
                                                    
                                                    <div className={classNames(manual.toAll, manual.subtitle)}>Contact</div>
                                                    <Grid container spacing={2}>
                                                        <Grid item sm={6}>
                                                            <FormikField label="Name / Organization" name="name" error={errors.name} touch={touched.name} required ></FormikField>
                                                        </Grid>
                                                        <Grid item sm={6}>
                                                            <div>
                                                                <FormikField label="Email" name="email" error={errors.email} touch={touched.email} required ></FormikField>
                                                            </div>
                                                        </Grid>
                                                    </Grid>
                                                    </div>

                                                <div className={manual.section}>
                                                    <div className={classNames(manual.toAll, manual.subtitle)} style={{ marginTop: '30px' }}>Resource</div>
                                                    <Grid container spacing={2} >
                                                        <Grid item sm={6}>
                                                            <FormikField label="Project Name" name="project_name" error={errors.project_name} touch={touched.project_name} required ></FormikField>
                                                        </Grid>
                                                        <Grid item sm={6}>
                                                            <div>
                                                                <FormikField
                                                                    label="Logo / Image Link"
                                                                    name="image_link"
                                                                    error={errors.image_link}
                                                                    touch={touched.image_link}
                                                                // value={this.state.imgFileValue}
                                                                />
                                                            </div>
                                                        </Grid>

                                                    </Grid>

                                                    <Grid container spacing={2}>
                                                        <Grid item xs={12}>
                                                            <FormikField label="Description" name="desc" multiline rows="4" error={errors.desc} touch={touched.desc} required />
                                                        </Grid>
                                                    </Grid>
                                                    <Grid container spacing={2}>
                                                        <Grid item xs={12}>
                                                            <FormikField label="Project Link" name="project_link" error={errors.project_link} touch={touched.project_link} required />
                                                        </Grid>
                                                    </Grid>

                                                    <Grid container spacing={2}>
                                                        <Grid item sm={2}>
                                                            <div className={manual.dot} style={{ paddingTop: '9px' }}>•</div>
                                                            <div style={{ marginLeft: '35px', paddingTop: '9px', height: '15px', width: '70px' }}>Category</div>
                                                        </Grid>
                                                        <Grid item sm={10}>

                                                        <Field id = "unique" component={RadioGroup} row={true} name="category" /*value={value} */ required>
                                                            <div className="buttons">
                                                            {/*Radio buttons replaced by buttons that function like radio buttons*/}
                                                                <Grid item sm={20}>
                                                                <div >
                                                                   {category.map((cat, idx) => {
                                                                        return (
                                                                        <CustomRadioButton 
                                                                                        idx={idx}
                                                                                        style={{marginTop: 5,
                                                                                            marginBottom: 5,
                                                                                            marginLeft: 10
                                                                                        }}
                                                                                       
                                                                                        onClick={(idx)=>{
                                                                                            let update = {...states};
                                                                                            Object.keys(update).forEach(ele => update[ele] = false);          
                                                                                            update[category[idx]] = true; 
                                                                                            setStates(update);
                                                                                            setFieldValue("category", idx + category[idx]);
                                                                                        }}
                                                                                        isPressed={states[cat]}
                                                                                        val={cat.replace('_','/')}
                                                                        />)})}
                                                                      <CustomRadioButton 
                                                                        idx="other"
                                                                        style={{marginTop: 5,
                                                                            marginBottom: 5,
                                                                            marginLeft: 10
                                                                        }}
                                                                        onClick={(idx)=>{
                                                                            let update = {...states};
                                                                            Object.keys(update).forEach(ele => update[ele] = false); 
                                                                            update["other"] = true;
                                                                            setStates(update);
                                                                            setFieldValue("category", "7"+idx);
                                                                        }}
                                                                       
                                                                        isPressed={states["other"]} 
                                                                        val={"Other"}
                                                        />
                                                                    </div>

                                                                    
                                                                  
                                                                    
                                                                   
                                                                        {states['other']
                                                                        ?


                                                                        <Grid item sm={8}>

                                                                            <FormikField
                                                                                label="other category"
                                                                                name="other category"
                                                                            />
                                                                        </Grid>
                                                                        : ""
                                                                        }
                                                                          
                                                                    

                                                                </Grid>
                                                            </div>
                                                            </Field>
                                                        </Grid>
                                                        </Grid>

                                                        <Grid container spacing={2}>
                                                        <Grid item sm={2}>
                                                            <div className={manual.dot} style={{ paddingTop: '9px' }}>•</div>
                                                            <div style={{ marginLeft: '35px', paddingTop: '9px', height: '15px', width: '70px' }}>Tags</div>
                                                        </Grid>
                                                        <Grid item sm={10}>


                                                            <div className="buttons">

                                                                <Grid item sm={11}>
                                                                {/*1st category */}
                                                                {states[category[0]]
                                                                    ? <span >
                                                                    {tags[category[0]][0]
                                                                        ?
                                                                        <CustomRadioButton 
                                                                                            idx={"00"}
                                                                                            style={{marginTop: 5,
                                                                                                marginBottom: 5,
                                                                                                marginLeft: 10,
                                                                                                fontSize: 'min(1.5vw, 9px)'
                                                                                            }}
                                                                                            onClick={(idx)=>{
                                                                                                if (values[0 + "tag" + tags[category[0]][0]] === true)
                                                                                                setFieldValue(0 + "tag" + tags[category[0]][0], false);
                                                                                                else
                                                                                                setFieldValue(0 + "tag" + tags[category[0]][0], true);
                                                                                                
                                                                                            }}
                                                                                            isPressed={values[0 + "tag" + tags[category[0]][0]]}
                                                                                            val={tags[category[0]][0]}
                                                                            />
                                                                        
                                                                        : ""
                                                                        }

                                                                        {tags[category[0]][1]
                                                                        ?
                                                                        
                                                                            <CustomRadioButton 
                                                                                            idx={"01"}
                                                                                            style={{marginTop: 5,
                                                                                                marginBottom: 5,
                                                                                                marginLeft: 10,
                                                                                                fontSize: 'min(1.5vw, 9px)'
                                                                                            }}
                                                                                            onClick={(idx)=>{
                                                                                                if (values[0 + "tag" + tags[category[0]][1]] === true)
                                                                                                setFieldValue(0 + "tag" + tags[category[0]][1], false);
                                                                                                else
                                                                                                setFieldValue(0 + "tag" + tags[category[0]][1], true);
                                                                                                
                                                                                            }}
                                                                                            isPressed={values[0 + "tag" + tags[category[0]][1]]}
                                                                                            val={tags[category[0]][1]}
                                                                            />
                                                                        : ""
                                                                        }
                                                                        {tags[category[0]][2]
                                                                        ?
                                                                        <CustomRadioButton 
                                                                        idx={"02"}
                                                                        style={{marginTop: 5,
                                                                            marginBottom: 5,
                                                                            marginLeft: 10,
                                                                            fontSize: 'min(1.5vw, 9px)'
                                                                        }}
                                                                        onClick={(idx)=>{
                                                                            if (values[0 + "tag" + tags[category[0]][2]] === true)
                                                                            setFieldValue(0 + "tag" + tags[category[0]][2], false);
                                                                            else
                                                                            setFieldValue(0 + "tag" + tags[category[0]][2], true);
                                                                            
                                                                        }}
                                                                        isPressed={values[0 + "tag" + tags[category[0]][2]]}
                                                                        val={tags[category[0]][2]}
                                                        />

                                                                        : ""
                                                                        }
                                                                        </span>
                                                                    : <span></span>
                                                                    }

                                                                

                                                                {/* 2nd category's tags */}
                                                                
                                                                {states[category[1]]
                                                                    ?   <span >
                                                                        {tags[category[1]][0]
                                                                        ?
                                                                        <CustomRadioButton 
                                                                        idx={"10"}
                                                                        style={{marginTop: 5,
                                                                            marginBottom: 5,
                                                                            marginLeft: 10,
                                                                            fontSize: 'min(1.5vw, 9px)'
                                                                        }}
                                                                        onClick={(idx)=>{
                                                                            if (values[1 + "tag" + tags[category[1]][0]] === true)
                                                                            setFieldValue(1 + "tag" + tags[category[1]][0], false);
                                                                            else
                                                                            setFieldValue(1 + "tag" + tags[category[1]][0], true);
                                                                            
                                                                        }}
                                                                        isPressed={values[1 + "tag" + tags[category[1]][0]]}
                                                                        val={tags[category[1]][0]}
                                                        />
                                                                        : ""
                                                                        }

                                                                        {tags[category[1]][1]
                                                                        ?
                                                                        <CustomRadioButton 
                                                                        idx={"11"}
                                                                        style={{marginTop: 5,
                                                                            marginBottom: 5,
                                                                            marginLeft: 10,
                                                                            fontSize: 'min(1.5vw, 9px)'
                                                                        }}
                                                                        onClick={(idx)=>{
                                                                            if (values[1 + "tag" + tags[category[1]][1]] === true)
                                                                            setFieldValue(1 + "tag" + tags[category[1]][1], false);
                                                                            else
                                                                            setFieldValue(1 + "tag" + tags[category[1]][1], true);
                                                                            
                                                                        }}
                                                                        isPressed={values[1 + "tag" + tags[category[1]][1]]}
                                                                        val={tags[category[1]][1]}
                                                        />

                                                                        : ""
                                                                        }
                                                                        {tags[category[1]][2]
                                                                        ?
                                                                        <CustomRadioButton 
                                                                        idx={"12"}
                                                                        style={{marginTop: 5,
                                                                            marginBottom: 5,
                                                                            marginLeft: 10,
                                                                            fontSize: 'min(1.5vw, 9px)'
                                                                        }}
                                                                        onClick={(idx)=>{
                                                                            if (values[1 + "tag" + tags[category[1]][2]] === true)
                                                                            setFieldValue(1 + "tag" + tags[category[1]][2], false);
                                                                            else
                                                                            setFieldValue(1 + "tag" + tags[category[1]][2], true);
                                                                            
                                                                        }}
                                                                        isPressed={values[1 + "tag" + tags[category[1]][2]]}
                                                                        val={tags[category[1]][2]}
                                                        />

                                                                        : ""
                                                                        }
                                                                    </span>
                                                                    : <span></span>
                                                                    }

                                                                {/* 3rd category's tags */}
                                                            
                                                                {states[category[2]]
                                                                    ?   <span >
                                                                        {tags[category[2]][0]
                                                                        ?
                                                                       
                                                                            <CustomRadioButton 
                                                                        idx={"20"}
                                                                        style={{marginTop: 5,
                                                                            marginBottom: 5,
                                                                            marginLeft: 10,
                                                                            fontSize: 'min(1.5vw, 9px)'
                                                                        }}
                                                                        onClick={(idx)=>{
                                                                            if (values[2 + "tag" + tags[category[2]][0]] === true)
                                                                            setFieldValue(2 + "tag" + tags[category[2]][0], false);
                                                                            else
                                                                            setFieldValue(2 + "tag" + tags[category[2]][0], true);
                                                                            
                                                                        }}
                                                                        isPressed={values[2 + "tag" + tags[category[2]][0]]}
                                                                        val={tags[category[2]][0]}
                                                        />
                                                                        : ""
                                                                        }
                                                                             
                                                                        {tags[category[2]][1]
                                                                        ?
                                                                        
                                                                        
                                                                            <CustomRadioButton 
                                                                        idx={"21"}
                                                                        style={{marginTop: 5,
                                                                            marginBottom: 5,
                                                                            marginLeft: 10,
                                                                            fontSize: 'min(1.5vw, 9px)'
                                                                        }}
                                                                        onClick={(idx)=>{
                                                                            if (values[2 + "tag" + tags[category[2]][1]] === true)
                                                                            setFieldValue(2 + "tag" + tags[category[2]][1], false);
                                                                            else
                                                                            setFieldValue(2 + "tag" + tags[category[2]][1], true);
                                                                            
                                                                        }}
                                                                        isPressed={values[2 + "tag" + tags[category[2]][1]]}
                                                                        val={tags[category[2]][1]}
                                                                    />   
                                                                        : ""
                                                                        }
                                                                        {tags[category[2]][2]
                                                                        ?
                                                                        <CustomRadioButton 
                                                                        idx={"22"}
                                                                        style={{marginTop: 5,
                                                                            marginBottom: 5,
                                                                            marginLeft: 10,
                                                                            fontSize: 'min(1.5vw, 9px)'
                                                                        }}
                                                                        onClick={(idx)=>{
                                                                            if (values[2 + "tag" + tags[category[2]][2]] === true)
                                                                            setFieldValue(2 + "tag" + tags[category[2]][2], false);
                                                                            else
                                                                            setFieldValue(2 + "tag" + tags[category[2]][2], true);
                                                                            
                                                                        }}
                                                                        isPressed={values[2 + "tag" + tags[category[2]][2]]}
                                                                        val={tags[category[2]][2]}
                                                                    />   

                                                                        : ""
                                                                        }
                                                                    </span>
                                                                    : <span></span>
                                                                    }   
                                                                {/* 4th category's tags */}
                                                                
                                                                {states[category[3]]
                                                                    ?   <span >
                                                                        {tags[category[3]][0]
                                                                        ?
                                                                        <CustomRadioButton 
                                                                        idx={"30"}
                                                                        style={{marginTop: 5,
                                                                            marginBottom: 5,
                                                                            marginLeft: 10,
                                                                            fontSize: 'min(1.5vw, 9px)'
                                                                        }}
                                                                        onClick={(idx)=>{
                                                                            if (values[3 + "tag" + tags[category[3]][0]] === true)
                                                                            setFieldValue(3 + "tag" + tags[category[3]][0], false);
                                                                            else
                                                                            setFieldValue(3 + "tag" + tags[category[3]][0], true);
                                                                            
                                                                        }}
                                                                        isPressed={values[3 + "tag" + tags[category[3]][0]]}
                                                                        val={tags[category[3]][0]}
                                                                    />   
                                                                        : ""
                                                                        }

                                                                        {tags[category[3]][1]
                                                                        ?
                                                                        <CustomRadioButton 
                                                                        idx={"31"}
                                                                        style={{marginTop: 5,
                                                                            marginBottom: 5,
                                                                            marginLeft: 10,
                                                                            fontSize: 'min(1.5vw, 9px)'
                                                                        }}
                                                                        onClick={(idx)=>{
                                                                            if (values[3 + "tag" + tags[category[3]][1]] === true)
                                                                            setFieldValue(3 + "tag" + tags[category[3]][1], false);
                                                                            else
                                                                            setFieldValue(3 + "tag" + tags[category[3]][1], true);
                                                                            
                                                                        }}
                                                                        isPressed={values[3 + "tag" + tags[category[3]][1]]}
                                                                        val={tags[category[3]][1]}
                                                                    />   

                                                                        : ""
                                                                        }
                                                                        {tags[category[3]][2]
                                                                        ?
                                                                        <CustomRadioButton 
                                                                        idx={"32"}
                                                                        style={{marginTop: 5,
                                                                            marginBottom: 5,
                                                                            marginLeft: 10,
                                                                            fontSize: 'min(1.5vw, 9px)'
                                                                        }}
                                                                        onClick={(idx)=>{
                                                                            if (values[3 + "tag" + tags[category[3]][2]] === true)
                                                                            setFieldValue(3 + "tag" + tags[category[3]][2], false);
                                                                            else
                                                                            setFieldValue(3 + "tag" + tags[category[3]][2], true);
                                                                            
                                                                        }}
                                                                        isPressed={values[3 + "tag" + tags[category[3]][2]]}
                                                                        val={tags[category[3]][2]}
                                                                    />   


                                                                        : ""
                                                                        }
                                                                    </span>
                                                                    : ""
                                                                    }
                                                                {/* 5th category's tags */}
                                                                
                                                                {states[category[4]]
                                                                    ?   <span >
                                                                        {tags[category[4]][0]
                                                                        ?
                                                                        <CustomRadioButton 
                                                                        idx={"40"}
                                                                        style={{marginTop: 5,
                                                                            marginBottom: 5,
                                                                            marginLeft: 10,
                                                                            fontSize: 'min(1.5vw, 9px)'
                                                                        }}
                                                                        onClick={(idx)=>{
                                                                            if (values[4 + "tag" + tags[category[4]][0]] === true)
                                                                            setFieldValue(4 + "tag" + tags[category[4]][0], false);
                                                                            else
                                                                            setFieldValue(4 + "tag" + tags[category[4]][0], true);
                                                                            
                                                                        }}
                                                                        isPressed={values[4 + "tag" + tags[category[4]][0]]}
                                                                        val={tags[category[4]][0]}
                                                                    />   

                                                                        : ""
                                                                        }

                                                                        {tags[category[4]][1]
                                                                        ?
                                                                        <CustomRadioButton 
                                                                        idx={"41"}
                                                                        style={{marginTop: 5,
                                                                            marginBottom: 5,
                                                                            marginLeft: 10,
                                                                            fontSize: 'min(1.5vw, 9px)'
                                                                        }}
                                                                        onClick={(idx)=>{
                                                                            if (values[4 + "tag" + tags[category[4]][1]] === true)
                                                                            setFieldValue(4 + "tag" + tags[category[4]][1], false);
                                                                            else
                                                                            setFieldValue(4 + "tag" + tags[category[4]][1], true);
                                                                            
                                                                        }}
                                                                        isPressed={values[4 + "tag" + tags[category[4]][1]]}
                                                                        val={tags[category[4]][1]}
                                                                    />   

                                                                        : ""
                                                                        }
                                                                        {tags[category[4]][2]
                                                                        ?
                                                                        <CustomRadioButton 
                                                                        idx={"42"}
                                                                        style={{marginTop: 5,
                                                                            marginBottom: 5,
                                                                            marginLeft: 10,
                                                                            fontSize: 'min(1.5vw, 9px)'
                                                                        }}
                                                                        onClick={(idx)=>{
                                                                            if (values[4 + "tag" + tags[category[4]][2]] === true)
                                                                            setFieldValue(4 + "tag" + tags[category[4]][2], false);
                                                                            else
                                                                            setFieldValue(4 + "tag" + tags[category[4]][2], true);
                                                                            
                                                                        }}
                                                                        isPressed={values[4 + "tag" + tags[category[4]][2]]}
                                                                        val={tags[category[4]][2]}
                                                                    />   

                                                                        : ""
                                                                        }
                                                                    </span>
                                                                    : ""
                                                                }
                                                                {/* 6th category's tags */}
                                                                
                                                                {states[category[5]]
                                                                    ?   <span >
                                                                        {tags[category[5]][0]
                                                                        ?
                                                                        <CustomRadioButton 
                                                                        idx={"50"}
                                                                        style={{marginTop: 5,
                                                                            marginBottom: 5,
                                                                            marginLeft: 10,
                                                                            fontSize: 'min(1.5vw, 9px)'
                                                                        }}
                                                                        onClick={(idx)=>{
                                                                            if (values[5 + "tag" + tags[category[5]][0]] === true)
                                                                            setFieldValue(5 + "tag" + tags[category[5]][0], false);
                                                                            else
                                                                            setFieldValue(5 + "tag" + tags[category[5]][0], true);
                                                                            
                                                                        }}
                                                                        isPressed={values[5 + "tag" + tags[category[5]][0]]}
                                                                        val={tags[category[5]][0]}
                                                                    />   
                                                                        : ""
                                                                        }

                                                                        {tags[category[5]][1]
                                                                        ?
                                                                        <CustomRadioButton 
                                                                        idx={"51"}
                                                                        style={{marginTop: 5,
                                                                            marginBottom: 5,
                                                                            marginLeft: 10,
                                                                            fontSize: 'min(1.5vw, 9px)'
                                                                        }}
                                                                        onClick={(idx)=>{
                                                                            if (values[5 + "tag" + tags[category[5]][1]] === true)
                                                                            setFieldValue(5 + "tag" + tags[category[5]][1], false);
                                                                            else
                                                                            setFieldValue(5 + "tag" + tags[category[5]][1], true);
                                                                            
                                                                        }}
                                                                        isPressed={values[5 + "tag" + tags[category[5]][1]]}
                                                                        val={tags[category[5]][1]}
                                                                    />   
                                                                        : ""
                                                                        }
                                                                        {tags[category[5]][2]
                                                                        ?
                                                                        <CustomRadioButton 
                                                                        idx={"52"}
                                                                        style={{marginTop: 5,
                                                                            marginBottom: 5,
                                                                            marginLeft: 10,
                                                                            fontSize: 'min(1.5vw, 9px)'
                                                                        }}
                                                                        onClick={(idx)=>{
                                                                            if (values[5 + "tag" + tags[category[5]][2]] === true)
                                                                            setFieldValue(5 + "tag" + tags[category[5]][2], false);
                                                                            else
                                                                            setFieldValue(5 + "tag" + tags[category[5]][2], true);
                                                                            
                                                                        }}
                                                                        isPressed={values[5 + "tag" + tags[category[5]][2]]}
                                                                        val={tags[category[5]][2]}
                                                                    />   

                                                                        : ""
                                                                        }
                                                                    </span>
                                                                    : ""
                                                                    }
                                                                {/* 7th category's tags */}
                                                                
                                                                {states[category[6]]
                                                                    ?   <span >
                                                                        {tags[category[6]][0]
                                                                        ?
                                                                        <CustomRadioButton 
                                                                        idx={"60"}
                                                                        style={{marginTop: 5,
                                                                            marginBottom: 5,
                                                                            marginLeft: 10,
                                                                            fontSize: 'min(1.5vw, 9px)'
                                                                        }}
                                                                        onClick={(idx)=>{
                                                                            if (values[6 + "tag" + tags[category[6]][0]] === true)
                                                                            setFieldValue(6 + "tag" + tags[category[6]][0], false);
                                                                            else
                                                                            setFieldValue(6 + "tag" + tags[category[6]][0], true);
                                                                            
                                                                        }}
                                                                        isPressed={values[6 + "tag" + tags[category[6]][0]]}
                                                                        val={tags[category[6]][0]}
                                                                    />   
                                                                        : ""
                                                                        }

                                                                        {tags[category[6]][1]
                                                                        ?
                                                                        <CustomRadioButton 
                                                                        idx={"61"}
                                                                        style={{marginTop: 5,
                                                                            marginBottom: 5,
                                                                            marginLeft: 10,
                                                                            fontSize: 'min(1.5vw, 9px)'
                                                                        }}
                                                                        onClick={(idx)=>{
                                                                            if (values[6 + "tag" + tags[category[6]][1]] === true)
                                                                            setFieldValue(6 + "tag" + tags[category[6]][1], false);
                                                                            else
                                                                            setFieldValue(6 + "tag" + tags[category[6]][1], true);
                                                                            
                                                                        }}
                                                                        isPressed={values[6 + "tag" + tags[category[6]][1]]}
                                                                        val={tags[category[6]][1]}
                                                                    />   

                                                                        : ""
                                                                        }
                                                                        {tags[category[6]][2]
                                                                        ?
                                                                        <CustomRadioButton 
                                                                        idx={"62"}
                                                                        style={{marginTop: 5,
                                                                            marginBottom: 5,
                                                                            marginLeft: 10,
                                                                            fontSize: 'min(1.5vw, 9px)'
                                                                        }}
                                                                        onClick={(idx)=>{
                                                                            if (values[6 + "tag" + tags[category[6]][2]] === true)
                                                                            setFieldValue(6 + "tag" + tags[category[6]][2], false);
                                                                            else
                                                                            setFieldValue(6 + "tag" + tags[category[6]][2], true);
                                                                            
                                                                        }}
                                                                        isPressed={values[6 + "tag" + tags[category[6]][2]]}
                                                                        val={tags[category[6]][2]}
                                                                    />   

                                                                        : ""
                                                                        }
                                                                    </span>
                                                                    : ""
                                                                    }
                                                                {states['other']
                                                                    ? <span >
                                                                        <Grid container spacing={4} >

                                                                            <Grid item sm={3}>
                                                                                <div>
                                                                                    <FormikField
                                                                                        label="Tag 1"
                                                                                        name={"7tagother1"}

                                                                                    />
                                                                                    <FormikField
                                                                                        label="Tag 2"
                                                                                        name={"7tagother2"}

                                                                                    />
                                                                                    <FormikField
                                                                                        label="Tag 3"
                                                                                        name={"7tagother3"}

                                                                                    />
                                                                                </div>
                                                                            </Grid>

                                                                        </Grid>

                                                                    </span>
                                                                    : ""
                                                                    }
                                                            
                                                                </Grid>
                                                            </div>
                                                        </Grid>
                                                        </Grid>

                                                </div>

                                                <div className={manual.section} style={{ marginTop: '30px' }}>
                                                    <div>
                                                        By adding a resource, you agree to the <a style={{ textAlign: "center", color: "#4284C8" }}
                                                            href="https://policylibrary.columbia.edu/acceptable-usage-information-resources-policy" target="_blank">
                                                            Columbia Resources Policy</a>.
                                                    </div>
                                                    <Field
                                                        component={CheckboxWithLabel}
                                                        name="agree"
                                                        Label={{ label: 'I agree to the Columbia Resources Policy.' }}
                                                        type="checkbox"
                                                        indeterminate={false}
                                                        required
                                                    />
                                                </div>

                                                <Grid container spacing={2}>
                                                    <Grid item sm={3}>
                                                        <Button
                                                            className={manual.submitBtn}
                                                            disabled={!isValid}
                                                            type="submit">
                                                            Submit
                                                        </Button>
                                                    </Grid>
                                                </Grid>
                                            </Form>)
                                        
                                     }} 
                                </Formik> 
                            </Grid>
                        </Grid>
                        <div style={{ marginBottom: "50px" }} />

                    </Container>
                </div>
            </Template>
            <CustomFooter />
        </div >
    );
};

export default ResourceFormDesktop;