import React, { useEffect, useState, useContext } from 'react';
import {
	Box,
	Grid,
	Stack,
	Table,
	TableHead,
	TableRow,
	TableCell,
	TableBody,
	styled,
	Typography,
	RadioGroup,
	FormControlLabel,
	Radio,
	Hidden,
} from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import { KeyboardArrowDown } from '@mui/icons-material';
import QrCode from 'qrcode';
import moment from 'moment';

import CustomNewTableDetail from 'Component/CustomTable/CustomNewTableDetail';
import CustomNewHeader from 'Component/Headers/CustomNewHeader';
import Title14400 from 'Component/Typographys/Title14400';
import Title16500 from 'Component/Typographys/Title16500';
import Title18700 from 'Component/Typographys/Title18700';
import CardBarangMobile from 'Component/Cards/CardBarangMobile';
import CardInputBM from 'Component/Cards/CardInputBM';
import CardProfil from 'Component/Cards/CardProfil';
import ButtonContainer from 'Component/Buttons/ButtonContainer';
import AppTextField from 'Component/input-fields/AppTextField';
import Title16700 from 'Component/Typographys/Title16700';
import ButtonText from 'Component/Buttons/ButtonText';

import ColumnShapeDetail from 'Page-Sections/PemindahanBarang/column-space-detail';
import StorageLocation from 'Page-Sections/PenemuanBarang/Data/StorageLocation';

import API from 'Services/Api';
import { UserProfilContext } from 'Context/UserProfile';
import { LocationContext } from 'Context/Location';
import StaticVar from 'Config/StaticVar';
import AppAvatar from 'Component/avatars/AppAvatar';

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

