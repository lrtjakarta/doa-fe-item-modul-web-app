import React, { useState } from 'react';
import './style.css';

import { Box, Tab } from '@mui/material';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import { lightTheme } from '../../constants';
import { useNavigate } from 'react-router-dom';

import HeaderPenemuan from 'Page-Sections/PenemuanBarang/HeaderPenemuan';
import QRCode from 'Page-Sections/PenemuanBarang/ScanQRCode/QRCode';
import InputManual from 'Page-Sections/PenemuanBarang/ScanQRCode/InputManual';
import CustomHeaderTitle from 'Component/Headers/CustomHeaderTitle';
import ScanQRCodeCam from 'Page-Sections/PemindahanBarang/ScanQRCode';

function ScanQRCode({ handleClose }) {
	const navigate = useNavigate();

	const [tab, setTab] = useState('1');

	const tabChange = (_, value) => setTab(value);

	// const handleSubmit = () => {
	// 	navigate('/penemuan/formPengambilan');
	// };

	const handleScanWebCam = async result => {
		// return;
		if (result) {
			console.log('date scan', result.text);
			// return;
			const _data = result.text;
			navigate('/manajemenBarang/penemuan/formPengambilan', {
				state: { _idNumber: _data },
			});
		}
	};

	return (
		<Box sx={{ p: '30px' }}>
			<CustomHeaderTitle
				title1="Home - Lost & Found - "
				title2="Pengambilan Barang"
			/>
			<Box sx={{ marginTop: '30px' }}>
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
							<Tab disableRipple label="SCAN QRCODE" value="1" />
							<Tab disableRipple label="INPUT MANUAL" value="2" />
						</TabList>
					</Box>

					<TabPanel value="1">
						{/* <QRCode /> */}
						<ScanQRCodeCam handleScanWebCam={handleScanWebCam} />
					</TabPanel>

					<TabPanel value="2">
						<InputManual handleClose={handleClose} />
					</TabPanel>
				</TabContext>
			</Box>
		</Box>
	);
}

export default ScanQRCode;
