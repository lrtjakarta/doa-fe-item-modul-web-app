import { Button, Card, CardActionArea, CardContent, Grid } from '@mui/material';
import Title14400 from 'Component/Typographys/Title14400';
import React from 'react';

function CardAdd(props) {
	const { value1, value2, value3, onClick } = props;
	return (
		<Card>
			<CardActionArea>
				<CardContent>
					<Grid container spacing={1} sx={{ mt: 1 }}>
						<Grid item xs={4}>
							<Title14400 text="Nomor" fontWeight={500} color="#BABBBC" />
						</Grid>
						<Grid item xs={8}>
							<Title14400 text={value1} />
						</Grid>
						<Grid item xs={4}>
							<Title14400 text="Nama Barang" fontWeight={500} color="#BABBBC" />
						</Grid>
						<Grid item xs={8}>
							<Title14400 text={value2} />
						</Grid>
						<Grid item xs={4}>
							<Title14400 text="Keterangan" fontWeight={500} color="#BABBBC" />
						</Grid>
						<Grid item xs={8}>
							<Title14400 text={value3} />
						</Grid>
						<Grid
							item
							xs={12}
							sx={{ display: 'flex', justifyContent: 'flex-end' }}
						>
							<Button variant="outlined" color="error" onClick={onClick}>
								Delete
							</Button>
						</Grid>
					</Grid>
				</CardContent>
			</CardActionArea>
		</Card>
	);
}

export default CardAdd;
