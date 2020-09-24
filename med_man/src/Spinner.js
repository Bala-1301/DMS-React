import React from 'react';
import {Modal, Spinner} from 'react-bootstrap';

export const MySpinner = () => (
  <Modal centered show={true} className="d-flex justify-content-center" animation={false}>
    <Modal.Body>
      <Spinner animation="border"/>
    </Modal.Body>
  </Modal>
)
