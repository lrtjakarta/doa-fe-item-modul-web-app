import { Card, CardActionArea, CardContent, Grid, Stack } from '@mui/material';
import BoxStatus from 'Component/CuxtomBox/BoxStatus';
import Title14400 from 'Component/Typographys/Title14400';
import React from 'react';

function CardMobile(props) {
	const {
		status,
		date,
		info1,
		value1,
		info2,
		value2,
		info3,
		value31,
		value32,
		info4,
		value4,
		onClick,
	} = props;
	return (
		<Card onClick={onClick}>
			<CardActionArea>
				<CardContent>
					<Stack
						direction="row"
						justifyContent="space-between"
						alignItems="center"
					>
						<BoxStatus title={status} />
						<Title14400 text={date} />
					</Stack>
					<Grid container spacing={1} sx={{ mt: 1 }}>
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

						<Grid item xs={4}>
							<Title14400 text={info3} fontWeight={500} color="#BABBBC" />
						</Grid>
						<Grid item xs={8}>
							<Title14400 text={value31} />
							<Title14400 text={value32} color="#BABBBC" />
						</Grid>

						<Grid item xs={4}>
							<Title14400 text={info4} fontWeight={500} color="#BABBBC" />
						</Grid>
						<Grid item xs={8}>
							<Title14400 text={value4} />
						</Grid>
					</Grid>
				</CardContent>
			</CardActionArea>
		</Card>
	);
}

export default CardMobile;
