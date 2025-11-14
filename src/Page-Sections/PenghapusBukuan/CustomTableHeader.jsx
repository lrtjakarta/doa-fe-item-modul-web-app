import React from 'react';
import {
	Table,
	TableHead,
	TableRow,
	TableCell,
	TableBody,
	styled,
} from '@mui/material';

const BodyTableCell = styled(TableCell)(() => ({
	fontSize: 12,
	fontWeight: 600,
	'&:last-of-type': {
		textAlign: 'right',
	},
}));
const HeadTableCell = styled(BodyTableCell)(({ theme }) => ({
	borderBottom: `1px solid ${theme.palette.grey[300]}`,
}));

function CustomTableHeader({ tebleBodyConten }) {
	return (
		<Table>
			<TableHead>
				<TableRow>
				<HeadTableCell>Foto Barang</HeadTableCell>
					<HeadTableCell>Nama Barang</HeadTableCell>
					<HeadTableCell>Jenis Barang</HeadTableCell>
					<HeadTableCell>Lokasi Terakhir</HeadTableCell>
					<HeadTableCell>Keterangan</HeadTableCell>
					<HeadTableCell>Catatan</HeadTableCell>
				</TableRow>
			</TableHead>
			<TableBody>{tebleBodyConten}</TableBody>
		</Table>
	);
}

export default CustomTableHeader;
