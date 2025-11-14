import { Box, Button, Dialog, Grid, Hidden, Stack } from '@mui/material';
import moment from 'moment';
import { useNavigate, useLocation } from 'react-router-dom';

import CustomNewHeader from 'Component/Headers/CustomNewHeader';
import Title14400 from 'Component/Typographys/Title14400';
import Title16700 from 'Component/Typographys/Title16700';
import CustomNewTableDetail from 'Component/CustomTable/CustomNewTableDetail';
import ColumnShape from 'Page-Sections/PeminjamanPengembalian/column-shape-detail';

import StaticVar from 'Config/StaticVar';
import { GoodsLoanReturnContext } from 'Context/GoodsLoanReturn';
import { UserProfilContext } from 'Context/UserProfile';
import API from 'Services/Api';

import React, { useContext, useEffect, useState } from 'react';
import Title14600 from 'Component/Typographys/Title14600';
import CardInputDetail from 'Page-Sections/PeminjamanPengembalian/Cards/CardInputDetail';

function DetailPeminjamanPengembalian() {
	const navigate = useNavigate();
	const location = useLocation();
	const { id, dataLoan } = location.state;

	// state
	const [openDialog, setOpenDialog] = useState(false);
	const [dataRow, setDataRow] = useState('');
	const [officer, setOfficer] = useState('');
	const [officerId, setOfficerId] = useState({
		officerId: '',
		officerName: '',
		officerPosition: '',
		officerDepartemen: '',
	});
	const [kondisiBarang, setKondisiBarang] = useState('Baik');
	const [returnDate, setReturnDate] = useState(new Date());

	const [dialogImage, setDialogImage] = useState(false);
	const [rowImage, setRowImage] = useState(null);

	// context
	const { goodsLoanReturnById, getDataGoodsLoanReturnById } = useContext(
		GoodsLoanReturnContext
	);
	const { userProfilById, profilOfficer, getAllOfficer } =
		useContext(UserProfilContext);

	// handle
	const handlePengembalian = row => {
		// setDataRow(rowData);
		// setOpenDialog(true);

		navigate('/manajemenBarang/peminjamanPengembalian/addPengembalian', {
			state: { id: id, dataLoan: dataLoan },
		});
	};

	const handleImageFirst = rowData => {
		setDialogImage(true);
		const photo = rowData;
		const _foundPhoto = photo?.uploadedFiles[0]?.uploadedName;
		const _pathPhoto = photo?.path;
		const imageUrl = `${StaticVar.URL_API}/uploads/${_pathPhoto}/${_foundPhoto}`;
		setRowImage(imageUrl);
	};
	const handleImageLast = rowData => {
		setDialogImage(true);
		const photo = rowData;
		const _foundPhoto = photo?.uploadedFiles[0]?.uploadedName;
		const _pathPhoto = photo?.path;
		const imageUrl = `${StaticVar.URL_API}/uploads/${_pathPhoto}/${_foundPhoto}`;
		setRowImage(imageUrl);
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
				};
			});
		// console.log('data officer by id', _officerById)
		setOfficerId(_officerById[0]);
	};

	const handleBack = () => {
		setOpenDialog(false);
	};

	const handleSubmit = async e => {
		const result = await handleSave(e);

		if (result.statusText === 'OK') {
			setOpenDialog(false);
			window.location.reload();
		} else {
			alert('Error');
			setOpenDialog(false);
		}
	};

	const handleSave = () => {
		const postData = {
			...dataRow,
			returnDate,
			returnRecipientBy: {
				officerId: userProfilById?._id ? userProfilById?._id : '',
				officerName: userProfilById?.name ? userProfilById?.name : '',
				officerPosition: userProfilById?.jobPosition
					? userProfilById?.jobPosition.name
					: '',
				officerDepartemen: userProfilById?.departement
					? userProfilById?.departement.name
					: '',
			},
			returnGiverBy: officerId,
			loanStatus: 'Dikembalikan',
		};
		const filterData = goodsLoanReturnById?.loanItem.filter(
			x => x.itemNumber !== dataRow.itemNumber
		);
		const updateData = {
			...goodsLoanReturnById,
			loanItem: [...filterData, postData],
		};
		// console.log('data pengembalian', updateData);
		return API.putGoodsLoanReturn(id, updateData);
	};

	// useEffect
	useEffect(() => {
		getAllOfficer();
		if (id) {
			getDataGoodsLoanReturnById(id);
		}
	}, []);

	return (
		<Box sx={{ p: 3 }}>
			<Grid container spacing={3}>
				<Grid item xs={12} sm={12}>
					<CustomNewHeader
						judul="DETAIL PEMINJAMAN & PENGEMBALIAN BARANG"
						title1="Home  -  Pinjaman & Pengembalian Barang -  "
						title2="Detail Peminjaman & Pengembalian Barang"
					/>
				</Grid>
				<Grid item xs={12} sm={12}>
					<Title16700 text="Peminjaman" />
					<Stack
						direction={{ xs: 'column', sm: 'row' }}
						justifyContent="space-between"
						spacing={{ xs: 1, sm: 2 }}
						sx={{ mt: 1 }}
					>
						<Box>
							<Title14400 text="Tanggal" color="#738499" />
							<Title14400
								text={moment(goodsLoanReturnById?.loanDate).format(
									'DD/mm/yyyy'
								)}
							/>
						</Box>
						<Box>
							<Title14400 text="Diserahkan Oleh" color="#738499" />
							<Title14600
								text={goodsLoanReturnById?.loanGiverBy?.officerName}
							/>
							<Title14400
								text={goodsLoanReturnById?.loanGiverBy?.officerPosition}
							/>
							<Title14400
								text={goodsLoanReturnById?.loanGiverBy?.officerDepartemen}
							/>
						</Box>
						<Box>
							<Title14400 text="Diajukan Oleh" color="#738499" />
							<Title14600
								text={goodsLoanReturnById?.loanAppliBy?.officerName}
							/>
							<Title14400
								text={goodsLoanReturnById?.loanAppliBy?.officerPosition}
							/>
							<Title14400
								text={goodsLoanReturnById?.loanAppliBy?.officerDepartemen}
							/>
						</Box>
					</Stack>
				</Grid>

				<Grid item xs={12} sm={12}>
					<Title16700 text="Pengembalian" />
					<Stack
						direction={{ xs: 'column', sm: 'row' }}
						justifyContent="space-between"
						spacing={{ xs: 1, sm: 2 }}
						sx={{ mt: 1 }}
					>
						<Box>
							<Title14400 text="Tanggal" color="#738499" />
							<Title14400
								text={moment(goodsLoanReturnById?.returnDate).format(
									'DD/mm/yyyy'
								)}
							/>
						</Box>
						<Box>
							<Title14400 text="Diterima Oleh" color="#738499" />
							<Title14600
								text={goodsLoanReturnById?.returnRecipientBy?.officerName}
							/>
							<Title14400
								text={goodsLoanReturnById?.returnRecipientBy?.officerPosition}
							/>
							<Title14400
								text={goodsLoanReturnById?.returnRecipientBy?.officerDepartemen}
							/>
						</Box>
						<Box>
							<Title14400 text="Diserahkan Oleh" color="#738499" />
							<Title14600
								text={goodsLoanReturnById?.returnGiverBy?.officerName}
							/>
							<Title14400
								text={goodsLoanReturnById?.returnGiverBy?.officerPosition}
							/>
							<Title14400
								text={goodsLoanReturnById?.returnGiverBy?.officerDepartemen}
							/>
						</Box>
					</Stack>
				</Grid>

				<Grid item xs={12} sm={12}>
					<Title16700 text="Informasi Stasiun" />
					<Grid container spacing={2} sx={{ mt: '0px' }}>
						<Grid item xs={12} sm={6}>
							<Title14400 text="Stasiun Peminjam" color="#738499" />
							<Title14600
								text={
									goodsLoanReturnById?.lendingStasiun
										? goodsLoanReturnById?.lendingStasiun?.stationName
										: '-'
								}
							/>
						</Grid>
						<Grid item xs={12} sm={6}>
							<Title14400 text="Stasiun yang Meminjamkan" color="#738499" />
							<Title14600
								text={
									goodsLoanReturnById?.borrowingStasiun
										? goodsLoanReturnById?.borrowingStasiun?.stationName
										: '-'
								}
							/>
						</Grid>
					</Grid>
				</Grid>

				{/* Versi Destop */}
				<Hidden only={['xs']}>
					<Grid item xs={12} sm={12}>
						<Title16700 text="Informasi Barang" />
						<Box sx={{ mt: 1 }}>
							{goodsLoanReturnById?.loanItem !== undefined ? (
								<CustomNewTableDetail
									data={goodsLoanReturnById?.loanItem}
									columnShape={ColumnShape({
										onImageFirst: handleImageFirst,
										onImageLast: handleImageLast,
									})}
								/>
							) : null}
						</Box>
					</Grid>
					{dataLoan?.returnDate === undefined ? (
						<Grid
							item
							xs={12}
							sm={12}
							sx={{ display: 'flex', justifyContent: 'flex-end', mt: 1, mb: 7 }}
						>
							<Button variant="contained" onClick={handlePengembalian}>
								Pengembalian
							</Button>
						</Grid>
					) : null}
				</Hidden>

				{/* Versi Mobile */}
				<Hidden only={['sm', 'md', 'lg', 'xl']}>
					{goodsLoanReturnById?.loanItem.length > 0
						? goodsLoanReturnById?.loanItem.map(item => {
								return (
									<>
										<Grid item xs={12} sm={12}>
											<CardInputDetail
												value1={item?.itemNumber}
												value2={item?.itemName}
												value3={item?.itemInfo}
												status={item?.loanStatus}
												// onClick={() => handlePengembalian(item)}
											/>
										</Grid>
									</>
								);
						  })
						: null}
					{dataLoan?.returnDate === undefined ? (
						<Grid
							item
							xs={12}
							sm={12}
							sx={{
								display: 'flex',
								justifyContent: 'flex-end',
								mt: 3,
								mb: { xs: 5, sm: 0 },
							}}
						>
							<Button variant="contained" onClick={handlePengembalian}>
								Pengembalian
							</Button>
						</Grid>
					) : null}
				</Hidden>
			</Grid>

			{/* Pop Up Gambar */}
			<Dialog
				fullWidth={true}
				maxWidth="sm"
				open={dialogImage}
				onClose={() => setDialogImage(false)}
			>
				<Box sx={{ padding: '20px' }}>
					<img
						src={rowImage}
						style={{
							// borderRadius: "10%",
							width: '100%',
						}}
					/>
					<Stack sx={{ mt: 2, mb: 7 }}>
						<Button variant="outlined" onClick={() => setDialogImage(false)}>
							Kembali
						</Button>
					</Stack>
				</Box>
			</Dialog>
		</Box>
	);
}

export default DetailPeminjamanPengembalian;
