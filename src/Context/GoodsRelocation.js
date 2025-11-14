import API from 'Services/Api';
import React, { createContext, useCallback, useState } from 'react';

export const GoodsRelocationContext = createContext({});

export default function GoodsRelocationProvider(props) {
	const [dataGoodsRelocation, setDataGoodsRelocation] = useState([]);
	const [goodsRelocationById, setGoodsRelocationById] = useState(null);

	const getDataGoodsRelocation = async params => {
		await API.getGoodsRelocation({ params: params })
			.then(res => {
				setDataGoodsRelocation(res.data);
			})
			.catch(err => console.log('error', err));
	};

	const getDataGoodsRelocationById = async _id => {
		await API.getGoodsRelocationById(_id)
			.then(res => {
				setGoodsRelocationById(res.data);
			})
			.catch(err => console.log('error', err));
	};

	return (
		<GoodsRelocationContext.Provider
			value={{
				dataGoodsRelocation,
				getDataGoodsRelocation,
				goodsRelocationById,
				getDataGoodsRelocationById,
			}}
			{...props}
		/>
	);
}
