import { Box, Grid, Hidden } from '@mui/material';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import React, { useContext, useEffect, useState } from 'react';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { KeyboardArrowDown } from '@mui/icons-material';
import Add from 'Icons/Add';
import QrCodeScannerIcon from '@mui/icons-material/QrCodeScanner';
import { useNavigate } from 'react-router-dom';

import AppTextField from 'Component/input-fields/AppTextField';
import SearchInput from 'Component/input-fields/SearchInput';
import CustomTableList from 'Component/CustomTableList';
import ColumnShape from 'Page-Sections/PemindahanBarang/column-shape';
import ScanQRCode from 'Page-Sections/PemindahanBarang/ScanQRCode';

import LIST_DATA from 'Page-Sections/PemindahanBarang/Data/ListData';
import CustomNewHeader from 'Component/Headers/CustomNewHeader';
import ButtonContainer from 'Component/Buttons/ButtonContainer';
import ButtonStartIcon from 'Component/Buttons/ButtonStartIcon';
import ButtonFilter from 'Component/Buttons/ButtonFilter';
import ButtonError from 'Component/Buttons/ButtonError';
import CustomNewTable from 'Component/CustomTable/CustomNewTable';
import AppModalMedium from 'Component/AppModalMedium';
import ScanQr from 'Component/ScanQrCode';

// context
import API from 'Services/Api';
import { GoodsRelocationContext } from 'Context/GoodsRelocation';
import { LocationContext } from 'Context/Location';
import CardMobile from 'Component/Cards/CardMobile';
import moment from 'moment';

