import React from 'react';
import {connect} from 'react-redux';
import {Redirect, Route} from 'react-router-dom';

import {mapStateToProps} from '../mapProps';

function PrivateRoute({ component:Component, userState, ...rest }) {
  
  return (
    <Route
      {...rest}
      render={props => 
        userState.isLoggedIn ?
        (
          <Component {...props} /> 
        )
        : (
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



export default connect(mapStateToProps)(PrivateRoute)