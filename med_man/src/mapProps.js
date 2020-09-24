import {loginUser, setPatientPhone, removePatientPhone, logoutUser} from './redux/actions';

export const mapStateToProps = (state) => {
  return {
    userState: state.userState,
    patientState: state.patientState,
  }
} 

export const mapDispatchToProps = (dispatch) => {
  return {
    loginUser : (userInfo) => {
      dispatch(loginUser(userInfo))
    },
    setPatientPhone : (patientPhone) => {
      dispatch(setPatientPhone(patientPhone))
    },
    removePatientPhone : () => {
      dispatch(removePatientPhone())
    },
    logoutUser : () => {
      dispatch(logoutUser())
    }
  }
}