import {
	Box,
	IconButton,
	Typography,
	RadioGroup,
	FormControlLabel,
	Radio,
	Tooltip
} from '@mui/material';
import PhotoCameraOutlinedIcon from '@mui/icons-material/PhotoCameraOutlined';

const ColumnShapeAdd = callback => [
	{
		Header: 'Gambar',
		accessor: '',
		Cell: ({ row: {original} }) => { 
			// const { onDelete, onAdd } = callback;
			return(
			<Box sx={{ width: '50px' }}>
				{
					original?.fileReturn !== undefined ? (
						<>
						{original?.fileReturn.map((image, index) => (
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
		Header: 'Jenis Barang',
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
		Header: 'Informasi',
		accessor: 'itemInfo',
		Cell: ({ value }) => (
			<Box sx={{ width: '200px' }}>
				<Typography noWrap={false} sx={{ fontSize: 13, fontWeight: 400 }}>
					{value}
				</Typography>
			</Box>
		),
	},
	{
		Header: 'Kondisi Barang',
		// accessor: 'infomation',
		Cell: ({ value, row }) => {
			const { onChange } = callback;
			return (
				<Box sx={{ width: '200px' }}>
					<RadioGroup
						row
						value={row.original?.returnInfo}
						onChange={e => onChange(row.original, e)}
					>
						<FormControlLabel
							value="Baik"
							control={<Radio size="small" />}
							label="Baik"
						/>
						<FormControlLabel
							value="Rusak"
							control={<Radio size="small" />}
							label="Rusak"
						/>
					</RadioGroup>
				</Box>
			);
		},
	},
	{
		Header: 'Aksi',
		// accessor: 'infomation',
		Cell: ({  row }) => {
			const { onAdd } = callback;
			const style = {
				fontSize: 24,
				transition: 'color 0.3s',
				color: '#ED1C24',
			};
			return (
				<Box >
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
