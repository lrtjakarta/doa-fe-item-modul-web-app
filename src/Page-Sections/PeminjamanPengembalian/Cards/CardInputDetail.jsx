import { Button, Card, CardActionArea, CardContent, Grid } from '@mui/material';
import { Box } from '@mui/system';
import BoxStatus from 'Component/CuxtomBox/BoxStatus';
import Title14400 from 'Component/Typographys/Title14400';
import React from 'react';

function CardInputDetail(props) {
	const { value1, value2, value3, status, onClick } = props;
	return (
		<Box>
			<Card>
				<CardActionArea>
					<CardContent>
						<Grid container spacing={1}>
							<Grid item xs={12}>
								<BoxStatus title={status} />
							</Grid>
							<Grid item xs={4}>
								<Title14400 text="Nomor" fontWeight={500} color="#BABBBC" />
							</Grid>
							<Grid item xs={8}>
								<Title14400 text={value1} />
							</Grid>
							<Grid item xs={4}>
								<Title14400
									text="Nama Barang"
									fontWeight={500}
									color="#BABBBC"
								/>
							</Grid>
							<Grid item xs={8}>
								<Title14400 text={value2} />
							</Grid>
							<Grid item xs={4}>
								<Title14400
									text="Kondisi Awal"
									fontWeight={500}
									color="#BABBBC"
								/>
							</Grid>
							<Grid item xs={8}>
								<Title14400 text={value3} />
							</Grid>
							{/* <Grid
							item
							xs={12}
							sx={{ display: 'flex', justifyContent: 'flex-end' }}
						>
							<Button variant="contained" onClick={onClick}>
								Kembalikan
							</Button>
						</Grid> */}
						</Grid>
					</CardContent>
				</CardActionArea>
			</Card>
		</Box>
	);
}

export default CardInputDetail;