function PemindahanPages() {
	const navigate = useNavigate();

	// context
	const { dataGoodsRelocation, getDataGoodsRelocation } = useContext(
		GoodsRelocationContext
	);
	const { dataLocation, getDataLocation } = useContext(LocationContext);

	const [openModal, setOpenModal] = useState(false);
	const [tab, setTab] = useState('1');
	const [codeItem, setCodeItem] = useState('');

	const [allData, setAllData] = useState([]);

	const [searchFirst, setSearchFirst] = useState('');
	const [searchLast, setSearchLast] = useState('');
	const [search, setSearch] = useState('');

	const tabChange = (_, value) => setTab(value);

	const handleFilter = () => {};
	const handleClickAdd = () => {
		navigate('add', { state: { id: 0 } });
	};
	const handleView = row => {
		if (row.relocationStatus === 'Diterima') {
			navigate('detail', {
				state: { id: row._id, data: row, status: 'berita finish' },
			});
		} else {
			navigate('detail', {
				state: { id: row._id, data: row, status: 'berita sementara' },
			});
		}
	};

	const handleScan = () => {
		setOpenModal(true);
	};
	const handleCloseModal = () => {
		setOpenModal(false);
	};

	const handleScanWebCam = async result => {
		if (result) {
			const dataFilter = dataGoodsRelocation.filter(
				x => x.relocationNumber === result.text
			);

			if (dataFilter.length > 0) {
				navigate('detail', {
					state: {
						id: result.text,
						data: dataFilter[0],
						status: 'berita input',
					},
				});
			}
			// console.log('data result', dataFilter);
		}
	};
	const handleSubmit = () => {
		if (codeItem !== '') {
			const dataFilter = dataGoodsRelocation.filter(
				x => x.relocationNumber === codeItem
			);
			if (dataFilter.length > 0) {
				navigate('detail', {
					state: {
						id: codeItem,
						data: dataFilter[0],
						status: 'berita input',
					},
				});
			}
		}
	};
	const handleClose = () => {
		handleCloseModal();
	};

	const handleSearch = async () => {
		const filterData = {
			previousStorage: searchFirst,
			currentStorage: searchLast,
			relocationSearch: search,
		};

		const respon = await API.getGoodsRelocation({ params: filterData });
		if (respon.statusText === 'OK') {
			setAllData(respon.data);
		}
	};

	useEffect(() => {
		getDataGoodsRelocation();
		getDataLocation({multiLocation: ['storage', 'storagefound']});
	}, []);

	useEffect(() => {
		setAllData(dataGoodsRelocation);
	}, [dataGoodsRelocation]);

	return (
		<Box
			sx={{
				padding: { xs: '15px', sm: '30px' },
				background: '#FFF',
				minHeight: '100vh',
			}}
		>
			<Grid container spacing={3}>
				<Grid item xs={12} sm={12}>
					<CustomNewHeader
						judul="DAFTAR PEMINDAHAN BARANG"
						title1="Home - Lost & Found - "
						title2="Pemindahan Barang"
					/>
				</Grid>
				<Grid
					item
					xs={12}
					sm={8}
					sx={{
						display: 'flex',
						flexDirection: { xs: 'column', sm: 'row' },
						gap: 1,
					}}
				>
					<Box sx={{ width: { xs: '100%', sm: '150px' } }}>
						<AppTextField
							select
							fullWidth
							size="small"
							label="Lokasi Sebelumnya"
							SelectProps={{
								native: true,
								IconComponent: KeyboardArrowDown,
							}}
							sx={{ mt: '0px' }}
							value={searchFirst}
							onChange={e => setSearchFirst(e.target.value)}
						>
							<option value=""></option>;
							{dataLocation.map(item => {
								return (
									<option value={item.locationName}>{item.locationName}</option>
								);
							})}
						</AppTextField>
					</Box>
					<Box sx={{ width: { xs: '100%', sm: '150px' } }}>
						<AppTextField
							select
							fullWidth
							size="small"
							label="Lokasi Saat Ini"
							SelectProps={{
								native: true,
								IconComponent: KeyboardArrowDown,
							}}
							sx={{ mt: '0px' }}
							value={searchLast}
							onChange={e => setSearchLast(e.target.value)}
						>
							<option value=""></option>;
							{dataLocation.map(item => {
								return (
									<option value={item.locationName}>{item.locationName}</option>
								);
							})}
						</AppTextField>
					</Box>
					<Box sx={{ width: { xs: '100%', sm: '150px' } }}>
						<SearchInput
							placeholder="Search..."
							value={search}
							onChange={e => setSearch(e.target.value)}
						/>
					</Box>
					<Box
						sx={{
							width: { xs: '100%', sm: '100px' },
							display: 'flex',
							gap: 1,
						}}
					>
						<ButtonContainer title="Cari" onClick={handleSearch} />
						{/* <ButtonFilter onClick="" /> */}
					</Box>
				</Grid>
				<Grid
					item
					xs={12}
					sm={4}
					sx={{ display: 'flex', justifyContent: 'flex-end', gap: 1 }}
				>
					<ButtonStartIcon title="Tambah" onClick={handleClickAdd} />
					<ButtonError
						title="Penerimaan"
						onClick={handleScan}
						icon={<QrCodeScannerIcon />}
					/>
				</Grid>

				{/* Versi Destop */}
				<Hidden only={['xs']}>
					<Grid item xs={12} sm={12} sx={{mb: 7}}>
						<CustomNewTable
							data={allData !== null ? allData : dataGoodsRelocation}
							columnShape={ColumnShape({
								onView: handleView,
							})}
						/>
					</Grid>
				</Hidden>

				{/* Versi Destop */}
				<Hidden only={['sm', 'md', 'lg', 'xl']}>
					{allData.length > 0
						? allData
								.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
								.map(item => {
									const _date = moment(item?.relocationDate).format(
										'DD/MM/YYYY'
									);
									const _time = moment(item?.relocationDate).format('HH:mm');
									return (
										<Grid item xs={12} sm={12} sx={{ mt: 1 }}>
											<CardMobile
												onClick={() => handleView(item)}
												status={item?.relocationStatus}
												date={_date + ' ' + _time}
												info1="Jumlah Barang"
												value1={item?.relocationItems.length}
												info2="Nomor Laporan"
												value2={item?.relocationNumber}
												info3="Lokasi Sebelumnya"
												value31={item?.previousStorage}
												// value32={item?.complaintPhone}
												info4="Lokasi Saat Ini"
												value4={item?.currentStorage}
											/>
										</Grid>
									);
								})
						: null}
				</Hidden>
			</Grid>

			{/* Modal Scan */}
			<AppModalMedium open={openModal} handleClose={handleCloseModal}>
				<ScanQr
					handleCloseModal={handleCloseModal}
					handleScanWebCam={handleScanWebCam}
					handleClose={handleCloseModal}
					handleSubmit={handleSubmit}
					value={codeItem}
					onChange={e => setCodeItem(e.target.value)}
				/>
			</AppModalMedium>
		</Box>
	);
}

export default PemindahanPages;
