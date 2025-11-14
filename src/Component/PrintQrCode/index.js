import React, { useRef } from 'react';
import { Box, Stack, Typography } from '@mui/material';
import { useReactToPrint } from 'react-to-print';
import { useNavigate } from 'react-router-dom';

import AppModalMedium from 'Component/AppModalMedium';
import ButtonText from 'Component/Buttons/ButtonText';
import ButtonSubmit from 'Component/Buttons/ButtonSubmit';
import Title20 from 'Component/Typographys/Title20';

function PrintQrCode(props) {
	const { open, handleClose, src, title, titleClose } = props;
	const navigate = useNavigate();
	const printRef = useRef();

	const handlePrint = useReactToPrint({
		content: () => printRef.current,
	});

	return (
		<AppModalMedium open={open} handleClose={handleClose}>
			<Box sx={{display: 'flex', justifyContent: 'center', mb: '20px'}}>
				<Title20 font={700} text="Label Barang" />
			</Box>
			<div ref={printRef}>
				<Stack direction="column" alignItems="center" justifyContent="center">
					<img src={src} style={{ width: '70%', height: '70%' }} />
					<Typography sx={{ fontWeight: 'bold' }}>{title}</Typography>
				</Stack>
			</div>
			<Stack
				direction="row"
				justifyContent="flex-end"
				spacing={1}
				sx={{ marginTop: '30px' }}
			>
				<ButtonText title={titleClose} onClick={handleClose} />
				<ButtonSubmit title="Cetak" onClick={handlePrint} />
			</Stack>
		</AppModalMedium>
	);
}

export default PrintQrCode;
