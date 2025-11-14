import { Box, IconButton, Typography, Tooltip } from '@mui/material';
import FlexBox from '../../Component/flexbox/FlexBox';
import FindInPageOutlinedIcon from '@mui/icons-material/FindInPageOutlined';
import LocalPrintshopOutlinedIcon from '@mui/icons-material/LocalPrintshopOutlined';
import moment from 'moment';
const ColumnShape = callback => [
	{
		Header: 'Peminjaman',
		// accessor: "idNumber",
		Cell: ({ value, row: { original } }) => (
			<Box>
				<Typography noWrap={false} sx={{ fontSize: 13, fontWeight: 400 }}>
					Diserahkan Oleh:
				</Typography>
				<Typography noWrap={false} sx={{ fontSize: 13, fontWeight: 700 }}>
					{original.loanGiverBy?.officerName}
				</Typography>
				<Typography
					noWrap={false}
					sx={{ fontSize: 13, fontWeight: 400, color: '#BABBBC' }}
				>
					{original.loanGiverBy?.officerPosition}
				</Typography>
				<Typography noWrap={false} sx={{ fontSize: 13, fontWeight: 400 }}>
					Diajukan Oleh:
				</Typography>
				<Typography noWrap={false} sx={{ fontSize: 13, fontWeight: 700 }}>
					{original.loanAppliBy?.officerName}
				</Typography>
				<Typography
					noWrap={false}
					sx={{ fontSize: 13, fontWeight: 400, color: '#BABBBC' }}
				>
					{original.loanAppliBy?.officerPosition}
				</Typography>
			</Box>
		),
	},
	{
		Header: 'Barang',
		// accessor: "",
		Cell: ({ value, row: { original } }) => {
			const jumlahSisa =
				original?.loanItem.length > 3 ? original?.loanItem.length - 3 : 0;
			return (
				<Box>
					{original?.loanItem.slice(0, 3).map(item => {
						return (
							<Typography sx={{ fontSize: 13, fontWeight: 400 }}>
								- {item.itemName + ' ' + '(' + item.itemTotal + ')'}
							</Typography>
						);
					})}
					<Typography sx={{ fontSize: 13, fontWeight: 400, color: '#BABBBC' }}>
						- {jumlahSisa + ' Barang lainnya'}
					</Typography>
				</Box>
			);
		},
	},
	{
		Header: 'Jumlah Barang',
		// accessor: "",
		Cell: ({ value, row: { original } }) => (
			<Box>
				<Typography sx={{ fontSize: 13, fontWeight: 400 }}>
					{original.loanItem.length}
				</Typography>
			</Box>
		),
	},
	{
		Header: 'Tanggal Peminjaman',
		// accessor: "",
		Cell: ({ row: { original } }) => (
			<Box>
				<Typography noWrap={false} sx={{ fontSize: 13, fontWeight: 400 }}>
					{moment(original?.loanDate).format('DD/MM/YYYY')}
				</Typography>
			</Box>
		),
	},
	// {
	// 	Header: 'Pengembalian',
	// 	// accessor: "storage",
	// 	Cell: ({ row: { original } }) => (
	// 		<Box>
	// 			<Typography noWrap={false} sx={{ fontSize: 13, fontWeight: 400 }}>
	// 				Diserahkan Oleh:
	// 			</Typography>
	// 			<Typography noWrap={false} sx={{ fontSize: 13, fontWeight: 400 }}>
	// 				{original.returnRecipientBy?.officerName}
	// 			</Typography>
	// 			<Typography
	// 				noWrap={false}
	// 				sx={{ fontSize: 13, fontWeight: 400, color: '#BABBBC' }}
	// 			>
	// 				{original.returnRecipientBy?.officerPosition}
	// 			</Typography>
	// 			<Typography noWrap={false} sx={{ fontSize: 13, fontWeight: 400 }}>
	// 				Diterima Oleh:
	// 			</Typography>
	// 			<Typography noWrap={false} sx={{ fontSize: 13, fontWeight: 400 }}>
	// 				{original.returnGiverBy?.officerName}
	// 			</Typography>
	// 			<Typography
	// 				noWrap={false}
	// 				sx={{ fontSize: 13, fontWeight: 400, color: '#BABBBC' }}
	// 			>
	// 				{original.returnGiverBy?.officerPosition}
	// 			</Typography>
	// 		</Box>
	// 	),
	// },
	{
		Header: 'Tanggal Pengembalian',
		// accessor: "dateReturn",
		Cell: ({ row: { original } }) => (
			<Box>
				<Typography sx={{ fontSize: 13, fontWeight: 400 }}>
					{original?.returnDate
						? moment(original?.returnDate).format('DD/MM/YYYY')
						: '-'}
				</Typography>
			</Box>
		),
	},
	{
		Header: 'Status',
		accessor: 'loanStatus',
		Cell: ({ value }) => {
			const getStatusStyles = status => {
				switch (status) {
					case 'Dipinjam':
						return { backgroundColor: '#FFF5F8', color: '#F1416C' };
					case 'Dikembalikan':
						return { backgroundColor: '#E8FFF3', color: '#50CD89' };
					default:
						return null; // Mengembalikan null jika status tidak ditemukan
				}
			};

			// Mendapatkan gaya berdasarkan status
			const statusStyles = getStatusStyles(value);
			return (
				<Box sx={{ width: '120px' }}>
					<Box
						sx={{
							display: 'flex',
							justifyContent: 'center',
							alignItems: 'center',
							backgroundColor: statusStyles
								? statusStyles.backgroundColor
								: 'transparent',
							height: '35px',
							borderRadius: '8px',
						}}
					>
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
				</Box>
			);
		},
	},
	{
		Header: 'Aksi',
		accessor: '',
		Cell: ({ row }) => {
			const style = {
				fontSize: 19,
				transition: 'color 0.3s',
				color: '#C07F20',
			};
			const { onView, onPrint } = callback;
			return (
				<FlexBox justifyContent="center">
					<IconButton onClick={() => onView(row.original)}>
						<FindInPageOutlinedIcon sx={style} />
					</IconButton>
					{row?.original?.returnDate && (
						<Tooltip title="Print">
							<IconButton onClick={() => onPrint(row.original)}>
								<LocalPrintshopOutlinedIcon
									sx={{ color: '#3E97FF', fontSize: 24 }}
								/>
							</IconButton>
						</Tooltip>
					)}
				</FlexBox>
			);
		},
	},
];
export default ColumnShape;
