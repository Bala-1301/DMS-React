const axios = require('axios')

const API_URL = "http://127.0.0.1:8000"

export const login = async (phone, password) => {
	try {
		const response = await fetch(API_URL+"/login", {
			method: 'POST',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				'phone' : phone,
				'password': password
			})
		});
		var resp =  await response.json();
		if (response.status === 200) {
			resp.valid = true;
			return resp;
		} else {
			resp.valid = false;
			return resp;
		}
		
	} catch(err){
		console.log(err);
	}
}

export const signUpRequest = async (user) => {
	console.log("in sign up")
	try {
		const response = await fetch(API_URL+"/verify-user", {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				phone: user.phone,
				email: user.email,
				licence_no: user.licence_no,
				user_type: 'Doctor'
			}),
		});
		var resp = await response.json();
		console.log(resp)
		if(response.status === 200) {
			resp.valid = true;
			return resp;
		} else {
			resp.valid = false;
			return resp;
		}
	} catch(err) {
		console.log(err);
	}
}

export const signUp = async (user) => {
	try {
		const response = await fetch(API_URL+"/create-user", {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				phone: user.phone,
				email: user.email,
				licence_no: user.licence_no,
				user_type: 'Doctor',
				OTP: user.OTP,
				name: user.name,
				gender: user.gender,
				password: user.password,
			}),
		});
		var resp = await response.json();
		console.log(resp)
		if(response.status === 200) {
			resp.valid = true;
			return resp;
		} else {
			resp.valid = false;
			return resp;
		}
	} catch(err) {
		console.log(err);
	}
}

export const requestAccess = async (token, patientPhone) => {
	try{
		const response = await fetch(API_URL+"/request-access", {
			method: 'POST',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
				"Authorization": 	`Token ${token}`,
			},
			body: JSON.stringify({
				patient_phone: patientPhone,
			})
		});
		var resp = await response.json();
		if(response.status === 200) {
			resp.valid = true;
			return resp;
		} else {
			resp.valid = false;
			return resp;	
		}
	} catch(err) {
		console.error(err);
		return false;
	}
}

export const verifyAccess = async (token, patientPhone, OTP) => {
	try {
		const response = await fetch(API_URL+"/verify-access-otp", {
			method: 'POST',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
				"Authorization": "Token "+token,
			},
			body: JSON.stringify({
				patient_phone: patientPhone,
				OTP: OTP,
			})
		});
		var resp = await response.json();
		if(response.status === 200) {
			resp.valid = true;
			return resp;
		} else {
			resp.valid = false;
			return resp;
		}
	} catch(err) {
		console.error(err);
		return false;
	}
}

export const getRecords = async (token, patientPhone) => {
	try {
		const response = await fetch(API_URL+"/get-record/"+patientPhone, {
			method: 'GET',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
				'Authorization': "Token "+token,
			}
		});
		return response;

	} catch(err) {
		console.error(err);
	}
}

export const fetchPDF = async (token, path) => {
	try {
		const response = await fetch(API_URL+"/fetch-record/"+path.split('//')[1], {
			method: 'GET',
			headers: {
				'Authorization': 'Token '+token,
			},
		});
		const resp = await response.blob();
		if(response.status === 200) {
			return resp;
		} else {
			return false;
		}
		
	} catch(err) {
		console.log(err)
	}
}


export const uploadPDF = async (token, patientPhone, recordName, pdf) => {
	try {
		var pdffile = new File([pdf], "testpdf.pdf", {type: "application/pdf"});
		var formData = new FormData();
		formData.append('file', pdffile);

		const response = await axios.put(API_URL+`/upload-record/${patientPhone}/${recordName}.pdf`, formData, {
			headers: {
				'Authorization' : 'Token '+token,
				'Content-Type': 'multipart/formdata'
			}
		})
			
		var resp = await response.data;
		if(response.status === 200) {
			resp.valid = true;
			return resp;
		} else {
			resp.valid = false;
			return resp;
		}
	
	} catch(err) {
		console.log(err);
	}
}

export const fetchPatientInfo = async (token, patientPhone) => {
	try {
		const response = await fetch(API_URL+'/patient-details/'+patientPhone, {
			method: 'GET',
			headers: {
				'Authorization' : "Token "+token,
			}
		});
		var resp = await response.json();
		if(response.status === 200) {
			resp.valid = true;
			return resp;
		} else {
			resp.valid = false;
			return resp;
		}
	} catch(err) {
		console.log(err);
	}
}

export const updateInfo = async (token, patientPhone, patientInfo) => {
	try{
		const response = await fetch(API_URL+'/patient-details', {
			method: 'PUT',
			headers: {
				'Authorization' : 'Token '+token,
				'Content-Type' : 'application/json'
			},
			body: JSON.stringify({
				patient_phone: patientPhone,
				age: patientInfo.age,
				height: patientInfo.height,
				weight: patientInfo.weight,
				bmi: patientInfo.bmi,
				blood_group: patientInfo.blood_group,
				blood_pressure: patientInfo.blood_pressure,
				setbacks: patientInfo.setbacks,
			}),
		});
		var resp = await response.json();
		console.log(resp)
		if(response.status === 200) {
			resp.valid = true;
			return resp;
		} else {
			resp.valid = false;
			return resp;
		}
	} catch(err) {
		console.log(err)
	}
}

export const fetchAttendingHistory = async (token) => {
	try {
		const response = await fetch(API_URL+"/get-history", {
			method: 'GET',
			headers: {
				'Authorization' : 'Token '+token,
			}
		});
		return response;

	} catch(err) {
		console.log(err)
	}
}

export const logout = async (token) => {
	return true;
	try {
		const response =  await fetch(API_URL+'/logout', {
			method: 'GET',
			headers: {
				'Authorization' : 'Token '+token,
			},
		});
		if(response.status === 200) {
			return true;
		} else {
			return false;
		}
	} catch(err) {
		console.log(err);
	}
}