import React from 'react';
import { Typography } from '@mui/material';

function Title14400(props) {
	const { color, text, fontWeight } = props;
	return (
		<Typography
			sx={{
				fontSize: 14,
				fontWeight: fontWeight ? fontWeight : 400,
				color: { color },
				...props,
			}}
		>
			{text}
		</Typography>
	);
}

export default Title14400;
