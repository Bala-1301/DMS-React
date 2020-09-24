import React, {useState, useEffect} from 'react';
import {Container, ListGroup, Row, Col} from 'react-bootstrap';
import {connect} from 'react-redux';
import {GrDocumentPdf} from 'react-icons/gr';
import {Document, Page, pdfjs} from 'react-pdf';

import {MySpinner} from '../Spinner';
import {getRecords, fetchPDF} from '../api';
import { mapStateToProps } from '../mapProps';
import '../styles/showRecordsPage.css'
import MyNav from '../MyNav';

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

function ShowRecordsPage(props) {
  const [records, setRecords] = useState([]);
  const [current, setCurrent] = useState({});
  const [PDF,setPDF] = useState(null)
  const [showSpinner, setShowSpinner] = useState(true);
  let patientPhone = props.patientState.patientPhone;
  

  useEffect(() => {
    getPatientRecords();
  }, []);

  const getPatientRecords = async () => {
    try {
      const response = await getRecords(props.userState.userToken, patientPhone);
      const resp = await response.json()
      console.log(resp)
      if(response.status === 200) {
        setRecords(resp.reverse())
        setShowSpinner(false);
      } else {
          alert(resp.detail);
      }
    } catch(err) {
      console.log(err);
    }
  }

  const handleClick = async (record) => {
    console.log(record);
    setCurrent(record);
    const response = await fetchPDF(props.userState.userToken, record.record);
    if(response) {
      setPDF(response);
    } else {

    }  
  }

  if (showSpinner){
    return(
      <MySpinner />
    )
  }
  return (
    <div>
    <MyNav showNav={true} id="show-records" history={props.history}/>

    {records.length ? 
      <Container className="" id="list">
        <Row>
          <Col md={3}>
            <ListGroup>
              {records.map((record) => (
                <ListGroup.Item key={record.id} className="record-list" onClick={() => handleClick(record)}>
                  <Row>
                    <Col md={3}>
                      <div className="icon">
                        <GrDocumentPdf size={50} />
                      </div>
                    </Col>
                    <Col>
                      <div>
                        <p id="record-name">{record.record_name.charAt(0).toUpperCase() + record.record_name.slice(1)}</p>
                        <p id="created-at">{record.created_at.split('T')[0] +" "+ record.created_at.split('T')[1].split('.')[0]}</p>
                      </div>
                    </Col>
                  </Row>
                </ListGroup.Item>
              ))}
            </ListGroup>
          </Col>
          <Col>
            {PDF != null ?
              <div>
                <p className="d-flex justify-content-center"><b>Treated By :</b> {current.doctor_id.doctor.name}, {current.doctor_id.hospital}</p>
                <Document file={PDF} className="d-flex justify-content-center">
                    <Page pageNumber={1} />
                </Document>
              </div>
            :
            <div className="d-flex justify-content-center my-align-2">
              <p>Click on a record to see details.</p>
            </div> }
          </Col>
        </Row>
      </Container>
      :
      <div className="d-flex justify-content-center my-align-2">
        <p>No records to display</p>
      </div>
      }
    </div>
  )
}

export default connect(mapStateToProps)(ShowRecordsPage);

