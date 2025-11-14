import { Card, CardActionArea, CardContent, Grid } from '@mui/material';
import Title14400 from 'Component/Typographys/Title14400';
import React from 'react';

function CardInputBM(props) {
	const { info1, value1, info2, value2, info3, value3, info4, value4 } = props;
	return (
		<Card>
			<CardActionArea>
				<CardContent>
					<Grid container spacing={1}>
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
							<Title14400 text={value2} />
						</Grid>
						<Grid item xs={12}>
							<Title14400 text={info3} fontWeight={500} color="#BABBBC" />
						</Grid>
						<Grid item xs={12}>
							{value3}
						</Grid>
						<Grid item xs={12}>
							<Title14400 text={info4} fontWeight={500} color="#BABBBC" />
						</Grid>
						<Grid item xs={12}>
							{value4}
						</Grid>
					</Grid>
				</CardContent>
			</CardActionArea>
		</Card>
	);
}

export default CardInputBM;
