import {combineReducers} from 'redux';

import {LOGIN, SET_PATIENT_PHONE, REMOVE_PATIENT_PHONE, LOGOUT} from './actions';

const USER_INIT_STATE = {
  isLoggedIn: false,
  userName: '',
  userPhone: '',
  userEmail: '',
  userToken: '',
  userLicence: '',
};

const userStateReducer = (
  state = USER_INIT_STATE,
  action,
) => {
  switch (action.type) {
    case LOGIN:
     	state.userPhone = action.userInfo.user.phone;
			state.userEmail = action.userInfo.user.email;
      state.userName = action.userInfo.user.name;
			state.userToken = action.userInfo.token;
			state.userLicence = action.userInfo.user.licence_no;
      state.isLoggedIn = true;
      return {...state};
    
    case LOGOUT:
      state = USER_INIT_STATE;
      return {...state};

    default:
      return state;
  }
};

const PATIENT_INIT_STATE = {
  patientPhone: null,
  hasPatient: false, 
}

const patientStateReducer = (
  state = PATIENT_INIT_STATE,
  action
) => {
  switch(action.type) {
    case SET_PATIENT_PHONE:
      state.patientPhone = action.payload;
      state.hasPatient = true;
      return {...state};
    
    case REMOVE_PATIENT_PHONE:
      state = PATIENT_INIT_STATE;
      return {...state};

    default:
      return state;
  }
}

const reducer = combineReducers({
  userState: userStateReducer,
  patientState: patientStateReducer,
});

export default reducer;
