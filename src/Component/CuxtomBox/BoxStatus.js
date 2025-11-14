import { Box } from '@mui/material';
import Title14400 from 'Component/Typographys/Title14400';
import React from 'react';

function BoxStatus({ title }) {
	const getStatusStyles = status => {
		switch (status) {
			case 'Unidentified':
				return { backgroundColor: '#FFF5F8', color: '#F1416C' };
			case 'Identified':
				return { backgroundColor: '#FFF8DD', color: '#F6C000' };
			case 'Dalam Proses':
				return { backgroundColor: '#FFF8DD', color: '#F6C000' };
			case 'Penyimpanan':
				return { backgroundColor: '#EEF6FF', color: '#3E97FF' };
			case 'Claimed':
				return { backgroundColor: '#E8FFF3', color: '#50CD89' };
			case 'Belum Ditemukan':
				return { backgroundColor: '#FFF5F8', color: '#F1416C' };
			case 'Ditemukan':
				return { backgroundColor: '#FFF8DD', color: '#F6C000' };
			case 'Diterima':
				return { backgroundColor: '#E8FFF3', color: '#50CD89' };
			case 'Diajukan':
				return { backgroundColor: '#FFF8DD', color: '#F6C000' };
			case 'Disetujui':
				return { backgroundColor: '#EEF6FF', color: '#3E97FF' };
			case 'Dipinjam':
				return { backgroundColor: '#FFF5F8', color: '#F1416C' };
			case 'Dikembalikan':
				return { backgroundColor: '#E8FFF3', color: '#50CD89' };

			default:
				return null; // Mengembalikan null jika status tidak ditemukan
		}
	};

	// Mendapatkan gaya berdasarkan status
	const statusStyles = getStatusStyles(title);
	return (
		<Box
			sx={{
				display: 'flex',
				justifyContent: 'center',
				alignItems: 'center',
				backgroundColor: statusStyles
					? statusStyles.backgroundColor
					: 'transparent',
				height: '35px',
				width: '45%',
				borderRadius: '8px',
			}}
		>
			<Title14400
				fontWeight={700}
				text={title}
				color={statusStyles ? statusStyles.color : 'black'}
			/>
		</Box>
	);
}

export default BoxStatus;
