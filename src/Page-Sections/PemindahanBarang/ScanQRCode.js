import { Box, Stack, Button, Grid } from '@mui/material';
import ButtonContainer from 'Component/Buttons/ButtonContainer';
import ButtonText from 'Component/Buttons/ButtonText';
import Title14400 from 'Component/Typographys/Title14400';
import Title16700 from 'Component/Typographys/Title16700';
import React, { useState } from 'react';
import QrReader from 'react-qr-scanner';
import QRCode from 'qrcode';
import AppTextField from 'Component/input-fields/AppTextField';

function ScanQRCode(props) {
	const { handleClose, handleScanWebCam } = props;
	const [scanResultWebCam, setScanResultWebCam] = useState('');

	// const generateQrCode = async () => {
	// 	try {
	// 		const response = await QRCode.toDataURL('text qrcode generation');
	// 		console.log(response);
	// 	} catch (error) {
	// 		console.log(error);
	// 	}
	// };

	const handleErrorWebCam = error => {
		console.log(error);
	};
	// const handleScanWebCam = result => {
	// 	if (result) {
	// 		setScanResultWebCam(result.text);
	// 		console.log('data result', result);
	// 	}
	// };
	return (
		<Stack direction="column" alignItems="center" spacing={2}>
			<Title16700 text="Scan QR Code Barang" />
			<Grid container spacing={2}>
				{/* <Grid item xs={12} sm={6}>
					<Stack direction="row" spacing={1}>
						<AppTextField size="small" label="Enter Text Here" />
						<Button variant="contained" onClick={generateQrCode}>
							Generate
						</Button>
					</Stack>
				</Grid> */}
				<Grid item xs={12} sm={12}>
					<QrReader
						delay={300}
						style={{ width: '100%', height: 300 }}
						onError={handleErrorWebCam}
						onScan={handleScanWebCam}
					/>
				</Grid>
			</Grid>

			{/* <Title14400 text={scanResultWebCam} />
			<Stack direction="row" spacing={2}>
				<ButtonText title="Keluar" onClick={handleClose} />
				<ButtonContainer title="Tambah Barang" />
			</Stack> */}
		</Stack>
	);
}

export default ScanQRCode;
