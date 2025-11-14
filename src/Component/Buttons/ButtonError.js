import React, { useState } from 'react';
import { Button } from '@mui/material';

function ButtonError(props) {
	const { title, icon, onClick } = props;
	return (
		<Button
			fullWidth
			variant="contained"
			startIcon={icon}
			sx={{ height: '40px', backgroundColor: '#ED1C24' }}
			color="error"
			onClick={onClick}
		>
			{title}
		</Button>
	);
}

export default ButtonError;
