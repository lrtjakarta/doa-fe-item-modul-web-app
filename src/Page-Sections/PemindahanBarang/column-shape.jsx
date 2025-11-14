import { Box, IconButton, Tooltip, Typography } from '@mui/material';
import FlexBox from '../../Component/flexbox/FlexBox';
import FindInPageOutlinedIcon from '@mui/icons-material/FindInPageOutlined';

import moment from 'moment';

const ColumnShape = callback => [
	{
		Header: 'Jenis Barang',
		// accessor: "previousStorage",
		Cell: ({ value, row: { original } }) => {
			const relocationItems = original?.relocationItems; // Ganti dengan data array Anda
			const firstFiveItems = relocationItems.slice(0, 4); // Mengambil lima data pertama
			const remainingItems = relocationItems.slice(4); // Mengambil sisanya
			return (
				<Box sx={{ width: '100px' }}>
					{firstFiveItems?.map((item, index) => {
						return (
							<Typography noWrap={false} sx={{ fontSize: 13, fontWeight: 400 }}>
								{'- ' + item.foundName}
							</Typography>
						);
					})}

					<Typography noWrap={false} sx={{ fontSize: 13, fontWeight: 400 }}>
						{remainingItems.length > 0
							? remainingItems.length + ' Ada yang berikutnya'
							: null}
					</Typography>
				</Box>
			);
		},
	},
	{
		Header: 'Nomor Laporan',
		accessor: 'relocationNumber',
		Cell: ({ value, row: { original } }) => {
			return (
				<Box>
					<Typography noWrap={false} sx={{ fontSize: 13, fontWeight: 400 }}>
						{value}
					</Typography>
				</Box>
			);
		},
	},
	{
		Header: 'Penyimpanan Sebelumnya',
		accessor: 'previousStorage',
		Cell: ({ value, row: { original } }) => {
			return (
				<Box>
					<Typography noWrap={false} sx={{ fontSize: 13, fontWeight: 400 }}>
						{value}
					</Typography>
				</Box>
			);
		},
	},
	{
		Header: 'Penyimpanan Saat Ini',
		accessor: 'currentStorage',
		Cell: ({ value, row: { original } }) => {
			const _currentStorage = value !== '' ? value : '-';
			return (
				<Box>
					<Typography noWrap={false} sx={{ fontSize: 13, fontWeight: 400 }}>
						{_currentStorage}
					</Typography>
				</Box>
			);
		},
	},
	{
		Header: 'Waktu Pemindahan',
		accessor: 'updatedAt',
		Cell: ({ row: { original } }) => {
			const _date = moment(original.relocationDate).format('DD/MM/YYYY');
			const _time = moment(original.relocationDate).format('HH:mm');
			return (
				<Box sx={{ width: '122px' }}>
					<Typography sx={{ fontSize: 13, fontWeight: 400 }}>
						{_date + ' ' + _time}
					</Typography>
				</Box>
			);
		},
	},
	{
		Header: 'Diserahkan Oleh',
		accessor: 'by',
		Cell: ({ value, row: { original } }) => {
			const _submittedBy = original.submittedBy;
			return (
				<Box>
					<Typography sx={{ fontSize: 13, fontWeight: 400 }}>
						{_submittedBy?.officerName}
					</Typography>
					<Typography sx={{ fontSize: 13, fontWeight: 400, color: '#7C7C7C' }}>
						{_submittedBy.officerPosition}
					</Typography>
				</Box>
			);
		},
	},
	{
		Header: 'Diterima Oleh',
		accessor: 'officer',
		Cell: ({ value, row: { original } }) => {
			const _receivedBy = original.receivedBy;
			return (
				<Box>
					{_receivedBy !== null ? (
						<>
							<Typography sx={{ fontSize: 13, fontWeight: 400 }}>
								{_receivedBy?.officerName}
							</Typography>
							<Typography
								sx={{ fontSize: 13, fontWeight: 400, color: '#7C7C7C' }}
							>
								{_receivedBy?.officerPosition}
							</Typography>
						</>
					) : (
						<Typography sx={{ fontSize: 13, fontWeight: 400 }}>-</Typography>
					)}
				</Box>
			);
		},
	},
	{
		Header: 'Status',
		accessor: 'relocationStatus',
		Cell: ({ value }) => {
			return (
				<Box sx={{ width: '120px' }}>
					<Box
						sx={{
							display: 'flex',
							justifyContent: 'center',
							alignItems: 'center',
							backgroundColor:
								value === 'Dalam Proses'
									? '#FFF8DD'
									: value === 'Diterima'
									? '#E8FFF3'
									: null,
							height: '35px',
							borderRadius: '8px',
						}}
					>
						<Typography
							sx={{
								fontSize: 13,
								fontWeight: 400,
								color:
									value === 'Dalam Proses'
										? '#F6C000'
										: value === 'Diterima'
										? '#50CD89'
										: null,
							}}
						>
							{value}
						</Typography>
					</Box>
				</Box>
			);
		},
	},
	{
		Header: 'Aksi',
		accessor: 'edit',
		Cell: ({ row }) => {
			const style = {
				fontSize: 19,
				transition: 'color 0.3s',
				color: '#C07F20',
			};
			const { onView, onPrint } = callback;
			return (
				<Box>
					<Tooltip title="View">
					<IconButton onClick={() => onView(row.original)}>
						<FindInPageOutlinedIcon sx={style} />
					</IconButton>
					</Tooltip>
				
				</Box>
			);
		},
	},
];
export default ColumnShape;
