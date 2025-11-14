import {
	Box,
	Grid,
	Stack,
	Button,
	Hidden,
	styled,
	TableCell,
	TableRow,
	Typography,
	Dialog,
} from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';
import imageCompression from 'browser-image-compression';

import CustomNewHeader from 'Component/Headers/CustomNewHeader';
import MultiUpload from 'Component/MultiUpload/MultiUpload';
import CardProfil from 'Component/Cards/CardProfil';
import Title16700 from 'Component/Typographys/Title16700';
import AppTextField from 'Component/input-fields/AppTextField';
import ButtonSubmit from 'Component/Buttons/ButtonSubmit';

import CustomTableHeader from 'Page-Sections/PenghapusBukuan/CustomTableHeader';

import NoImage from 'Assets/no-image.jpg';

import StaticVar from 'Config/StaticVar';
import API from 'Services/Api';

import React, { useEffect, useContext, useState } from 'react';
import DetailPenghapusan from 'Page-Sections/PenghapusBukuan/DetailPenghapusan';

const BodyTableCell = styled(TableCell)(() => ({
	fontSize: 12,
	fontWeight: 600,
	'&:last-of-type': {
		textAlign: 'right',
	},
}));

function DetailPenyerahanBarang() {
	const navigate = useNavigate();
	const location = useLocation();
	const { dataRemove } = location.state;

	// state
	const [officerName, setOfficerName] = useState('');
	const [officerPosition, setOfficerPosition] = useState('');
	const [officerDepartemen, setOfficerDepartemen] = useState('');
	const [allData, setAllData] = useState(null);

	const [images, setImages] = useState([]);
	const [errors, setErrors] = useState([]);
	const [statusUpload, setStatusUpload] = useState(false);

	const [statusError, setStatusError] = useState(false);
	const [dialogImage, setDialogImage] = useState(false);
	const [rowImage, setRowImage] = useState(null);

	const [loading, setLoading] = useState(false);
	const [notifMsg, setNotifMsg] = useState('');

	const _barang = dataRemove?.removeItems;
	const photo = _barang?.foundPhoto;
	const _foundPhoto = photo?.uploadedFiles[0]?.uploadedName;
	const _pathPhoto = photo?.path;

	// handle
	const handleBack = () => {
		navigate(-1);
	};

	const handleOpenImage = (type, dataRow) => {
		// console.log("data gambar", dataRow);
		setDialogImage(true);
		if (type === 'Ada') {
			const photo = dataRow;
			const _foundPhoto = photo?.uploadedFiles[0]?.uploadedName;
			const _pathPhoto = photo?.path;
			const imageUrl = `${StaticVar.URL_API}/uploads/${_pathPhoto}/${_foundPhoto}`;
			setRowImage(imageUrl);
		} else {
			setRowImage(dataRow);
		}
	};

	const handleImageError = () => {
		setStatusError(true);
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

	const handleUpdateItem = (type, e, id) => {
		const _updateData = {
			...allData,
			removeItems: {
				...allData.removeItems,
				infoRemove: e.target.value,
			},
		};

		setAllData(_updateData);
		// console.log('update field', _updateData);
	};

	const handleSubmit = async () => {
		let respon;
		if (images.length > 0) {
			const formData = new FormData();
			images.forEach(image => {
				formData.append('files', image.file);
			});
			respon = await API.postManyImage('penghapusbukuan', formData);

			console.log('upload image berhasil');
		}

		setStatusUpload(true);

		const postData = {
			...dataRemove,
			removeItems: allData,
			providedBy: {
				officerName,
				officerPosition,
				officerDepartemen,
				providedDate: new Date(),
			}, // petugas yg menerima
			removeStatus: 'Dihapuskan',
			photoItem: respon ? respon.data : null,
		};
		// console.log("data post penghapusan", postData, allData?._id);
		// return

		const result = await API.putGoodsRemove(dataRemove?._id, postData);
		if (result.statusText === 'OK') {
			navigate(-1);
			// window.location.reload();
		} else {
			setNotifMsg('Gagal!');
			setLoading(false);
		}
	};

	useEffect(() => {
		const item = dataRemove.removeItems;

		setOfficerName(item.foundBy);
		setAllData(item);
	}, [dataRemove]);

	// console.log(dataRemove);

	return (
		<Box
			sx={{
				padding: { xs: '15px', sm: '30px' },
				background: '#FFF',
				minHeight: '100vh',
			}}
		>
			<Grid container spacing={2}>
				<Grid item xs={12} sm={12}>
					<CustomNewHeader
						judul="PENGHAPUSBUKUAN BARANG"
						title1="Home - Lost & Found - Penghapusbukuan Barang  - "
						title2="Penyerahan Barang "
					/>
				</Grid>

				{dataRemove?.removeStatus === 'Ditolak' ||
				dataRemove?.removeStatus === 'Disetujui' ? (
					<>
						<Grid item xs={12} sm={12} sx={{ my: 3 }}>
							<CardProfil />
						</Grid>

						<Grid item xs={12} sm={12} sx={{ mt: 3 }}>
							<Title16700 text="YANG MENERIMA" />
						</Grid>
						<Grid item xs={12} sm={3}>
							<AppTextField
								fullWidth
								label="Nama Petugas"
								value={officerName}
								onChange={e => setOfficerName(e.target.value)}
							/>
						</Grid>
						<Grid item xs={12} sm={3}>
							<AppTextField
								fullWidth
								label="Jabatan"
								value={officerPosition}
								onChange={e => setOfficerPosition(e.target.value)}
							/>
						</Grid>
						<Grid item xs={12} sm={3}>
							<AppTextField
								fullWidth
								label="Departemen"
								value={officerDepartemen}
								onChange={e => setOfficerDepartemen(e.target.value)}
							/>
						</Grid>
						<Grid item xs={12} sm={12} sx={{ mt: 3 }}>
							<Title16700 text="DAFTAR BARANG" />
						</Grid>

						{/* Versi Destop */}
						<Hidden only={['xs']}>
							<Grid item xs={12} sm={12}>
								<CustomTableHeader
									tebleBodyConten={
										<>
											<TableRow key={allData?.idNumber}>
												<BodyTableCell>
													{statusError === false ? (
														<Box
															onClick={e =>
																handleOpenImage('Ada', allData?.foundPhoto)
															}
														>
															<img
																src={
																	StaticVar.URL_API +
																	'/uploads' +
																	`/${_pathPhoto}` +
																	`/${_foundPhoto}`
																}
																style={{
																	borderRadius: '10%',
																	width: '100%',
																	height: 'auto',
																}}
																onError={handleImageError}
															/>
														</Box>
													) : (
														<Box
															onClick={e =>
																handleOpenImage('Tidak Ada', NoImage)
															}
														>
															<img
																src={NoImage}
																style={{
																	borderRadius: '10%',
																	width: 50,
																	height: 50,
																}}
															/>
														</Box>
													)}
												</BodyTableCell>
												<BodyTableCell>
													<Typography
														noWrap={false}
														sx={{ fontSize: 13, fontWeight: 400 }}
													>
														{allData?.foundName}
													</Typography>
													<Typography
														sx={{
															fontSize: 13,
															fontWeight: 400,
															color: '#BABBBC',
														}}
													>
														{allData?.idNumber}
													</Typography>
												</BodyTableCell>
												<BodyTableCell>
													<Typography
														noWrap={false}
														sx={{ fontSize: 13, fontWeight: 400 }}
													>
														{allData?.foundType}
													</Typography>
												</BodyTableCell>
												<BodyTableCell>
													<Typography
														noWrap={false}
														sx={{ fontSize: 13, fontWeight: 400 }}
													>
														{allData?.locationStorage}
													</Typography>
												</BodyTableCell>
												<BodyTableCell>
													<Typography
														noWrap={false}
														sx={{ fontSize: 13, fontWeight: 400 }}
													>
														{allData?.infoSubmission}
													</Typography>
													<Typography
														sx={{
															fontSize: 13,
															fontWeight: 400,
															color: '#BABBBC',
														}}
													>
														{allData?.noteSubmission}
													</Typography>
												</BodyTableCell>
												<BodyTableCell>
													<AppTextField
														fullWidth
														size="small"
														label="Keterangan"
														onChange={e =>
															handleUpdateItem(
																'noteRemove',
																e,
																allData?.idNumber
															)
														}
													/>
												</BodyTableCell>
											</TableRow>
										</>
									}
								/>
							</Grid>
						</Hidden>

						<Grid item xs={12} sm={6}>
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
							sx={{
								display: 'flex',
								justifyContent: 'flex-end',
								marginTop: 3,
								mb: { xs: 5, sm: 7 },
							}}
						>
							<Stack direction="row">
								<Button
									variant="text"
									color="error"
									sx={{ padding: '10px 35px' }}
									onClick={handleBack}
								>
									Batal
								</Button>
								<ButtonSubmit
									title="Submit"
									onClick={() => handleSubmit('Dihapuskan')}
								/>
							</Stack>
						</Grid>
					</>
				) : null}

				{dataRemove?.removeStatus === 'Dihapuskan' ? (
					<Grid item xs={12} sm={12} sx={{ my: 3 }}>
						<DetailPenghapusan dataRow={dataRemove} />
					</Grid>
				) : null}
			</Grid>

			{/* Pop Up Gambar */}
			<Dialog
				fullWidth={true}
				maxWidth="sm"
				open={dialogImage}
				onClose={() => setDialogImage(false)}
			>
				<Box sx={{ p: 3 }}>
					<img
						src={rowImage}
						style={{
							borderRadius: '10%',
							width: '100%',
						}}
					/>
					<Button
						variant="outlined"
						sx={{ mt: 3, width: '100%', mb: 7 }}
						onClick={() => setDialogImage(false)}
					>
						Kembali
					</Button>
				</Box>
			</Dialog>
		</Box>
	);
}

export default DetailPenyerahanBarang;
