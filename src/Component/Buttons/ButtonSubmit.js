import React from 'react';
import { Button } from '@mui/material';

function ButtonSubmit(props) {
	const { title, onClick } = props;
	return (
		<Button
			type="submit"
			variant="contained"
			sx={{ padding: '10px 35px' }}
			onClick={onClick}
		>
			{title}
		</Button>
	);
}

export default ButtonSubmit;
