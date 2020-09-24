import React from "react";
import {Link, Switch} from 'react-router-dom';

import PatientPrivateRoute from './routes/PatientPrivateRoute';
import PrivateRoute from './routes/PrivateRoute';
import PublicRoute from './routes/PublicRoute';
import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage';
import TreatPatientPage from './pages/TreatPatientPage';
import HistoryPage from './pages/HistoryPage';
import SignUpPage from './pages/SignUpPage';
import PhoneVerificationPage from './pages/PhoneVerificationPage';
import ShowRecordsPage from './pages/ShowRecordsPage';
import WritePrescriptionPage from './pages/WritePresciptionPage';
import MedicalInfoPage from './pages/MedicalInfoPage';

export default function App() {
	return (
		<div>
			<Link to='/home' />
			<Switch>
				<PrivateRoute path='/home' component={HomePage} />
				<PrivateRoute path='/verify' component={PhoneVerificationPage} />
				<PatientPrivateRoute path='/treat' component={TreatPatientPage} />
				<PrivateRoute path='/history' component={HistoryPage} />
				<PatientPrivateRoute path='/patient-records' component={ShowRecordsPage} />
				<PatientPrivateRoute path='/write-prescription' component={WritePrescriptionPage} />
				<PatientPrivateRoute path='/medical-info' component={MedicalInfoPage} />
				<PublicRoute path='/sign-up' component={SignUpPage} />
				<PublicRoute path='/' exact component={LoginPage} />
			</Switch>
		</div>
	)
}

