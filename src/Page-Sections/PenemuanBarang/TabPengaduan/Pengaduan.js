import React, { useContext, useEffect, useState } from 'react';

import {
	Box,
	Button,
	Card,
	CardActionArea,
	CardContent,
	Grid,
	Hidden,
	Stack,
} from '@mui/material';
import moment from 'moment';

import CustomSearch from 'Component/CustomSearch';
import CustomNewTable from 'Component/CustomTable/CustomNewTable';
import Title16700 from 'Component/Typographys/Title16700';
import Title14600 from 'Component/Typographys/Title14600';
import Title14400 from 'Component/Typographys/Title14400';
import StatusBox from 'Component/status';
import BoxStatus from 'Component/CuxtomBox/BoxStatus';

import columnShape from 'Page-Sections/PengaduanBarang/column-shape1';
import FoundLocation from 'Page-Sections/PenemuanBarang/Data/FoundLocation';
import FoundName from 'Page-Sections/PenemuanBarang/Data/FoundName';

import { GoodsComplaintContext } from 'Context/GoodsComplaint';
import API from 'Services/Api';

function Pengaduan(props) {
	const { dataFound } = props;

	// context
	const {
		dataGoodsComplaint,
		getDataGoodsComplaint,
		goodsComplaintById,
		getDataGoodsComplaintById,
	} = useContext(GoodsComplaintContext);

	// state
	const [updateLostFound, setUpdateLostFound] = useState(dataFound);
	const [foundPengaduan, setFoundPengaduan] = useState({
		onButton: true,
		onView: false,
	});
	const [searchData, setSearchData] = useState({
		formDate: null,
		formLocation: '',
		formSearch: '',
		foundName: '',
	});

	// handle
	const handlePengaduan = async () => {
		setFoundPengaduan({
			onButton: false,
			onView: true,
		});
		setSearchData({
			...searchData,
			formName: dataFound.foundType,
			formLocation: dataFound.foundLocation,
			// formDate: moment(dataFound.foundDate).format('YYYY-MM-DD'),
		});
		const postData = {
			// complaintDate: dataFound.foundDate,
			location: dataFound.foundLocation,
			complaintType: dataFound.foundNType,
			complaintStatus: 'Belum Ditemukan',
		};
		// console.log('data found', postData);
		await getDataGoodsComplaint(postData);
	};

	const handleSearch = async dataSearch => {
		// console.log('dataSearch', dataSearch);
		const postData = {
			// complaintDate: dataSearch.formDate,
			location: dataSearch.formLocation,
			complaintType: dataSearch.formName,
			complaintSearch: dataSearch.formSearch,
			complaintStatus: 'Belum Ditemukan',
		};
		await getDataGoodsComplaint(postData);
	};

	const handleMaping = async dataComplaint => {
		// console.log('data complaint', dataComplaint);
		let updateData = {
			lostId: dataComplaint._id, // id pegaduan
			// foundStatus: 'Penyimpanan',
		};
		let updateDataLost = {
			complaintFoundId: dataFound._id, // id penemuan
			complaintStatus: 'Ditemukan',
		};
		const respon = await API.putLostFound(dataFound._id, updateData);
		const responData = await API.putGoodsComplaint(
			dataComplaint._id,
			updateDataLost
		);
		// console.log('respon', respon);

		if (responData.statusText === 'OK' && respon.statusText === 'OK') {
			setFoundPengaduan({
				onButton: false,
				onView: false,
			});
			const _dataUpdate = respon.data.data;
			await getDataGoodsComplaintById(_dataUpdate.lostId);
			// setDataGoodsComplaint(respon.data.data);
			setUpdateLostFound(_dataUpdate);

			window.location.reload();
		}
	};

	const getStatusStyles = status => {
		switch (status) {
			case 'Belum Ditemukan':
				return { backgroundColor: '#FFF5F8', color: '#F1416C' };
			case 'Ditemukan':
				return { backgroundColor: '#FFF8DD', color: '#F6C000' };
			case 'Claimed':
				return { backgroundColor: '#E8FFF3', color: '#50CD89' };
			default:
				return null; // Mengembalikan null jika status tidak ditemukan
		}
	};

	// Mendapatkan gaya berdasarkan status
	const statusStyles = getStatusStyles(goodsComplaintById?.complaintStatus);

	// useEffect
	useEffect(() => {
		if (
			updateLostFound.lostId !== undefined &&
			updateLostFound.lostId !== null
		) {
			getDataGoodsComplaintById(updateLostFound.lostId);
			setFoundPengaduan({
				onButton: false,
				onView: false,
			});
		} else {
			setFoundPengaduan({
				onButton: true,
				onView: false,
			});
		}
	}, []);

	return (
		<Box>
			<Grid container spacing={2}>
				{foundPengaduan?.onView === true ? (
					<>
						<Grid item xs={12} sm={12}>
							<CustomSearch
								onSearch={handleSearch}
								searchData={searchData}
								setSearchData={setSearchData}
								// handleFilter=""
								labelDate="Tanggal"
								labelSelectLocation="Lokasi"
								labelSelectItems="Jenis Barang"
								dataSelectLocation={FoundLocation}
								dataSelectItems={FoundName}
								labelSearch="Search..."
								type="View"
							/>
						</Grid>
						{/* versi destop */}
						<Hidden only={['xs']}>
							{dataGoodsComplaint.length > 0 ? (
								<Grid item xs={12} sm={12} sx={{ mb: 7 }}>
									<CustomNewTable
										data={dataGoodsComplaint}
										columnShape={columnShape({
											onMaping: handleMaping,
											typeButton: 'Maping',
										})}
									/>
								</Grid>
							) : (
								<Grid item xs={12} sm={12} sx={{ mt: 3 }}>
									<Title16700 text="Data Kosong" />
								</Grid>
							)}
						</Hidden>
						{/* versi mobile */}
						<Hidden only={['sm', 'md', 'lg', 'xl']}>
							{dataGoodsComplaint.length > 0 ? (
								dataGoodsComplaint.map(item => {
									const _date = moment(item.complaintDate).format(
										'DD MMMM YYYY'
									);
									const _time = moment(item.complaintTime).format('HH:mm');
									return (
										<Grid item xs={12} sm={12} sx={{ mt: 1 }}>
											<Card>
												<CardContent>
													<Box>
														<BoxStatus title={item.complaintStatus} />
													</Box>
													<Box sx={{ display: 'flex', gap: 4, mt: 1 }}>
														<Stack direction="column" spacing={1}>
															<Title14400
																text="Tanggal"
																fontWeight={500}
																color="#BABBBC"
																mt={1}
															/>
															<Title14400
																text="Penemuan"
																fontWeight={500}
																color="#BABBBC"
															/>
															<Title14400
																text="Pemilik"
																fontWeight={500}
																color="#BABBBC"
															/>
															<Title14400
																text="Informasi Barang"
																fontWeight={500}
																color="#BABBBC"
															/>
														</Stack>
														<Stack direction="column" spacing={1}>
															<Title14400 text={_date + ' ' + _time} mt={1} />
															<Title14400 text={item.complaintLocation} />
															<Title14400 text={item.complaintBy} />
														</Stack>
													</Box>
													<Box sx={{ mt: 1 }}>
														<Title14400
															text={item.complaintName}
															fontWeight={500}
															my={1}
														/>
														<Title14400 text={item.complaintType} />
													</Box>
													<Box sx={{ mt: 1 }}>
														<Title14400
															text="Detail"
															fontWeight={500}
															color="#BABBBC"
														/>
														<Title14400 text={item.complaintDescription} />
													</Box>
													<Box
														sx={{
															mt: 3,
															display: 'flex',
															justifyContent: 'flex-end',
														}}
													>
														<Button
															variant="contained"
															onClick={() => handleMaping(item)}
														>
															Link
														</Button>
													</Box>
												</CardContent>
											</Card>
										</Grid>
									);
								})
							) : (
								<Box sx={{ mt: 3 }}>
									<Title16700 text="Data Kosong" />
								</Box>
							)}
						</Hidden>
					</>
				) : foundPengaduan.onButton !== true &&
				  foundPengaduan.onView !== true ? (
					<Grid item xs={12} sm={12}>
						<Grid container spacing={2}>
							<Grid item xs={12} sm={12}>
								<Title16700 text="DATA KEHILANGAN" />
							</Grid>
							<Grid item xs={12} sm={12}>
								<Stack direction="row" alignItems="center" spacing={2}>
									<StatusBox
										backgroundColor={
											statusStyles
												? statusStyles.backgroundColor
												: 'transparent'
										}
										color={statusStyles ? statusStyles.color : 'black'}
										text={goodsComplaintById?.complaintStatus}
									/>
									{/* <Typography sx={{ color: '#1C8CED', fontWeight: 600 }}>
												FO-09232
											</Typography> */}
								</Stack>
							</Grid>
							<Grid item xs={12} sm={4}>
								<Title14600 text="Jenis Barang" />
								<Title14400 text={goodsComplaintById?.complaintName} />
							</Grid>
							<Grid item xs={12} sm={4}>
								<Title14600 text="Tanggal & Waktu Kehilangan" />
								<Title14400
									text={moment(goodsComplaintById?.complaintDate).format(
										'DD/MM/YYYY'
									)}
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
							<Grid item xs={12} sm={12}>
								<Title16700 text="DATA PEMILIK" />
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
						</Grid>
					</Grid>
				) : (
					<>
						<Grid
							item
							xs={12}
							sm={12}
							sx={{ display: 'flex', justifyContent: 'flex-end' }}
						>
							<Button variant="contained" onClick={handlePengaduan}>
								Cari Pengaduan
							</Button>
						</Grid>
						<Grid
							item
							xs={12}
							sm={12}
							sx={{ display: 'flex', justifyContent: 'center' }}
						>
							<Title14400 text="Tidak ada data pengaduan barang" />
						</Grid>
					</>
				)}
			</Grid>
		</Box>
	);
}

export default Pengaduan;
