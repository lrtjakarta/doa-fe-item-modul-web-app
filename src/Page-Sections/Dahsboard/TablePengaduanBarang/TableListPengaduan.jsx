import { Card, Stack, Typography } from '@mui/material';
import CustomTable from '../TablePenemuanBarang/CustomTable';
import React from 'react';
import columnShape from './column-shape';
import DataList from './DataList';
import { useNavigate } from 'react-router-dom';

function TableListPengaduan({ dataTable }) {
	const navigate = useNavigate();

	const handleDetail = () => {
		navigate('/manajemenBarang/pengaduan');
	};
	return (
		<Card sx={{ padding: 3, borderRadius: '10px' }}>
			<Stack direction="column" alignItems="center" spacing={0}>
				<Typography sx={{ fontSize: 18, fontWeight: 700 }}>
					Pengaduan Barang
				</Typography>

				<CustomTable
					data={dataTable.slice(0, 5).reverse()}
					columnShape={columnShape()}
					handleLostFound={handleDetail}
				/>
			</Stack>
		</Card>
	);
}

export default TableListPengaduan;
