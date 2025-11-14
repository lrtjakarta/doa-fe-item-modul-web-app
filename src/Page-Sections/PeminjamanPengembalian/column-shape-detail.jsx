import { Box, Button, IconButton, Typography } from '@mui/material';
import StaticVar from 'Config/StaticVar';

const ColumnShape = callback => [
	{
		Header: 'Nama Barang',
		accessor: 'itemName',
		Cell: ({ value, row: { original } }) => (
			<Box>
				<Typography noWrap={false} sx={{ fontSize: 13, fontWeight: 400 }}>
					{value}
				</Typography>
			</Box>
		),
	},
	{
		Header: 'Jumlah',
		accessor: 'itemTotal',
		Cell: ({ value, row: { original } }) => (
			<Box>
				<Typography noWrap={false} sx={{ fontSize: 13, fontWeight: 400 }}>
					{value}
				</Typography>
			</Box>
		),
	},
	{
		Header: 'Gambar Awal',
		accessor: '',
		Cell: ({ row: { original } }) => {
			const { onImageFirst } = callback;
			const _photo =
				original?.photo !== null || original?.photo !== undefined
					? original?.photo
					: null;
			const _pathPhoto = _photo?.path;
			const _foundPhoto = _photo?.uploadedFiles[0]?.uploadedName;
			// console.log('_photo', _photo)
			return (
				<Box
					sx={{ width: '50px' }}
					onClick={() => onImageFirst(original?.photo)}
				>
					{_photo ? (
						<img
							src={
								StaticVar.URL_API +
								'/uploads' +
								`/${_pathPhoto}` +
								`/${_foundPhoto}`
							}
							alt="photo"
							style={{ width: '100%', height: 'auto' }}
						/>
					) : (
						<Typography noWrap={false} sx={{ fontSize: 13, fontWeight: 400 }}>
							No Image
						</Typography>
					)}
				</Box>
			);
		},
	},
	{
		Header: 'Kondisi Awal',
		accessor: 'itemInfo',
		Cell: ({ value }) => (
			<Box>
				<Typography sx={{ fontSize: 13, fontWeight: 400 }}>{value}</Typography>
			</Box>
		),
	},
	{
		Header: 'Gambar Akhir',
		accessor: '',
		Cell: ({ row: { original } }) => {
			const { onImageLast } = callback;
			const _photo =
				original?.photoReturn !== null || original?.photoReturn !== undefined
					? original?.photoReturn
					: null;
			const _pathPhoto = _photo?.path;
			const _foundPhoto = _photo?.uploadedFiles[0]?.uploadedName;
			console.log('_photo', original?.photoReturn);
			return (
				<Box
					sx={{ width: '50px' }}
					onClick={() => onImageLast(original?.photoReturn)}
				>
					{_photo ? (
						<img
							src={
								StaticVar.URL_API +
								'/uploads' +
								`/${_pathPhoto}` +
								`/${_foundPhoto}`
							}
							alt="photo"
							style={{ width: '100%', height: 'auto' }}
						/>
					) : (
						<Typography noWrap={false} sx={{ fontSize: 13, fontWeight: 400 }}>
							No Image
						</Typography>
					)}
				</Box>
			);
		},
	},
	{
		Header: 'Kondisi Akhir',
		accessor: 'returnInfo',
		Cell: ({ value }) => (
			<Box>
				<Typography sx={{ fontSize: 13, fontWeight: 400 }}>
					{value ? value : '-'}
				</Typography>
			</Box>
		),
	},
	// {
	// 	Header: 'Status',
	// 	// accessor: 'loanStatus',
	// 	Cell: ({ value, row: { original } }) => {
	// 		const getStatusStyles = status => {
	// 			switch (status) {
	// 				case 'Dipinjam':
	// 					return { backgroundColor: '#FFF5F8', color: '#F1416C' };
	// 				case 'Dikembalikan':
	// 					return { backgroundColor: '#E8FFF3', color: '#50CD89' };
	// 				default:
	// 					return null; // Mengembalikan null jika status tidak ditemukan
	// 			}
	// 		};
	// 		const statusStyles = getStatusStyles(original?.loanStatus);
	// 		return (
	// 			<Box>
	// 				<Box
	// 					sx={{
	// 						display: 'flex',
	// 						justifyContent: 'center',
	// 						alignItems: 'center',
	// 						backgroundColor: statusStyles
	// 							? statusStyles.backgroundColor
	// 							: 'transparent',
	// 						height: '35px',
	// 						borderRadius: '8px',
	// 					}}
	// 				>
	// 					<Typography
	// 						sx={{
	// 							fontSize: 13,
	// 							fontWeight: 400,
	// 							color: statusStyles ? statusStyles.color : 'black',
	// 						}}
	// 					>
	// 						{original?.loanStatus}
	// 					</Typography>
	// 				</Box>
	// 			</Box>
	// 		);
	// 	},
	// },
	// {
	// 	Header: 'Aksi',
	// 	Cell: ({ row }) => {
	// 		const { onAdd } = callback;
	// 		const status = row.original?.loanStatus;
	// 		return (
	// 			<Box>
	// 				{status === 'Dikembalikan' ? (
	// 					<></>
	// 				) : (
	// 					<Button variant="contained" onClick={() => onAdd(row.original)}>
	// 						Pengembalian
	// 					</Button>
	// 				)}
	// 			</Box>
	// 		);
	// 	},
	// },
];
export default ColumnShape;
