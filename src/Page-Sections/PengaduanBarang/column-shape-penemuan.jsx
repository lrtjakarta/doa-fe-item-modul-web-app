import { Box, Button, IconButton, Typography } from '@mui/material';
import FlexBox from '../../Component/flexbox/FlexBox';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import EditIcon from '@mui/icons-material/Edit';
import FindInPageOutlinedIcon from '@mui/icons-material/FindInPageOutlined';
import AppAvatar from 'Component/avatars/AppAvatar';
import moment from 'moment';
import StaticVar from 'Config/StaticVar';
import { useEffect, useState } from 'react';

const ColumnShape = callback => [
	{
		Header: 'Foto',
		accessor: 'image',
		Cell: ({ row: { original } }) => {
			const [dataImage, setDataImage] = useState({
				url: '/uploads',
				path: '',
				name: '',
			});
			useEffect(() => {
				if (original?.foundPhoto !== null) {
					const _foundPhoto =
						original?.foundPhoto?.uploadedFiles[0]?.uploadedName;
					const _pathPhoto = original?.foundPhoto?.path;
					setDataImage({
						url: '/uploads',
						path: `/${_pathPhoto}`,
						name: `/${_foundPhoto}`,
					});
				}
			}, [original.foundPhoto]);

			return (
				<Box>
					{original.foundPhoto !== null ? (
						<AppAvatar
							src={
								StaticVar.URL_API +
								dataImage.url +
								dataImage.path +
								dataImage.name
							}
							sx={{
								borderRadius: '10%',
								width: 50,
								height: 50,
							}}
						/>
					) : (
						<Typography sx={{ fontSize: 13, fontWeight: 400 }}>
							Gambar
						</Typography>
					)}
				</Box>
			);
		},
	},
	{
		Header: 'Nomor Laporan',
		accessor: 'idNumber',
		Cell: ({ value }) => (
			<Box>
				<Typography noWrap={false} sx={{ fontSize: 13, fontWeight: 400 }}>
					{value}
				</Typography>
			</Box>
		),
	},
	{
		Header: 'Jenis Barang',
		accessor: 'foundName',
		Cell: ({ value, row: { original } }) => (
			<Box>
				<Typography noWrap={false} sx={{ fontSize: 13, fontWeight: 400 }}>
					{value}
				</Typography>
			</Box>
		),
	},
	{
		Header: 'Informasi Barang',
		accessor: 'foundDescription',
		Cell: ({ value, row: { original } }) => (
			<Box>
				<Typography noWrap={false} sx={{ fontSize: 13, fontWeight: 400 }}>
					{value}
				</Typography>
			</Box>
		),
	},
	{
		Header: 'Penemuan',
		accessor: 'locationFound',
		Cell: ({ value, row: { original } }) => {
			const _date = moment(original.foundDate).format('DD MMMM YYYY');
			const _time = moment(original.foundTime).format('HH:mm');
			return (
				<Box>
					<Typography sx={{ fontSize: 13, fontWeight: 400 }}>
						{original.foundLocation}
					</Typography>
					<Typography sx={{ fontSize: 13, fontWeight: 400, color: '#BABBBC' }}>
						{_date + ' ' + _time}
					</Typography>
					<Typography sx={{ fontSize: 13, fontWeight: 400 }}>
						{original.foundBy}
					</Typography>
				</Box>
			);
		},
	},
	// {
	// 	Header: 'Penyimpanan',
	// 	// accessor: "locationStorage",
	// 	Cell: ({ value, row: { original } }) => {
	// 		const _date = moment(original.foundDate).format('DD MMMM YYYY');
	// 		const _storage = original.storageLocation;
	// 		const _location =
	// 			_storage.length > 0 ? _storage[_storage.length - 1] : '-';
	// 		// console.log('data lokasi', _location)
	// 		return (
	// 			<Box>
	// 				{/* <Typography sx={{fontSize:13, fontWeight: 400}}>{_location}</Typography> */}
	// 				<Typography sx={{ fontSize: 13, fontWeight: 400, color: '#BABBBC' }}>
	// 					{_date}
	// 				</Typography>
	// 			</Box>
	// 		);
	// 	},
	// },
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
		accessor: 'edit',
		Cell: ({ row }) => {
			const style = {
				fontSize: 24,
				transition: 'color 0.3s',
				color: '#BC7E36',
			};
			const { onView, onMaping, typeButton } = callback;
			return (
				<FlexBox justifyContent="center">
					{typeButton === 'Maping' ? (
						<Button variant="contained" onClick={() => onMaping(row.original)}>
							Link
						</Button>
					) : (
						<IconButton onClick={() => onView(row.original)}>
							<FindInPageOutlinedIcon sx={style} />
						</IconButton>
					)}
				</FlexBox>
			);
		},
	},
];
export default ColumnShape;
