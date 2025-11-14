import {
	Box,
	styled,
	Grid,
	Typography,
	Button,
	Stack,
	Table,
	TableHead,
	TableRow,
	TableCell,
	TableBody,
	IconButton,
	Snackbar,
	Alert,
	Backdrop,
	Tab,
	RadioGroup,
	FormControlLabel,
	Radio,
	Hidden,
} from '@mui/material';

import React, { useEffect, useState, useContext } from 'react';
import { KeyboardArrowDown } from '@mui/icons-material';
import QrCodeScannerIcon from '@mui/icons-material/QrCodeScanner';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import { useNavigate, useLocation } from 'react-router-dom';
import CircularProgress from '@mui/material/CircularProgress';
import QrCode from 'qrcode';
import { jwtDecode } from 'jwt-decode';
import DeleteIcon from '@mui/icons-material/Delete';

import AppTextField from 'Component/input-fields/AppTextField';
import CustomNewHeader from 'Component/Headers/CustomNewHeader';
import Title18700 from 'Component/Typographys/Title18700';
import Title16700 from 'Component/Typographys/Title16700';
import ButtonError from 'Component/Buttons/ButtonError';
import ButtonText from 'Component/Buttons/ButtonText';
import ButtonSubmit from 'Component/Buttons/ButtonSubmit';
import AppModalMedium from 'Component/AppModalMedium';
import CardProfil from 'Component/Cards/CardProfil';
import ScanQr from 'Component/ScanQrCode';
import AppAvatar from 'Component/avatars/AppAvatar';

import DaftarBarang from 'Page-Sections/PemindahanBarang/Data/DaftarBarang';
import StorageLocation from 'Page-Sections/PenemuanBarang/Data/StorageLocation';

import API from 'Services/Api';
import StaticVar from 'Config/StaticVar';
import { GoodsRelocationContext } from 'Context/GoodsRelocation';
import { LostFoundContext } from 'Context/LostFound';
import { UserProfilContext } from 'Context/UserProfile';
import { LocationContext } from 'Context/Location';
import CardInputAksiBM from 'Component/Cards/CardInputAksiBM';

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

