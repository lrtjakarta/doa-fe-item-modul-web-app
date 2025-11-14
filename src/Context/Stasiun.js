import API from 'Services/Api';
import React, { createContext, useCallback, useState } from 'react';

export const StasiunContext = createContext({});

export default function StasiunProvider(props) {
	const [dataStasiun, setDataStasiun] = useState([]);

	const getAllStasiun = async params => {
		await API.getStasiun({ params: params })
			.then(res => {
				setDataStasiun(res.data);
			})
			.catch(err => console.log('error', err));
	};

	return (
		<StasiunContext.Provider
			value={{
				dataStasiun,
				getAllStasiun,
			}}
			{...props}
		/>
	);
}
