import React, { useContext, useEffect, useState } from 'react';
import {
	Box,
	Button,
	Grid,
	Snackbar,
	Alert,
	Backdrop,
	Stack,
} from '@mui/material';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import CircularProgress from '@mui/material/CircularProgress';
import { KeyboardArrowDown } from '@mui/icons-material';

import CustomNewHeader from 'Component/Headers/CustomNewHeader';
import ButtonContainer from 'Component/Buttons/ButtonContainer';
import AppTextField from 'Component/input-fields/AppTextField';
import SearchInput from 'Component/input-fields/SearchInput';

import { LocationContext } from 'Context/Location';
import CustomNewTable from 'Component/CustomTable/CustomNewTable';
import ColumnShapeLokasi from 'Page-Sections/MasterData/Lokasi/column-shape-lokasi';
import Title16700 from 'Component/Typographys/Title16700';
import AppModalMedium from 'Component/AppModalMedium';
import API from 'Services/Api';
import AppModalSmall from 'Component/AppModalSmall';
import CardDelete from 'Component/Cards/CardDelete';

function List() {
	// context
	const { dataLocation, getDataLocation } = useContext(LocationContext);

	// state
	const [allData, setAllData] = useState([]);
	const [searchName, setSearchName] = useState('');
	const [searchType, setSearchType] = useState('');

	const [dialogForm, setDialogForm] = useState(false);
	const [locationName, setLocationName] = useState('');
	const [locationType, setLocationType] = useState('');
	const [rowData, setRowData] = useState(null);

	const [dialogDelete, setDialogDelete] = useState(false);

	const [loading, setLoading] = useState(false);
	const [notifMsg, setNotifMsg] = useState('');
	const [notif, setNotif] = useState(false);

	// handle
	const handleSubmit = async e => {
		await setLoading(true);

		const result = await handleSave(e);
		// return;
		// console.log('result submit', result);
		if (result.statusText === 'OK') {
			setLoading(false);
			setDialogForm(false);
			setLocationName('');
			setLocationType('');
			setRowData(null);
			getDataLocation();
			console.log('Berhasil!!');
		} else {
			setNotifMsg('Gagal!');
			setLoading(false);
		}
	};

	const handleSave = () => {
		const postData = {
			locationName,
			locationType,
		};
		if (rowData !== null) {
			return API.putLocation(rowData._id, postData);
		} else {
			return API.postLocation(postData);
		}
	};

	const handleEdit = row => {
		setRowData(row);
		setLocationName(row.locationName);
		setLocationType(row.locationType);
		setDialogForm(true);
	};

	const handleDelete = row => {
		setRowData(row);
		setDialogDelete(true);
	};

	const handleHapus = () => {
		API.deleteLocation(rowData._id).then(res => {
			if (res.statusText === 'OK') {
				console.log('Data berhasil dihapus!!');
				setDialogDelete(false);
				setRowData(null);
				getDataLocation();
			}
		});
	};

	const handleSearch = () => {
		const filter = {
			locationType: searchType,
			searchName,
		};
		API.getLocation({params: filter}).then(res => {
			if (res.statusText === 'OK') {
				setAllData(res.data);
			}
		});
	};

	// useEffect
	useEffect(() => {
		getDataLocation();
	}, []);

	useEffect(() => {
		const sortLocation = dataLocation.sort(
			(a, b) => new Date(b.createdAt) - new Date(a.createdAt)
		);
		setAllData(sortLocation);
	}, [dataLocation]);

	return (
		<Box sx={{ padding: { xs: '15px', sm: '30px' } }}>
			<Snackbar
				open={notif}
				anchorOrigin={{
					vertical: 'top',
					horizontal: 'right',
				}}
				autoHideDuration={6000}
				onClose={(event, reason) => {
					if (reason === 'clickaway') {
						return;
					}

					setNotif(false);
				}}
			>
				<Alert
					onClose={(event, reason) => {
						if (reason === 'clickaway') {
							return;
						}

						setNotif(false);
					}}
					severity="warning"
					sx={{ width: '100%' }}
				>
					{notifMsg}
				</Alert>
			</Snackbar>
			<Backdrop sx={{ color: '#fff', zIndex: 9999 }} open={loading}>
				<CircularProgress color="inherit" />
			</Backdrop>
			<Grid container spacing={2}>
				<Grid item xs={12} sm={12} sx={{ mb: 2 }}>
					<CustomNewHeader
						judul="Lokasi Penyimpanan & Penemuan"
						title1="Home - Lost & Found - "
						title2="Daftar Lokasi Penyimpanan & Penemuan"
					/>
				</Grid>
				<Grid item xs={12} sm={3}>
					<AppTextField
						select
						fullWidth
						size="small"
						label="Jenis Lokasi"
						SelectProps={{
							native: true,
							IconComponent: KeyboardArrowDown,
						}}
						sx={{ mt: '0px' }}
						value={searchType}
						onChange={e => setSearchType(e.target.value)}
					>
						<option value=""></option>;
						<option value="storage">Penyimpanan</option>;
						<option value="found">Penemuan</option>;
						<option value="storagefound">Penyimpanan & Penemuan</option>;
					</AppTextField>
				</Grid>
				<Grid item xs={12} sm={3}>
					<SearchInput
						placeholder="Search..."
						fullWidth
						value={searchName}
						onChange={e => setSearchName(e.target.value)}
					/>
				</Grid>
				<Grid item xs={12} sm={1}>
					<ButtonContainer title="Cari" onClick={handleSearch} />
				</Grid>
				<Grid
					item
					xs={12}
					sm={5}
					sx={{ display: 'flex', justifyContent: 'flex-end' }}
				>
					<Button
						variant="contained"
						startIcon={<AddOutlinedIcon />}
						onClick={() => setDialogForm(true)}
					>
						Tambah
					</Button>
				</Grid>
				<Grid item xs={12} sm={12}>
					<CustomNewTable
						data={allData}
						columnShape={ColumnShapeLokasi({
							onEdit: handleEdit,
							onDelete: handleDelete,
						})}
					/>
				</Grid>
			</Grid>

			{/* Dialog Add */}
			<AppModalMedium
				open={dialogForm}
				handleClose={() => setDialogForm(false)}
			>
				<Grid container spacing={1}>
					<Grid
						item
						xs={12}
						sm={12}
						sx={{ display: 'flex', justifyContent: 'center' }}
					>
						<Title16700 text="Form Jenis Barang" />
					</Grid>
					<Grid item xs={12} sm={12}>
						<AppTextField
							fullWidth
							label="Nama Lokasi"
							value={locationName}
							onChange={e => setLocationName(e.target.value)}
						/>
					</Grid>
					<Grid item xs={12} sm={12}>
						<AppTextField
							select
							fullWidth
							size="small"
							label="Jenis Lokasi"
							SelectProps={{
								native: true,
								IconComponent: KeyboardArrowDown,
							}}
							sx={{ mt: '0px' }}
							value={locationType}
							onChange={e => setLocationType(e.target.value)}
						>
							<option value=""></option>;
							<option value="storage">Penyimpanan</option>;
							<option value="found">Penemuan</option>;
							<option value="storagefound">Penyimpanan & Penemuan</option>;
						</AppTextField>
					</Grid>
					<Grid
						item
						xs={12}
						sm={12}
						sx={{ display: 'flex', justifyContent: 'center', gap: 1, mt: 1 }}
					>
						<Button
							variant="outlined"
							color="error"
							sx={{ p: '10px 45px' }}
							onClick={() => setDialogForm(false)}
						>
							Batal
						</Button>
						<Button
							variant="contained"
							sx={{ p: '10px 45px' }}
							onClick={handleSubmit}
						>
							Simpan
						</Button>
					</Grid>
				</Grid>
			</AppModalMedium>

			{/* Dialog Delete */}
			<AppModalSmall
				open={dialogDelete}
				handleClose={() => setDialogDelete(false)}
			>
				<CardDelete
					onCancel={() => setDialogDelete(false)}
					onDelete={handleHapus}
					title="Lokasi"
				/>
			</AppModalSmall>
		</Box>
	);
}

export default List;
