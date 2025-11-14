import { Box, Button, Grid, Tab } from '@mui/material';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import { useNavigate } from 'react-router-dom';
import moment from 'moment';

import CustomNewHeader from 'Component/Headers/CustomNewHeader';
import BoxBarang from 'Component/Cards/BoxBarang';
import Title16600 from 'Component/Typographys/Title16600';
import Title64700 from 'Component/Typographys/Title64700';

import ListPenghapusBukuan from './ListPenghapusBukuan';

import React, { useState, useContext, useEffect } from 'react';
import ListHistoryPenghapusbukuan from './ListHistoryPenghapusbukuan';
import ListPenghapusbukuanV2 from './ListPenghapusbukuanV2';

import { DashboardContext } from 'Context/Dahsboard';
import ListPenyerahanBarang from './ListPenyerahanBarang';

function TabListPenghapusbukuan() {
	const navigate = useNavigate();

	// context
	const { dataDashboard, countLostFoundExpired, getDataLostFoundExpired } =
		useContext(DashboardContext);

	const [tab, setTab] = useState('1');
	const tabChange = (_, value) => setTab(value);

	useEffect(() => {
		const _date = moment(new Date()).format('YYYY-MM-DD');
		getDataLostFoundExpired(_date);
	}, []);

	console.log('data dashboard', countLostFoundExpired);

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
						judul="PENGHAPUSBUKUAN BARANG"
						title1="Home - Lost & Found - "
						title2="Penghapusbukuan Barang"
					/>
				</Grid>
				<Grid item xs={12} sm={4}>
					<BoxBarang
						content={
							<>
								<Title64700
									text={
										countLostFoundExpired
											? countLostFoundExpired?.totalExpired
											: 0
									}
									color="#ED1C24"
								/>
								<Title16600 text="Total Barang Habis Masa Simpan" />
							</>
						}
					/>
				</Grid>
				<Grid item xs={12} sm={4}>
					<BoxBarang
						content={
							<>
								<Title64700
									text={
										dataDashboard
											? dataDashboard?._dataByStatus[0]?.dihapuskan
											: 0
									}
									color="#1C8CED"
								/>
								<Title16600 text="Total Barang Terhapus" />
							</>
						}
					/>
				</Grid>
				<Grid item xs={12} sm={4}>
					<BoxBarang
						content={
							<>
								<Title64700
									text={
										dataDashboard
											? dataDashboard?._dataByStatus[0]?.penyimpanan
											: 0
									}
									color="#FFC675"
								/>
								<Title16600 text="Total Barang Disimpan" />
							</>
						}
					/>
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
								<Tab disableRipple label="List Barang" value="1" />
								<Tab disableRipple label="List Approval" value="2" />
								<Tab disableRipple label="List Penyerahan Barang" value="3" />
							</TabList>
						</Box>

						<TabPanel value="1">
							<ListPenghapusbukuanV2 />
						</TabPanel>

						<TabPanel value="2">
							<ListHistoryPenghapusbukuan />
						</TabPanel>
						<TabPanel value="3">
							<ListPenyerahanBarang />
						</TabPanel>
					</TabContext>
				</Grid>
			</Grid>
		</Box>
	);
}

export default TabListPenghapusbukuan;
