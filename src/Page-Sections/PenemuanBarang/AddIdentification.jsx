import { Box, Button, Stack } from '@mui/material';
import { H5 } from 'Component/Typography';
import AppTextField from 'Component/input-fields/AppTextField';
import React, { useEffect, useState } from 'react';
import { KeyboardArrowDown } from '@mui/icons-material';

function AddIdentification(props) {
	const { handleCancel, data, handleSubmit, dataById, type } = props;

	const _dataFilter = data?.filter(
		(obj, index) =>
			data?.findIndex(
				item =>
					item.identificationName.toLowerCase() ===
					obj.identificationName.toLowerCase()
			) === index
	);
	const [identificationName, setIdentificationName] = useState('');
	const [identificationType, setIdentificationType] = useState('');
	const [information, setInformation] = useState('');

	// console.log('data type', _dataFilter, data);

	const handleSave = () => {
		var dataObject = data?.filter(x => x._id === identificationType);

		const postData = {
			...dataObject[0],
			information,
		};
		// console.log('data post', postData)
		handleSubmit(postData);
	};

	useEffect(() => {
		if (dataById !== null) {
			setIdentificationName(dataById.identificationName);
			setIdentificationType(dataById._id);
			setInformation(dataById.information);
		}
	}, []);

	// console.log('data by id', dataById)

	return (
		<Box>
			<H5>Identifikasi Barang</H5>

			<Stack direction="column" spacing={2}>
				<AppTextField
					select
					fullWidth
					label="Pilih Identifikasi Barang"
					SelectProps={{
						native: true,
						IconComponent: KeyboardArrowDown,
					}}
					value={identificationName}
					onChange={e => setIdentificationName(e.target.value)}
				>
					<option value=""></option>
					{_dataFilter.length > 0 ? (
						_dataFilter.map(item => {
							return (
								<option value={item.identificationName}>
									{item.identificationName}
								</option>
							);
						})
					) : (
						<option value="">Data Kosong</option>
					)}
				</AppTextField>
				<AppTextField
					select
					fullWidth
					label="Pilih Tipikal Barang"
					SelectProps={{
						native: true,
						IconComponent: KeyboardArrowDown,
					}}
					value={identificationType}
					onChange={e => setIdentificationType(e.target.value)}
				>
					<option value=""></option>
					{identificationName !== '' ? (
						data
							.filter(
								x =>
									identificationName &&
									x.identificationName?.toLowerCase() ===
										identificationName.toLowerCase()
							)
							.map(item => {
								return (
									<option value={item._id}>{item.identificationType}</option>
								);
							})
					) : (
						<option value="">Data Kosong</option>
					)}
				</AppTextField>
				<AppTextField
					multiline
					fullWidth
					rows={3}
					name="about"
					label="Keterangan"
					value={information}
					onChange={e => setInformation(e.target.value)}
					sx={{
						'& .MuiOutlinedInput-root textarea': {
							padding: 0,
						},
					}}
				/>
			</Stack>

			<Stack direction="row" spacing={1} mt={4} sx={{ mb: 7 }}>
				<Button variant="outlined" color="error" onClick={handleCancel}>
					Batal
				</Button>

				<Button type="submit" variant="contained" onClick={handleSave}>
					Submit
				</Button>
			</Stack>
		</Box>
	);
}

export default AddIdentification;
