import { Typography } from '@mui/material';
import React from 'react';

function Typography14(props) {
	const { fontWeight, color, title, textAlign, style, fontFamily } = props;
	return (
		<Typography
			sx={{
				fontSize: 14,
				fontWeight: fontWeight ? fontWeight : 400,
				color: color,
				...props,
				textAlign: textAlign ? textAlign: 'left',
				fontStyle: style ? style : 'normal',
				fontFamily: fontFamily ? fontFamily : "Inter"
			}}
		>
			{title}
		</Typography>
	);
}

export default Typography14;
