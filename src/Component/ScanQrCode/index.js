import React, { useState } from 'react';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import { Typography, Tab, Stack, Box, Button } from '@mui/material';
import AppTextField from 'Component/input-fields/AppTextField';
import ScanQRCode from 'Page-Sections/PemindahanBarang/ScanQRCode';

function ScanQr(props) {
	const {
		handleCloseModal,
		handleScanWebCam,
		handleClose,
		handleSubmit,
		value,
		onChange,
	} = props;
	const [tab, setTab] = useState('1');
	const tabChange = (_, value) => setTab(value);
	return (
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
				<ScanQRCode
					handleClose={handleCloseModal}
					handleScanWebCam={handleScanWebCam}
				/>
			</TabPanel>

			<TabPanel value="2">
				<Stack direction="column" alignItems="center" spacing={2}>
					<Typography sx={{ fontSize: '24px', fontWeight: 500 }}>
						Masukkan Secara Manual
					</Typography>
					<AppTextField
						sx={{ width: '50%' }}
						label="Nomor Laporan"
						value={value}
						onChange={onChange}
					/>
					<Stack direction="row" spacing={2} sx={{ paddingTop: '35px' }}>
						<Button
							variant="text"
							sx={{ padding: '10px 35px' }}
							color="error"
							onClick={handleClose}
						>
							Batal
						</Button>

						<Button
							type="submit"
							sx={{ padding: '10px 35px' }}
							variant="contained"
							onClick={handleSubmit}
						>
							Submit
						</Button>
					</Stack>
				</Stack>
			</TabPanel>
		</TabContext>
	);
}

export default ScanQr;
