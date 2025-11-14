import React from 'react';
import './DataTable.css';
import moment from 'moment';
import 'moment/locale/id';
import { Box, Divider, Grid, Stack, Typography } from '@mui/material';
import Typography14 from 'Component/Typographys/Typography14';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import GenerateQr from 'Component/GenerateQRCode/GenerateQr';

function BodyPrint({ dataId }) {
	moment.locale('id');

	return (
		<>
			<Box sx={{ mt: 3 }}>
				<Grid container spacing={1}>
					<Grid item sm={12} sx={{ display: 'flex', justifyContent: 'center' }}>
						<Typography14 title="PEMINJAMAN PERALATAN" fontWeight={700} />
					</Grid>
				</Grid>
			</Box>

			<Box sx={{ mt: 2 }}>
				<Grid container>
					<Grid item sm={1.5}>
						<Typography14 title="Nama" />
					</Grid>
					<Grid item sm={10}>
						<Typography14
							title={': ' + ' ' + dataId?.loanAppliBy?.officerName}
						/>
					</Grid>
					<Grid item sm={1.5}>
						<Typography14 title="Jabatan" />
					</Grid>
					<Grid item sm={10}>
						<Typography14
							title={': ' + ' ' + dataId?.loanAppliBy?.officerPosition}
						/>
					</Grid>
					<Grid item sm={1.5}>
						<Typography14 title="Divisi/Dept" />
					</Grid>
					<Grid item sm={10}>
						<Typography14
							title={': ' + ' ' + dataId?.loanAppliBy?.officerDepartemen}
						/>
					</Grid>
					<Grid item sm={1.5}>
						<Typography14 title="Tanggal" />
					</Grid>
					<Grid item sm={10}>
						<Typography14
							title={': ' + ' ' + moment(dataId?.loanDate).format('DD/MM/YYYY')}
						/>
					</Grid>
				</Grid>
			</Box>

			<Box sx={{ mt: 1 }}>
				<Typography14 title="dengan ini mengajukan permohonan peminjaman peralatan berupa:" />
				<table className="data-table">
					<tbody>
						<tr>
							<td width="10%">
								<Stack direction="row" justifyContent="center">
									<Typography14 title="No" fontWeight={700} />
								</Stack>
							</td>
							<td>
								<Stack direction="row" justifyContent="center">
									<Typography14 title="Jenis" fontWeight={700} />
								</Stack>
							</td>
							<td width="25%">
								<Stack direction="row" justifyContent="center">
									<Typography14 title="Jumlah" fontWeight={700} />
								</Stack>
							</td>
							<td>
								<Stack direction="row" justifyContent="center">
									<Typography14 title="Keterangan" fontWeight={700} />
								</Stack>
							</td>
						</tr>

						{dataId?.loanItem?.map((item, index) => {
							return (
								<tr>
									<td>
										<Typography14 title={index + 1} />
									</td>
									<td>
										<Typography14 title={item?.itemName} />
									</td>
									<td>
										<Typography14 title={item?.itemTotal} />
									</td>
									<td>
										<Typography14 title={item?.itemInfo} />
									</td>
								</tr>
							);
						})}
					</tbody>
				</table>
				<Typography14 title="Note:" />
				<Typography14 title="-   Apabila terjadi kerusakan atau kehilangan, peminjam wajib bertangungjawab mengganti alat yang rusak/hilang sesuai peralatan yang dipinjam." />
				<Typography14 title="-  Peminjam wajib menjaga kebersihan peralatan yang dipinjam." />
			</Box>

			<Box sx={{ mt: 2 }}>
				<Grid container>
					<Grid
						item
						sm={4}
						sx={{
							display: 'flex',
							flexDirection: 'column',
							alignItems: 'center',
						}}
					>
						<Typography14 title="Yang Menyerahkan," />
						{dataId?.loanGiverBy && (
							<GenerateQr dataId={dataId?.loanGiverBy?.officerId} />
						)}
						<Typography14
							title={'(' + dataId?.loanGiverBy?.officerName + ')'}
						/>
					</Grid>
					<Grid item sm={4} />
					<Grid
						item
						sm={4}
						sx={{
							display: 'flex',
							flexDirection: 'column',
							alignItems: 'center',
						}}
					>
						<Typography14 title="Yang Mengajukan," />
						{dataId?.loanAppliBy && (
							<GenerateQr dataId={dataId?.loanAppliBy?.officerId} />
						)}
						<Typography14
							title={'(' + dataId?.loanAppliBy?.officerName + ')'}
						/>
					</Grid>
				</Grid>
			</Box>

			<Box sx={{ mt: 2 }}>
				<Divider sx={{ height: '2px', backgroundColor: 'black' }} />
			</Box>

			<Box sx={{ mt: 2 }}>
				<Grid container spacing={1}>
					<Grid item sm={12} sx={{ display: 'flex', justifyContent: 'center' }}>
						<Typography14 title="PENGEMBALIAN PERALATAN" fontWeight={700} />
					</Grid>
				</Grid>
			</Box>

			<Box sx={{ mt: 2 }}>
				<Grid container>
					<Grid item sm={1.5}>
						<Typography14 title="Nama" />
					</Grid>
					<Grid item sm={10}>
						<Typography14
							title={': ' + ' ' + dataId?.returnGiverBy?.officerName}
						/>
					</Grid>
					<Grid item sm={1.5}>
						<Typography14 title="Jabatan" />
					</Grid>
					<Grid item sm={10}>
						<Typography14
							title={': ' + ' ' + dataId?.returnGiverBy?.officerPosition}
						/>
					</Grid>
					<Grid item sm={1.5}>
						<Typography14 title="Divisi/Dept" />
					</Grid>
					<Grid item sm={10}>
						<Typography14
							title={': ' + ' ' + dataId?.returnGiverBy?.officerDepartemen}
						/>
					</Grid>
					<Grid item sm={1.5}>
						<Typography14 title="Tanggal" />
					</Grid>
					<Grid item sm={10}>
						<Typography14
							title={
								': ' + ' ' + moment(dataId?.returnDate).format('DD/MM/YYYY')
							}
						/>
					</Grid>
					<Grid item sm={12}>
						<Typography14 title="dengan ini telah selesai melakukan peminjaman serta mengembalikan peralatan sesuai dengan data peminjamaan peralatan diatas dalam kodisi Baik / Rusak." />
					</Grid>
				</Grid>
			</Box>

			<Box sx={{ mt: 1 }}>
				<Grid container>
					<Grid
						item
						sm={4}
						sx={{
							display: 'flex',
							flexDirection: 'column',
							alignItems: 'center',
						}}
					>
						<Typography14 title="Yang Menerima," />
						{dataId?.returnRecipientBy && (
							<GenerateQr dataId={dataId?.returnRecipientBy?.officerId} />
						)}
						<Typography14
							title={'(' + dataId?.returnRecipientBy?.officerName + ')'}
						/>
					</Grid>
					<Grid item sm={4} />
					<Grid
						item
						sm={4}
						sx={{
							display: 'flex',
							flexDirection: 'column',
							alignItems: 'center',
						}}
					>
						<Typography14 title="Yang Menyerahkan," />
						{dataId?.returnGiverBy && (
							<GenerateQr dataId={dataId?.returnGiverBy?.officerId} />
						)}
						<Typography14
							title={'(' + dataId?.returnGiverBy?.officerName + ')'}
						/>
					</Grid>
				</Grid>
			</Box>
		</>
	);
}

export default BodyPrint;
