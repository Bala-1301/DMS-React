import React, {useState} from 'react';
import {Container, Form, Button} from 'react-bootstrap';
import {connect} from 'react-redux';

import {mapStateToProps, mapDispatchToProps} from '../mapProps';
import {requestAccess, verifyAccess} from '../api';
import MyNav from '../MyNav'; 
import '../styles/page.css';
import '../styles/phoneVerificationPage.css';

function PhoneVerificationPage(props) {
  const [patientPhone,setPatientPhone] = useState('');
  const [phoneValid, setPhoneValid] = useState(true);
  const [phoneError,setPhoneError] = useState('');
  const [OTP, setOTP] = useState('');
  const [showOTP,setShowOTP] = useState(false);
  const [OTPValid, setOTPValid] = useState(true);
  const [OTPError,setOTPError] = useState('');
  
  let history = props.history;

  const validatePhone = () => {
    const phoneReg = new RegExp('^[6-9]{1}[0-9]{9}$');
    if(!phoneReg.test(patientPhone)) {
      console.log("invalidnum")
      setPhoneValid(false);
      setPhoneError("Invalid Number");
      return false;
    }
    return true;
  }
  
  const validateOTP = () => {
    const OTPRegex = new RegExp('^[0-9]{4}$');
    if(!OTPRegex.test(OTP)) {
      setOTPValid(false);
      setOTPError("Invalid OTP");
      return false;
    }
    return true;
  }

  const handlePhoneSubmit = async (event) => {
    event.preventDefault();
    if(validatePhone()){
      const response = await requestAccess(props.userState.userToken, patientPhone);
      if(response.valid) {
        setShowOTP(true);
      } else {
        setPhoneValid(false);
        setPhoneError(response.detail)
      }
    }
  }
  
  const handleOTPSubmit = async (event) => {
    event.preventDefault();
    if(validateOTP()) {
      const response = await verifyAccess(props.userState.userToken, patientPhone, OTP);
      if(response.valid) {
        props.setPatientPhone(patientPhone);
        history.replace('/treat');
      } else {
        setOTPValid(false);
        setOTPError(response.detail);
      }
    }

  }

  return (
    <div>
      <MyNav history={history}/>
      <Container className="d-flex justify-content-center my-align">
        <Form onSubmit={showOTP? handleOTPSubmit: handlePhoneSubmit}  className="shadow-box">
          <div id="form-div">
          <Form.Group>
            <Form.Label>Patient's Phone</Form.Label>
            <Form.Control 
              type="tel"
              onChange={(event) => {
                setPatientPhone(event.target.value); 
                setPhoneValid(true)
              }} 
              maxLength={10}
              isInvalid={!phoneValid}
              placeholder="Patient Phone Number"
              autoFocus={true}
            />
            <Form.Control.Feedback type="invalid">{phoneError}</Form.Control.Feedback>
          </Form.Group>
          {showOTP && 
          <Form.Group>
            <Form.Label>OTP</Form.Label>
            <Form.Control 
              type="tel"
              onChange={(event) => {
                setOTP(event.target.value); 
                setOTPValid(true)
              }} 
              maxLength={4}
              isInvalid={!OTPValid}
              placeholder="Enter OTP"
              autoFocus={true}
            />
            <Form.Control.Feedback type="invalid">{OTPError}</Form.Control.Feedback>
          </Form.Group>}
         
          <Form.Group className="d-flex justify-content-center">
            <Button type="submit" variant="danger">{showOTP? "Verify OTP": "Get OTP"}</Button>
          </Form.Group>
          </div>
        </Form>
        
      </Container>
    </div>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(PhoneVerificationPage);
