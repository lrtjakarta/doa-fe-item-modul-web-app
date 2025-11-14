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

import CustomNewHeader from 'Component/Headers/CustomNewHeader';
import CustomNewTable from 'Component/CustomTable/CustomNewTable';
import AppTextField from 'Component/input-fields/AppTextField';
import AppModalMedium from 'Component/AppModalMedium';
import Title16700 from 'Component/Typographys/Title16700';
import SearchInput from 'Component/input-fields/SearchInput';
import ButtonContainer from 'Component/Buttons/ButtonContainer';

import ColumnShapeBarang from 'Page-Sections/MasterData/JenisBarang/column-shape-barang';

import { ItemsContext } from 'Context/Items';
import API from 'Services/Api';
import AppModalSmall from 'Component/AppModalSmall';
import CardDelete from 'Component/Cards/CardDelete';

function List() {
	// context
	const { dataItems, getDataItems } = useContext(ItemsContext);

	const [allData, setAllData] = useState([]);
	const [searchItem, setSearchItem] = useState('');

	const [dialogForm, setDialogForm] = useState(false);
	const [itemName, setItemName] = useState('');
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
			setItemName('');
			setRowData(null);
			getDataItems();
			console.log('Berhasil!!');
		} else {
			setNotifMsg('Gagal!');
			setLoading(false);
		}
	};

	const handleSave = () => {
		const postData = {
			itemName,
		};
		if (rowData !== null) {
			return API.putItems(rowData._id, postData);
		} else {
			return API.postItems(postData);
		}
	};

	const handleEdit = row => {
		setRowData(row);
		setItemName(row.itemName);
		setDialogForm(true);
	};

	const handleDelete = row => {
		setRowData(row);
		setDialogDelete(true);
	};

	const handleHapus = () => {
		API.deleteItems(rowData._id).then(res => {
			if (res.statusText === 'OK') {
				console.log('Data berhasil dihapus!!');
				setDialogDelete(false);
				setRowData(null);
				getDataItems();
			}
		});
	};

	const handleSearch = () => {
		const filter = {
			searchName: searchItem,
		};
		API.getItems({ params: filter }).then(res => {
			if (res.statusText === 'OK') {
				setAllData(res.data);
			}
		});
	};

	// useEffect
	useEffect(() => {
		getDataItems();
	}, []);

	useEffect(() => {
		const sortItem = dataItems.sort(
			(a, b) => new Date(b.createdAt) - new Date(a.createdAt)
		);
		setAllData(sortItem);
	}, [dataItems]);

	console.log('data master jenis barang');

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
						judul="Jenis Barang"
						title1="Home - Lost & Found - "
						title2="Daftar Jenis Barang"
					/>
				</Grid>
				<Grid item xs={12} sm={3}>
					<SearchInput
						placeholder="Search..."
						fullWidth
						value={searchItem}
						onChange={e => setSearchItem(e.target.value)}
					/>
				</Grid>
				<Grid item xs={12} sm={1}>
					<ButtonContainer title="Cari" onClick={handleSearch} />
				</Grid>
				<Grid
					item
					xs={12}
					sm={8}
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
						columnShape={ColumnShapeBarang({
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
							multiline
							rows={3}
							fullWidth
							label="Jenis Barang"
							value={itemName}
							onChange={e => setItemName(e.target.value)}
						/>
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
					title="Jenis Barang"
				/>
			</AppModalSmall>
		</Box>
	);
}

export default List;
