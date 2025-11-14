import React, { useState, useContext, useEffect } from 'react';
import {
	Box,
	Grid,
	Stack,
	Table,
	TableHead,
	TableRow,
	TableCell,
	TableBody,
	IconButton,
	styled,
	Typography,
	Snackbar,
	Alert,
	Backdrop,
	RadioGroup,
	FormControlLabel,
	Radio,
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { KeyboardArrowDown } from '@mui/icons-material';
import { useNavigate, useLocation } from 'react-router-dom';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import CircularProgress from '@mui/material/CircularProgress';
import { jwtDecode } from 'jwt-decode';

import CustomNewHeader from 'Component/Headers/CustomNewHeader';
import Title16700 from 'Component/Typographys/Title16700';
import Title18700 from 'Component/Typographys/Title18700';
import AppTextField from 'Component/input-fields/AppTextField';
import Title16500 from 'Component/Typographys/Title16500';
import ButtonText from 'Component/Buttons/ButtonText';
import ButtonSubmit from 'Component/Buttons/ButtonSubmit';
import CardProfil from 'Component/Cards/CardProfil';
import AppAvatar from 'Component/avatars/AppAvatar';

import CustomNewTableDetail from 'Component/CustomTable/CustomNewTableDetail';
import ListForm from 'Page-Sections/PenghapusBukuan/Data/ListForm';
import ColumnShapeAdd from 'Page-Sections/PenghapusBukuan/column-shape-add';

import API from 'Services/Api';
import StaticVar from 'Config/StaticVar';
import { UserProfilContext } from 'Context/UserProfile';

const BodyTableCell = styled(TableCell)(() => ({
	fontSize: 12,
	fontWeight: 600,
	'&:last-of-type': {
		textAlign: 'right',
	},
}));
const HeadTableCell = styled(BodyTableCell)(({ theme }) => ({
	borderBottom: `1px solid ${theme.palette.grey[300]}`,
}));

function FormPenghapusBukuan() {
	const navigate = useNavigate();
	const location = useLocation();
	const { data } = location.state;

	const { userProfilById, profilOfficer, getAllOfficer, userProfile } =
		useContext(UserProfilContext);

	const _filterData = data.map(item => {
		const _storage = item.storageLocation;
		const _lastStorage =
			_storage.length > 0 ? _storage[_storage.length - 1] : '-';
		return {
			foundName: item.foundName, // nama barang
			foundType: item.foundType, // type barang
			idNumber: item.idNumber, // nomor penemuan
			foundPhoto: item.foundPhoto, // foto barang
			foundBy: item.foundBy, // penemu barang
			foundLocation: item.foundLocation, // lokasi ditemukan
			foundDate: item.foundDate, // Tanggal ditemukan
			foundTime: item.foundTime, // Waktu ditemukan
			locationStorage: _lastStorage?.location,
			infoSubmission: 'Baik',
			noteSubmission: '',
		};
	});

	const [dataRowList, setDataRowList] = useState(_filterData);
	const [loading, setLoading] = useState(false);
	const [notifMsg, setNotifMsg] = useState('');
	const [notif, setNotif] = useState(false);

	const [lastName, setLastName] = useState('');
	const [officer, setOfficer] = useState('');
	const [officerId, setOfficerId] = useState({
		officerId: '',
		officerName: '',
		officerPosition: '',
		officerDepartemen: '',
		officerDate: new Date(),
	});
	const [dataImage, setDataImage] = useState({
		url: '/uploads',
		path: '',
		name: '',
	});

	const handleUpdateItem = (type, e, id) => {
		const _updateData = dataRowList.map(item => {
			if (item.idNumber === id) {
				if (type === 'info') {
					item.infoSubmission = e.target.value;
				}
				if (type === 'note') {
					item.noteSubmission = e.target.value;
				}
			}
			return item;
		});
		// console.log('update field', _updateData);
		setDataRowList(_updateData);
	};
	const handleDeleteItem = id => {
		const _dataFilter = dataRowList.filter(x => x.idNumber !== id);
		setDataRowList(_dataFilter);
	};

	const handleClose = () => {
		navigate(-1);
	};

	const handleSave = async e => {
		await setLoading(true);

		const result = await handleSubmit(e);
		// return;
		const _filterID = data.map(item => {
			return item._id;
		});
		// console.log('result submit', result);
		// return;

		if (result.statusText === 'OK') {
			setLoading(false);
			navigate(-1);
		} else {
			setNotifMsg('Gagal!');
			setLoading(false);
		}
	};
	const handleSubmit = () => {
		const newData = dataRowList.map(item => {
			return {
				removeItems: item, // foto, no.laporan, jenis barang,  keterangan
				submissiondBy: {
					...userProfile,
					submissionDate: new Date()
				},
				removeStatus: 'Diajukan',
			}
		})
		// console.log('newData', newData)
		// return
		// let postData = {
		// 	removeItems: dataRowList, // foto, no.laporan, jenis barang,  keterangan
		// 	submissiondBy: userProfile,
		// 	removeStatus: 'Diajukan',
		// };
		// console.log('result submit', postData);
		// return;
		return API.postManyGoodsRemove(newData);
	};

	const handleOfficer = e => {
		setOfficer(e.target.value);
		const _officerById = profilOfficer
			.filter(x => x._id === e.target.value)
			.map(item => {
				return {
					officerId: item._id,
					officerName: item.name,
					officerPosition: item.jobPosition.name,
					officerDepartemen: item.departement.name,
					officerDate: new Date(),
				};
			});
		// console.log('data officer by id', _officerById)
		setOfficerId(_officerById[0]);
	};

	useEffect(() => {
		getAllOfficer();
	}, []);

	return (
		<Box
			sx={{
				padding: { xs: '15px', sm: '30px' },
				background: '#FFF',
				minHeight: '100vh',
			}}
		>
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
				<Grid item xs={12} sm={12}>
					<CustomNewHeader
						judul="PENGHAPUSBUKUAN BARANG"
						title1="Home - Lost & Found - Penghapusbukuan Barang - "
						title2="Form Penghapusbukuan Barang"
					/>
				</Grid>
				<Grid item xs={12} sm={12} sx={{ my: 3 }}>
					<CardProfil />
				</Grid>

				<Grid item xs={12} sm={12}>
					<Title16700 text="DAFTAR BARANG" />
				</Grid>
				<Grid item xs={12} sm={12}>
					<Table>
						<TableHead>
							<TableRow>
								<HeadTableCell>Foto</HeadTableCell>
								<HeadTableCell>No.Laporan</HeadTableCell>
								<HeadTableCell>Jenis Barang</HeadTableCell>
								<HeadTableCell>Kondisi Barang</HeadTableCell>
								<HeadTableCell>Catatan</HeadTableCell>
								<HeadTableCell>Aksi</HeadTableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{dataRowList.length > 0
								? dataRowList.map(item => {
										const _foundPhoto =
											item?.foundPhoto !== null
												? item?.foundPhoto?.uploadedFiles[0]?.uploadedName
												: '';
										const _pathPhoto =
											item?.foundPhoto !== null ? item?.foundPhoto?.path : '';
										return (
											<TableRow key={item.idNumber}>
												<BodyTableCell>
													{item.foundPhoto !== null ? (
														<AppAvatar
															src={
																StaticVar.URL_API +
																dataImage.url +
																'/' +
																_pathPhoto +
																'/' +
																_foundPhoto
															}
															sx={{
																borderRadius: '10%',
																width: 50,
																height: 50,
															}}
														/>
													) : (
														<Typography sx={{ fontSize: 13, fontWeight: 400 }}>
															Gambar
														</Typography>
													)}
												</BodyTableCell>
												<BodyTableCell>
													<Typography
														noWrap={false}
														sx={{ fontSize: 13, fontWeight: 400 }}
													>
														{item.idNumber}
													</Typography>
												</BodyTableCell>
												<BodyTableCell>
													<Typography
														noWrap={false}
														sx={{ fontSize: 13, fontWeight: 400 }}
													>
														{item.foundName}
													</Typography>
												</BodyTableCell>
												<BodyTableCell>
													<RadioGroup
														row
														value={item.infoSubmission}
														onChange={e =>
															handleUpdateItem('info', e, item.idNumber)
														}
													>
														<FormControlLabel
															value="Baik"
															control={<Radio size="small" />}
															label="Baik"
														/>
														<FormControlLabel
															value="Rusak"
															control={<Radio size="small" />}
															label="Rusak"
														/>
													</RadioGroup>
												</BodyTableCell>
												<BodyTableCell>
													<AppTextField
														fullWidth
														size="small"
														label="Keterangan"
														onChange={e =>
															handleUpdateItem('note', e, item.idNumber)
														}
														// value={relocationInformation}
													/>
												</BodyTableCell>
												<BodyTableCell>
													<IconButton
														onClick={() => handleDeleteItem(item.idNumber)}
													>
														<DeleteOutlineOutlinedIcon
															sx={{
																fontSize: 24,
																transition: 'color 0.3s',
																color: '#ED1C24',
															}}
														/>
													</IconButton>
												</BodyTableCell>
											</TableRow>
										);
								  })
								: null}
						</TableBody>
					</Table>
				</Grid>

				{/* <Grid item xs={12} sm={12} sx={{ my: 3 }}>
					<Title16700 text="INFORMASI PETUGAS" />
				</Grid>
				<Grid item xs={12} sm={4}>
					<AppTextField
						select
						fullWidth
						SelectProps={{
							native: true,
							IconComponent: KeyboardArrowDown,
						}}
						required
						label="Nama Petugas"
						value={officer}
						onChange={handleOfficer}
					>
						<option value=""></option>
						{profilOfficer.length > 0
							? profilOfficer?.map(item => {
									return <option value={item._id}>{item.name}</option>;
							  })
							: null}
					</AppTextField>
				</Grid>
				<Grid item xs={12} sm={4}>
					<AppTextField
						fullWidth
						disabled
						label="Jabatan"
						value={officerId?.officerPosition}
					/>
				</Grid>
				<Grid item xs={12} sm={4}>
					<AppTextField
						fullWidth
						disabled
						label="Departemen"
						value={officerId?.officerDepartemen}
					/>
				</Grid> */}

				<Grid item xs={12} sm={12}>
					<Stack
						direction="row"
						justifyContent="flex-end"
						spacing={1}
						sx={{ marginTop: '30px', mb: 7 }}
					>
						<ButtonText title="Batal" onClick={handleClose} />
						<ButtonSubmit title="Ajukan" onClick={handleSave} />
					</Stack>
				</Grid>
			</Grid>
		</Box>
	);
}

export default FormPenghapusBukuan;
