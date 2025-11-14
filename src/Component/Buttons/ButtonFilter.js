import { IconButton } from '@mui/material';
import React from 'react';
import IconWrapper from 'Component/IconWrapper';
import FilterListIcon from '@mui/icons-material/FilterList';

function ButtonFilter(props) {
	const { onClick } = props;
	return (
		<IconWrapper>
			<IconButton onClick={onClick}>
				<FilterListIcon sx={{ color: '#fff' }} />
			</IconButton>
		</IconWrapper>
	);
}

export default ButtonFilter;
