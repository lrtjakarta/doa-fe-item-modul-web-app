import React from 'react';
import { Button } from '@mui/material';

function ButtonText(props) {
	const { title, onClick } = props;
	return (
		<Button
			variant="text"
			color="error"
			sx={{ padding: '10px 35px' }}
			onClick={onClick}
		>
			{title}
		</Button>
	);
}

export default ButtonText;
