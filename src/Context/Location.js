import API from 'Services/Api';
import React, { createContext, useState } from 'react';

export const LocationContext = createContext({});

export default function LocationProvider(props) {
	const [dataLocation, setDataLocation] = useState([]);
	const [locationById, setLocationById] = useState(null);

	const getDataLocation = async (params) => {
		await API.getLocation({ params: params })
			.then(res => {
				setDataLocation(res.data);
			})
			.catch(err => console.log('error', err));
	};

	const getDataLocationById = async _id => {
		await API.getLocationById(_id)
			.then(res => {
				setLocationById(res.data);
			})
			.catch(err => console.log('error', err));
	};

	return (
		<LocationContext.Provider
			value={{
				dataLocation,
				getDataLocation,
				locationById,
				getDataLocationById,
			}}
			{...props}
		/>
	);
}
