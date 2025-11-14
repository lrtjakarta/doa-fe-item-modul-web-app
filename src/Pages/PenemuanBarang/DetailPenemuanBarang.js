import React, { useContext, useEffect, useRef, useState } from 'react';
import './style.css';
import HeaderPenemuan from 'Page-Sections/PenemuanBarang/HeaderPenemuan';
import {
	Box,
	Button,
	Card,
	Stack,
	Typography,
	Tab,
	Grid,
	IconButton,
} from '@mui/material';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import { useNavigate, useLocation } from 'react-router-dom';
import EditIcon from '@mui/icons-material/Edit';

import { lightTheme } from '../../constants';
import ImgBarang from 'Assets/barang.png';

import PenemuanPenyimpanan from 'Page-Sections/PenemuanBarang/PenemuanPenyimpanan';
import Pengambalian from 'Page-Sections/PenemuanBarang/Pengambalian';
import Pengaduan from 'Page-Sections/PenemuanBarang/TabPengaduan/Pengaduan';
import AddIdentification from 'Page-Sections/PenemuanBarang/AddIdentification';

import CustomNewHeader from 'Component/Headers/CustomNewHeader';
import Title18700 from 'Component/Typographys/Title18700';
import Title16700 from 'Component/Typographys/Title16700';
import StatusBox from 'Component/status';
import Title14600 from 'Component/Typographys/Title14600';
import Title14400 from 'Component/Typographys/Title14400';
import PrintQrCode from 'Component/PrintQrCode';
import AppModalSmall from 'Component/AppModalSmall';

import API from 'Services/Api';
import StaticVar from 'Config/StaticVar';

import { LostFoundContext } from 'Context/LostFound';
import { GenerateQrCodeContext } from 'Context/GenerateQrCode';
import { IdentificationContext } from 'Context/Indetificatiion';
import PrintLabel from 'Page-Sections/PenemuanBarang/PrintOutPenemuan/PrintLabel';

