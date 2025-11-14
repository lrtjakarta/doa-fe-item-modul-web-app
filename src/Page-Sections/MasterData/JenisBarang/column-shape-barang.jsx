import { Box, Button, IconButton, Typography, Tooltip } from '@mui/material';
import FlexBox from 'Component/flexbox/FlexBox';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import ModeEditOutlineOutlinedIcon from '@mui/icons-material/ModeEditOutlineOutlined';
import moment from 'moment';
const ColumnShapeBarang = callback => [
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
		Header: 'Jenis Barang',
		accessor: 'itemName',
		Cell: ({ value }) => (
			<Box>
				<Typography sx={{ fontSize: 13, fontWeight: 400 }}>{value}</Typography>
			</Box>
		),
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
export default ColumnShapeBarang;