function AddPemindahan() {
	const navigate = useNavigate();
	const location = useLocation();
	const { id, data } = location.state;

	const { dataGoodsRelocation, getDataGoodsRelocation } = useContext(
		GoodsRelocationContext
	);
	const { dataLostFound, getDataLostFound } = useContext(LostFoundContext);
	const { userProfile } = useContext(UserProfilContext);
	const { dataLocation, getDataLocation } = useContext(LocationContext);

	const [loading, setLoading] = useState(false);
	const [notifMsg, setNotifMsg] = useState('');
	const [notif, setNotif] = useState(false);

	const [relocationDate, setRelocationDate] = useState('');
	const [previousStorage, setPreviousStorage] = useState('');
	const [currentStorage, setCurrentStorage] = useState('');
	const [firstOficcerName, setFirstOficcerName] = useState('');
	const [firstOficcerJob, setFirstOficcerJob] = useState('');
	const [firstOficcerDepartemen, setFirstOficcerDepartemen] = useState('');
	const [idQrCode, setIdQrCode] = useState('');
	const [idNumber, setIdNumber] = useState('');
	const [qrBase, setQrBase] = useState('');

	const [openModal, setOpenModal] = useState(false);
	const [scanResultWebCam, setScanResultWebCam] = useState([]);
	const [dataID, setDataID] = useState(null);
	const [codeItem, setCodeItem] = useState('');
	const [dataImage, setDataImage] = useState({
		url: '/uploads',
		path: '',
		name: '',
	});

	const handleGetDetail = () => {
		setRelocationDate();
		setPreviousStorage();
		setCurrentStorage();
		setFirstOficcerName();
		setFirstOficcerJob();
		setFirstOficcerDepartemen();
	};

	const handleClose = () => {
		navigate(-1);
	};

	const handleSave = async e => {
		await setLoading(true);

		const result = await handleSubmit(e);
		// return;
		// console.log('result submit', result);
		if (result.statusText === 'OK') {
			setLoading(false);
			if (id !== 0) {
				navigate('/manajemenBarang/pemindahan');
			} else {
				navigate(-1);
			}
		} else {
			setNotifMsg('Gagal!');
			setLoading(false);
		}
	};

	const handleSubmit = () => {
		let postData = {
			relocationItems: scanResultWebCam, // barang yg dipindahkan
			previousStorage, // penyimpanan sebelumnya
			currentStorage, // penyimpanan saat ini
			relocationDate: new Date(), // tanggal
			code: 'MO',
			submittedBy: userProfile,
			receivedBy: null,
			relocationStatus: 'Dalam Proses',
		};
		// console.log('post data', postData);
		// return;
		if (id !== 0) {
			return API.putGoodsRelocation(id, postData);
		} else {
			return API.postGoodsRelocation(postData);
		}
	};

	const handleQR = () => {
		setOpenModal(true);
	};
	const handleCloseModal = () => {
		setOpenModal(false);
	};

	const handleScanWebCam = async result => {
		if (result) {
			const resultData = await API.getLostFound({
				params: { idNumber: result.text },
			});
			if (resultData.statusText === 'OK') {
				if (scanResultWebCam.length > 0) {
					const _checkData = scanResultWebCam.filter(
						x => x.idNumber === resultData.data[0].idNumber
					);
					const data = resultData.data[0];
					let _dataPost = {
						foundPhoto: data.foundPhoto,
						idNumber: data.idNumber,
						foundName: data.foundName,
						foundType: data.foundType,
					};
					// console.log('data penemuan', _dataPost);
					// return;
					if (_checkData.length > 0) {
						alert('Data sudah ditambahkan');
					} else {
						const _data = [...scanResultWebCam, _dataPost];
						setScanResultWebCam(_data);
						handleCloseModal();
					}
					// console.log('data result', _data);
				} else {
					const data = resultData.data[0];
					let _dataPost = {
						foundPhoto: data.foundPhoto,
						idNumber: data.idNumber,
						foundName: data.foundName,
						foundType: data.foundType,
					};
					// console.log('data result', _data);
					// return;
					setScanResultWebCam([_dataPost]);
					handleCloseModal();
				}
			}
			// console.log('data result', result.text);
			// console.log('data result', resultData);
		}
	};

	const handleManual = async () => {
		if (codeItem !== '') {
			const resultData = await API.getLostFound({
				params: { idNumber: codeItem },
			});

			if (resultData.statusText === 'OK') {
				if (scanResultWebCam.length > 0) {
					const _checkData = scanResultWebCam.filter(
						x => x.idNumber === resultData.data[0].idNumber
					);
					const data = resultData.data[0];
					let _dataPost = {
						foundPhoto: data.foundPhoto,
						idNumber: data.idNumber,
						foundName: data.foundName,
						foundType: data.foundType,
					};
					// console.log('data penemuan', _dataPost);
					// return;
					if (_checkData.length > 0) {
						alert('Data sudah ditambahkan');
					} else {
						const _data = [...scanResultWebCam, _dataPost];
						setScanResultWebCam(_data);
						handleCloseModal();
					}
					// console.log('data result', _data);
				} else {
					const data = resultData.data[0];
					let _dataPost = {
						foundPhoto: data.foundPhoto,
						idNumber: data.idNumber,
						foundName: data.foundName,
						foundType: data.foundType,
					};
					// console.log('data result', _data);
					// return;
					setScanResultWebCam([_dataPost]);
					handleCloseModal();
				}
			}
			// console.log('data result', resultData);
		}
		// navigate('/manajemenBarang/penemuan/formPengambilan', {state: {codeItem}});
	};

	const handleUpdateItem = (type, e, id) => {
		const _updateData = scanResultWebCam.map(item => {
			if (item.idNumber === id) {
				if (type === 'info') {
					item.firstInformation = e.target.value;
				}
				if (type === 'note') {
					item.firstNote = e.target.value;
				}
			}
			return item;
		});
		// console.log('update field', _updateData);
		setScanResultWebCam(_updateData);
	};

	const handleDeleteItem = id => {
		const _dataFilter = scanResultWebCam.filter(x => x.idNumber !== id);
		setScanResultWebCam(_dataFilter);
	};

	useEffect(() => {
		if (id !== 0) {
			handleGetDetail();
		}
		getDataGoodsRelocation();
		getDataLocation({ multiLocation: ['storage', 'storagefound'] });
		getDataLostFound({
			foundStatus: ['Unidentified', 'Identified', 'Penyimpanan'],
		});
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

			<Grid container spacing={4}>
				<Grid item xs={12} sm={12}>
					<CustomNewHeader
						judul="PEMINDAHAN BARANG"
						title1="Home - Lost & Found - Pemindahan Barang - "
						title2="form Pemindahan Barang"
					/>
				</Grid>
				<Grid
					item
					xs={12}
					sm={12}
					sx={{ display: 'flex', justifyContent: 'center' }}
				>
					<Box>
						<Grid container spacing={3}>
							<Grid item xs={12} sm={12}>
								<CardProfil />
							</Grid>
							<Grid item xs={12} sm={12} sx={{ marginTop: '20px' }}>
								<Title16700 text="INFORMASI PEMINDAHAN" />
							</Grid>
							<Grid item xs={12} sm={12}>
								<AppTextField
									select
									fullWidth
									label="Lokasi Penyimpanan Sebelumnya"
									SelectProps={{
										native: true,
										IconComponent: KeyboardArrowDown,
									}}
									value={previousStorage}
									onChange={e => setPreviousStorage(e.target.value)}
								>
									<option value=""></option>
									{dataLocation.map(item => {
										return (
											<option value={item.locationName}>
												{item.locationName}
											</option>
										);
									})}
								</AppTextField>
							</Grid>
							<Grid item xs={12} sm={9.5} sx={{ mt: { xs: 0, sm: 3 } }}>
								<Title16700 text="DAFTAR BARANG" />
							</Grid>
							<Grid item xs={12} sm={2.5} sx={{ mt: { xs: 0, sm: 3 } }}>
								<ButtonError
									title="Tambah Barang"
									icon={<QrCodeScannerIcon />}
									onClick={handleQR}
								/>
							</Grid>

							{/* Versi Destop */}
							<Hidden only={['xs']}>
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
											{scanResultWebCam.length > 0
												? scanResultWebCam.map(item => {
														const _foundPhoto =
															item?.foundPhoto !== null
																? item?.foundPhoto?.uploadedFiles[0]
																		?.uploadedName
																: '';
														const _pathPhoto =
															item?.foundPhoto !== null
																? item?.foundPhoto?.path
																: '';

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
																		<Typography
																			sx={{ fontSize: 13, fontWeight: 400 }}
																		>
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
																		// value={item?.firstInformation ?  item?.firstInformation: 'Baik'}
																		onChange={e =>
																			handleUpdateItem('info', e, item.idNumber)
																		}
																	>
																		<FormControlLabel
																			value="Baik"
																			control={<Radio />}
																			label="Baik"
																		/>
																		<FormControlLabel
																			value="Rusak"
																			control={<Radio />}
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
																		onClick={() =>
																			handleDeleteItem(item.idNumber)
																		}
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
							</Hidden>

							{/* Versi Mobile */}
							<Hidden only={['sm', 'md', 'lg', 'xl']}>
								{scanResultWebCam.length > 0
									? scanResultWebCam.map(item => {
											return (
												<Grid item xs={12} sm={12}>
													<CardInputAksiBM
														info1="No.Barang"
														value1={item.idNumber}
														info2="Jenis Barang"
														value2={item.foundName}
														info3="Kondisi Barang"
														value3={
															<RadioGroup
																row
																// value={item?.firstInformation ?  item?.firstInformation: 'Baik'}
																onChange={e =>
																	handleUpdateItem('info', e, item.idNumber)
																}
															>
																<FormControlLabel
																	value="Baik"
																	control={<Radio />}
																	label="Baik"
																/>
																<FormControlLabel
																	value="Rusak"
																	control={<Radio />}
																	label="Rusak"
																/>
															</RadioGroup>
														}
														info4="Catatan"
														value4={
															<AppTextField
																fullWidth
																size="small"
																label="Keterangan"
																onChange={e =>
																	handleUpdateItem('note', e, item.idNumber)
																}
																// value={relocationInformation}
															/>
														}
														aksi={
															<Button
																variant="outlined"
																startIcon={<DeleteIcon />}
																size="small"
																color="error"
																onClick={() => handleDeleteItem(item.idNumber)}
															>
																Delete
															</Button>
														}
													/>
												</Grid>
											);
									  })
									: null}
							</Hidden>

							<Grid
								item
								xs={12}
								sm={12}
								sx={{
									display: 'flex',
									justifyContent: 'flex-end',
									marginTop: 3,
									mb: { xs: 10, sm: 7 },
								}}
							>
								<Stack direction="row" spacing={1}>
									<ButtonText title="Batal" onClick={handleClose} />
									<ButtonSubmit title="Submit" onClick={handleSave} />
								</Stack>
							</Grid>
						</Grid>
					</Box>
				</Grid>
			</Grid>

			{/* Modal */}
			<AppModalMedium open={openModal} handleClose={handleCloseModal}>
				{/* <ScanQRCode
					handleClose={handleCloseModal}
					handleScanWebCam={handleScanWebCam}
				/> */}
				<ScanQr
					handleCloseModal={handleCloseModal}
					handleScanWebCam={handleScanWebCam}
					handleClose={handleCloseModal}
					handleSubmit={handleManual}
					value={codeItem}
					onChange={e => setCodeItem(e.target.value)}
				/>
			</AppModalMedium>
		</Box>
	);
}

export default AddPemindahan;
