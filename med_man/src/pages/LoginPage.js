import React, {useState} from 'react';
import {Container, Form, FormControl, Row, Col, Spinner, Button, InputGroup} from 'react-bootstrap';
import {connect} from 'react-redux';
import {BsEyeFill, BsEyeSlashFill} from 'react-icons/bs'
import {Link} from 'react-router-dom';

import '../styles/loginPage.css'
import '../styles/page.css'
import {login} from '../api';
import {mapStateToProps, mapDispatchToProps} from '../mapProps';

function LoginPage(props) {
	const [phone, setPhone] = useState('');
	const [password, setPassword] = useState('');
	const [phoneError, setPhoneError] = useState('');
	const [passError, setPassError] = useState('');
	const [phoneValid, setPhoneValid] = useState(true);
	const [passValid, setPassValid] = useState(true);
	const [errorText, setErrorText] = useState('');
	const [showActivity, setShowActivity] = useState(false);
	const [showPass, setShowPass] = useState(false);

	let history = props.history
	
	const validate = () => {
		const phoneReg = new RegExp('^[6-9]{1}[0-9]{9}$')
    if(!phoneReg.test(phone)){
			console.log("failed")
			setPhoneValid(false)
			setPhoneError("Invalid Phone Number")
			return false;
		} else if(password.length === 0){
			setPassValid(false)
			setPassError("Can't be empty")
			return false;
		}
		return true;
	} 

	const handleSubmit = async (event) => {
		event.preventDefault();
		if (validate()) {
			setShowActivity(true);
			const resp = await login(phone, password)
			console.log(resp)
			setShowActivity(false)
			if (resp.valid){
				if(resp.user.user_type === "Patient"){
					setPhoneError("Doctor does not exist.")
					setPhoneValid(false)
				} else {
					props.loginUser(resp);
					console.log(props.userState)
					history.replace("/home");
				}
			} else {
				console.log(resp)
				if (!('code' in resp)) {
					setErrorText(resp.detail[0])
				} else if (resp.code[0] === "400") {
					setPhoneError(resp.detail[0]);
					setPhoneValid(false);
				} else if(resp.code[0] === "406") {
					setPassError(resp.detail[0]);
					setPassValid(false);
				} 
			}

		}
	}
	

	
	return (
		<div id='bg-login'>
			<Container className='fixed-bottom mb-md-5 '>
				<Row id="main-row">
					<Col md={{span: 5, offset: 7}}>
						<Container className="shadow-box p-md-5 ">
							<h2>Doctor's Login</h2> 
							<Form onSubmit={handleSubmit}>
								<Form.Group controlId="formGroupPhone">
									<Form.Label>Phone</Form.Label>
									<FormControl 
										type="tel" 
										placeholder="Enter Phone" 
										onChange={(event) => {setPhone(event.target.value); setPhoneValid(true)}}
										maxLength={10}
										isInvalid={!phoneValid}
										autoFocus={true}
									/>
									<Form.Control.Feedback type='invalid'>{phoneError}</Form.Control.Feedback>
								</Form.Group>
								<label>Password</label>
								<InputGroup className="mb-3">
											<Form.Control 
												type={showPass?"text":"password"} 
												placeholder="Password" 
												onChange={(event) => {setPassword(event.target.value); setPassValid(true)}}	
												isInvalid={!passValid}
											/>
											<Form.Control.Feedback type='invalid'>{passError}</Form.Control.Feedback>
											<InputGroup.Append>
												<InputGroup.Text>
												{showPass ?  
													<BsEyeFill onClick={() => setShowPass(!showPass)}/> :
													<BsEyeSlashFill onClick={() => setShowPass(!showPass)} />
												}
												</InputGroup.Text>
											</InputGroup.Append>
								</InputGroup>

								<Form.Group>
									<Button type='submit'>
									{showActivity ? <Spinner
										as="span"
										animation="border"
										size="sm"
										role="status"
										aria-hidden="true"
									/> : "Login"}
										
									</Button>
								</Form.Group>
							</Form>
							<p>{errorText}</p>
							<div id='new-user'>
								<p>Don't Have an Account? </p>
								<Button variant='link' size='md'><Link to='/sign-up'>Sign Up</Link></Button>
							</div>
						</Container>
					</Col>
				</Row>
			</Container>
		</div>
	)
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage)
