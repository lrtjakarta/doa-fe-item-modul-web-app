import { Box, Card, Stack, Typography } from '@mui/material';
import moment from 'moment';
import React from 'react';

function CardCount({ dataCountLF, dataCountC }) {
	// console.log('dataCoutLF', dataCountLF);

	return (
		<Card sx={{ padding: 3, borderRadius: '10px' }}>
			<Stack
				direction="row"
				justifyContent="center"
				alignItems="center"
				spacing={2}
			>
				<Stack sx={{ width: '100%' }} direction="column" alignItems="center">
					<Typography sx={{ fontSize: 72, fontWeight: 700, color: '#ED1C24' }}>
						{dataCountLF?.length > 0 ? dataCountLF[0]?.found : 0}
					</Typography>
					<Typography
						sx={{
							fontSize: 18,
							fontWeight: 500,
							color: '#000000',
							width: '160px',
							textAlign: 'center',
						}}
					>
						Total Penemuan Hari Ini
					</Typography>
				</Stack>
				<Stack sx={{ width: '100%' }} direction="column" alignItems="center">
					<Typography sx={{ fontSize: 72, fontWeight: 700, color: '##1C8CED' }}>
						{dataCountLF?.length > 0 ? dataCountLF[0]?.returned : 0}
					</Typography>
					<Typography
						sx={{
							fontSize: 18,
							fontWeight: 500,
							color: '#000000',
							width: '160px',
							textAlign: 'center',
						}}
					>
						Total Pengambilan Hari Ini
					</Typography>
				</Stack>
				<Stack sx={{ width: '100%' }} direction="column" alignItems="center">
					<Typography sx={{ fontSize: 72, fontWeight: 700, color: '#FFA600' }}>
						{dataCountC?.length > 0 ? dataCountC[0]?.count : 0}
					</Typography>
					<Typography
						sx={{
							fontSize: 18,
							fontWeight: 500,
							color: '#000000',
							width: '160px',
							textAlign: 'center',
						}}
					>
						Total Pengaduan Hari Ini
					</Typography>
				</Stack>
			</Stack>
		</Card>
	);
}

export default CardCount;
