import React from 'react';
import { Box, Typography } from '@mui/material';

function StatusBox(props) {
	const { backgroundColor, color, text } = props;

	return (
		<Box
			sx={{
				height: '35px',
				// width: '134px',
				padding: '0 15px',
				borderRadius: '50px',
				backgroundColor: { backgroundColor },
				display: 'flex',
				justifyContent: 'center',
				alignItems: 'center',
			}}
		>
			<Typography sx={{ fontSize: 16, fontWeight: 400, color: { color } }}>
				{text}
			</Typography>
		</Box>
	);
}

export default StatusBox;
