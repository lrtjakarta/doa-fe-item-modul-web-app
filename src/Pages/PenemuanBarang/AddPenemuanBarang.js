import React, {
	useState,
	useCallback,
	useContext,
	useEffect,
	useRef,
} from 'react';
import './style.css';
import {
	Box,
	Card,
	Button,
	Grid,
	Stack,
	Typography,
	Snackbar,
	Alert,
	Backdrop,
} from '@mui/material';
import { KeyboardArrowDown } from '@mui/icons-material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { useLocation, useNavigate } from 'react-router-dom';
import CircularProgress from '@mui/material/CircularProgress';
import imageCompression from 'browser-image-compression';

import AppTextField from 'Component/input-fields/AppTextField';
import CustomNewHeader from 'Component/Headers/CustomNewHeader';
import CardProfil from 'Component/Cards/CardProfil';
import PrintQrCode from 'Component/PrintQrCode';
import Title16700 from 'Component/Typographys/Title16700';
import MultiUpload from 'Component/MultiUpload/MultiUpload';

import API from 'Services/Api';
import StaticVar from 'Config/StaticVar';
import { LostFoundContext } from 'Context/LostFound';
import { UserProfilContext } from 'Context/UserProfile';
import { LocationContext } from 'Context/Location';
import { ItemsContext } from 'Context/Items';

