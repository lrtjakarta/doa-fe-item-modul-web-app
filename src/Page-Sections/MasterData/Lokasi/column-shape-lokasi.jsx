import { Box, Button, IconButton, Typography, Tooltip } from '@mui/material';
import FlexBox from 'Component/flexbox/FlexBox';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import ModeEditOutlineOutlinedIcon from '@mui/icons-material/ModeEditOutlineOutlined';
import moment from 'moment';
const ColumnShapeLokasi = callback => [
	{
		Header: 'No',
		accessor: '',
		Cell: ({ row }) => (
			<Box>
				<Typography sx={{ fontSize: 13, fontWeight: 400 }}>
					{row.index + 1}
				</Typography>
			</Box>
		),
	},
	{
		Header: 'Nama Lokasi',
		accessor: 'locationName',
		Cell: ({ value }) => (
			<Box>
				<Typography sx={{ fontSize: 13, fontWeight: 400 }}>{value}</Typography>
			</Box>
		),
	},
	{
		Header: 'Jenis Lokasi',
		accessor: 'locationType',
		Cell: ({ value }) => {
			const type =
				value === 'storage'
					? 'Penyimpanan'
					: value === 'found'
					? 'Penemuan'
					: 'Penyimpanan & Penemuan';
			return (
				<Box>
					<Typography sx={{ fontSize: 13, fontWeight: 400 }}>{type}</Typography>
				</Box>
			);
		},
	},
	{
		Header: 'Aksi',
		accessor: '',
		Cell: ({ row }) => {
			const { onEdit, onDelete } = callback;
			return (
				<FlexBox>
					<Tooltip title="Edit">
						<IconButton onClick={() => onEdit(row.original)}>
							<ModeEditOutlineOutlinedIcon sx={{ color: '#3E97FF' }} />
						</IconButton>
					</Tooltip>
					<Tooltip title="Delete">
						<IconButton onClick={() => onDelete(row.original)}>
							<DeleteOutlineOutlinedIcon sx={{ color: '#F1416C' }} />
						</IconButton>
					</Tooltip>
				</FlexBox>
			);
		},
	},
];
export default ColumnShapeLokasi;
