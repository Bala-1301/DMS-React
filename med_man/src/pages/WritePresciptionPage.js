import React from 'react';
import {connect} from 'react-redux';
import {Container, Form, Button, Table, Row, Col, Modal} from 'react-bootstrap';
import {MdEdit, MdDelete} from 'react-icons/md';
import {pdf} from '@react-pdf/renderer';

import {uploadPDF} from '../api';
import { mapStateToProps } from '../mapProps';
import MyNav from '../MyNav';
import {PatientRecord} from '../RecordPDFConverter';
import {MySpinner} from '../Spinner';
import '../styles/writePrescriptionPage.css'
import '../styles/page.css'

class WritePrescriptionPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: null,
      medicine: '',
      days: '-',
      morning: false,
      afternoon: false,
      evening: false,
      night: false,
      showOverlay: false,
      showSpinner: false,
    };
    this.baseState = this.state;
    this.rows = [];
    this.id = 1;
    this.treatedFor = '';
    this.history = props.history;
    this.patientPhone = this.props.patientState.patientPhone;
  }
  

  handleChange = (event) => {
    let name = event.target.name;
    let value = event.target.value;
    this.setState({
      [name]: value
    })
  }

  handleCheck = (event) => {
    let name = event.target.name;
    this.setState(prevState => {
      return {
        [name]: !prevState.name
      }
    })
  }

  handleAdd = () => {
    if(this.state.medicine !== ''){
      this.setState({
        id: this.id
      }, () => {
          this.rows = [...this.rows, this.state];
          this.setState(this.baseState)
          this.id++;
      })
    }
  }

  handleFinalSubmit = async (event) => {
    event.preventDefault();
    console.log("in final submit")
    this.setState({
      showSpinner: true
    })
    var recordPDF =  PatientRecord(this.rows);
    const blob = await pdf(recordPDF).toBlob();
    const response = await uploadPDF(this.props.userState.userToken, this.patientPhone, this.treatedFor, blob);
  
    if(response.valid) {
      this.history.replace('/treat')
    } else {
      this.setState({
        showOverlay: false,
        showSpinner: false,
      });
      alert(response.detail);
    }

  }

  handleSubmit = async () => {
    this.setState({
      showOverlay: true,
    })
  }
  
  handleEdit = (id) => {
    this.setState(this.rows.find(item => {
      return item.id === id
    }));
    this.rows = this.rows.filter(item => {
      return item.id !== id
    });
    console.log(this.rows)
  };

  handleDelete = (id) => {
    console.log("delete")
    this.rows = this.rows.filter(item => {
      return item.id !== id
    });
    this.setState(prevState => {
      return {prevState}
    });
  };

  render() {
    return (
      <div>
        <MyNav showNav={true} id="write-prescription" history={this.history}/>
        {this.state.showSpinner && <MySpinner />}
        <Modal
          show={this.state.showOverlay}
          centered
        >
          <Modal.Header>
            <Modal.Title id="contained-modal-title-vcenter">
              Name of the Record
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={this.handleFinalSubmit}>
              <Form.Group>
                <Form.Label>Treated For?</Form.Label>
                <Form.Control 
                  type='text'
                  onChange={(event) => {
                    this.treatedFor = event.target.value; 
                  }}
                  placeholder="What was the patient treated for?" 
                />
              </Form.Group>
              <div className='d-flex justify-content-center'>
                <Button
                  name="add"
                  type="submit"
                  className="my-button"
                  variant="danger"
                  
                >
                  Submit
                </Button>
              </div>
            </Form>
          </Modal.Body>
          
          
        </Modal>
        <Row ref={this.overlayTarget}>
          <Col sm={6}>
            <Container className="d-flex justify-content-center" >
              <Form className="shadow-box" id="my-container">
                <Form.Group>
                  <Form.Label>Medicine Name</Form.Label>
                  <Form.Control
                    value={this.state.medicine}
                    name="medicine" 
                    type="text"
                    placeholder="Medicine name"
                    onChange={this.handleChange}
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label>Days</Form.Label>
                  <Form.Control
                    value={this.state.days}
                    name="days" 
                    type="number"
                    placeholder="Number of days"
                    onChange={this.handleChange}
                  />
                </Form.Group>
                <Form.Group 
                  className="d-flex justify-content-between" 
                  name="morning" 
                  onClick={() => {
                    this.setState(prevState => {
                      return {
                        morning: !prevState.morning
                      }
                    })
                  }}
                >
                  <Form.Label>Morning</Form.Label>
                  <Form.Check
                    name="morning" 
                    type="checkbox"
                    className="my-check"
                    onChange={this.handleCheck}
                    checked={this.state.morning}
                  />
                </Form.Group>
                <hr/>
                <Form.Group 
                  className="d-flex justify-content-between" 
                  name="afternoon" 
                  onClick={() => {
                    this.setState(prevState => {
                      return {
                        afternoon: !prevState.afternoon
                      }
                    })
                  }}
                >
                  <Form.Label>Afternoon</Form.Label>
                  <Form.Check
                    name="afternoon" 
                    type="checkbox"
                    onChange={this.handleCheck}
                    checked={this.state.afternoon}
                  />
                </Form.Group>
                <hr/>
                <Form.Group 
                  className="d-flex justify-content-between" 
                  name="evening" 
                  onClick={() => {
                    this.setState(prevState => {
                      return {
                        evening: !prevState.evening
                      }
                    })
                  }}
                >
                  <Form.Label>Evening</Form.Label>
                  <Form.Check
                    name="evening" 
                    type="checkbox"
                    onChange={this.handleCheck}
                    checked={this.state.evening}
                  />
                </Form.Group>
                <hr/>
                <Form.Group 
                  className="d-flex justify-content-between" 
                  name="night" 
                  onClick={() => {
                    this.setState(prevState => {
                      return {
                        night: !prevState.night
                      }
                    })
                  }}
                >
                  <Form.Label>Night</Form.Label>
                  <Form.Check
                    name="night" 
                    type="checkbox"
                    onChange={this.handleCheck}
                    checked={this.state.night}
                  />
                </Form.Group>
                <div className="d-flex justify-content-center">
                  <Button
                    name="add"
                    className="my-button"
                    variant="danger"
                    onClick={this.handleAdd}
                  >
                    Add
                  </Button>
                </div>
              </Form>   
            </Container>
          </Col>
         
          <Col>
            <Container>
              <Table responsive>
                <thead>
                  <tr>
                    <th>Medicine</th>
                    <th>Days</th>
                    <th>Morning</th>
                    <th>Afternoon</th>
                    <th>Evening</th>
                    <th>Night</th>
                  </tr>
                </thead>
                {this.rows.length !== 0 &&
                  <tbody>
                    
                    {this.rows.map((item) => {
                      return (
                        <tr key={item.id}>
                          <td>{item.medicine}</td>
                          <td>{item.days}</td>
                          <td>{item.morning? "Yes" : "-"}</td>
                          <td>{item.afternoon? "Yes" : "-"}</td>
                          <td>{item.evening? "Yes" : "-"}</td>
                          <td>{item.night? "Yes" : "-"}</td>
                          <td title="Edit"><MdEdit onClick={() => this.handleEdit(item.id)} size={20}/></td>
                          <td><MdDelete onClick={() => this.handleDelete(item.id)} size={20}/></td>
                        </tr>
                      )
                    })}
                  </tbody>
                }
              </Table>
              {this.rows.length !== 0 &&
                <div className="d-flex justify-content-center">
                  <Button
                        name="submit" 
                        className="my-button"
                        variant="danger"
                        onClick={this.handleSubmit}
                      >
                        Submit
                  </Button>
                </div>
              }
            </Container>
          </Col>
        
        </Row>
      </div>
    )
  }
}


export default connect(mapStateToProps)(WritePrescriptionPage);