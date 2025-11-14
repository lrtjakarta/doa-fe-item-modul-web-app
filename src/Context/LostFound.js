import API from 'Services/Api';
import React, { createContext, useCallback, useState } from 'react';

export const LostFoundContext = createContext({});

export default function LostFoundProvider(props) {
	const [dataLostFound, setDataLostFound] = useState([]);
	const [lostFoundById, setLostFoundById] = useState(null);
	const [lostFoundExpired, setLostFoundExpired] = useState([]);
	const [allLostFound, setAllLostFound] = useState([]);

	// for pagination
	const [count, setTotalCount] = useState(0); // use for non table pagination
	const [numRow, setNumRow] = useState(0); // use for table pagination

	const getDataLostFound = async params => {
		await API.getLostFound({ params: params })
			.then(res => {
				if (res.data.length > 0) {
					setDataLostFound(res.data);
				}
			})
			.catch(err => console.log('error', err));
	};

	const getDataLostFoundById = async _id => {
		await API.getLostFoundById(_id)
			.then(res => {
				setLostFoundById(res.data);
			})
			.catch(err => console.log('error', err));
	};

	const getLostFoundExpired = async params => {
		await API.getLostFoundExpired({ params: params })
			.then(res => {
				if (res.data.length > 0) {
					setLostFoundExpired(res.data);
				}
			})
			.catch(err => console.log('error', err));
	};

	const getAllLostFound = async params => {
		await API.getLostFoundAll({ params: params })
			.then(res => {
				const { data, totalItems, totalCount } = res.data;
				setAllLostFound(data);
				setTotalCount(totalItems);
				setNumRow(totalCount);
			})
			.catch(err => console.log('error', err));
	};

	return (
		<LostFoundContext.Provider
			value={{
				dataLostFound,
				setDataLostFound,
				lostFoundById,
				setLostFoundById,
				lostFoundExpired,
				allLostFound,
				count,
				setTotalCount,
				numRow,
				setNumRow,
				getDataLostFound,
				getDataLostFoundById,
				getLostFoundExpired,
				getAllLostFound,
			}}
			{...props}
		/>
	);
}
