import React, { useState, useCallback, useContext, useEffect } from 'react';
import './style.css';
import HeaderPenemuan from 'Page-Sections/PenemuanBarang/HeaderPenemuan';
import {
	Card,
	Stack,
	Typography,
	Box,
	Button,
	Snackbar,
	Alert,
	Backdrop,
	Grid,
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { KeyboardArrowDown } from '@mui/icons-material';
import { useNavigate, useLocation } from 'react-router-dom';
import moment from 'moment';
import CircularProgress from '@mui/material/CircularProgress';
import { jwtDecode } from 'jwt-decode';
import imageCompression from 'browser-image-compression';

import CardProfil from 'Component/Cards/CardProfil';
import AppTextField from 'Component/input-fields/AppTextField';
import CustomNewHeader from 'Component/Headers/CustomNewHeader';
import Title14600 from 'Component/Typographys/Title14600';
import Title14400 from 'Component/Typographys/Title14400';
import MultiUpload from 'Component/MultiUpload/MultiUpload';

import FotoBarang from 'Assets/barang.png';

import ImageUpload from 'Page-Sections/PenemuanBarang/ImageUpload';
import StorageLocation from 'Page-Sections/PenemuanBarang/Data/StorageLocation';

import { LostFoundContext } from 'Context/LostFound';
import { UserProfilContext } from 'Context/UserProfile';
import { GoodsComplaintContext } from 'Context/GoodsComplaint';
import { LocationContext } from 'Context/Location';

import API from 'Services/Api';
import StaticVar from 'Config/StaticVar';

function FormPengambilanBarang() {
	const navigate = useNavigate();
	const location = useLocation();
	const { _idNumber } = location.state;
	// console.log('data idNumber', _idNumber);

	const { dataLostFound, getDataLostFound } = useContext(LostFoundContext);
	const { userProfilById, getUserProfilById, userProfile } =
		useContext(UserProfilContext);
	const { goodsComplaintById, getDataGoodsComplaintById } = useContext(
		GoodsComplaintContext
	);
	const { dataLocation, getDataLocation } = useContext(LocationContext);

	const [files, setFiles] = useState([]);
	const [selectedFiles, setSelectedFiles] = useState(null);

	const [loading, setLoading] = useState(false);
	const [notifMsg, setNotifMsg] = useState('');
	const [notif, setNotif] = useState(false);

	const [dataByIdNumber, setDataByIdNUmber] = useState(null);
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

	const [dataImage, setDataImage] = useState({
		url: '/uploads',
		path: '',
		name: '',
	});

	const [images, setImages] = useState([]);
	const [errors, setErrors] = useState([]);
	const [statusUpload, setStatusUpload] = useState(false);

	const handleRemoveImage = file => {
		const filteredFiles = files.filter(_file => _file !== file);
		setFiles(filteredFiles);
		setSelectedFiles(filteredFiles);
	};

	// convert fprmat [files, files] to {0:files, length: 1}
	const transformFiles = files => {
		const fileObject = {};
		for (let i = 0; i < files.length; i++) {
			fileObject[i] = files[i];
		}
		fileObject.length = files.length;
		return fileObject;
	};

	const handleDropFile = useCallback(acceptedFiles => {
		const files = acceptedFiles.map(file =>
			Object.assign(file, {
				preview: URL.createObjectURL(file),
			})
		);
		setFiles(files);
		setSelectedFiles(acceptedFiles);
	}, []);

	const handleUpload = async () => {
		if (!selectedFiles || selectedFiles.length === 0) {
			alert('No files selected.');
			return;
		}

		const transformedFiles = transformFiles(selectedFiles);

		const formData = new FormData();
		for (let i = 0; i < transformedFiles.length; i++) {
			formData.append('files', transformedFiles[i]);
		}

		const respon = await API.postManyImage(
			'penemuan/pengambilanBarang',
			formData
		);
		if (respon.statusText === 'OK') {
			setPhoto(respon.data);
		}
		// console.log('data respon', respon.data.uploadedFiles);
	};

	const handleClose = () => {
		navigate(-2);
	};

	const submitForm = async e => {
		await setLoading(true);
		const result = await handleSubmit(e);
		// return;
		// console.log('result submit', result);
		if (result.statusText === 'OK') {
			// navigate(-2);
			// console.log(dataByIdNumber?.lostId);
			if (
				dataByIdNumber?.lostId !== undefined &&
				dataByIdNumber?.lostId !== null
			) {
				console.log('ini jalan');
				const updateData = {
					complaintStatus: 'Claimed',
				};
				const respon = await API.putGoodsComplaint(
					dataByIdNumber?.lostId,
					updateData
				);
				if (respon.statusText === 'OK') {
					setLoading(false);
					navigate('/app/manajemenBarang/penemuan');
					window.location.reload();
				}
			} else {
				navigate('/app/manajemenBarang/penemuan');
				setLoading(false);
				window.location.reload();
			}
		} else {
			setNotifMsg('Gagal!');
			setLoading(false);
		}
	};

	const handleSubmit = async function (event) {
		console.log('dataByIdNumber?.lostId', dataByIdNumber?.lostId);
		// return;
		if (!images || images.length === 0) {
			alert('No files selected.');
			return;
		}
		const formData = new FormData();
		images.forEach(image => {
			formData.append('files', image.file);
		});
		const respon = await API.postManyImage('penemuan/pengambilan', formData);
		// console.log('respon gambar', respon);
		if (respon.statusText === 'OK') {
			setStatusUpload(true);
			console.log('upload image berhasil');

			event.preventDefault();
			var postData = {
				...dataByIdNumber,
				foundStatus: 'Claimed',
				storageLocation: [
					...dataByIdNumber.storageLocation,
					{
						location: pickUpLocation,
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
					pickUpLocation: pickUpLocation, // lokasi terakhir
					pickUpTime, // waktu pengambilan
					pickUpDate,
					lostChronology,
					photo: respon.data,
				},
			};
			// console.log('post data', postData);
			return API.putLostFound(dataByIdNumber._id, postData);
		}
	};

	const handleChangeEmail = e => {
		setEmail(e.target.value);
		setError(!isValidEmail(e.target.value));
	};

	const isValidEmail = email => {
		return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
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

		//   console.log('compressedFiles', compressedFiles)

		setImages(prevImages => [...prevImages, ...compressedFiles]);
	};

	const handleDeleteImage = index => {
		setImages(images.filter((_, i) => i !== index));
	};

	useEffect(() => {
		getDataLostFound({ idNumber: _idNumber });
		getDataLocation();
	}, []);

	useEffect(() => {
		if (dataLostFound.length > 0) {
			const _storage = dataLostFound[0]?.storageLocation;
			const _storageLast =
				_storage?.length > 0 ? _storage[_storage.length - 1] : '-';

			// console.log('_storageLast?.location', _storageLast?.location);

			if (
				dataLostFound[0]?.lostId !== undefined &&
				dataLostFound[0]?.lostId !== null
			) {
				getDataGoodsComplaintById(dataLostFound[0]?.lostId);
			}
			const _data = dataLostFound[0];
			if (_data?.foundPhoto !== null) {
				const _foundPhoto = _data?.foundPhoto?.uploadedFiles[0]?.uploadedName;
				const _pathPhoto = _data?.foundPhoto?.path;
				setDataImage({
					url: '/uploads',
					path: `/${_pathPhoto}`,
					name: `/${_foundPhoto}`,
				});
			}
			setDataByIdNUmber(dataLostFound[0]);
			setPickUpLocation(_storageLast?.location);
		}
	}, [dataLostFound, dataLocation]);

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

			<Grid container spacing={3}>
				<Grid item xs={12} sm={12}>
					<CustomNewHeader
						judul="PENGAMBILAN BARANG"
						title1="Home / Lost & Found / Pengambilan Barang / "
						title2="Form Pengambilan Barang"
					/>
				</Grid>
				<Grid item xs={12} sm={12} sx={{ my: 3 }}>
					<CardProfil />
				</Grid>
				<Grid item xs={12} sm={12}>
					<Typography sx={{ fontSize: 16, fontWeight: 700, color: '#011E3D' }}>
						DETAIL BARANG
					</Typography>
				</Grid>
				<Grid item xs={12} sm={3}>
					<img
						src={
							StaticVar.URL_API +
							dataImage.url +
							dataImage.path +
							dataImage.name
						}
						style={{
							objectFit: 'cover',
							height: '100px',
							width: '100%',
						}}
					/>
				</Grid>
				<Grid item xs={12} sm={9}>
					<Grid container spacing={2}>
						<Grid item xs={12} sm={3}>
							<Stack direction="column" spacing={1}>
								<Typography sx={{ fontSize: 14, fontWeight: 600 }}>
									Nama Barang
								</Typography>
								<Typography sx={{ fontSize: 14, fontWeight: 600 }}>
									Jenis Barang
								</Typography>
								<Typography sx={{ fontSize: 14, fontWeight: 600 }}>
									Detail / Karakteristik
								</Typography>
								<Typography sx={{ fontSize: 14, fontWeight: 600 }}>
									Identifikasi
								</Typography>
							</Stack>
						</Grid>
						<Grid item xs={12} sm={9}>
							<Stack direction="column" spacing={1}>
								<Typography sx={{ fontSize: 14, fontWeight: 400 }}>
									{dataByIdNumber?.foundName}
								</Typography>
								<Typography sx={{ fontSize: 14, fontWeight: 400 }}>
									{dataByIdNumber?.foundType}
								</Typography>
								<Typography sx={{ fontSize: 14, fontWeight: 400 }}>
									{dataByIdNumber?.foundDescription}
								</Typography>
								<Typography sx={{ fontSize: 14, fontWeight: 400 }}>
									{dataByIdNumber?.identification?.identificationName}
								</Typography>
							</Stack>
						</Grid>
					</Grid>
				</Grid>
				<Grid item xs={12} sm={12} sx={{ mt: 2 }}>
					<Typography sx={{ fontSize: 16, fontWeight: 700, color: '#011E3D' }}>
						INFORMASI PENEMUAN BARANG
					</Typography>
				</Grid>
				<Grid item xs={12} sm={4}>
					<Typography sx={{ fontSize: 14, fontWeight: 600 }}>
						Nomor Laporan
					</Typography>
					<Typography sx={{ fontSize: 14, fontWeight: 400 }}>
						{dataByIdNumber?.idNumber}
					</Typography>
				</Grid>
				<Grid item xs={12} sm={4}>
					<Typography sx={{ fontSize: 14, fontWeight: 600 }}>
						Lokasi Ditemukan
					</Typography>
					<Typography sx={{ fontSize: 14, fontWeight: 400 }}>
						{dataByIdNumber?.foundLocation}
					</Typography>
				</Grid>
				<Grid item xs={12} sm={4}>
					<Typography sx={{ fontSize: 14, fontWeight: 600 }}>
						Waktu Penemuan
					</Typography>
					<Typography sx={{ fontSize: 14, fontWeight: 400 }}>
						{moment(dataByIdNumber?.foundDate).format('DD/MM/YYYY') +
							' ' +
							moment(dataByIdNumber?.foundTime).format('HH:mm')}
					</Typography>
				</Grid>
				<Grid item xs={12} sm={12}>
					<Typography sx={{ fontSize: 14, fontWeight: 600 }}>
						Petugas Penemu Barang
					</Typography>
					<Typography sx={{ fontSize: 14, fontWeight: 400 }}>
						{dataByIdNumber?.foundBy}
					</Typography>
				</Grid>
				<Grid item xs={12} sm={12}>
					<Typography sx={{ fontSize: 14, fontWeight: 600 }}>
						Kronologi Penemuan
					</Typography>
					<Typography sx={{ fontSize: 14, fontWeight: 400 }}>
						{dataByIdNumber?.foundChronology}
					</Typography>
				</Grid>
				{dataByIdNumber?.lostId !== undefined &&
				dataByIdNumber?.lostId !== null ? (
					<>
						<Grid item xs={12} sm={12} sx={{ mt: 3 }}>
							<Typography
								sx={{ fontSize: 16, fontWeight: 700, color: '#011E3D' }}
							>
								INFORMASI PENGADUAN
							</Typography>
						</Grid>
						<Grid item xs={12} sm={4}>
							<Title14600 text="Jenis Barang" />
							<Title14400 text={goodsComplaintById?.complaintName} />
						</Grid>
						<Grid item xs={12} sm={4}>
							<Title14600 text="Tanggal & Waktu Kehilangan" />
							<Title14400
								text={
									moment(goodsComplaintById?.complaintDate).format(
										'DD/MM/YYYY'
									) +
									' ' +
									moment(goodsComplaintById?.complaintTime).format('HH:mm')
								}
							/>
						</Grid>
						<Grid item xs={12} sm={4}>
							<Title14600 text="Lokasi Kehilangan" />
							<Title14400 text={goodsComplaintById?.complaintLocation} />
						</Grid>
						<Grid item xs={12} sm={12}>
							<Title14600 text="Detail / Karakteristik" />
							<Title14400 text={goodsComplaintById?.complaintDescription} />
						</Grid>
						<Grid item xs={12} sm={12}>
							<Title14600 text="Kronologi Kehilangan" />
							<Title14400 text={goodsComplaintById?.complaintChronology} />
						</Grid>
						<Grid item xs={12} sm={3}>
							<Title14600 text="Nama" />
							<Title14400 text={goodsComplaintById?.complaintBy} />
						</Grid>
						<Grid item xs={12} sm={3}>
							<Title14600 text="Nomor Identitas" />
							<Title14400 text={goodsComplaintById?.complaintIdentity} />
						</Grid>
						<Grid item xs={12} sm={3}>
							<Title14600 text="Nomor Telepon" />
							<Title14400 text={goodsComplaintById?.complaintPhone} />
						</Grid>
						<Grid item xs={12} sm={3}>
							<Title14600 text="Alamat Email" />
							<Title14400 text={goodsComplaintById?.complaintEmail} />
						</Grid>
						<Grid item xs={12} sm={12}>
							<Title14600 text="Alamat Tempat Tinggal" />
							<Title14400 text={goodsComplaintById?.complaintAddress} />
						</Grid>
					</>
				) : null}
				<Grid item xs={12} sm={12} sx={{ mt: 3 }}>
					<Typography sx={{ fontSize: 16, fontWeight: 700, color: '#011E3D' }}>
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
									<option value={item.locationName}>{item.locationName}</option>
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
				{/* <Grid item xs={12} sm={12}>
					<ImageUpload
						handleRemoveImage={handleRemoveImage}
						onDrop={handleDropFile}
						files={files}
					/>
					<Button variant="outlined" onClick={handleUpload} sx={{ mt: 2 }}>
						Upload Gambar
					</Button>
				</Grid> */}
				<Grid
					item
					xs={12}
					sm={12}
					sx={{ display: 'flex', justifyContent: 'flex-end', mt: 5 }}
				>
					<Stack direction="row" spacing={1}>
						<Button
							variant="outlined"
							color="error"
							sx={{ padding: '10px 35px' }}
							onClick={handleClose}
						>
							Batal
						</Button>

						<Button
							onClick={submitForm}
							variant="contained"
							sx={{ padding: '10px 35px' }}
						>
							Submit
						</Button>
					</Stack>
				</Grid>
			</Grid>
		</Box>
	);
}

export default FormPengambilanBarang;
