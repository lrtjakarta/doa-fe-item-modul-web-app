import API from 'Services/Api';
import React, { createContext, useState } from 'react';

export const DashboardContext = createContext({});

export default function DashboardProvider(props) {
	const [dataDashboard, setDataDashboard] = useState(null);
	const [countLostFound, setCountLostFound] = useState([]);
	const [countComplaint, setCountComplaint] = useState([]);
	const [countCombinasi, setCountCombinasi] = useState([]);
	const [countLostFoundExpired, setCountLostFoundExpired] = useState(null);

	const getDataDashboard = async () => {
		await API.getDashboard()
			.then(res => {
				setDataDashboard(res.data);
			})
			.catch(err => console.log('error', err));
	};

	const getLostFoundCount = async params => {
		await API.getCountLostFound({ params: params })
			.then(res => {
				setCountLostFound(res.data);
			})
			.catch(err => console.log('error', err));
	};

	const getComplaintCount = async params => {
		await API.getCountComplaint({ params: params })
			.then(res => {
				setCountComplaint(res.data);
			})
			.catch(err => console.log('error', err));
	};

	const getCombinasiCount = async params => {
		await API.getCountCombinasi({ params: params })
			.then(res => {
				setCountCombinasi(res.data);
			})
			.catch(err => console.log('error', err));
	};

	const getDataLostFoundExpired = async date => {
		try {
			const res = await API.getCountLostFoundExpired({ date });
			setCountLostFoundExpired(res.data);
		} catch (err) {
			console.log('error', err);
		}
	};
	return (
		<DashboardContext.Provider
			value={{
				dataDashboard,
				countLostFound,
				countComplaint,
				countCombinasi,
				countLostFoundExpired,
				getDataDashboard,
				getLostFoundCount,
				getComplaintCount,
				getCombinasiCount,
				getDataLostFoundExpired,
			}}
			{...props}
		/>
	);
}
