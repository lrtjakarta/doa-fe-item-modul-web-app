import React from 'react';

import ErrorIcon from '@mui/icons-material/Error';
import { Box, Button, Stack } from '@mui/material';

import Title16600 from 'Component/Typographys/Title16600';
import Title12 from 'Component/Typographys/Title12';

function CardDelete(props) {
	const { onDelete, onCancel, title } = props;
	return (
		<Stack direction="column" alignItems="center">
			<ErrorIcon sx={{ color: '#F1416C', fontSize: 42, mb: 2 }} />
			<Title16600 text={'Hapus' + ' ' + title} />
			<Box>
				<Title12
					textAlign="center"
					text={
						'Apakah Anda yakin ingin menghapus' + ' ' + title + ' ' + 'ini?'
					}
				/>
				<Title12
					textAlign="center"
					text="Tindakan ini tidak dapat dibatalkan."
				/>
			</Box>
			<Box sx={{ display: 'flex', gap: 1, mt: 4 }}>
				<Button
					variant="contained"
					sx={{
						backgroundColor: '#EEEDEB',
						color: '#2F3645',
						p: '10px 40px',
						'&:hover': {
							backgroundColor: '#EEEDEB',
						},
					}}
					onClick={onCancel}
				>
					Cancel
				</Button>
				<Button
					variant="contained"
					sx={{
						backgroundColor: '#F1416C',
						p: '10px 40px',
						'&:hover': {
							backgroundColor: '#F1416C',
						},
					}}
					onClick={onDelete}
				>
					Hapus
				</Button>
			</Box>
		</Stack>
	);
}

export default CardDelete;
