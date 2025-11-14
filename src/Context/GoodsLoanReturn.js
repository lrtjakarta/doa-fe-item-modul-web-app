import API from 'Services/Api';
import React, { createContext, useState } from 'react';

export const GoodsLoanReturnContext = createContext({});

export default function GoodsLoanReturnProvider(props) {
	const [dataGoodsLoanReturn, setDataGoodsLoanReturn] = useState([]);
	const [goodsLoanReturnById, setGoodsLoanReturnById] = useState(null);

	const getDataGoodsLoanReturn = async () => {
		await API.getGoodsLoanReturn()
			.then(res => {
				setDataGoodsLoanReturn(res.data);
			})
			.catch(err => console.log('error', err));
	};

	const getDataGoodsLoanReturnById = async _id => {
		await API.getGoodsLoanReturnById(_id)
			.then(res => {
				setGoodsLoanReturnById(res.data);
			})
			.catch(err => console.log('error', err));
	};

	return (
		<GoodsLoanReturnContext.Provider
			value={{
				dataGoodsLoanReturn,
				getDataGoodsLoanReturn,
				goodsLoanReturnById,
				getDataGoodsLoanReturnById,
			}}
			{...props}
		/>
	);
}
