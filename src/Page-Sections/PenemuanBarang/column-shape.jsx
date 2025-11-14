import { Box, IconButton, Tooltip, Typography } from '@mui/material';
import FlexBox from '../../Component/flexbox/FlexBox';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import EditIcon from '@mui/icons-material/Edit';
import FindInPageOutlinedIcon from '@mui/icons-material/FindInPageOutlined';
import LocalPrintshopOutlinedIcon from '@mui/icons-material/LocalPrintshopOutlined';
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
				const photo = original.foundPhoto;
				if (photo !== null) {
					// console.log(' photo?.uploadedFiles', photo?.uploadedFiles);
					if (photo?.uploadedFiles?.length > 0) {
						const _foundPhoto = photo?.uploadedFiles[0]?.uploadedName;
						const _pathPhoto = photo?.path;
						setDataImage({
							url: '/uploads',
							path: `/${_pathPhoto}`,
							name: `/${_foundPhoto}`,
						});
					} else {
						setDataImage({
							url: '/uploads',
							path: '',
							name: '',
						});
					}

					// console.log('original.foundPhoto', photo);
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
			<Box sx={{ width: '50px' }}>
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
			<Box sx={{ width: '200px' }}>
				<Typography noWrap={false} sx={{ fontSize: 13, fontWeight: 400 }}>
					{value}
				</Typography>
				<Typography sx={{ fontSize: 13, fontWeight: 400, color: '#BABBBC' }}>
					{original?.foundType}
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
				<Box sx={{ width: '150px' }}>
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
	{
		Header: 'Penyimpanan',
		// accessor: "locationStorage",
		Cell: ({ value, row: { original } }) => {
			const _storage = original.storageLocation;
			const _lastStorage =
				_storage.length > 0 ? _storage[_storage.length - 1] : '-';
			const _date = moment(_lastStorage?.storageDate).format('DD MMMM YYYY');
			const _time = moment(_lastStorage?.storageTime).format('HH:mm');
			// console.log('data lokasi', _lastStorage)
			return (
				<Box sx={{ width: '150px' }}>
					<Typography sx={{ fontSize: 13, fontWeight: 400 }}>
						{_lastStorage?.location}
					</Typography>
					<Typography sx={{ fontSize: 13, fontWeight: 400, color: '#BABBBC' }}>
						{_date + ' ' + _time}
					</Typography>
				</Box>
			);
		},
	},
	{
		Header: 'Identifikasi',
		// accessor: "identification",
		Cell: ({ value, row: { original } }) => {
			const style = {
				fontSize: 28,
				transition: 'color 0.3s',
				color: '#1C8CED',
			};
			const { onAdd, onEdit } = callback;
			return (
				<Box sx={{ width: '150px' }}>
					{original.identification === null ? (
						<FlexBox justifyContent="flex-end">
							<IconButton onClick={() => onAdd(original)}>
								<AddCircleIcon sx={style} />
							</IconButton>
						</FlexBox>
					) : (
						<FlexBox>
							<Typography sx={{ fontSize: 13, fontWeight: 400 }}>
								{original.identification?.identificationName}
							</Typography>
							{original.foundStatus !== 'Claimed' ? (
								<IconButton onClick={() => onEdit(original)}>
									<EditIcon sx={{ color: '#1C8CED' }} />
								</IconButton>
							) : null}
						</FlexBox>
					)}
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
				color: '#1C8CED',
			};
			const { onView, onPrint } = callback;
			return (
				<FlexBox justifyContent="center" gap={2}>
					<Tooltip title="View">
						<IconButton onClick={() => onView(row.original)}>
							<FindInPageOutlinedIcon sx={style} />
						</IconButton>
					</Tooltip>
					{/* <Tooltip title="Print">
						<IconButton onClick={() => onPrint(row.original)}>
							<LocalPrintshopOutlinedIcon
								sx={{ color: '#3E97FF', fontSize: 24 }}
							/>
						</IconButton>
					</Tooltip> */}
				</FlexBox>
			);
		},
	},
];
export default ColumnShape;
