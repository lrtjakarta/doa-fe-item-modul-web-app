import API from 'Services/Api';
import React, { createContext, useCallback, useState } from 'react';

export const GoodsRemoveContext = createContext({});

export default function GoodsRemoveProvider(props) {
	const [dataGoodsRemove, setDataGoodsRemove] = useState([]);
	const [goodsRemoveById, setGoodsRemoveById] = useState(null);

	const getDataGoodsRemove = async params => {
		await API.getGoodsRemove({ params: params })
			.then(res => {
				setDataGoodsRemove(res.data);
			})
			.catch(err => console.log('error', err));
	};

	const getDataGoodsRemoveById = async _id => {
		await API.getGoodsRemoveById(_id)
			.then(res => {
				setGoodsRemoveById(res.data);
			})
			.catch(err => console.log('error', err));
	};

	return (
		<GoodsRemoveContext.Provider
			value={{
				dataGoodsRemove,
				getDataGoodsRemove,
				goodsRemoveById,
				getDataGoodsRemoveById,
			}}
			{...props}
		/>
	);
}
