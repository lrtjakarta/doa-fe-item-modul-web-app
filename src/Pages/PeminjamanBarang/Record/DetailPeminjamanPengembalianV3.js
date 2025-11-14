import { Box, Grid, Hidden, Stack } from '@mui/material';
import moment from 'moment';
import { useNavigate, useLocation } from 'react-router-dom';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { KeyboardArrowDown } from '@mui/icons-material';

import CustomNewHeader from 'Component/Headers/CustomNewHeader';
import Title14400 from 'Component/Typographys/Title14400';
import Title16700 from 'Component/Typographys/Title16700';
import CustomNewTableDetail from 'Component/CustomTable/CustomNewTableDetail';
import ColumnShape from 'Page-Sections/PeminjamanPengembalian/column-shape-detail';
import AppTextField from 'Component/input-fields/AppTextField';
import AppModalMedium from 'Component/AppModalMedium';
import CardProfil from 'Component/Cards/CardProfil';
import ButtonText from 'Component/Buttons/ButtonText';
import ButtonSubmit from 'Component/Buttons/ButtonSubmit';

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

	// context
	const { goodsLoanReturnById, getDataGoodsLoanReturnById } = useContext(
		GoodsLoanReturnContext
	);
	const { userProfilById, profilOfficer, getAllOfficer } =
		useContext(UserProfilContext);

	// handle
	const handlePengembalian = rowData => {
		setDataRow(rowData);
		setOpenDialog(true);
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

	// console.log('data by id', goodsLoanReturnById);

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

				{/* Versi Destop */}
				<Hidden only={['xs']}>
					<Grid item xs={12} sm={12}>
						<Title16700 text="Informasi Barang" />
						<Box sx={{ mt: 1 }}>
							{goodsLoanReturnById?.loanItem !== undefined ? (
								<CustomNewTableDetail
									data={goodsLoanReturnById?.loanItem}
									columnShape={ColumnShape({
										onAdd: handlePengembalian,
									})}
								/>
							) : null}
						</Box>
					</Grid>
				</Hidden>

				{/* Versi Mobile */}
				<Hidden only={['sm', 'md', 'lg', 'xl']}>
					{goodsLoanReturnById?.loanItem.length > 0
						? goodsLoanReturnById?.loanItem.map(item => {
								return (
									<Grid item xs={12} sm={12}>
										<CardInputDetail
											value1={item?.itemNumber}
											value2={item?.itemName}
											value3={item?.itemInfo}
											status={item?.loanStatus}
											onClick={() => handlePengembalian(item)}
										/>
									</Grid>
								);
						  })
						: null}
				</Hidden>
			</Grid>

			{/* pop up */}
			<AppModalMedium
				open={openDialog}
				handleClose={() => setOpenDialog(false)}
			>
				<Box>
					<Grid container spacing={2}>
						<Grid
							item
							sm={12}
							sx={{ display: 'flex', justifyContent: 'center' }}
						>
							<Title16700 text="PENGEMBALIAN BARANG" />
						</Grid>
						<Grid item xs={12} sm={12}>
							<CardProfil />
						</Grid>
						<Grid item xs={12} sm={12} sx={{ mt: 1 }}>
							<Title16700 text="Informasi Barang" />
						</Grid>
						<Grid item xs={6} sm={4}>
							<Title14400 text="No. Peminjaman" color="#738499" />
							<Title14400 text={dataRow?.itemNumber} />
						</Grid>
						<Grid item xs={6} sm={4}>
							<Title14400 text="Nama Barang" color="#738499" />
							<Title14400 text={dataRow?.itemName} />
						</Grid>
						<Grid item xs={6} sm={4}>
							<Title14400 text="Kondisi Awal Barang" color="#738499" />
							<Title14400 text={dataRow?.itemInfo} />
						</Grid>

						<Grid item xs={12} sm={6}>
							<DatePicker
								label="Tanggal Pengembalian"
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
						<Grid
							item
							xs={12}
							sm={6}
							sx={{
								display: 'flex',
								alignItems: 'center',
								justifyContent: 'space-between',
							}}
						>
							<Title14400 text="Kondisi Barang :" />
							<RadioGroup
								row
								value={kondisiBarang}
								onChange={e => setKondisiBarang(e.target.value)}
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
						</Grid>
						<Grid item xs={12} sm={12} sx={{ mt: 1 }}>
							<Title16700 text="Yang Menyerahkan" />
						</Grid>
						<Grid item xs={12} sm={4}>
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
						<Grid item xs={12} sm={4}>
							<AppTextField
								fullWidth
								label="Jabatan"
								disabled
								value={officerId?.officerPosition}
							/>
						</Grid>
						<Grid item xs={12} sm={4}>
							<AppTextField
								fullWidth
								label="Departemen"
								disabled
								value={officerId?.officerDepartemen}
							/>
						</Grid>
						<Grid item xs={12} sm={12}>
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
				</Box>
			</AppModalMedium>
		</Box>
	);
}

export default DetailPeminjamanPengembalian;
