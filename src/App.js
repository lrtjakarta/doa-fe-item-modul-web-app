import React, { useEffect, useContext } from 'react';
// import { Routes, Route } from 'react-router-dom';

import Routes from 'Routes';
import useQuery from 'Utils/QueryParams';
import { jwtDecode } from 'jwt-decode';

import { UserProfilContext } from 'Context/UserProfile';
import { DashboardContext } from 'Context/Dahsboard';

export default function App() {
	const query = useQuery();

	const { getUserProfilById, userProfilById, setuserProfilById } =
		useContext(UserProfilContext);
	const { getDataDashboard } = useContext(DashboardContext);

	const accessToken = query.get('accessToken');
	const refreshToken = query.get('refreshToken');

	useEffect(() => {
		const setToken = () => {
			if (accessToken && refreshToken) {
				localStorage.setItem('access_token', accessToken);
				localStorage.setItem('refresh_token', refreshToken);
			}
		};
		// console.log('akses token di app', accessToken)

		setToken();
	}, [accessToken, refreshToken]);

	useEffect(() => {
		if (accessToken) {
			const decodedToken = jwtDecode(accessToken);
			const id = decodedToken.id;
			// console.log('data user', id);

			getUserProfilById(id, { date: new Date() });
			getDataDashboard();
		}
	}, [accessToken]);

	// console.log('user get app', userProfilById);

	return <Routes />;
}
