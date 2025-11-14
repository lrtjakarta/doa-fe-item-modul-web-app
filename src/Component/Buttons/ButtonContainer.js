import { Button } from '@mui/material';
import React from 'react';

function ButtonContainer(props) {
	const { title, onClick, width } = props;

	return (
		<Button
			variant="contained"
			sx={{
				height: '40px',
				backgroundColor: '#1C8CED',
				width: width ? width : '100%',
			}}
			onClick={onClick}
		>
			{title}
		</Button>
	);
}

export default ButtonContainer;
