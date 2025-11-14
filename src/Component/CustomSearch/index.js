import React, { useState, useContext, useEffect } from 'react';

import { Grid, Box } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { KeyboardArrowDown } from '@mui/icons-material';

import AppTextField from 'Component/input-fields/AppTextField';
import SearchInput from 'Component/input-fields/SearchInput';
import ButtonContainer from 'Component/Buttons/ButtonContainer';
import ButtonFilter from 'Component/Buttons/ButtonFilter';

import { LocationContext } from 'Context/Location';
import { ItemsContext } from 'Context/Items';

function CustomSearch(props) {
	const {
		onSearch,
		handleFilter,
		labelDate,
		labelSelectLocation,
		labelSelectItems,
		labelSearch,
		dataSelectLocation,
		dataSelectItems,
		searchData,
		setSearchData,
		type,
	} = props;

	const { dataLocation, getDataLocation } = useContext(LocationContext);
	const { dataItems, getDataItems } = useContext(ItemsContext);

	const handleSearch = () => {
		onSearch(searchData);
	};

	useEffect(() => {
		getDataLocation();
		getDataItems();
	}, []);

	return (
		<Box
			sx={{
				display: 'flex',
				flexDirection: { xs: 'column', sm: 'row' },
				gap: 2,
			}}
		>
			{type !== 'View' ? (
				<DatePicker
					label={labelDate}
					value={searchData.formDate}
					onChange={date => setSearchData({ ...searchData, formDate: date })}
					slots={{
						textField: AppTextField,
					}}
					// format="YYYY-MM-DD"
					slotProps={{
						textField: {
							fullWidth: true,
							size: 'small',
						},
					}}
					sx={{ mt: '0px' }}
				/>
			) : null}
			<AppTextField
				select
				fullWidth
				size="small"
				label={labelSelectLocation}
				SelectProps={{
					native: true,
					IconComponent: KeyboardArrowDown,
				}}
				value={searchData.formLocation}
				onChange={e =>
					setSearchData({ ...searchData, formLocation: e.target.value })
				}
				sx={{ mt: '0px' }}
			>
				<option value=""></option>
				{dataLocation.filter(x => x.locationType !== 'storage').map(item => {
					return <option value={item.locationName}>{item.locationName}</option>;
				})}
			</AppTextField>
			<AppTextField
				select
				fullWidth
				size="small"
				label={labelSelectItems}
				SelectProps={{
					native: true,
					IconComponent: KeyboardArrowDown,
				}}
				value={searchData.formName}
				onChange={e =>
					setSearchData({ ...searchData, formName: e.target.value })
				}
				sx={{ mt: '0px' }}
			>
				<option value=""></option>
				{dataItems
					.sort((a, b) => a.itemName.localeCompare(b.itemName))
					.map(item => {
						return <option value={item.itemName}>{item.itemName}</option>;
					})}
			</AppTextField>
			<SearchInput
				placeholder={labelSearch}
				value={searchData.formSearch}
				onChange={e =>
					setSearchData({ ...searchData, formSearch: e.target.value })
				}
			/>
			<Box>
				<ButtonContainer title="Cari" onClick={handleSearch} />
			</Box>
			<Box>
				{type !== 'View' ? <ButtonFilter onClick={handleFilter} /> : null}
			</Box>
		</Box>
	);
}

export default CustomSearch;
