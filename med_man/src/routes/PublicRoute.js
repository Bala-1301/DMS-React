import React from 'react';
import {connect} from 'react-redux';
import {Redirect, Route} from 'react-router-dom';

import {mapStateToProps} from '../mapProps';

function PublicRoute({ component:Component, userState, ...rest }) {
  console.log("Public route")
  return (
    <Route
      {...rest}
      render={props => 
        !userState.isLoggedIn ?
        (
          <Component {...props} /> 
        )
        : (
          <Redirect
            to={{
              pathname: "/home",
              state: { from: props.location }
            }}
          />
        )
      }
    />
  );
}



export default connect(mapStateToProps)(PublicRoute);