function DetailPemindahan() {
	const navigate = useNavigate();
	const location = useLocation();
	const { id, data, status } = location.state;

	const { userProfile } = useContext(UserProfilContext);
	const { dataLocation, getDataLocation } = useContext(LocationContext);

	const [openModal, setOpenModal] = useState(false);
	const [dataStatus, setDataStatus] = useState(status);
	const [dataItems, setDataItems] = useState(data.relocationItems);

	const [currentStorage, setCurrentStorage] = useState('');

	const [qrBase, setQrBase] = useState('');
	const [qrOfficer, setQrOfficer] = useState({
		submittedBy: '',
		receivedBy: '',
	});

	const handleClose = () => {
		navigate(-1);
	};

	const handleSave = () => {
		if (dataStatus === 'berita input') {
			let postData = {
				...data,
				currentStorage,
				relocationItems: dataItems,
				receivedBy: userProfile,
				relocationStatus: 'Diterima',
			};
			// console.log('data post', postData);
			// return;
			API.putGoodsRelocation(data._id, postData).then(res => {
				if (res.statusText === 'OK') {
					navigate('/manajemenBarang/pemindahan');
				}
			});
		}
	};

	const handleCloseModal = () => {
		setOpenModal(false);
	};
	const handleScanWebCam = async result => {
		if (result) {
			setDataStatus('berita input');
			setOpenModal(false);
		}
	};

	const handleUpdateItem = (type, e, id) => {
		const _updateData = dataItems.map(item => {
			if (item.idNumber === id) {
				if (type === 'info') {
					item.lastInformation = e.target.value;
				}
				if (type === 'note') {
					item.lastNote = e.target.value;
				}
			}
			return item;
		});
		// console.log('update field', _updateData);
		setDataItems(_updateData);
	};

	const generateQrCode = async () => {
		const response = await QrCode.toDataURL(data.relocationNumber);
		setQrBase(response);
	};

	const generateQrCodeOfficer = async data => {
		const _submittedBy = await QrCode.toDataURL(data?.submittedBy?.officerId);
		const _receivedBy = await QrCode.toDataURL(data?.receivedBy?.officerId);
		const _idOfficer = {
			submittedBy: _submittedBy,
			receivedBy: _receivedBy,
		};
		setQrOfficer(_idOfficer);
	};

	useEffect(() => {
		getDataLocation({ multiLocation: ['storage', 'storagefound'] });
		if (id) {
			generateQrCode();
		}
		if (status === 'berita finish') {
			generateQrCodeOfficer(data);
		}
	}, []);
	// console.log('data barang', data);
	return (
		<Box
			sx={{
				padding: { xs: '15px', sm: '30px' },
				background: '#FFF',
				minHeight: '100vh',
			}}
		>
			<Grid container spacing={4} sx={{mb: 7}}>
				<Grid item xs={12} sm={12}>
					<CustomNewHeader
						judul="PEMINDAHAN BARANG"
						title1="Home - Lost & Found - Pemindahan Barang - "
						title2="Detail Pemindahan Barang"
					/>
				</Grid>

				<Grid
					item
					xs={12}
					sm={12}
					sx={{ display: 'flex', justifyContent: 'center' }}
				>
					<Box>
						<Grid container spacing={2}>
							{dataStatus === 'berita sementara' ? (
								<>
									<Grid
										item
										xs={12}
										sm={12}
										sx={{
											display: 'flex',
											flexDirection: 'column',
											justifyContent: 'center',
											alignItems: 'center',
										}}
									>
										<img src={qrBase} style={{ width: 200, height: 200 }} />
										<Title18700 text={data.relocationNumber} />
									</Grid>

									{/* Versi Destop */}
									<Hidden only={['xs']}>
										<Grid item xs={12} sm={12} sx={{mb: 7}}>
											<CustomNewTableDetail
												data={data?.relocationItems}
												columnShape={ColumnShapeDetail()}
											/>
										</Grid>
									</Hidden>

									{/* Versi Mobile */}
									<Hidden only={['sm', 'md', 'lg', 'xl']}>
										{data?.relocationItems.map(item => {
											return (
												<Grid item xs={12} sm={12}>
													<CardBarangMobile
														info1="No. Laporan"
														value1={item?.idNumber}
														info2="Jenis Barang"
														value21={item?.foundName}
														value22={item?.foundType}
														info3="Keterangan"
														value31={item?.firstInformation}
														value32={item?.firstNote}
													/>
												</Grid>
											);
										})}
									</Hidden>
								</>
							) : null}

							{dataStatus === 'berita input' ? (
								<>
									<Grid item xs={12} sm={12}>
										<Grid container spacing={1}>
											<Grid item xs={12} sm={12} sx={{ my: 3 }}>
												<CardProfil />
											</Grid>
											<Grid item xs={12} sm={12}>
												<Title16700 text="INFORMASI PEMINDAHAN" />
											</Grid>
											<Grid item xs={12} sm={4}>
												<AppTextField
													select
													fullWidth
													label="Lokasi Penyimpanan Selanjutnya"
													SelectProps={{
														native: true,
														IconComponent: KeyboardArrowDown,
													}}
													value={currentStorage}
													onChange={e => setCurrentStorage(e.target.value)}
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
										</Grid>
									</Grid>

									{/* Versi Destop */}
									<Hidden only={['xs']}>
										<Grid item xs={12} sm={12} sx={{mb: 7}}>
											<Title16700 text="Kondisi Barang Saat Ini" />
											<Table>
												<TableHead>
													<TableRow>
														<HeadTableCell>Foto</HeadTableCell>
														<HeadTableCell>No.Laporan</HeadTableCell>
														<HeadTableCell>Jenis Barang</HeadTableCell>
														<HeadTableCell>Kondisi Barang</HeadTableCell>
														<HeadTableCell>Catatan</HeadTableCell>
													</TableRow>
												</TableHead>
												<TableBody>
													{dataItems.length > 0
														? dataItems.map(item => {
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
																						'/uploads' +
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
																				value={
																					item.lastInformation
																						? item.lastInformation
																						: item?.firstInformation
																				}
																				onChange={e =>
																					handleUpdateItem(
																						'info',
																						e,
																						item.idNumber
																					)
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
																					handleUpdateItem(
																						'note',
																						e,
																						item.idNumber
																					)
																				}
																				// value={relocationInformation}
																			/>
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
										{dataItems.length > 0
											? dataItems.map(item => (
													<Grid item xs={12} sm={12}>
														<Title16700 text="Kondisi Barang Saat Ini" />
														<CardInputBM
															info1="No. Laporan"
															value1={item.idNumber}
															info2="Jenis Barang"
															value2={item.foundName}
															info3="Kondisi Barang"
															value3={
																<RadioGroup
																	row
																	value={
																		item.lastInformation
																			? item.lastInformation
																			: item?.firstInformation
																	}
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
														/>
													</Grid>
											  ))
											: null}
									</Hidden>
								</>
							) : null}

							{dataStatus === 'berita finish' ? (
								<>
									<Grid item xs={12} sm={12}>
										<Stack direction="column" spacing={2}>
											<Title14400
												text={
													'Pada tanggal ' +
													moment(data?.updatedAt).format('DD/MM/YYYY') +
													' pukul ' +
													moment(data?.updatedAt).format('HH:mm') +
													' telah dilakukan serah terima antara Pihak'
												}
											/>
											<Stack direction="row" spacing={2}>
												<Box>
													<Title14400 text="1." />
												</Box>
												<Stack direction="column" spacing={2}>
													<Title14400 text="Nama" />
													<Title14400 text="Jabatan" />
													<Title14400 text="Divis/Dept" />
												</Stack>
												<Stack direction="column" spacing={2}>
													<Title14400
														text={': ' + data?.submittedBy?.officerName}
													/>
													<Title14400
														text={': ' + data?.submittedBy?.officerPosition}
													/>
													<Title14400
														text={': ' + data?.submittedBy?.officerDepartemen}
													/>
												</Stack>
											</Stack>
											<Stack direction="row" spacing={2}>
												<Box>
													<Title14400 text="2." />
												</Box>
												<Stack direction="column" spacing={2}>
													<Title14400 text="Nama" />
													<Title14400 text="Jabatan" />
													<Title14400 text="Divis/Dept" />
												</Stack>
												<Stack direction="column" spacing={2}>
													<Title14400
														text={': ' + data?.receivedBy?.officerName}
													/>
													<Title14400
														text={': ' + data?.receivedBy?.officerPosition}
													/>
													<Title14400
														text={': ' + data?.receivedBy?.officerDepartemen}
													/>
												</Stack>
											</Stack>
											<Title14400 text="berupa:" />
										</Stack>
									</Grid>

									{/* Versi Destop */}
									<Hidden only={['xs']}>
										<Grid item xs={12} sm={12} >
											<CustomNewTableDetail
												data={data?.relocationItems}
												columnShape={ColumnShapeDetail()}
											/>
										</Grid>
									</Hidden>

									{/* Versi Mobile */}
									<Hidden only={['sm', 'md', 'lg', 'xl']}>
										{data?.relocationItems.map(item => {
											return (
												<Grid item xs={12} sm={12}>
													<CardBarangMobile
														info1="No. Laporan"
														value1={item?.idNumber}
														info2="Jenis Barang"
														value21={item?.foundName}
														value22={item?.foundType}
														info3="Keterangan"
														value31={item?.firstInformation}
														value32={item?.firstNote}
													/>
												</Grid>
											);
										})}
									</Hidden>

									<Grid item xs={12} sm={12} sx={{ mb: 3 }}>
										<Title14400
											text="Demikian berita acara serah terima ini dibuat oleh kedua Pihak untuk dapat dipergunakan 
									sebagaimana mestinya. Adapun yang diserahterimakan dalam kondisi baik."
										/>
									</Grid>
									<Grid item xs={12} sm={6}>
										<Stack direction="column" alignItems="center">
											<Title16500 text="Pihak Yang Menyerahkan" />
											<img
												src={qrOfficer?.submittedBy}
												style={{
													width: 150,
													height: 150,
												}}
											/>
											<Title16500 text={data?.submittedBy?.officerName} />
										</Stack>
									</Grid>
									<Grid item xs={12} sm={6}>
										<Stack direction="column" alignItems="center">
											<Title16500 text="Pihak Yang Menerima" />
											<img
												src={qrOfficer?.receivedBy}
												style={{
													width: 150,
													height: 150,
												}}
											/>
											<Title16500 text={data?.receivedBy?.officerName} />
										</Stack>
									</Grid>
								</>
							) : null}

							<Grid
								item
								xs={12}
								sm={12}
								sx={{
									display: 'flex',
									justifyContent: 'flex-end',
									mt: 3,
									mb: { xs: 10, sm: 7 },
								}}
							>
								<ButtonText title="Kembali" onClick={handleClose} />
								{dataStatus === 'berita input' ? (
									<Box sx={{ width: { xs: '100%', sm: '20%' } }}>
										<ButtonContainer
											title={
												dataStatus === 'berita input'
													? 'Submit'
													: //   : dataStatus === "berita finish"
													  //   ? "Cetak"
													  null
											}
											onClick={handleSave}
										/>
									</Box>
								) : null}
							</Grid>
						</Grid>
					</Box>
				</Grid>
			</Grid>
		</Box>
	);
}

export default DetailPemindahan;
