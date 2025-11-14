import { Box, Divider, Grid, Stack } from '@mui/material';
import moment from 'moment';
import HeaderPrint from 'Component/CustomPrints/HeaderPrint';
import Typography14 from 'Component/Typographys/Typography14';
import GenerateQr from 'Component/GenerateQRCode/GenerateQr';
import React from 'react';

function PrintPengambilan({ dataId }) {
	moment.locale('id');

	return (
		<Box sx={{ p: 3 }}>
			<HeaderPrint
				title="Lost & Found"
				number="LRTJ-FR-PEL-020"
				revisi="01"
				page="Page 4 of 5"
			/>
			{/* <Box sx={{ mt: 3 }}>
				<Typography14 title="DIVISI" fontWeight={700} />
				<Grid container spacing={1} sx={{ mt: '5px' }}>
					<Grid item sm={4}>
						<Typography14 title="Tanggal Ditemukan" />
					</Grid>
					<Grid item sm={8}>
						<Typography14
							title={
								': ' +
								' ' +
								moment(dataId?.foundDate).format('dddd, DD MMMM YYYY')
							}
						/>
					</Grid>
					<Grid item sm={4}>
						<Typography14 title="Petugas Stasiun/Teknis" />
					</Grid>
					<Grid item sm={8}>
						<Typography14
							title={': ' + ' ' + dataId?.storageLocation[0]?.officerName}
						/>
					</Grid>

					<Grid item sm={4}>
						<Typography14 title="Departemen" />
					</Grid>
					<Grid item sm={8}>
						<Typography14
							title={': ' + ' ' + dataId?.storageLocation[0]?.officerDepartemen}
						/>
					</Grid>

					<Grid item sm={4}>
						<Typography14 title="Lokasi" />
					</Grid>
					<Grid item sm={8}>
						<Typography14 title={': ' + ' ' + dataId?.foundLocation} />
					</Grid>

					<Grid item sm={4}>
						<Typography14 title="Penyimpanan" />
					</Grid>
					<Grid item sm={8}>
						<Typography14 title={': ' + dataId?.storageLocation[0]?.location} />
					</Grid>
				</Grid>
			</Box>

			<Box sx={{ mt: 3 }}>
				<table className="data-table">
					<tbody>
						<tr>
							<td width="10%">
								<Stack direction="row" justifyContent="center">
									<Typography14 title="No" fontWeight={700} />
								</Stack>
							</td>
							<td width="50%">
								<Stack direction="row" justifyContent="center">
									<Typography14 title="KRONOLOGI" fontWeight={700} />
								</Stack>
							</td>
							<td>
								<Stack direction="row" justifyContent="center">
									<Typography14 title="KETERANGAN" fontWeight={700} />
								</Stack>
							</td>
						</tr>

						<tr>
							<td rowSpan={2}>
								<Box sx={{ height: '200px' }}>
									<Typography14 title="1." />
								</Box>
							</td>
							<td rowSpan={2}>
								<Box sx={{ height: '200px' }}>
									<Typography14 title={dataId?.foundChronology} />
								</Box>
							</td>
							<td>
								<Box height="100px">
									<Typography14 title="Jenis Barang Tertinggal:" />
									<Typography14 title={dataId?.foundType} />
								</Box>
							</td>
						</tr>

						<tr>
							<td>
								<Box height="100px">
									<Typography14 title="Detail/Karakteristik Barang Tertinggal:" />
									<Typography14 title={dataId?.foundDescription} />
								</Box>
							</td>
						</tr>
					</tbody>
				</table>
			</Box>

			<Box sx={{ mt: 3 }}>
				<Grid container spacing={2}>
					<Grid
						item
						sm={4}
						sx={{
							display: 'flex',
							flexDirection: 'column',
							alignItems: 'center',
							mt: 2,
						}}
					>
						<Typography14 title="Departemen Teknis" />
						<GenerateQr dataId={dataId?.storageLocation[0]?.officerId} />
						<Typography14
							title={
								'(' +
								(dataId?.storageLocation[0]?.officerName
									? dataId?.storageLocation[0]?.officerName
									: '..........................') +
								')'
							}
						/>
					</Grid>
					<Grid item sm={4}></Grid>
					<Grid
						item
						sm={4}
						sx={{
							display: 'flex',
							flexDirection: 'column',
							alignItems: 'center',
						}}
					>
						<Typography14 title="Mengetahui," />
						<Typography14 title="Station Head/Service Leader" />
						<GenerateQr dataId={dataId?.storageLocation[0]?.officerName} />
						<Typography14
							title={
								'(' +
								(dataId?.storageLocation[0]?.officerName
									? dataId?.storageLocation[0]?.officerName
									: '..........................') +
								')'
							}
						/>
					</Grid>
				</Grid>
			</Box> */}
		</Box>
	);
}

export default PrintPengambilan;
