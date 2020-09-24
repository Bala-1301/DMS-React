import React from 'react';
import {Container, Form, Button, Col, Modal} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';

import {MySpinner} from '../Spinner';
import {mapDispatchToProps} from '../mapProps';
import Timer from '../Timer';
import {signUp, signUpRequest, login} from '../api';
import '../styles/page.css';
import './signUpPage.css';

class SignUpPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      phone: '',
      email: '',
      licence_no: '',
      gender: 'Male',
      password: '',
      OTP: '',
      phoneValid: true,
      licence_noValid: true,
      nameValid: true,
      passwordValid: true,
      emailValid: true,
      error: false,
      showSpinner: false,
      showOverlay: false,
      resendOTP: false,
    }
    this.errorMsg = null;
  }

  handleChange = (event) => {
    let name = event.target.name;
    let value = event.target.value;
    this.setState({
      [name] : value
    });
    if(!this.state[`${name}Valid`]) {
      this.setState({
        [`${name}Valid`] : true,
      })
    }
    if(!this.state.error) {
      this.setState({
        error: false,
      })
    }
  }

  validate = () => {
    let details = this.state;
    let inputs = ['name', 'phone', 'password', 'email', 'licence_no']
    let flag = true;
    inputs.map((input) => {
      if(details[input].length === 0) {
        console.log(input)
        this.setState({
          [`${input}Valid`] : false, 
        });
        this.errorMsg = "This Field cannot be empty."
        flag = false;
      }
    })
    if(flag) {
      let phoneRegex = new RegExp('^[6-9][0-9]{9}$');
      let passRegex = new RegExp('^(?=.*[0-9])(?=.*[a-z])(?=.*[@!#$%^&*()]).{8,32}$');
      if(!phoneRegex.test(details.phone)) {
        this.setState({
          phoneValid: false,
        })
        this.errorMsg = "Invalid Input"
        flag = false;
      } 
      if(!passRegex.test(details.password)) {
        this.setState({
          passwordValid: false,
        })
        this.errorMsg = "Invalid Input"
        flag = false;
      }
    }
    return flag;
  }

  handleSubmit = async (event) => {
    if(this.state.showOverlay) {
      this.setState({
        showOverlay: false,
        resendOTP: false,
      })
    }
    event.preventDefault();
    console.log(this.state)
    if (this.validate()) {
      this.setState({
        showSpinner: true,
      })
      const response = await signUpRequest(this.state);
      this.setState({
        showSpinner: false,
      })
      if(response.valid){
        this.setState({
          showOverlay: true,
        });
        setTimeout(() => {
          this.setState({
            resendOTP: true,
          });
        }, 30000)
      } else {
        this.errorMsg = response.detail;
        if(response.detail.search('phone') != -1) {
          this.setState({
            phoneValid : false,
          });
        } else if(response.detail.search('email') != -1) {
          this.setState({
            emailValid: false,
          });
          
        } else if(response.detail.search('licence') != -1) {
          this.setState({
            licence_noValid: false,
          });

        } else {
          this.setState({
            error: true,
          });
        }
      }
    }
  }

  handleOTPSubmit = async (event) => {
    event.preventDefault();
    this.setState({
      showSpinner: true,
    })
    const response = await signUp(this.state);
    if(response.valid == true) {
      const loginResponse = await login(this.state.phone, this.state.password);
      this.setState({
        showSpinner: false,
      })
      if(loginResponse.valid) {
        this.props.loginUser(loginResponse);
        console.log(this.props.userState);
        this.props.history.replace("/home");
      } 
    } else {
      this.errorMsg = response[0];
      this.setState({
        showOverlay: false,
        showSpinner: false,
        passwordValid: false,
      });
      
      
    }
  }

  
  render() {
    return (
      <div>
        {this.state.showSpinner && <MySpinner />}
        <Modal
          show={this.state.showOverlay}
          centered
        >
          {/* id="contained-modal-title-vcenter" */}
          <Modal.Header>
            <Modal.Title>
              Enter the OTP
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={this.handleOTPSubmit}>
              <Form.Group>
                <Form.Label>An OTP has been sent to <b>{this.state.phone}</b></Form.Label>
                <Form.Control 
                  name="OTP"
                  type='text'
                  onChange={this.handleChange}
                  placeholder="4-digit OTP" 
                />
              </Form.Group>
              <div className='d-flex justify-content-center'>
                <Button
                  type="submit"
                  variant="danger"
                >
                  Submit
                </Button>
              </div>
            </Form>
            <div id='otp-footer' className="d-flex justify-content-center ">
              <p>Didn't receive OTP?</p>
              <Button 
                variant='link' 
                size='md'
                disabled={!this.state.resendOTP}
                onClick={this.handleSubmit}
              > 
                Resend 
              </Button>
              <p>in &nbsp;</p>
              <Timer time={30}/>
            </div>
          </Modal.Body>
        </Modal>
        <Container className="d-flex justify-content-center " id="signup-container">
          <div className="shadow-box">
            <div id="h2">
              <h2>Doctor's Sign Up</h2>
            </div>
            <Form onSubmit={this.handleSubmit}>
              <Form.Row>
                <Form.Group as={Col}>
                  <Form.Label>Name</Form.Label>
                  <Form.Control 
                    type="text"
                    autoCapitalize
                    name="name"
                    placeholder="Enter Your Name"
                    autoFocus
                    onChange={this.handleChange}
                    isInvalid={!this.state.nameValid}
                  />
                  <Form.Control.Feedback type="invalid">{this.errorMsg}</Form.Control.Feedback>
                </Form.Group>
                <Form.Group as={Col}>
                  <Form.Label>Email</Form.Label>
                  <Form.Control 
                    type="email"
                    name="email"
                    placeholder="Enter Your Email"
                    onChange={this.handleChange}
                    isInvalid={!this.state.emailValid}
                  />
                  <Form.Control.Feedback type="invalid">{this.errorMsg}</Form.Control.Feedback>
                </Form.Group>
              </Form.Row>
              <Form.Group>
                <Form.Label>Phone</Form.Label>
                <Form.Control 
                  type="tel"
                  autoCapitalize
                  maxLength={10}
                  name="phone"
                  placeholder="Enter Your 10 digit Phone Number"
                  onChange={this.handleChange}
                  isInvalid={!this.state.phoneValid}
                />
                <Form.Control.Feedback type="invalid">{this.errorMsg}</Form.Control.Feedback>
                <Form.Text>An OTP will be sent to this number for verification</Form.Text>
              </Form.Group>
              <Form.Row>
                <Form.Group as={Col}>  
                  <Form.Label>Doctor Licence</Form.Label>
                  <Form.Control 
                    type="text"
                    name="licence_no"
                    placeholder="Enter Your Licence ID"
                    onChange={this.handleChange}
                    isInvalid={!this.state.licence_noValid}
                  />
                  <Form.Control.Feedback type="invalid">{this.errorMsg}</Form.Control.Feedback>
                </Form.Group>
                <Form.Group as={Col}>
                  <Form.Label>Gender</Form.Label>
                  <Form.Control as="select" name="gender" onChange={this.handleChange} defaultValue="Male">
                    <option> Male </option>
                    <option> Female </option>
                    <option> Other </option> 
                  </Form.Control>
                </Form.Group>
              </Form.Row>
              <Form.Group>
                <Form.Label>Password</Form.Label>
                <Form.Control 
                  type="password"
                  name="password"
                  placeholder="Enter a Strong Password"
                  onChange={this.handleChange}
                  isInvalid={!this.state.passwordValid}
                />
                <Form.Control.Feedback type="invalid">{this.errorMsg}</Form.Control.Feedback>
                <Form.Text>Make sure the password contains a number, an alphabet, a special character and must be  <br/>atleast 8 digits long.</Form.Text>
              </Form.Group>
              {this.state.error && <p>{this.error}</p>}
              <div id="button-div" className='d-flex justify-content-center'>
                <Button 
                  variant="danger"
                  type="submit"
                >
                  Sign Up
                </Button>
              </div>
            </Form>
            <div id='known-user' className="d-flex justify-content-center">
              <p>Already have an account? </p>
              <Button variant='link' size='md'><Link to='/'> Sign In </Link></Button>
            </div>
          </div>
        </Container>
      </div>
    )
  }
}

export default connect(null, mapDispatchToProps)(SignUpPage);