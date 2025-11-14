import { Button, Card, CardActionArea, CardContent, Grid } from '@mui/material';
import Title14400 from 'Component/Typographys/Title14400';
import React from 'react';

function CardPengembalian(props) {
	const { dataId, aksi } = props;
	return (
		<Card>
			<CardActionArea>
				<CardContent>
					<Grid container spacing={1}>
						<Grid item xs={4}>
							<Title14400 text="Nomor" fontWeight={500} color="#BABBBC" />
						</Grid>
						<Grid item xs={8}>
							<Title14400 text={dataId?.itemNumber} />
						</Grid>
						<Grid item xs={4}>
							<Title14400 text="Nama Barang" fontWeight={500} color="#BABBBC" />
						</Grid>
						<Grid item xs={8}>
							<Title14400 text={dataId?.itemName} />
						</Grid>
						<Grid item xs={4}>
							<Title14400 text="Jumlah" fontWeight={500} color="#BABBBC" />
						</Grid>
						<Grid item xs={8}>
							<Title14400 text={dataId?.itemTotal} />
						</Grid>
						<Grid item xs={4}>
							<Title14400 text="Keterangan" fontWeight={500} color="#BABBBC" />
						</Grid>
						<Grid item xs={8}>
							<Title14400 text={dataId?.itemInfo} />
						</Grid>
						<Grid item xs={12}>
							<Title14400
								text="Kondisi Barang"
								fontWeight={500}
								color="#BABBBC"
							/>
						</Grid>
						<Grid item xs={12}>
							{aksi}
						</Grid>
					</Grid>
				</CardContent>
			</CardActionArea>
		</Card>
	);
}

export default CardPengembalian;
