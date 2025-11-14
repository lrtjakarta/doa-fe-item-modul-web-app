import { Box, IconButton, Typography } from '@mui/material';
import moment from 'moment';
const ColumnShape = callback => [
	{
		Header: 'Jenis Barang',
		accessor: 'foundName',
		Cell: ({ value, row: { original } }) => (
			<Box sx={{ width: 80 }}>
				<Typography noWrap={true} sx={{ fontSize: 13, fontWeight: 400 }}>
					{value}
				</Typography>
				<Typography
					noWrap={true}
					sx={{ fontSize: 13, fontWeight: 400, color: '#BABBBC' }}
				>
					{original?.foundType}
				</Typography>
			</Box>
		),
	},
	{
		Header: 'Lokasi Ditemukan',
		accessor: 'foundLocation',
		Cell: ({ value }) => (
			<Box>
				<Typography sx={{ fontSize: 13, fontWeight: 400 }}>{value}</Typography>
			</Box>
		),
	},
	{
		Header: 'Lokasi Penyimpanan',
		accessor: 'locationStorage',
		Cell: ({ row: { original } }) => {
			const _storage = original.storageLocation;
			const _lastStorage =
				_storage.length > 0 ? _storage[_storage.length - 1] : '-';
			const _date = moment(_lastStorage?.storageDate).format('DD MMMM YYYY');
			return (
				<Box>
					<Typography sx={{ fontSize: 13, fontWeight: 400 }}>
						{_lastStorage?.location}
					</Typography>
					<Typography sx={{ fontSize: 13, fontWeight: 400, color: '#BABBBC' }}>
						{_date}
					</Typography>
				</Box>
			);
		},
	},
	{
		Header: 'Status',
		accessor: 'foundStatus',
		Cell: ({ value }) => {
			const getStatusStyles = status => {
				switch (status) {
					case 'Unidentified':
						return { backgroundColor: '#FFF5F8', color: '#F1416C' };
					case 'Identified':
						return { backgroundColor: '#FFF8DD', color: '#F6C000' };
					case 'Penyimpanan':
						return { backgroundColor: '#EEF6FF', color: '#3E97FF' };
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
