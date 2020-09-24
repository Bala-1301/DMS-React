import React from 'react';
import {connect} from 'react-redux';
import {Redirect, Route} from 'react-router-dom';

import {mapStateToProps} from '../mapProps';

function PatientPrivateRoute({ component:Component, patientState, userState, ...rest }) {
  console.log("PatientState" ,patientState)
  return (
    <Route
      {...rest}
      render={props => 
        userState.isLoggedIn && patientState.patientPhone != null?
        (
          <Component {...props} /> 
        )
        : 
        userState.isLoggedIn ?
        (
          <Redirect
            to={{
              pathname: "/home",
              state: { from: props.location }
            }}
          />
        ) :
        (
          <Redirect 
            to={{
              pathname: "/",
              state: { from: props.location }
            }}
          />
         )
      }
    />
  );
}



export default connect(mapStateToProps)(PatientPrivateRoute)