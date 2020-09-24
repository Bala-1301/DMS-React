//actions

export const LOGIN = 'LOGIN';
export const LOGOUT = 'LOGOUT';
export const SET_PATIENT_PHONE = 'SET_PATIENT_PHONE';
export const REMOVE_PATIENT_PHONE = 'REMOVE_PATIENT_PHONE';

//action creators
export const loginUser = (userInfo) => ({
  type: LOGIN,
  userInfo: userInfo,
});

export const setPatientPhone = (patientPhone) => ({
  type: SET_PATIENT_PHONE,
  payload: patientPhone,
});

export const removePatientPhone = () => ({
  type: REMOVE_PATIENT_PHONE,
})

export const logoutUser = () => ({
  type: LOGOUT,
});