function AddPenemuanBarang() {
	const navigate = useNavigate();
	const location = useLocation();
	const { id, status } = location.state;

	// state
	const {
		dataLostFound,
		getDataLostFound,
		lostFoundById,
		getDataLostFoundById,
	} = useContext(LostFoundContext);
	const { userProfilById, userWorkorder, userProfile } =
		useContext(UserProfilContext);
	const { dataLocation, getDataLocation } = useContext(LocationContext);
	const { dataItems, getDataItems } = useContext(ItemsContext);

	const [loading, setLoading] = useState(false);
	const [notifMsg, setNotifMsg] = useState('');
	const [notif, setNotif] = useState(false);

	const [foundLocation, setFoundLocation] = useState('');
	const [pickUpLocation, setPickUpLocation] = useState('');
	const [foundName, setFoundName] = useState('');
	const [foundType, setFoundType] = useState('');
	const [foundDate, setFoundDate] = useState();
	const [foundTime, setFoundTime] = useState();
	const [foundDescription, setFoundDescription] = useState('');
	const [foundChronology, setFoundChronology] = useState('');
	const [idNumber, setIdNumber] = useState('');
	const [foundPhoto, setFoundPhoto] = useState(null);
	const [identification, setIdentification] = useState(null);
	const [foundBy, setFoundBy] = useState('');

	const [foundStatus, setFoundStatus] = useState('Unidentified');

	const [openPrint, setOpenPrint] = useState(false);
	const [qrBase, setQrBase] = useState('');

	const [images, setImages] = useState([]);
	const [errors, setErrors] = useState([]);
	const [statusUpload, setStatusUpload] = useState(false);

	// handle
	const handleClose = () => {
		navigate(-1);
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

	const submitForm = async e => {
		// return;

		await setLoading(true);

		if (status === 'Edit') {
			const result = await handleSubmitEdit(e);

			// return;
			if (result.statusText === 'OK') {
				// setOpenPrint(true);
				setLoading(false);
				navigate(-1);
				// generateQrCode(idNumber);
			} else {
				setNotifMsg('Gagal!');
				setLoading(false);
			}
		} else {
			const result = await handleSubmit(e);

			// return;
			if (result.statusText === 'OK') {
				// setOpenPrint(true);
				setLoading(false);
				navigate(-1);
				// generateQrCode(idNumber);
			} else {
				setNotifMsg('Gagal!');
				setLoading(false);
			}
		}
	};

	const handleSubmit = async function (event) {
		if (!images || images.length === 0) {
			alert('No files selected.');
			return;
		}
		const formData = new FormData();
		images.forEach(image => {
			formData.append('files', image.file);
		});
		const respon = await API.postManyImage('penemuan/pengambilan', formData);

		const _dataType = dataItems.find(x => x.itemName === foundType);

		// console.log('respon gambar', respon);
		if (respon.statusText === 'OK') {
			setFoundPhoto(respon.data);
			setStatusUpload(true);
			console.log('upload image berhasil');

			event.preventDefault();
			const _dataStasiun = dataLocation.filter(x => x._id === pickUpLocation);
			let postData = {
				foundName,
				foundType,
				foundIdType: _dataType,
				code: 'FO',
				foundPhoto: respon.data,
				foundDescription,
				foundChronology,
				foundStatus,
				identification,
				foundBy,
				foundLocation,
				foundDate,
				foundTime,
				storageLocation: [
					{
						location: _dataStasiun[0]?.locationName,
						storageDate: foundDate,
						storageTime: foundTime,
						...userProfile,
					},
				],
				pickUp: null,
			};

			// console.log('data post', postData);
			// return;
			return API.postLostFound(postData);
		}
	};

	const handleSubmitEdit = async event => {
		event.preventDefault();
		let _foundPhoto;

		if (images.length > 0) {
			const formData = new FormData();
			images.forEach(image => {
				formData.append('files', image.file);
			});
			try {
				const respon = await API.postManyImage(
					'penemuan/pengambilan',
					formData
				);
				if (respon.statusText === 'OK') {
					// _foundPhoto = respon.data;
					_foundPhoto = {
						...lostFoundById?.foundPhoto,
						uploadedFiles: [
							...lostFoundById?.foundPhoto.uploadedFiles, // photo sebelumnya
							...respon.data?.uploadedFiles, // photo baru
						],
					};
					setFoundPhoto(respon.data);
					setStatusUpload(true);
					console.log('upload image berhasil');
				}
			} catch (error) {
				console.error('Error uploading images:', error);
				return;
			}
		}

		// console.log('_foundPhoto', _foundPhoto);
		let _storageLocation = [];
		const _dataStasiun = dataLocation.filter(x => x._id === pickUpLocation);
		const lastLocation =
			lostFoundById.storageLocation[lostFoundById.storageLocation.length - 1];
		const allExceptLast = lostFoundById?.storageLocation?.slice(0, -1);
		const newStorage = {
			location: _dataStasiun[0]?.locationName,
			storageDate: foundDate,
			storageTime: foundTime,
			...userProfile,
		};
		if (lostFoundById?.storageLocation.length > 0) {
			_storageLocation = [
				...allExceptLast,
				{
					...lastLocation,
					location: _dataStasiun[0]?.locationName,
				},
			];
		} else {
			_storageLocation = [newStorage];
		}

		const _dataType = dataItems.find(x => x.itemName === foundType);

		let postData = {
			foundName,
			foundType,
			foundIdType: _dataType,
			idNumber,
			foundPhoto: _foundPhoto ? _foundPhoto : lostFoundById?.foundPhoto,
			foundDescription,
			foundChronology,
			foundStatus,
			identification,
			foundBy,
			foundLocation,
			foundDate,
			foundTime,
			storageLocation: _storageLocation,
			pickUp: null,
		};

		// console.log('data post', postData);
		// console.log('lostFoundById', lostFoundById);
		// return;
		return await API.putLostFound(id, postData);
	};

	const handleCloseModalPrint = () => {
		// setOpenPrint(false);
		navigate(-1);
	};

	const getDataById = () => {
		setFoundLocation(lostFoundById?.foundLocation);
		setFoundName(lostFoundById?.foundName);
		setFoundType(lostFoundById?.foundType);
		setFoundDate(lostFoundById?.foundDate);
		setFoundTime(lostFoundById?.foundTime);
		setFoundDescription(lostFoundById?.foundDescription);
		setFoundChronology(lostFoundById?.foundChronology);
		setIdNumber(lostFoundById?.idNumber);
		setFoundPhoto(lostFoundById?.foundPhoto);
		setFoundBy(lostFoundById?.foundBy);
		setFoundStatus(lostFoundById?.foundStatus);
		setImages([]);
		setIdentification(lostFoundById?.identification);
	};

	useEffect(() => {
		getDataLostFound();
		getDataLocation();
		getDataItems();
		if (status === 'Edit') {
			getDataLostFoundById(id);
		}
	}, []);

	useEffect(() => {
		if (
			status === 'Edit' &&
			lostFoundById &&
			Object.keys(lostFoundById).length > 0
		) {
			getDataById();

			if (lostFoundById?.storageLocation?.length > 0) {
				const lastLocation =
					lostFoundById.storageLocation[
						lostFoundById.storageLocation.length - 1
					];

				const _dataStasiun = dataLocation.filter(
					x => x.locationName === lastLocation?.location
				);
				setPickUpLocation(_dataStasiun[0]?._id);
			}
		}
	}, [lostFoundById, dataLocation, status]);

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
						judul="PENEMUAN BARANG"
						title1="Home - Lost & Found - "
						title2=" Form Penemuan Barang"
					/>
				</Grid>
				<Grid item xs={12} sm={12}>
					<CardProfil />
				</Grid>
				<Grid item xs={12} sm={12}>
					<AppTextField
						fullWidth
						label="Nama Petugas Penemu Barang"
						value={foundBy}
						onChange={e => setFoundBy(e.target.value)}
					/>
				</Grid>
				<Grid item xs={12} sm={12} sx={{ marginTop: '20px' }}>
					<Title16700 text="INFORMASI BARANG TEMUAN" />
				</Grid>
				<Grid item xs={12} sm={6}>
					<AppTextField
						select
						fullWidth
						label="Lokasi Barang Ditemukan"
						SelectProps={{
							native: true,
							IconComponent: KeyboardArrowDown,
						}}
						value={foundLocation}
						onChange={e => setFoundLocation(e.target.value)}
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
				</Grid>
				<Grid item xs={12} sm={6}>
					<AppTextField
						select
						fullWidth
						label="Lokasi Barang Disimpan"
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
								return <option value={item._id}>{item.locationName}</option>;
							})}
					</AppTextField>
				</Grid>

				<Grid item xs={12} sm={6}>
					<AppTextField
						select
						fullWidth
						label="Jenis Barang"
						SelectProps={{
							native: true,
							IconComponent: KeyboardArrowDown,
						}}
						value={foundType}
						onChange={e => setFoundType(e.target.value)}
					>
						<option value=""></option>
						{dataItems
							.sort((a, b) => a.itemName.localeCompare(b.itemName))
							.map(item => {
								return <option value={item.itemName}>{item.itemName}</option>;
							})}
					</AppTextField>
				</Grid>
				<Grid item xs={12} sm={3}>
					<DatePicker
						label="Tgl Ditemukan"
						value={foundDate}
						onChange={date => setFoundDate(date)}
						slots={{
							textField: AppTextField,
						}}
						format="dd/MM/yyyy"
						slotProps={{
							textField: {
								fullWidth: true,
							},
						}}
					/>
				</Grid>
				<Grid item xs={12} sm={3}>
					<TimePicker
						label="Waktu Ditemukan"
						value={foundTime}
						onChange={date => setFoundTime(date)}
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
				<Grid item xs={12} sm={12}>
					<AppTextField
						fullWidth
						label="Nama Barang"
						value={foundName}
						onChange={e => setFoundName(e.target.value)}
					/>
				</Grid>
				<Grid item xs={12} sm={12}>
					<AppTextField
						fullWidth
						label="Detail / Karakteristik Barang"
						value={foundDescription}
						onChange={e => setFoundDescription(e.target.value)}
					/>
				</Grid>
				<Grid item xs={12} sm={12}>
					<AppTextField
						multiline
						fullWidth
						rows={3}
						label="Kronologi Penemuan Barang"
						value={foundChronology}
						onChange={e => setFoundChronology(e.target.value)}
						sx={{
							'& .MuiOutlinedInput-root textarea': {
								padding: 0,
							},
						}}
					/>
				</Grid>
				{status === 'Edit' && (
					<>
						<Grid item xs={12} sm={12}>
							<Title16700 text="DOKUMEN PENDUKUNG" />
						</Grid>
						{lostFoundById?.foundPhoto !== null ||
						lostFoundById?.foundPhoto !== undefined ? (
							<>
								{lostFoundById?.foundPhoto?.uploadedFiles.map(photo => (
									<Grid item xs={12} sm={4} md={4}>
										<img
											src={
												StaticVar.URL_API +
												'/uploads/' +
												lostFoundById?.foundPhoto?.path +
												'/' +
												photo?.uploadedName
											}
											alt="dokumentasi"
											style={{ width: '100%', height: 'auto' }}
										/>
									</Grid>
								))}
							</>
						) : (
							<Grid item xs={12} sm={3}>
								<Alert severity="warning">Dokumentasi Kosong</Alert>
							</Grid>
						)}
					</>
				)}
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
				<Grid item xs={12} sm={12} sx={{ mb: { xs: 5, sm: 0 } }}>
					<Stack
						direction="row"
						justifyContent="flex-end"
						spacing={1}
						sx={{ marginTop: '30px', mb: 7 }}
					>
						<Button variant="text" color="error" onClick={handleClose}>
							Batal
						</Button>

						<Button variant="contained" onClick={submitForm}>
							Submit
						</Button>
					</Stack>
				</Grid>
			</Grid>

			{/* modal princt Qr Code */}
			<PrintQrCode
				open={openPrint}
				handleClose={handleCloseModalPrint}
				src={qrBase}
				title={idNumber}
				titleClose="Selesai"
			/>
		</Box>
	);
}

export default AddPenemuanBarang;
