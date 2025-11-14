import { Box, IconButton, Typography } from '@mui/material';
import moment from 'moment';
const ColumnShape = callback => [
	{
		Header: 'Jenis Barang',
		accessor: 'complaintName',
		Cell: ({ value, row: { original } }) => (
			<Box sx={{ width: 80 }}>
				<Typography noWrap={true} sx={{ fontSize: 13, fontWeight: 400 }}>
					{value}
				</Typography>
				<Typography
					noWrap={true}
					sx={{ fontSize: 13, fontWeight: 400, color: '#BABBBC' }}
				>
					{original?.complaintType}
				</Typography>
			</Box>
		),
	},
	{
		Header: 'Lokasi Ditemukan',
		accessor: 'complaintLocation',
		Cell: ({ value }) => (
			<Box>
				<Typography sx={{ fontSize: 13, fontWeight: 400 }}>{value}</Typography>
			</Box>
		),
	},
	{
		Header: 'Pemilik',
		accessor: 'complaintBy',
		Cell: ({ value }) => (
			<Box>
				<Typography sx={{ fontSize: 13, fontWeight: 400 }}>{value}</Typography>
			</Box>
		),
	},
	{
		Header: 'Status',
		accessor: 'complaintStatus',
		Cell: ({ value }) => {
			const getStatusStyles = status => {
				switch (status) {
					case 'Belum Ditemukan':
						return { backgroundColor: '#FFF5F8', color: '#F1416C' };
					case 'Ditemukan':
						return { backgroundColor: '#FFF8DD', color: '#F6C000' };
					case 'Claimed':
						return { backgroundColor: '#E8FFF3', color: '#50CD89' };
					default:
						return null; // Mengembalikan null jika status tidak ditemukan
				}
			};
			const statusStyles = getStatusStyles(value);
			return (
				<Box>
					<Typography
						sx={{
							fontSize: 13,
							fontWeight: 400,
							color: statusStyles ? statusStyles.color : 'black',
						}}
					>
						{value}
					</Typography>
				</Box>
			);
		},
	},
];
export default ColumnShape;
