import { Card, CardActionArea, CardContent, Grid } from '@mui/material';
import Title14400 from 'Component/Typographys/Title14400';
import React from 'react';

function CardBarangMobile(props) {
	const { info1, value1, info2, value21, value22, info3, value31, value32 } =
		props;
	return (
		<Card>
			<CardActionArea>
				<CardContent>
					<Grid container spacing={2}>
						<Grid item xs={4}>
							<Title14400 text={info1} fontWeight={500} color="#BABBBC" />
						</Grid>
						<Grid item xs={8}>
							<Title14400 text={value1} />
						</Grid>
						<Grid item xs={4}>
							<Title14400 text={info2} fontWeight={500} color="#BABBBC" />
						</Grid>
						<Grid item xs={8}>
							<Title14400 text={value21} />
							<Title14400 text={value22} color="#BABBBC" />
						</Grid>
						<Grid item xs={4}>
							<Title14400 text={info3} fontWeight={500} color="#BABBBC" />
						</Grid>
						<Grid item xs={8}>
							<Title14400 text={value31} />
							<Title14400 text={value32} color="#BABBBC" />
						</Grid>
					</Grid>
				</CardContent>
			</CardActionArea>
		</Card>
	);
}

export default CardBarangMobile;
