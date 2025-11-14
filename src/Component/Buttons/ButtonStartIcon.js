import { Button } from '@mui/material';
import React from 'react';
import Add from 'Icons/Add';

function ButtonStartIcon(props) {
	const { title, onClick } = props;
	return (
		<Button
			fullWidth
			variant="contained"
			startIcon={<Add />}
			sx={{ height: '40px', backgroundColor: '#1C8CED' }}
			onClick={onClick}
		>
			{title}
		</Button>
	);
}

export default ButtonStartIcon;