function DetailPenemuanBarang() {
	const location = useLocation();
	const { id, status, idNumber } = location.state;
	const navigate = useNavigate();
	const printRef = useRef();

	const {
		lostFoundById,
		setLostFoundById,
		dataLostFound,
		getDataLostFoundById,
		getDataLostFound,
	} = useContext(LostFoundContext);
	const { qrBase, generateQr } = useContext(GenerateQrCodeContext);
	const { dataIdentification, getDataIdentification } = useContext(
		IdentificationContext
	);

	const [tab, setTab] = useState('1');
	const [openIdentifikasi, setIdentifikasi] = useState(false);
	const [openPrint, setOpenPrint] = useState(false);
	const [identificationById, setIdentificationById] = useState(null);
	const [dataImage, setDataImage] = useState({
		url: '/uploads',
		path: '',
		name: '',
	});
	const [dataById, setDataById] = useState(null);
	const [dataStasiun, setDataStasiun] = useState(null);

	const [statusPrint, setStatusPrint] = useState(false);
	const [dataPrint, setDataPrint] = useState(null);

	const tabChange = (_, value) => setTab(value);

	const handleOpenIdentifikasi = () => {
		setIdentifikasi(true);
		setIdentificationById(lostFoundById?.identification);
	};
	const handleCloseIdentifikasi = () => {
		setIdentifikasi(false);
	};

	const handleCetak = async () => {
		// generateQr(lostFoundById?.idNumber);
		setOpenPrint(true);
		// console.log('data qrbase', qrBase);
	};

	const handleSaveIdentification = async data => {
		var postData = {
			identification: data,
			foundStatus: 'Identified',
		};
		const respon = await API.putLostFound(lostFoundById?._id, postData);
		if (respon.statusText === 'OK') {
			setLostFoundById(respon.data.data);
			setIdentifikasi(false);
		} else {
			console.log('data tidak terupdate');
		}
	};

	// console.log('data detail', lostFoundById, state);

	const getStatusStyles = status => {
		switch (status) {
			case 'Unidentified':
				return { backgroundColor: '#FFF5F8', color: '#F1416C' };
			case 'Identified':
				return { backgroundColor: '#FFF8DD', color: '#F6C000' };
			case 'Penyimpanan':
				return { backgroundColor: '#EEF6FF', color: '#3E97FF' };
			case 'Claimed':
				return { backgroundColor: '#E8FFF3', color: '#50CD89' };
			default:
				return null; // Mengembalikan null jika status tidak ditemukan
		}
	};

	// Mendapatkan gaya berdasarkan status
	const statusStyles = getStatusStyles(
		status == 'Detail'
			? lostFoundById?.foundStatus
			: dataLostFound[0]?.foundStatus
	);

	// Print Label
	const handlePrint = () => {
		setStatusPrint(true);
		setDataPrint(dataById);
		// console.log('data print', dataById);
		// return;
		setTimeout(() => {
			const printContents = printRef.current.innerHTML;
			const originalContents = document.body.innerHTML;

			document.body.innerHTML = printContents;
			window.print();
			document.body.innerHTML = originalContents;
			window.location.reload();
		}, 0);
	};

	const handleEdit = () => {
		navigate('/manajemenBarang/penemuan/add', {
			state: { id: id, status: 'Edit' },
		});
	};

	useEffect(() => {
		if (status === 'Detail') {
			getDataLostFoundById(id);
		} else if (status === 'Pengambilan') {
			getDataLostFound({ idNumber: idNumber });
		}
		getDataIdentification();
	}, []);

	useEffect(() => {
		if (status == 'Detail') {
			generateQr(lostFoundById?.idNumber);
			if (lostFoundById?.foundPhoto !== null) {
				if (lostFoundById?.foundPhoto?.uploadedFiles?.length > 0) {
					const _foundPhoto =
						lostFoundById?.foundPhoto?.uploadedFiles[0]?.uploadedName;
					const _pathPhoto = lostFoundById?.foundPhoto?.path;
					setDataImage({
						url: '/uploads',
						path: `/${_pathPhoto}`,
						name: `/${_foundPhoto}`,
					});
				}
			}
			setDataById(lostFoundById);
		} else if (status === 'Pengambilan') {
			const _data = dataLostFound[0];
			const _storage = dataLostFound[0]?.storageLocation;
			const _storageLast = _storage ? _storage[_storage.length - 1] : null;
			// console.log(status, _data);
			generateQr(idNumber);
			if (_data?.foundPhoto !== null) {
				if (_data?.foundPhoto?.uploadedFiles?.length > 0) {
					const _foundPhoto = _data?.foundPhoto?.uploadedFiles[0]?.uploadedName;
					const _pathPhoto = _data?.foundPhoto?.path;
					setDataImage({
						url: '/uploads',
						path: `/${_pathPhoto}`,
						name: `/${_foundPhoto}`,
					});
				}
			}
			setDataStasiun(_storageLast);
			setDataById(_data);
		}
	}, [lostFoundById, dataLostFound]);

	// console.log('id detail', id)

	return (
		<Box
			sx={{
				padding: { xs: '15px', sm: '30px' },
				background: '#FFF',
				minHeight: '100vh',
			}}
		>
			<Grid container spacing={3}>
				<Grid item xs={12} sm={12}>
					<CustomNewHeader
						judul="PENEMUAN BARANG"
						title1="Home - Lost & Found - Penemuan Barang - "
						title2="Detail Barang"
					/>
				</Grid>
				<Grid
					item
					xs={12}
					sm={12}
					sx={{ display: 'flex', justifyContent: 'center' }}
				>
					<Stack direction="row" spacing={2} alignItems="center">
						<Title18700 text={'No. Laporan: ' + dataById?.idNumber} />
						{dataById?.foundStatus !== 'Claimed' && (
							<IconButton onClick={handleEdit}>
								<EditIcon sx={{ color: '#3E97FF' }} />
							</IconButton>
						)}
					</Stack>
				</Grid>
				<Grid item xs={12} sm={12}>
					<Title16700 text="DETAIL BARANG" />
				</Grid>
				<Grid item xs={12} sm={12}>
					<Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
						<img
							src={
								StaticVar.URL_API +
								dataImage.url +
								dataImage.path +
								dataImage.name
							}
							style={{
								objectFit: 'cover',
								height: '220px',
								width: { xs: '100%', sm: '350px' },
								borderRadius: '8px',
							}}
						/>
						<Box>
							<Box
								sx={{
									width: { xs: '100%', sm: '30%' },
									mb: 2,
								}}
							>
								<StatusBox
									text={dataById?.foundStatus}
									color={statusStyles ? statusStyles.color : 'black'}
									backgroundColor={
										statusStyles ? statusStyles.backgroundColor : 'transparent'
									}
								/>
							</Box>
							<Stack direction="row" spacing={3}>
								<Box sx={{ width: '100%' }}>
									<Title14600 text="Jenis Barang" />
									<Title14400 text={dataById?.foundName} />
								</Box>
								<Box sx={{ width: '100%' }}>
									<Title14600 text="Identifikasi" />
									<Title14400
										text={dataById?.identification?.identificationName}
									/>
								</Box>
								<Box sx={{ width: '100%' }}>
									<Title14600 text="Batas Waktu Penyimpanan" />
									<Title14400
										text={
											dataById?.identification !== null
												? dataById?.identification?.identificationExpired
														?.expiredValue +
												  ' ' +
												  dataById?.identification?.identificationExpired
														?.expiredType
												: '-'
										}
									/>
								</Box>
							</Stack>
							<Box sx={{ width: '100%', mt: 1 }}>
								<Title14600 text="Detail / Katakteristik" />
								<Title14400 text={dataById?.foundDescription} />
							</Box>
							<Stack direction="row" spacing={2} sx={{ mt: 1 }}>
								<Button variant="text" onClick={handlePrint}>
									Cetak Label Barang
								</Button>
								{dataById?.foundStatus === 'Unidentified' ? (
									<Button variant="contained" onClick={handleOpenIdentifikasi}>
										Identifikasi
									</Button>
								) : null}
							</Stack>
						</Box>
					</Stack>
				</Grid>
				<Grid item xs={12} sm={12}>
					<TabContext value={tab}>
						<Box
							sx={{
								paddingTop: 1,
								paddingLeft: 2,
								'& .MuiTab-root': {
									fontSize: 12,
									fontWeight: 600,
								},
							}}
						>
							<TabList
								onChange={tabChange}
								textColor="#3F4254"
								indicatorColor="primary"
							>
								<Tab disableRipple label="Penemuan" value="1" />
								<Tab disableRipple label="Pengambilan" value="2" />
								<Tab disableRipple label="Pengaduan" value="3" />
							</TabList>
						</Box>

						<TabPanel value="1">
							<PenemuanPenyimpanan
								dataFound={dataById}
								dataStorage={dataById?.storageLocation}
							/>
						</TabPanel>

						<TabPanel value="2">
							<Pengambalian dataFound={dataById} />
						</TabPanel>
						<TabPanel value="3">
							<Pengaduan dataFound={dataById} />
						</TabPanel>
					</TabContext>
				</Grid>
			</Grid>

			{/* modal identifikasi */}
			<AppModalSmall
				open={openIdentifikasi}
				handleClose={handleCloseIdentifikasi}
			>
				<AddIdentification
					data={dataIdentification}
					dataById={identificationById}
					handleSubmit={handleSaveIdentification}
					handleCancel={handleCloseIdentifikasi}
					type="Detail"
				/>
			</AppModalSmall>

			{/* modal cetak */}
			<PrintQrCode
				open={openPrint}
				handleClose={() => setOpenPrint(false)}
				src={qrBase}
				title={lostFoundById?.idNumber}
				titleClose="Kembali"
			/>

			{/* Print Out Label */}
			{statusPrint === true && (
				<div ref={printRef}>
					<PrintLabel src={qrBase} dataPrint={dataPrint} />
				</div>
			)}
		</Box>
	);
}

export default DetailPenemuanBarang;
