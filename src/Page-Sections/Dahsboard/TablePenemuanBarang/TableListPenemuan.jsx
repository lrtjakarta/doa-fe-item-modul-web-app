import { Card, Stack, Typography } from '@mui/material';
import React from 'react';
import CustomTable from './CustomTable';
import columnShape from './column-shape';
import List_Data from './DataList';
import { useNavigate } from 'react-router-dom';

function TableListPenemuan({ dataTable }) {
	const navigate = useNavigate();

	const handleDetail = () => {
		navigate('/manajemenBarang/penemuan');
	};
	return (
		<Card sx={{ padding: 3, borderRadius: '10px' }}>
			<Stack direction="column" alignItems="center" spacing={1}>
				<Typography sx={{ fontSize: 18, fontWeight: 700 }}>
					Penemuan Barang
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

export default TableListPenemuan;
