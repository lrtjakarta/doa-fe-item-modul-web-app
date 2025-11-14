import API from 'Services/Api';
import React, { createContext, useCallback, useState } from 'react';

export const GoodsComplaintContext = createContext({});

export default function GoodsCompalaintProvider(props) {
	const [dataGoodsComplaint, setDataGoodsComplaint] = useState([]);
	const [goodsComplaintById, setGoodsComplaintById] = useState(null);

	const getDataGoodsComplaint = async params => {
		await API.getGoodsComplaint({ params: params })
			.then(res => {
				setDataGoodsComplaint(res.data);
			})
			.catch(err => console.log('error', err));
	};

	const getDataGoodsComplaintById = async _id => {
		await API.getGoodsComplaintById(_id)
			.then(res => {
				setGoodsComplaintById(res.data);
			})
			.catch(err => console.log('error', err));
	};

	return (
		<GoodsComplaintContext.Provider
			value={{
				dataGoodsComplaint,
				setDataGoodsComplaint,
				getDataGoodsComplaint,
				goodsComplaintById,
				getDataGoodsComplaintById,
			}}
			{...props}
		/>
	);
}
