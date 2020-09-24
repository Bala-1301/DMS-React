import React, {useEffect} from 'react';
import {Navbar, Nav, NavDropdown} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import {connect} from 'react-redux';

import { mapDispatchToProps, mapStateToProps } from './mapProps';
import { logout } from './api';
import './styles/page.css';

function MyNav(props) {
  
  useEffect(() => {
    if(props.id !== undefined){
      let active = document.getElementById(props.id);
      active.className = "active"
    }
  },[]);

  const handleClick = () => {
    if(props.patientState.hasPatient){
      props.removePatientPhone();
    }
    props.history.replace('/home');
  }

  const handleLogout = async () => {
    const response = await logout(props.userState.userToken);
    if(response) {
      props.removePatientPhone();
      props.logoutUser();
      props.history.replace('/');
    } else {
      alert("Error logging out! Please try again!");
    }
  }

  return (
    <Navbar bg="danger" variant='dark' expand='lg' className="justify-content-between">
      <div className="d-flex">
      <Navbar.Brand href=" " onClick={handleClick}> Logo </Navbar.Brand>
      {props.showNav &&
      
      <Nav className="mr-auto">
        <Nav.Link id="home"><Link to="/treat" className="nav-link"> Home </Link></Nav.Link>
        <Nav.Link id="write-prescription"><Link to="/write-prescription" className="nav-link"> Write Prescription </Link></Nav.Link>
        <Nav.Link id="show-records"><Link to='/patient-records' className="nav-link"> Show Records </Link></Nav.Link>
        <Nav.Link id="medical-info"><Link to="/medical-info" className="nav-link"> Medical Info </Link></Nav.Link>
      </Nav>
      }
      </div>
        <Nav>
          <NavDropdown title="Account" id="account" className="nav-link">
            <NavDropdown.Item> Profile </NavDropdown.Item>
            <NavDropdown.Item onClick={handleLogout}> Logout </NavDropdown.Item>
          </NavDropdown>
        </Nav>
    </Navbar>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(MyNav);