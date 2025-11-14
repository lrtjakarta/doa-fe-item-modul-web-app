import React, { useContext, useEffect, useState } from 'react';
import EditIcon from '@mui/icons-material/Edit';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import { Box, Grid, IconButton, Stack, Tab } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import moment from 'moment';

import CustomNewHeader from 'Component/Headers/CustomNewHeader';
import Title18700 from 'Component/Typographys/Title18700';
import Title16700 from 'Component/Typographys/Title16700';
import StatusBox from 'Component/status';
import Title14600 from 'Component/Typographys/Title14600';
import Title14400 from 'Component/Typographys/Title14400';
import CardProfil from 'Component/Cards/CardProfil';

// Context
import { GoodsComplaintContext } from 'Context/GoodsComplaint';
import Pengaduan from 'Page-Sections/PengaduanBarang/Pengaduan';
import Penemuan from 'Page-Sections/PengaduanBarang/Penemuan';

function DetailPengaduan() {
	const navigate = useNavigate();
	const location = useLocation();
	const { id, data } = location.state;

	// context
	const { goodsComplaintById, getDataGoodsComplaintById } = useContext(
		GoodsComplaintContext
	);

	const [tab, setTab] = useState('1');

	const tabChange = (_, value) => setTab(value);

	const handleEdit = () => {
		navigate('/manajemenBarang/pengaduan/add', {
			state: { id: id, data: data },
		});
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

	useEffect(() => {
		getDataGoodsComplaintById(id);
	}, []);

	return (
		<Box
			sx={{
				padding: { xs: '15px', sm: '30px' },
				background: '#fff',
				minHeight: '100vh',
			}}
		>
			<Grid container spacing={3}>
				<Grid item xs={12} sm={12}>
					<CustomNewHeader
						judul="PENGADUAN BARANG"
						title1="Home - Lost & Found - Pengaduan Barang - "
						title2="Detail Pengaduan"
					/>
				</Grid>
				<Grid
					item
					xs={12}
					sm={12}
					sx={{ display: 'flex', justifyContent: 'center', width: '70%' }}
				>
					<Box
					// sx={{
					// 	padding: '20px 50px',
					// 	width: '80%',
					// 	backgroundColor: '#F9F9F9',
					// 	borderRadius: '24px',
					// 	display: 'flex',
					// 	flexDirection: 'column',
					// 	alignItems: 'center',
					// }}
					>
						<Grid container spacing={2}>
							<Grid
								item
								xs={12}
								sm={12}
								sx={{
									display: 'flex',
									justifyContent: 'center',
									alignItems: 'center',
								}}
							>
								<Title18700 text="DETAIL PENGADUAN" />
								<IconButton onClick={handleEdit}>
									<EditIcon sx={{ color: '#1C8CED' }} />
								</IconButton>
							</Grid>
							<Grid item xs={12} sm={12} sx={{ mt: '20px' }}>
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
							<Grid item xs={12} sm={12}>
								<TabContext value={tab}>
									<Box
										sx={{
											paddingTop: 1,
											paddingLeft: 2,
											'& .MuiTab-root': {
												fontSize: 12,
												fontWeight: 600,
											},
										}}
									>
										<TabList
											onChange={tabChange}
											textColor="#3F4254"
											indicatorColor="primary"
										>
											<Tab disableRipple label="Pengaduan" value="1" />
											<Tab disableRipple label="Penemuan" value="2" />
										</TabList>
									</Box>

									<TabPanel value="1">
										<Pengaduan data={goodsComplaintById} />
									</TabPanel>

									<TabPanel value="2">
										<Penemuan data={goodsComplaintById} />
									</TabPanel>
								</TabContext>
							</Grid>
						</Grid>
					</Box>
				</Grid>
			</Grid>
		</Box>
	);
}

export default DetailPengaduan;
