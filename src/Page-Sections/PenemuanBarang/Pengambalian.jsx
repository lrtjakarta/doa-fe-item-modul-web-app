import { Box, Typography, Stack, Grid, Button, Dialog } from '@mui/material';
import React, { useEffect, useState, useContext, useRef } from 'react';

import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { KeyboardArrowDown } from '@mui/icons-material';
import imageCompression from 'browser-image-compression';
import PrintOutlinedIcon from '@mui/icons-material/PrintOutlined';

import ImgBukti from '../../Assets/bukti.png';
import moment from 'moment';
import { useReactToPrint } from 'react-to-print';

import Title16700 from 'Component/Typographys/Title16700';
import Title14600 from 'Component/Typographys/Title14600';
import Title14400 from 'Component/Typographys/Title14400';
import AppTextField from 'Component/input-fields/AppTextField';
import MultiUpload from 'Component/MultiUpload/MultiUpload';

import ImageUpload from 'Page-Sections/PenemuanBarang/ImageUpload';

import API from 'Services/Api';
import { LostFoundContext } from 'Context/LostFound';
import { LocationContext } from 'Context/Location';
import { UserProfilContext } from 'Context/UserProfile';
import { useNavigate } from 'react-router-dom';
import StaticVar from 'Config/StaticVar';
import PrintPengambilan from './PrintOutPenemuan/PrintPengambilan';

