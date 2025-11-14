import {
	Box,
	Grid,
	Stack,
	Snackbar,
	Alert,
	Backdrop,
	Hidden,
	RadioGroup,
	FormControlLabel,
	Radio,
	Button
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { KeyboardArrowDown } from '@mui/icons-material';
import CircularProgress from '@mui/material/CircularProgress';

import { useNavigate, useLocation } from 'react-router-dom';
import imageCompression from "browser-image-compression";

import CustomNewHeader from 'Component/Headers/CustomNewHeader';
import Title16700 from 'Component/Typographys/Title16700';
import Title18700 from 'Component/Typographys/Title18700';
import Title16500 from 'Component/Typographys/Title16500';
import AppTextField from 'Component/input-fields/AppTextField';
import ButtonText from 'Component/Buttons/ButtonText';
import ButtonSubmit from 'Component/Buttons/ButtonSubmit';
import CustomNewTableDetail from 'Component/CustomTable/CustomNewTableDetail';
import CardProfil from 'Component/Cards/CardProfil';
import MultiUpload from "Component/MultiUpload/MultiUpload";

import ColumnShapeAdd from 'Page-Sections/PeminjamanPengembalian/column-shape-add-pengembalian';
import ListForm from 'Page-Sections/PeminjamanPengembalian/Data/ListFormPengembalian';

import API from 'Services/Api';
import { UserProfilContext } from 'Context/UserProfile';
import { GoodsLoanReturnContext } from 'Context/GoodsLoanReturn';

import React, { useEffect, useContext, useState } from 'react';
import CardAdd from 'Page-Sections/PeminjamanPengembalian/Cards/CardAdd';
import AppModalMedium from 'Component/AppModalMedium';
import CardPengembalian from 'Page-Sections/PeminjamanPengembalian/Cards/CardPengembalian';

function FormPengembalian() {
	const navigate = useNavigate();
	const location = useLocation();
	const { id, dataLoan } = location.state;

	// context
	const { userProfilById, profilOfficer, getAllOfficer, userProfile } =
		useContext(UserProfilContext);
	const { goodsLoanReturnById, getDataGoodsLoanReturnById } = useContext(
		GoodsLoanReturnContext
	);

	// useState
	const [returnDate, setReturnDate] = useState(new Date());
	const [officer, setOfficer] = useState('');
	const [officerId, setOfficerId] = useState({
		officerId: '',
		officerName: '',
		officerPosition: '',
		officerDepartemen: '',
	});
	const [loanItem, setLoanItem] = useState([]);

	const [dialogBA, setDialogBA] = useState(false);

	const [loading, setLoading] = useState(false);
	const [notifMsg, setNotifMsg] = useState('');
	const [notif, setNotif] = useState(false);

	const [dialogPhoto, setDialogPhoto] = useState(false);
	const [dataRow, setDataRow] = useState(null)
	const [images, setImages] = useState([]);
	const [errors, setErrors] = useState([]);
	const [statusUpload, setStatusUpload] = useState(false);

	// handle
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
				};
			});
		// console.log('data officer by id', _officerById)
		setOfficerId(_officerById[0]);
	};

	const handleChange = (row, e) => {
		const _updateData = loanItem.map(item => {
			if (item.itemNumber === row.itemNumber) {
				return {
					...item,
					returnInfo: e.target.value,
				};
			}
			return item;
		});
		setLoanItem(_updateData);
	};

	const handleBA = row => {
		setDialogBA(true);
		setDataRow(row);
	};

	const handleBack = () => {
		navigate(-1);
	};

	const handlePhoto = (row) => {
		// console.log(row)
		setDataRow(row)
		setDialogPhoto(true);
		setImages([])
	  };

	  const handleImageChange = async (event) => {
		// console.log('data change', event.target.files)
		const files = Array.from(event.target.files);
		const validFiles = files.filter(
		  (file) =>
			file.type === "image/jpeg" ||
			file.type === "image/jpg" ||
			file.type === "image/png"
		);
	
		if (validFiles.length !== files.length) {
		  setErrors([
			...errors,
			"Maaf, file yang Anda upload memiliki format yang salah. Silahkan Pilih format yang sesuai (JPEG, JPG, PNG)",
		  ]);
		}
	
		// const newImages = validFiles.map(file => ({
		// 	file,
		// 	preview: URL.createObjectURL(file),
		// }));
	
		const compressedFilesPromises = validFiles.map(async (file) => {
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
			console.error("Error compressing image:", error);
			return {
			  file,
			  preview: URL.createObjectURL(file),
			};
		  }
		});
	
		const compressedFiles = await Promise.all(compressedFilesPromises);
	
		  // console.log('compressedFiles', compressedFiles)
	
		setImages((prevImages) => [...prevImages, ...compressedFiles]);
	  };
	
	  const handleDeleteImage = (index) => {
		setImages(images.filter((_, i) => i !== index));
	  };
	
	  const handleSavePhoto = () => {
		const updatePhoto = loanItem.filter(x => x.itemNumber === dataRow.itemNumber).map(item => {
			return {
				...item,
		  		fileReturn: images
			}
		})
	  const _dataFilter = loanItem.filter((x) => x.itemNumber !== dataRow.itemNumber);
	
	  setLoanItem([..._dataFilter, ...updatePhoto]);
	  setDialogPhoto(false);
	  setImages([])
	  };

	const handleSubmit = async e => {
		const result = await handleSave(e);
		// return
		if (result.statusText === 'OK') {
			navigate('/manajemenBarang/peminjamanPengembalian');
			console.log('Update Data Berhasil!!!');
			window.location.reload();
		} else {
			setNotifMsg('Gagal!');
			setLoading(false);
		}
	};

	const handleSave = async() => {
		// upload all photo
		const uploadedPhotos = await Promise.all(
			loanItem.map(async (barang) => {
			  if (barang.fileReturn) {
				const formData = new FormData();
				barang.fileReturn.forEach(image => {
				  formData.append('files', image.file);
				});
				const respon = await API.postManyImage('peminjaman/pengembalian', formData);
				// console.log('respon', respon)
				return { ...barang, photoReturn: respon.data};
			  }
			  return barang;
			})
		  );

		const postData = {
			loanItem: uploadedPhotos,
			returnDate,
			returnRecipientBy: userProfile,
			returnGiverBy: officerId,
			loanStatus: 'Dikembalikan',
		};

		const updateData = {
			...goodsLoanReturnById,
			...postData,
		};
		return API.putGoodsLoanReturn(id, updateData);
	};

	// useEffect
	useEffect(() => {
		getAllOfficer({ isLimit: false });
		if (dataLoan?.loanItem) {
			const _data = dataLoan?.loanItem?.map(item => {
				return {
					...item,
					returnInfo: 'Baik',
					loanStatus: 'Dikembalikan',
					report: null, // Form Berita Acara
				};
			});
			setLoanItem(_data);
		}
		if (id) {
			getDataGoodsLoanReturnById(id);
		}
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

			<Grid container spacing={3}>
				<Grid item xs={12} sm={12}>
					<CustomNewHeader
						judul="FORM PENGEMBALIAN BARANG"
						title1="Home - Piminjaman & Pengembalian Barang - "
						title2="Form Pengembalian Barang"
					/>
				</Grid>
				<Grid item xs={12} sm={12} sx={{ mt: 3 }}>
					<Grid container spacing={2}>
						<Grid item xs={12} sm={12}>
							<CardProfil />
						</Grid>
						<Grid item xs={12} sm={12} sx={{ mt: 3 }}>
							<Title16700 text="INFORMASI WAKTU" />
						</Grid>
						<Grid item xs={12} sm={4}>
							<DatePicker
								label="Tanggal"
								value={returnDate}
								onChange={date => setReturnDate(date)}
								slots={{
									textField: AppTextField,
								}}
								slotProps={{
									textField: {
										fullWidth: true,
									},
								}}
								format="dd/MM/yyyy"
							/>
						</Grid>
						<Grid item xs={12} sm={12} sx={{ mt: 3 }}>
							<Title16700 text="YANG MENYERAHKAN" />
						</Grid>
						<Grid item xs={12} sm={3}>
							<AppTextField
								select
								fullWidth
								label="Nama Petugas"
								SelectProps={{
									native: true,
									IconComponent: KeyboardArrowDown,
								}}
								value={officer}
								onChange={handleOfficer}
							>
								<option value=""></option>
								{profilOfficer.length > 0
									? profilOfficer
											?.filter(x => x._id !== userProfilById?._id)
											.map(item => {
												return <option value={item._id}>{item.name}</option>;
											})
									: null}
							</AppTextField>
						</Grid>
						<Grid item xs={12} sm={3}>
							<AppTextField
								fullWidth
								label="Jabatan"
								disabled
								value={officerId?.officerPosition}
							/>
						</Grid>
						<Grid item xs={12} sm={3}>
							<AppTextField
								fullWidth
								label="Departemen"
								disabled
								value={officerId?.officerDepartemen}
							/>
						</Grid>
						<Grid item xs={12} sm={12} sx={{ mt: 3 }}>
							<Title16700 text="DAFTAR BARANG" />
						</Grid>

						{/* Versi Destop */}
						<Hidden only={['xs']}>
							<Grid item xs={12} sm={12}>
								{loanItem.length > 0 ? (
									<CustomNewTableDetail
										data={loanItem}
										columnShape={ColumnShapeAdd({
											onChange: handleChange,
											onAdd: handlePhoto,
										})}
									/>
								) : null}
							</Grid>
						</Hidden>

						{/* Versi Mobile */}
						<Hidden only={['sm', 'md', 'lg', 'xl']}>
							{loanItem.length > 0
								? loanItem.map(item => {
										return (
											<Grid item xs={12}>
												<CardPengembalian
													dataId={item}
													aksi={
														<RadioGroup
															row
															value={item?.returnInfo}
															onChange={e => handleChange(item, e)}
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
													}
												/>
											</Grid>
										);
								  })
								: null}
						</Hidden>

						<Grid item xs={12} sm={12} sx={{ mb: { xs: 5, sm: 7 } }}>
							<Stack
								direction="row"
								justifyContent="flex-end"
								spacing={1}
								sx={{ marginTop: '30px' }}
							>
								<ButtonText title="Batal" onClick={handleBack} />
								<ButtonSubmit title="Submit" onClick={handleSubmit} />
							</Stack>
						</Grid>
					</Grid>
				</Grid>
			</Grid>

			<AppModalMedium open={dialogPhoto}>
        <Grid container>
          <Grid item xs={12} sm={12}>
            <MultiUpload
              images={images}
              errors={errors}
              handleImageChange={handleImageChange}
              handleDeleteImage={handleDeleteImage}
              status={statusUpload}
            />
          </Grid>
          {images.length > 0 && (
            <Grid
              item
              xs={12}
              sm={12}
              sx={{ mt: 3, display: "flex", justifyContent: "flex-end",  mb: 7 }}
            >
              <Button variant="contained" onClick={handleSavePhoto}>
                Simpan
              </Button>
            </Grid>
          )}
        </Grid>
      </AppModalMedium>

			{/* Dialog Berita Acara */}
			<AppModalMedium open={dialogBA} handleClose={() => setDialogBA(false)}>
				<Grid container spacing={1}>
					<Grid
						item
						xs={12}
						sm={12}
						sx={{ display: 'flex', justifyContent: 'center', mb: 7 }}
					>
						<Title18700 text="Form Berita Acara" />
					</Grid>
					<Grid item xs={12} sm={12}></Grid>
				</Grid>
			</AppModalMedium>
		</Box>
	);
}

export default FormPengembalian;
