import API from 'Services/Api';
import React, { createContext, useState } from 'react';

export const ItemsContext = createContext({});

export default function ItemsProvider(props) {
	const [dataItems, setDataItems] = useState([]);
	const [itemsById, setItemsById] = useState(null);

	const getDataItems = async (params) => {
		await API.getItems({ params: params })
			.then(res => {
				setDataItems(res.data);
			})
			.catch(err => console.log('error', err));
	};

	const getDataItemsById = async _id => {
		await API.getItemsById(_id)
			.then(res => {
				setItemsById(res.data);
			})
			.catch(err => console.log('error', err));
	};

	return (
		<ItemsContext.Provider
			value={{
				dataItems,
				getDataItems,
				itemsById,
				getDataItemsById,
			}}
			{...props}
		/>
	);
}
