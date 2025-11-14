import API from 'Services/Api';
import React, { createContext, useCallback, useState } from 'react';

export const UserProfilContext = createContext({});

export default function UserProfilProvider(props) {
	const [userProfilById, setuserProfilById] = useState(null);
	const [userWorkorder, setUserWorkorder] = useState(null);
	const [profilOfficer, setProfilOfficer] = useState([]);
	const [userProfile, setUserProfile] = useState(null);

	const getUserProfilById = async (_id, params) => {
		await API.getProfileUser(_id, { params: params })
			.then(res => {
				const _user = res.data.profile;
				const _workOrder = res.data.workOrder;

				const officer = {
					officerId: _user?._id,
					officerName: _user?.name,
					officerPosition: _user?.jobPosition?.name,
					officerDepartemen: _user?.departement?.name,
					officerStart: _workOrder?.workOrder?.start,
					officerEnd: _workOrder?.workOrder?.end,
					officerCode: _workOrder?.workOrder?.code,
					officerShift: _workOrder?.workOrder?.shift,
				};
				setUserProfile(officer);
				setuserProfilById(res.data.profile);
				setUserWorkorder(res.data.workOrder);
				// console.log('data context user', res.data)
			})
			.catch(err => console.log('error', err));
	};

	const getAllOfficer = async params => {
		await API.getProfileOfficer({ params: params })
			.then(res => {
				setProfilOfficer(res.data.data);
				// console.log('data context user', res.data)
			})
			.catch(err => console.log('error', err));
	};

	return (
		<UserProfilContext.Provider
			value={{
				userProfilById,
				setuserProfilById,
				userWorkorder,
				userProfile,
				getUserProfilById,
				profilOfficer,
				getAllOfficer,
			}}
			{...props}
		/>
	);
}
