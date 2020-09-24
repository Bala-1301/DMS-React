import React, { useState, useEffect } from 'react';
import {connect} from 'react-redux';

import {fetchAttendingHistory} from '../api';
import { MySpinner } from '../Spinner';
import { mapStateToProps } from '../mapProps';
import { Container, ListGroup } from 'react-bootstrap';

function HistoryPage(props) {
  const [showSpinner, setShowSpinner] = useState(true);
  const [history,setHistory] = useState([]);

  useEffect(() => {
    getAttendingHistory();
  }, [])

  const getAttendingHistory = async () => {
    const response = await fetchAttendingHistory(props.userState.userToken);
    const resp = await response.json();
    if(response.status === 200) {
      setHistory(resp.reverse());
      setShowSpinner(false);
    } else {
      setShowSpinner(false);
      alert(resp.detail);
    }
  }

  if(showSpinner) {
    return(
      <MySpinner />
    )
  }
  return (
    <div>
      {history.length !== 0 ? 
        <ListGroup>
          {history.map((item) => (
            <ListGroup.Item key={item.id}>
              
            </ListGroup.Item>
          ))}
        </ListGroup>
      : 
        <div>
          <p>No attending history</p>
        </div> 
      } 
    </div>
  )
}

export default connect(mapStateToProps)(HistoryPage);