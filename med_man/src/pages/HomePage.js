import React from 'react';
import {Container, Row, Col} from 'react-bootstrap';
import {Link} from 'react-router-dom';

import '../styles/homePage.css';
import '../styles/page.css';
import MyNav from '../MyNav';

export default function HomePage(props) {
	
	return (
		<div>
			<MyNav history={props.history}/>
			<Container id="container">
				<Row>
					<Col className="optionContainer d-flex justify-content-center" lg={6}>
						<Link to="/verify" className="options shadow-box">Treat Patient</Link>
					</Col>
					<Col className="optionContainer d-flex justify-content-center" lg={6}>
						<Link to="/history" className="options shadow-box">Attending History</Link>
					</Col>
				</Row>
			</Container>
		</div>
	)
} 