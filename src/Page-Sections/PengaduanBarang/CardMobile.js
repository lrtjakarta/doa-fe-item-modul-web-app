import React from 'react';
import { Card, CardContent, Box, Button, Grid } from '@mui/material';
import moment from 'moment';
import BoxStatus from 'Component/CuxtomBox/BoxStatus';
import Title14400 from 'Component/Typographys/Title14400';

function CardMobile({ dataId, onMapping }) {
	const dataRow = dataId;
	const _date = moment(dataRow.foundDate).format('DD MMMM YYYY');
	const _time = moment(dataRow.foundTime).format('HH:mm');
	return (
		<Card>
			<CardContent>
				<Box>
					<BoxStatus title={dataRow.foundStatus} />
				</Box>
				<Box sx={{ mt: 1 }}>
					<Grid container>
						<Grid xs={4}>
							<Title14400 text="Tanggal" fontWeight={500} color="#BABBBC" />
						</Grid>
						<Grid xs={8}>
							<Title14400 text={_date + ' ' + _time} />
						</Grid>
						<Grid xs={4}>
							<Title14400 text="No Laporan" fontWeight={500} color="#BABBBC" />
						</Grid>
						<Grid xs={8}>
							<Title14400 text={dataRow?.idNumber} mt={1} />
						</Grid>
						<Grid xs={4}>
							<Title14400
								text="Jenis Barang"
								fontWeight={500}
								color="#BABBBC"
							/>
						</Grid>
						<Grid xs={8}>
							<Title14400 text={dataRow?.foundType} mt={1} />
						</Grid>
						<Grid xs={12}>
							<Title14400
								text="Lokasi Penemuan"
								fontWeight={500}
								color="#BABBBC"
							/>
						</Grid>
						<Grid xs={12}>
							<Title14400 text={dataRow?.foundLocation} mt={1} />
						</Grid>
						<Grid
							xs={12}
							sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end' }}
						>
							<Button variant="contained" onClick={onMapping}>
								Link
							</Button>
						</Grid>
					</Grid>
				</Box>
			</CardContent>
		</Card>
	);
}

export default CardMobile;
