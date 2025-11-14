import { Typography } from '@mui/material';
import React from 'react';

function Title12(props) {
	const { color, fontWeight, text } = props;
	return (
		<Typography
			sx={{
				fontSize: 12,
				fontWeight: fontWeight ? fontWeight : 400,
				color: color,
				...props,
			}}
		>
			{text}
		</Typography>
	);
}

export default Title12;
