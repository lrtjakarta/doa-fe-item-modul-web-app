import React, { useContext, useEffect } from 'react';
import { Box, Stack, Typography, Button } from '@mui/material';
import { KeyboardArrowDown } from '@mui/icons-material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

import AppTextField from '../../Component/input-fields/AppTextField';

import { IdentificationContext } from 'Context/Indetificatiion';
import { LocationContext } from 'Context/Location';
import { ItemsContext } from 'Context/Items';

function AdvancedFilter(props) {
	const { handleClose, onFilter, filterData, setFilterData } = props;

	const { dataIdentification, getDataIdentification } = useContext(
		IdentificationContext
	);
	const { dataLocation, getDataLocation } = useContext(LocationContext);
	const { dataItems, getDataItems } = useContext(ItemsContext);

	const _dataIdentification = dataIdentification?.filter(
		(obj, index) =>
			dataIdentification?.findIndex(
				item => item.identificationName === obj.identificationName
			) === index
	);

	const handleFilter = () => {
		onFilter(filterData);
	};

	useEffect(() => {
		getDataIdentification();
		getDataLocation();
		getDataItems();
	}, []);

	return (
		<Box
			sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 7 }}
		>
			<Typography sx={{ fontSize: 23, fontWeight: 700, color: '#011E3D' }}>
				ADVANCED FILTER
			</Typography>

			<Stack
				direction={{ xs: 'column', sm: 'row' }}
				spacing={3}
				sx={{ marginTop: '25px' }}
			>
				<Stack direction="column" spacing={2}>
					<Typography sx={{ fontSize: 16 }}>Tanggal Penemuan</Typography>
					<Stack
						direction={{ xs: 'column', sm: 'row' }}
						spacing={2}
						alignItems="center"
					>
						<Box sx={{ width: '100%' }}>
							<DatePicker
								label="Start"
								value={filterData.foundFirstDate}
								onChange={date =>
									setFilterData({ ...filterData, foundFirstDate: date })
								}
								slots={{
									textField: AppTextField,
								}}
								slotProps={{
									textField: {
										fullWidth: true,
									},
								}}
								sx={{ mt: '0px' }}
								format="dd/MM/yyyy"
							/>
						</Box>
						<Box sx={{ width: '100%' }}>
							<DatePicker
								label="End"
								value={filterData.foundLastDate}
								onChange={date =>
									setFilterData({ ...filterData, foundLastDate: date })
								}
								slots={{
									textField: AppTextField,
								}}
								slotProps={{
									textField: {
										fullWidth: true,
									},
								}}
								sx={{ mt: '0px' }}
								format="dd/MM/yyyy"
							/>
						</Box>
					</Stack>
					<AppTextField
						select
						fullWidth
						label="Lokasi Penemuan"
						SelectProps={{
							native: true,
							IconComponent: KeyboardArrowDown,
						}}
						value={filterData.foundLocation}
						onChange={e =>
							setFilterData({ ...filterData, foundLocation: e.target.value })
						}
					>
						<option value=""></option>
						{dataLocation
							.filter(x => x.locationType !== 'storage')
							.map(item => {
								return (
									<option value={item.locationName}>{item.locationName}</option>
								);
							})}
					</AppTextField>
					<AppTextField
						select
						fullWidth
						label="Jenis Barang"
						SelectProps={{
							native: true,
							IconComponent: KeyboardArrowDown,
						}}
						value={filterData.foundName}
						onChange={e =>
							setFilterData({ ...filterData, foundName: e.target.value })
						}
					>
						<option value=""></option>
						{dataItems
							.sort((a, b) => a.itemName.localeCompare(b.itemName))
							.map(item => {
								return <option value={item.itemName}>{item.itemName}</option>;
							})}
					</AppTextField>
					{/* <AppTextField
						fullWidth
						label="Petugas"
						value={filterData.officialName}
						onChange={e =>
							setFilterData({ ...filterData, officialName: e.target.value })
						}
					/> */}
				</Stack>
				<Stack direction="column" spacing={2}>
					<Typography sx={{ fontSize: 16 }}>Tanggal Penyimpanan</Typography>
					<Stack
						direction={{ xs: 'column', sm: 'row' }}
						spacing={2}
						alignItems="center"
					>
						<Box sx={{ width: '100%' }}>
							<DatePicker
								label="Start"
								value={filterData.storageFirstDate}
								onChange={date =>
									setFilterData({ ...filterData, storageFirstDate: date })
								}
								slots={{
									textField: AppTextField,
								}}
								slotProps={{
									textField: {
										fullWidth: true,
									},
								}}
								sx={{ mt: '0px' }}
								format="dd/MM/yyyy"
							/>
						</Box>
						<Box sx={{ width: '100%' }}>
							<DatePicker
								label="End"
								value={filterData.storageLastDate}
								onChange={date =>
									setFilterData({ ...filterData, storageLastDate: date })
								}
								slots={{
									textField: AppTextField,
								}}
								slotProps={{
									textField: {
										fullWidth: true,
									},
								}}
								sx={{ mt: '0px' }}
								format="dd/MM/yyyy"
							/>
						</Box>
					</Stack>
					<AppTextField
						select
						fullWidth
						label="Lokasi Penyimpanan"
						SelectProps={{
							native: true,
							IconComponent: KeyboardArrowDown,
						}}
						value={filterData.storageLocation}
						onChange={e =>
							setFilterData({ ...filterData, storageLocation: e.target.value })
						}
					>
						<option value=""></option>
						{dataLocation
							.filter(x => x.locationType !== 'found')
							.map(item => {
								return (
									<option value={item.locationName}>{item.locationName}</option>
								);
							})}
					</AppTextField>
					<AppTextField
						select
						fullWidth
						label="Status Barang"
						SelectProps={{
							native: true,
							IconComponent: KeyboardArrowDown,
						}}
						value={filterData.foundStatus}
						onChange={e =>
							setFilterData({ ...filterData, foundStatus: e.target.value })
						}
					>
						<option value=""></option>
						<option value="Unidentified">Unidentified</option>
						<option value="Identified">Identified</option>
						<option value="Penyimpanan">Penyimpanan</option>
						{/* <option value="Diajukan">Penyimpanan</option>
						<option value="Ditolak">Penyimpanan</option>
						<option value="Disetujui">Penyimpanan</option> */}
						<option value="Claimed">Claimed</option>
						<option value="Dihapuskan">Dihapuskan</option>
					</AppTextField>
				</Stack>
			</Stack>

			<Stack sx={{ width: '100%', mt: 2 }}>
				<AppTextField
					select
					fullWidth
					label="Indentifikasi Barang"
					SelectProps={{
						native: true,
						IconComponent: KeyboardArrowDown,
					}}
					value={filterData.foundIdentification}
					onChange={e =>
						setFilterData({
							...filterData,
							foundIdentification: e.target.value,
						})
					}
				>
					<option value=""></option>
					{_dataIdentification.map(item => {
						return (
							<option value={item.identificationName}>
								{item.identificationName}
							</option>
						);
					})}
				</AppTextField>
			</Stack>

			<Stack
				direction="row"
				spacing={3}
				sx={{ mt: '25px', mb: { xs: 5, sm: 0 } }}
			>
				<Button
					variant="outlined"
					color="error"
					sx={{ padding: '0px 30px 0px 30px' }}
					onClick={handleClose}
				>
					Batal
				</Button>

				<Button type="submit" variant="contained" onClick={handleFilter}>
					Terapkan
				</Button>
			</Stack>
		</Box>
	);
}

export default AdvancedFilter;
