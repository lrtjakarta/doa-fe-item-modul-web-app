import React, { useState, useContext, useEffect } from 'react';

import { Grid, Button, Box, Stack, Hidden } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import moment from 'moment';

import Title14400 from 'Component/Typographys/Title14400';
import CustomSearch from 'Component/CustomSearch';
import CustomNewTable from 'Component/CustomTable/CustomNewTable';
import Title16700 from 'Component/Typographys/Title16700';
import Title14600 from 'Component/Typographys/Title14600';
import StatusBox from 'Component/status';

import ImgBarang from 'Assets/barang.png';

import FoundLocation from 'Page-Sections/PenemuanBarang/Data/FoundLocation';
import FoundName from 'Page-Sections/PenemuanBarang/Data/FoundName';
import columnShape from 'Page-Sections/PengaduanBarang/column-shape-penemuan';

import { LostFoundContext } from 'Context/LostFound';
import API from 'Services/Api';
import StaticVar from 'Config/StaticVar';
import CardMobile from './CardMobile';

function Penemuan({ data }) {
	// console.log('data penemuan', data);
	const navigate = useNavigate();
	const {
		dataLostFound,
		getDataLostFound,
		lostFoundById,
		getDataLostFoundById,
	} = useContext(LostFoundContext);

	const [foundPengaduan, setFoundPengaduan] = useState({
		onButton: true,
		onView: false,
	});
	const [searchData, setSearchData] = useState({
		formDate: null,
		formLocation: '',
		formSearch: '',
		formName: '',
	});
	const [updateLostFound, setUpdateLostFound] = useState(data);
	const [dataImage, setDataImage] = useState({
		url: '/uploads',
		path: '',
		name: '',
	});

	const handlePenemuan = async () => {
		setFoundPengaduan({
			onButton: false,
			onView: true,
		});
		setSearchData({
			...searchData,
			formName: data.complaintType,
			formLocation: data.complaintLocation,
			// formDate: moment(data.complaintDate).format('YYYY-MM-DD'),
		});
		const postData = {
			// foundDate: data.complaintDate,
			foundType: data.complaintType,
			foundLocation: data.complaintLocation,
			foundStatus: ['Unidentified', 'Identified', 'Penyimpanan'],
		};
		// console.log('data found', postData);
		await getDataLostFound(postData);
	};

	const handleSearch = async dataSearch => {
		// console.log('dataSearch', dataSearch);
		const postData = {
			// foundDate: dataSearch.formDate,
			foundLocation: dataSearch.formLocation,
			foundType: dataSearch.formName,
			foundSearch: dataSearch.formSearch,
			foundStatus: ['Unidentified', 'Identified', 'Penyimpanan'],
		};
		// console.log('data filter', dataSearch);
		await getDataLostFound(postData);
	};

	const handleMaping = async dataLostFound => {
		let updateDataFound = {
			lostId: data._id, // id pengaduan
			// foundStatus: 'Penyimpanan',
		};
		let updateDataLost = {
			complaintFoundId: dataLostFound._id, // id penemuan
			complaintStatus: 'Ditemukan',
		};
		const respon = await API.putLostFound(dataLostFound._id, updateDataFound);
		const responData = await API.putGoodsComplaint(data._id, updateDataLost);

		if (responData.statusText === 'OK' && respon.statusText === 'OK') {
			const _dataUpdate = respon.data.data;
			console.log('data update', responData);
			await getDataLostFoundById(_dataUpdate._id);
			// navigate(-1);
			setFoundPengaduan({
				onButton: false,
				onView: false,
			});
			setUpdateLostFound(_dataUpdate);

			window.location.reload();
		}
	};
	// console.log('data pengaduan', dataLostFound);

	const getStatusStyles = status => {
		switch (status) {
			case 'Unidentified':
				return { backgroundColor: '#FFF5F8', color: '#F1416C' };
			case 'Deleted':
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
	const statusStyles = getStatusStyles(lostFoundById?.foundStatus);

	useEffect(() => {
		if (
			updateLostFound.complaintFoundId !== undefined &&
			updateLostFound.complaintFoundId !== null
		) {
			getDataLostFoundById(updateLostFound.complaintFoundId);
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

	useEffect(() => {
		if (lostFoundById?.foundPhoto !== null) {
			const _foundPhoto =
				lostFoundById?.foundPhoto?.uploadedFiles[0]?.uploadedName;
			const _pathPhoto = lostFoundById?.foundPhoto?.path;
			setDataImage({
				url: '/uploads',
				path: `/${_pathPhoto}`,
				name: `/${_foundPhoto}`,
			});
		}
	}, [lostFoundById]);

	return (
		<Box>
			<Grid container spacing={3}>
				{foundPengaduan.onButton === true ? (
					<>
						<Grid
							item
							xs={12}
							sm={12}
							sx={{ display: 'flex', justifyContent: 'flex-end' }}
						>
							<Button variant="contained" onClick={handlePenemuan}>
								Cari Penemuan
							</Button>
						</Grid>
						<Grid
							item
							xs={12}
							sm={12}
							sx={{ display: 'flex', justifyContent: 'center' }}
						>
							<Title14400 text="Tidak ada data penemuan barang" />
						</Grid>
					</>
				) : foundPengaduan.onView === true ? (
					<>
						<Grid item xs={12} sm={12}>
							<CustomSearch
								onSearch={handleSearch}
								searchData={searchData}
								setSearchData={setSearchData}
								// handleFilter=""
								labelDate="Tanggal"
								labelSelectLocation="Lokasi Kehilangan"
								labelSelectItems="Jenis Barang"
								dataSelectLocation={FoundLocation}
								dataSelectItems={FoundName}
								labelSearch="Search..."
								type="View"
							/>
						</Grid>
						{/* Versi Destop */}
						<Hidden only={['xs']}>
							<Grid item xs={12} sm={12} sx={{mb: 7}}>
								<CustomNewTable
									data={dataLostFound}
									columnShape={columnShape({
										onMaping: handleMaping,
										typeButton: 'Maping',
									})}
								/>
							</Grid>
						</Hidden>

						{/* versi mobile */}
						<Hidden only={['sm', 'md', 'lg', "xl"]}>
							{dataLostFound.length > 0 ? (
								dataLostFound.map(item => {
									return (
										<Grid item xs={12} sm={12}>
											<CardMobile
												dataId={item}
												onMapping={() => handleMaping(item)}
											/>
										</Grid>
									);
								})
							) : (
								<Grid item xs={12} sm={12}>
									<Title16700 text="Data Kosong" />
								</Grid>
							)}
						</Hidden>
					</>
				) : foundPengaduan.onButton !== true ||
				  foundPengaduan.onView !== true ? (
					<>
						<Grid item xs={12} sm={12}>
							<Title16700 text="DETAIL BARANG" />
						</Grid>
						<Grid item xs={12} sm={5}>
							<img
								src={
									StaticVar.URL_API +
									dataImage.url +
									dataImage.path +
									dataImage.name
								}
								// src={ImgBarang}
								style={{
									objectFit: 'cover',
									height: '100%',
									width: '100%',
									maxWidth: '350px',
									borderRadius: '8px',
								}}
							/>
						</Grid>
						<Grid item xs={12} sm={7}>
							<Box sx={{width: '250px'}}>
							<StatusBox
								text={lostFoundById?.foundStatus}
								color={statusStyles ? statusStyles.color : 'black'}
								backgroundColor={
									statusStyles ? statusStyles.backgroundColor : 'transparent'
								}
							/>
							</Box>
							<Stack direction="row" spacing={2} sx={{ mt: '10px' }}>
								<Box sx={{ width: '100%' }}>
									<Title14600 text="Jenis Barang" />
									<Title14400 text={lostFoundById?.foundName} />
								</Box>
								<Box sx={{ width: '100%' }}>
									<Title14600 text="Identifikasi" />
									<Title14400
										text={lostFoundById?.identification?.identificationName}
									/>
								</Box>
								<Box sx={{ width: '100%' }}>
									<Title14600 text="Batas Waktu Penyimpanan" />
									<Title14400
										text={
											lostFoundById?.identification !== null
												? lostFoundById?.identification?.identificationExpired
														?.expiredValue +
												  ' ' +
												  lostFoundById?.identification?.identificationExpired
														?.expiredType
												: '-'
										}
									/>
								</Box>
							</Stack>
							<Box sx={{ width: '100%', mt: '5px' }}>
								<Title14600 text="Detail / Katakteristik" />
								<Title14400 text={lostFoundById?.foundDescription} />
							</Box>
						</Grid>
						<Grid item xs={12} sm={12}>
							<Title16700 text="PENEMUAN" />
						</Grid>
						<Grid item xs={12} sm={3}>
							<Title14600 text="Lokasi Ditemukan" />
							<Title14400 text={lostFoundById?.foundLocation} />
						</Grid>
						<Grid item xs={12} sm={3}>
							<Title14600 text=" Waktu Penemuan" />
							<Title14400
								text={moment(lostFoundById?.foundDate).format('DD/MM/YYYY')}
							/>
						</Grid>
						<Grid item xs={12} sm={3}>
							<Title14600 text="Petugas yang menemukan" />
							<Title14400 text="Khoirul Mustaan" />
							<Title14400 text="Passenger Service Agent" />
						</Grid>
						<Grid item xs={12} sm={3}>
							<Title14600 text="Petugas yang menginput" />
							<Title14400 text={lostFoundById?.officer?.officerName} />
							<Title14400 text={lostFoundById?.officer?.officerPosition} />
						</Grid>
						<Grid item xs={12} sm={12} sx={{mb: 7}}>
							<Title14600 text="Kronologi Penemuan" />
							<Title14400 text={lostFoundById?.foundChronology} />
						</Grid>
					</>
				) : null}
			</Grid>
		</Box>
	);
}

export default Penemuan;
