import { Box, IconButton, Tooltip, Typography } from '@mui/material';
import FlexBox from '../../Component/flexbox/FlexBox';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import PhotoCameraOutlinedIcon from '@mui/icons-material/PhotoCameraOutlined';
import AddCircleOutlineRoundedIcon from '@mui/icons-material/AddCircleOutlineRounded';
import AppAvatar from 'Component/avatars/AppAvatar';
import AppTextField from 'Component/input-fields/AppTextField';
const ColumnShapeAdd = callback => [
	{
		Header: 'Gambar',
		accessor: '',
		Cell: ({ row: {original} }) => { 
			// const { onDelete, onAdd } = callback;
			return(
			<Box sx={{ width: '50px' }}>
				{
					original?.file !== null ? (
						<>
						{original?.file.map((image, index) => (
							<img
							src={image.preview}
							alt="preview"
							style={{ width: '100%', height: 'auto' }}
						/>
						))}
						</>
					): (
						<Typography noWrap={false} sx={{ fontSize: 13, fontWeight: 400 }}>
					No Image
				</Typography>
					)
				}
			</Box>
		)},
	},
	{
		Header: 'Barang',
		accessor: 'itemName',
		Cell: ({ value }) => (
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
		Cell: ({ value }) => (
			<Box>
				<Typography noWrap={false} sx={{ fontSize: 13, fontWeight: 400 }}>
					{value}
				</Typography>
			</Box>
		),
	},
	{
		Header: 'Keterangan',
		accessor: 'itemInfo',
		Cell: ({ value }) => (
			<Box>
				<Typography noWrap={false} sx={{ fontSize: 13, fontWeight: 400 }}>
					{value}
				</Typography>
			</Box>
		),
	},
	{
		Header: 'Aksi',
		Cell: ({ row }) => {
			const style = {
				fontSize: 24,
				transition: 'color 0.3s',
				color: '#ED1C24',
			};
			const { onDelete, onAdd } = callback;
			return (
				<Box>
					<Tooltip title='Hapus'>
					<IconButton onClick={() => onDelete(row.original)}>
						<DeleteOutlineOutlinedIcon sx={{ ...style, color: '#ED1C24' }} />
					</IconButton>
					</Tooltip>
					<Tooltip title='Pilih Photo'>
					<IconButton onClick={() => onAdd(row.original)}>
						<PhotoCameraOutlinedIcon sx={{ ...style, color: "#1C8CED" }} />
					</IconButton>
					</Tooltip>
				</Box>
			);
		},
	},
];
export default ColumnShapeAdd;
