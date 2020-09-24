import React, { useState, useEffect } from 'react';
import {connect} from 'react-redux';
import { Container, Form, Col, Button } from 'react-bootstrap';

import {MySpinner} from '../Spinner';
import {fetchPatientInfo, updateInfo} from '../api';
import {mapStateToProps} from '../mapProps';
import MyNav from '../MyNav';
import '../styles/medicalInfoPage.css';
import '../styles/page.css';

function MedicalInfoPage(props) {
  const [showSpinner, setShowSpinner] = useState(true);
  const [showSaveSpinner,setSaveSpinner] = useState(false);
  const [patientInfo, setPatientInfo] = useState(null);
  const [update, setUpdate] = useState(false);
  const [baseInfo, setBaseInfo] = useState(null)
  const [showFlash, setShowFlash] = useState(false);
  let patientPhone = props.patientState.patientPhone;

  useEffect(()=> {
    getPatientInfo();
    
  }, []);

  useEffect(() => {
    if(showFlash)
      setTimeout(hideFlash, 5000)
  }, [showFlash])

  const hideFlash = () => {
    console.log("hide flash");
    setShowFlash(false);
  }

  const getPatientInfo = async () => {
    const response = await fetchPatientInfo(props.userState.userToken, patientPhone);
    if(response.valid) {
      console.log(response)
      setPatientInfo(response);
      setBaseInfo(response);
      setShowSpinner(false);
    } else {

    }
  }

  const handleUpdate = (event) => {
    const name = event.target.name;
    let info = {...patientInfo};
    info[name] = event.target.value;
    setPatientInfo(info);
  }

  const handleClick = () => {
    setPatientInfo(baseInfo)
    setUpdate(!update)
  }

  const handleSave = async () => {
    setSaveSpinner(true);
    const response = await updateInfo(props.userState.userToken, patientPhone, patientInfo);
    if(response.valid) {
      setSaveSpinner(false);
      setUpdate(false);
    } else {
      setSaveSpinner(false);

    }
  }
  
  if(showSpinner) {
    return (
      <MySpinner />
    )
  }
  return (
    <div>
      <MyNav showNav={true} id="medical-info" history={props.history}/>
      {showSaveSpinner && <MySpinner />}
      <Container className="d-flex justify-content-center">
        <Form className="my-container shadow-box">
          <Form.Row>
            <Form.Group as={Col}>
              <Form.Label>Name</Form.Label>
              <Form.Control
                name="name" 
                type="text"
                value={patientInfo.patient.name}
                disabled={true}
              />
            </Form.Group>
            <Form.Group as={Col}>
              <Form.Label>Age</Form.Label>
              <Form.Control
                name="age" 
                type="number"
                onChange={handleUpdate}
                value={patientInfo.age != null ? patientInfo.age: update ? '' :"Not Set"}
                placeholder="Enter Age"
                disabled={!update}
              />
            </Form.Group>
          </Form.Row>
          <Form.Row>
            <Form.Group as={Col}>
              <Form.Label>Height</Form.Label>
              <Form.Control
                name="height" 
                type="number"
                onChange={handleUpdate}
                value={patientInfo.height != null? patientInfo.height: update ? '' :"Not Set"}
                placehlder="Enter Height"
                disabled={!update}
              />
            </Form.Group>
            <Form.Group as={Col}>
              <Form.Label>Weight</Form.Label>
              <Form.Control
                name="weight" 
                type="number"
                onChange={handleUpdate}
                value={patientInfo.weight != null? patientInfo.weight: update? '' : "Not Set"}
                placeholder="Enter Weight"
                disabled={!update}
              />
            </Form.Group>
          </Form.Row>
          <Form.Row>
            <Form.Group as={Col}>
              <Form.Label>BMI</Form.Label>
              <Form.Control
                name="bmi" 
                type="number"
                onChange={handleUpdate}
                value={patientInfo.bmi != null? patientInfo.bmi : update ? '' : "Not Set"}
                placeholder="Enter BMI"
                disabled={!update}
              />
            </Form.Group >
            <Form.Group as={Col}>
              <Form.Label>Blood Group</Form.Label>
              <Form.Control
                name="blood_group" 
                type="text"
                onChange={handleUpdate}
                value={patientInfo.blood_group != null? patientInfo.blood_group: update ? '' : "Not Set"}
                placeholder="Enter Blood Group"
                disabled={!update}
              />
            </Form.Group>
          </Form.Row>
          <Form.Row>
            <Form.Group as={Col}>
              <Form.Label>Blood Pressure</Form.Label>
              <Form.Control
                name="blood_pressure" 
                type="text"
                onChange={handleUpdate}
                value={patientInfo.blood_pressure != null? patientInfo.blood_pressure: update ? '' :"Not Set"}
                placeholder="Enter Blood Pressure"
                disabled={!update}
              />
            </Form.Group>
            <Form.Group as={Col}>
              <Form.Label>Setbacks</Form.Label>
              <Form.Control
              name="setbacks" 
                type="text"
                onChange={handleUpdate}
                value={patientInfo.setbacks != null? patientInfo.setbacks: update ? '' : "Not Set"}
                placeholder="Enter setbacks"
                disabled={!update}
              />
            </Form.Group>
          </Form.Row>
          <Form.Group>
            <Form.Label>Last Updated (YYYY-MM-DD)</Form.Label>
            <Form.Control 
              type="text"
              value={patientInfo.last_modified != null? patientInfo.last_modified.split('T')[0]: "Not Set"}
              disabled={true}
            />
          </Form.Group>
          {update ?
            <div className="d-flex justify-content-center">
              <Button onClick={handleSave} variant="danger" className="my-button">
                Save
              </Button>
              <Button onClick={handleClick} variant="danger" className="my-button">
                Cancel
              </Button>
            </div>
            :
            <div className="d-flex justify-content-center">
              <Button onClick={handleClick} variant="danger" className="my-button">
                Update
              </Button>
            </div>
          } 
        </Form>
      </Container>
      
    </div>
  )
}

export default connect(mapStateToProps)(MedicalInfoPage);