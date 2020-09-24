import React from 'react';
import {Container, Row, Col} from 'react-bootstrap';
import {Link} from 'react-router-dom';

import MyNav from '../MyNav';
import '../styles/page.css';

export default function TreatPatientPage(props) {
  
  return (
    <div>
			<MyNav history={props.history}/>
			<Container id="container">
				<Row>
					<Col className="optionContainer d-flex justify-content-center" >
            <Link to="/write-prescription" className="options shadow-box">
                Write Prescription
            </Link>
					</Col>
					<Col className="optionContainer d-flex justify-content-center" >
            <Link to="/patient-records" className="options shadow-box">
                Show Records
            </Link>
					</Col>
          <Col className="optionContainer d-flex justify-content-center">
            <Link to="/medical-info" className="options shadow-box">
                Medical Info
            </Link>
					</Col>
				</Row>
			</Container>
		</div>
  )
    
}


