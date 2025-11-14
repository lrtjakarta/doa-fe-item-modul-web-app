import { Card, CardActionArea, CardContent, Grid } from '@mui/material';
import Title14400 from 'Component/Typographys/Title14400';
import React from 'react';

function CardList(props) {
	const { value1, value2, value3, value4, value5, onClick } = props;
	return (
		<Card onClick={onClick}>
			<CardActionArea>
				<CardContent>
					<Grid container spacing={1} sx={{ mt: 1 }}>
						<Grid item xs={4}>
							<Title14400
								text="Diserahkan Oleh"
								fontWeight={500}
								color="#BABBBC"
							/>
						</Grid>
						<Grid item xs={8}>
							<Title14400 text={value1} />
						</Grid>
						<Grid item xs={4}>
							<Title14400
								text="Diajukan Oleh"
								fontWeight={500}
								color="#BABBBC"
							/>
						</Grid>
						<Grid item xs={8}>
							<Title14400 text={value2} />
						</Grid>
						<Grid item xs={4}>
							<Title14400
								text="Jumlah Barang"
								fontWeight={500}
								color="#BABBBC"
							/>
						</Grid>
						<Grid item xs={8}>
							<Title14400 text={value3} />
						</Grid>
						<Grid item xs={4}>
							<Title14400
								text="Tgl Peminjaman"
								fontWeight={500}
								color="#BABBBC"
							/>
						</Grid>
						<Grid item xs={8}>
							<Title14400 text={value4} />
						</Grid>
						<Grid item xs={4}>
							<Title14400
								text="Tgl Pengembalian"
								fontWeight={500}
								color="#BABBBC"
							/>
						</Grid>
						<Grid item xs={8}>
							<Title14400 text={value5} />
						</Grid>
					</Grid>
				</CardContent>
			</CardActionArea>
		</Card>
	);
}

export default CardList;