function Pengambalian(props) {
	const navigate = useNavigate();
	const { dataFound } = props;
	const componentRef = useRef();

	// context
	const { dataLocation, getDataLocation } = useContext(LocationContext);
	const { userProfilById, userWorkorder, userProfile } =
		useContext(UserProfilContext);

	// state
	const [statusPickUp, setStatusPickUp] = useState('');
	const [loading, setLoading] = useState(false);
	const [notifMsg, setNotifMsg] = useState('');
	const [notif, setNotif] = useState(false);

	const [dataById, setDataById] = useState(null);
	const [dataPickUp, setDataPickUp] = useState(null);
	const [dataLastStorage, setDataLastStorage] = useState(null);
	const [pickUpLocation, setPickUpLocation] = useState('');
	const [pickUpDate, setPickUpDate] = useState(new Date());
	const [pickUpTime, setPickUpTime] = useState(new Date());
	const [pickUpName, setPickUpName] = useState('');
	const [identityNumber, setIdentityNumber] = useState('');
	const [phoneNumber, setPhoneNumber] = useState('');
	const [email, setEmail] = useState('');
	const [error, setError] = useState(false);
	const [lostChronology, setLostChronology] = useState('');
	const [photo, setPhoto] = useState([]);
	const [pickUpPhoto, setPickUpPhoto] = useState(null);

	const [images, setImages] = useState([]);
	const [errors, setErrors] = useState([]);
	const [statusUpload, setStatusUpload] = useState(false);

	const [status, setStatus] = useState(false);
	const [dataPrint, setDataPrint] = useState(null);

	// handle
	const handlePickup = () => {
		setStatusPickUp('Form');
	};

	const handleChangeEmail = e => {
		setEmail(e.target.value);
		setError(!isValidEmail(e.target.value));
	};

	const isValidEmail = email => {
		return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
	};

	const handleClose = () => {};

	const handleSubmit = async e => {
		await setLoading(true);
		const result = await handleSave(e);
		if (result.statusText === 'OK') {
			if (dataById?.lostId !== undefined && dataById?.lostId !== null) {
				const updateData = {
					complaintStatus: 'Claimed',
				};
				const respon = await API.putGoodsComplaint(
					dataById?.lostId,
					updateData
				);
			}
			const _dataUpdate = result.data.data;
			setDataById(_dataUpdate);
			setStatusPickUp('View');
			window.location.reload();
		} else {
			setNotifMsg('Gagal!');
			setLoading(false);
		}
	};

	const handleSave = async () => {
		//  upload image
		if (!images || images.length === 0) {
			alert('No files selected.');
			return;
		}

		const formData = new FormData();
		images.forEach(image => {
			formData.append('files', image.file);
		});

		const respon = await API.postManyImage('penemuan/pengambilan', formData);
		if (respon.statusText === 'OK') {
			setPhoto(respon.data);
			setStatusUpload(true);
			console.log('upload image berhasil');

			const _dataStasiun = dataLocation.filter(x => x._id === pickUpLocation);
			const updateData = {
				foundStatus: 'Claimed',
				storageLocation: [
					...dataById?.storageLocation,
					{
						location: _dataStasiun[0]?.locationName,
						storageDate: pickUpDate,
						storageTime: pickUpTime,
						...userProfile,
					},
				],
				pickUp: {
					pickUpName, // nama pemilik barang
					identityNumber, // no ktp/sim/paspor
					phoneNumber, // nomor telepon
					email,
					pickUpLocation: _dataStasiun[0]?.locationName, // lokasi terakhir
					pickUpTime, // waktu pengambilan
					pickUpDate,
					lostChronology,
					photo: respon.data,
				},
			};
			return API.putLostFound(dataById?._id, updateData);
		}
	};

	const handleImageChange = async event => {
		const files = Array.from(event.target.files);
		const validFiles = files.filter(
			file =>
				file.type === 'image/jpeg' ||
				file.type === 'image/jpg' ||
				file.type === 'image/png'
		);

		if (validFiles.length !== files.length) {
			setErrors([
				...errors,
				'Maaf, file yang Anda upload memiliki format yang salah. Silahkan Pilih format yang sesuai (JPEG, JPG, PNG)',
			]);
		}

		// const newImages = validFiles.map(file => ({
		// 	file,
		// 	preview: URL.createObjectURL(file),
		// }));

		const compressedFilesPromises = validFiles.map(async file => {
			const options = {
				maxSizeMB: 1, // Maximum size in MB
				maxWidthOrHeight: 1024, // Maximum width or height in pixels
				useWebWorker: true, // Use web worker for faster compression
			};
			try {
				const compressedFile = await imageCompression(file, options);
				return {
					file: compressedFile,
					preview: URL.createObjectURL(compressedFile),
				};
			} catch (error) {
				console.error('Error compressing image:', error);
				return {
					file,
					preview: URL.createObjectURL(file),
				};
			}
		});

		const compressedFiles = await Promise.all(compressedFilesPromises);

		setImages(prevImages => [...prevImages, ...compressedFiles]);
	};

	const handleDeleteImage = index => {
		setImages(images.filter((_, i) => i !== index));
	};

	const handleDialogPrint = () => {
		setStatus(true);
	};

	const handlePrint = useReactToPrint({
		content: () => componentRef.current,
	});

	// useEffect
	useEffect(() => {
		const checkPickUp = dataFound.pickUp;
		if (checkPickUp === null) {
			setStatusPickUp('Cari');
		} else {
			setStatusPickUp('View');
			setDataPickUp(checkPickUp);
		}
		setDataById(dataFound);
		// getDataLostFound(dataFound._id);
		getDataLocation();
	}, []);

	useEffect(() => {
		const _storage = dataById?.storageLocation;
		const _lastStorage =
			_storage?.length > 0 ? _storage[_storage.length - 1] : '-';

		// console.log('lokasi terakhir', _lastStorage)

		const _pickUp = dataById?.pickUp;
		const _pickUpPhoto = _pickUp?.photo?.uploadedFiles[0]?.uploadedName;
		const _pickUpPath = _pickUp?.photo?.path;
		const _dataPhoto = {
			url: '/uploads',
			path: '/' + _pickUpPath,
			name: '/' + _pickUpPhoto,
		};

		// console.log('_dataPhoto', _dataPhoto)
		setPickUpPhoto(_dataPhoto);

		setDataLastStorage(_lastStorage);
		setPickUpLocation(_lastStorage?.location);
	}, [dataLocation]);

	return (
		<Box>
			{statusPickUp === 'Cari' ? (
				<Grid container spacing={2}>
					<Grid
						item
						xs={12}
						sm={12}
						sx={{ display: 'flex', justifyContent: 'center' }}
					>
						<Title14400 text="Tidak ada data pengambilan barang" />
					</Grid>
					<Grid
						item
						xs={12}
						sm={12}
						sx={{ display: 'flex', justifyContent: 'center' }}
					>
						<Button variant="contained" onClick={handlePickup}>
							Pengambilan
						</Button>
					</Grid>
				</Grid>
			) : statusPickUp === 'Form' ? (
				<Grid container spacing={2}>
					<Grid item xs={12} sm={12} sx={{ mt: 3 }}>
						<Typography
							sx={{ fontSize: 16, fontWeight: 700, color: '#011E3D' }}
						>
							INFORMASI PENGAMBILAN BARANG
						</Typography>
					</Grid>
					<Grid item xs={12} sm={6}>
						<AppTextField
							select
							fullWidth
							label="Lokasi Pengambilan Barang"
							SelectProps={{
								native: true,
								IconComponent: KeyboardArrowDown,
							}}
							value={pickUpLocation}
							onChange={e => setPickUpLocation(e.target.value)}
						>
							<option value=""></option>
							{dataLocation
								.filter(x => x.locationType !== 'found')
								.map(item => {
									return (
										<option value={item.locationName}>
											{item.locationName}
										</option>
									);
								})}
						</AppTextField>
					</Grid>
					<Grid item xs={12} sm={3}>
						<DatePicker
							label="Tanggal"
							value={pickUpDate}
							onChange={date => setPickUpDate(date)}
							slots={{
								textField: AppTextField,
							}}
							slotProps={{
								textField: {
									fullWidth: true,
								},
							}}
						/>
					</Grid>
					<Grid item xs={12} sm={3}>
						<TimePicker
							label="Waktu"
							value={pickUpTime}
							onChange={date => setPickUpTime(date)}
							slots={{
								textField: AppTextField,
							}}
							slotProps={{
								textField: {
									fullWidth: true,
								},
							}}
						/>
					</Grid>
					<Grid item xs={12} sm={6}>
						<AppTextField
							fullWidth
							label="Nama Pemilik Barang"
							value={pickUpName}
							onChange={e => setPickUpName(e.target.value)}
						/>
					</Grid>
					<Grid item xs={12} sm={6}>
						<AppTextField
							fullWidth
							label="Nomor Identitas"
							type="number"
							value={identityNumber}
							onChange={e => setIdentityNumber(e.target.value)}
						/>
					</Grid>
					<Grid item xs={12} sm={6}>
						<AppTextField
							fullWidth
							label="Nomor Telp Pemilik Barang"
							type="number"
							value={phoneNumber}
							onChange={e => setPhoneNumber(e.target.value)}
						/>
					</Grid>
					<Grid item xs={12} sm={6}>
						<AppTextField
							fullWidth
							label="Email Pemilik Barang"
							type="email"
							value={email}
							onChange={handleChangeEmail}
							error={error}
							helperText={error ? 'Masukkan alamat email yang valid' : ''}
						/>
					</Grid>
					<Grid item xs={12} sm={12}>
						<AppTextField
							multiline
							fullWidth
							rows={3}
							label="Kronologi Pengambilan Barang"
							value={lostChronology}
							onChange={e => setLostChronology(e.target.value)}
							sx={{
								'& .MuiOutlinedInput-root textarea': {
									padding: 0,
								},
							}}
						/>
					</Grid>
					<Grid item xs={12} sm={12}>
						<MultiUpload
							images={images}
							errors={errors}
							handleImageChange={handleImageChange}
							handleDeleteImage={handleDeleteImage}
							// handleUpload={handleUpload}
							status={statusUpload}
						/>
					</Grid>
					<Grid
						item
						xs={12}
						sm={12}
						sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2, gap: 1, mb: 7 }}
					>
						<Button
							variant="outlined"
							color="error"
							sx={{ padding: '10px 35px' }}
							onClick={handleClose}
						>
							Batal
						</Button>

						<Button
							onClick={handleSubmit}
							variant="contained"
							sx={{ padding: '10px 35px' }}
						>
							Submit
						</Button>
					</Grid>
				</Grid>
			) : statusPickUp === 'View' ? (
				<>
					{dataPickUp !== null ? (
						<Grid container spacing={2}>
							<Grid item xs={6} sm={6}>
								<Title16700 text="DATA PEMILIK" />
							</Grid>
							<Grid
								item
								xs={6}
								sm={6}
								sx={{ display: 'flex', justifyContent: 'flex-end' }}
							>
								<Button variant="contained" onClick={handleDialogPrint}>
									Cetak
								</Button>
							</Grid>
							<Grid item xs={12} sm={3}>
								<Title14600 text="Nama Pemilik" />
								<Title14400
									text={dataPickUp.pickUpName ? dataPickUp.pickUpName : '-'}
								/>
							</Grid>
							<Grid item xs={12} sm={3}>
								<Title14600 text="Nomor Identitas" />
								<Title14400
									text={
										dataPickUp.identityNumber ? dataPickUp.identityNumber : '-'
									}
								/>
							</Grid>
							<Grid item xs={12} sm={3}>
								<Title14600 text="No. Telepon" />
								<Title14400
									text={dataPickUp.phoneNumber ? dataPickUp.phoneNumber : '-'}
								/>
							</Grid>
							<Grid item xs={12} sm={3}>
								<Title14600 text="Email" />
								<Title14400 text={dataPickUp.email ? dataPickUp.email : '-'} />
							</Grid>
							<Grid item xs={12} sm={12}>
								<Title16700 text="INFORMASI PENGAMBILAN" />
							</Grid>
							<Grid item xs={12} sm={4}>
								<Title14600 text="Lokasi Ditemukan" />
								<Title14400
									text={
										dataPickUp.pickUpLocation ? dataPickUp.pickUpLocation : '-'
									}
								/>
							</Grid>
							<Grid item xs={12} sm={4}>
								<Title14600 text="Waktu Penemuan" />
								<Title14400
									text={
										dataPickUp.pickUpTime
											? moment(dataPickUp.pickUpTime).format('DD/MM/YYYY')
											: '-'
									}
								/>
							</Grid>
							<Grid item xs={12} sm={4}>
								<Title14600 text="Petugas yang menemukan" />
								<Title14400 text={dataLastStorage?.officerName} />
								<Title14400 text={dataLastStorage?.officerPosition} />
							</Grid>
							<Grid item xs={12} sm={12}>
								<Title14600 text="Kronologi Penemuan" />
								<Title14400
									text={
										dataPickUp.lostChronology ? dataPickUp.lostChronology : '-'
									}
								/>
							</Grid>
							<Grid item xs={12} sm={12} sx={{mb: 7}}>
								<Title14600 text="Dokumentasi Pengambilan" />
								<img
									src={
										StaticVar.URL_API +
										pickUpPhoto.url +
										pickUpPhoto.path +
										pickUpPhoto.name
									}
									style={{
										objectFit: 'cover',
										width: '299px',
										marginTop: '10px',
									}}
								/>
							</Grid>
						</Grid>
					) : null}

					<Dialog open={status} fullScreen>
						<Stack
							direction="row"
							justifyContent="flex-end"
							spacing={2}
							sx={{ m: 3 }}
						>
							<Button
								sx={{ width: '100px' }}
								variant="outlined"
								onClick={() => setStatus(false)}
							>
								Kembali
							</Button>
							<Button
								sx={{ width: '100px' }}
								variant="contained"
								onClick={handlePrint}
								startIcon={<PrintOutlinedIcon />}
							>
								Print
							</Button>
						</Stack>
						<div ref={componentRef}>
							<PrintPengambilan dataId={dataPrint} />
						</div>
					</Dialog>
				</>
			) : null}
		</Box>
	);
}

export default Pengambalian;
