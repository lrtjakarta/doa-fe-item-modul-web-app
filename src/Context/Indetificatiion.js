import API from 'Services/Api';
import React, { createContext, useState } from 'react';

export const IdentificationContext = createContext({});

export default function IdentificationProvider(props) {
	const [dataIdentification, setDataIdentification] = useState([]);
	const [identificationById, setIdentificationById] = useState(null);

	const getDataIdentification = async () => {
		await API.getIdentification()
			.then(res => {
				setDataIdentification(res.data);
			})
			.catch(err => console.log('error', err));
	};

	const getDataIdentificationById = async _id => {
		await API.getIdentificationById(_id)
			.then(res => {
				setIdentificationById(res.data);
			})
			.catch(err => console.log('error', err));
	};

	return (
		<IdentificationContext.Provider
			value={{
				dataIdentification,
				getDataIdentification,
				identificationById,
				getDataIdentificationById,
			}}
			{...props}
		/>
	);
}
