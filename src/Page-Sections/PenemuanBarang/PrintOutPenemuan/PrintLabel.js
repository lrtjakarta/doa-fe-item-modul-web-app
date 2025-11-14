import React from 'react';
import './DataTable.css';
import Typography14 from 'Component/Typographys/Typography14';
import { Stack } from '@mui/material';
import moment from 'moment';

function PrintLabel({ src, dataPrint }) {
	return (
		<table className="data-table">
			<tr>
				<td>
					<Typography14 title="Kode Barang" />
				</td>
				<td>
					<Typography14 title="Tanggal" />
				</td>
				<td>
					<Typography14 title="Lokasi Penemuan" />
				</td>
				<td rowSpan={2} style={{ width: '200px' }}>
					<Stack direction="row" justifyContent="center">
						<img src={src} style={{ width: '100px' }} />
					</Stack>
				</td>
			</tr>
			<tr>
				<td>
					<Typography14 title={dataPrint?.idNumber} fontWeight={700} />
				</td>
				<td>
					<Typography14
						title={moment(dataPrint?.foundDate).format('DD/MM/YYYY')}
						fontWeight={700}
					/>
				</td>
				<td>
					<Typography14 title={dataPrint?.foundLocation} fontWeight={700} />
				</td>
			</tr>
		</table>
	);
}

export default PrintLabel;
