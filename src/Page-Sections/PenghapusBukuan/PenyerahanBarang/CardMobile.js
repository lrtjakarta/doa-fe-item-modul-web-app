import { Card, Box, CardActionArea, CardContent, Grid } from '@mui/material';
import React from 'react';
import BoxStatus from 'Component/CuxtomBox/BoxStatus';
import Title14400 from 'Component/Typographys/Title14400';

function CardMobile({ dataId, onView }) {
	// console.log('dataId', dataId);

	const _submissiondBy = dataId?.submissiondBy;
	const _approvalBy = dataId?.approvalBy;
	const _providedBy = dataId?.providedBy;
	return (
		<Box>
			<Card onClick={onView}>
				<CardActionArea>
					<CardContent>
						<Box>
							<BoxStatus title={dataId?.removeStatus} />
						</Box>
						<Grid container sx={{ mt: 1 }}>
							<Grid item xs={4}>
								<Title14400
									text="Jumlah Barang"
									fontWeight={500}
									color="#BABBBC"
								/>
							</Grid>
							<Grid item xs={8}>
								<Title14400
									text={dataId?.removeItems?.length + ' ' + 'Barang'}
								/>
							</Grid>
							<Grid item xs={4}>
								<Title14400 text="Diajukan" fontWeight={500} color="#BABBBC" />
							</Grid>
							<Grid item xs={8}>
								<Title14400 text={_submissiondBy?.officerName} />
								<Title14400
									text={_submissiondBy?.officerPosition}
									color="#BABBBC"
								/>
							</Grid>
							<Grid item xs={4}>
								<Title14400 text="Approval" fontWeight={500} color="#BABBBC" />
							</Grid>
							<Grid item xs={8}>
								<Title14400 text={_approvalBy?.officerName} />
								<Title14400
									text={_approvalBy?.officerPosition}
									color="#BABBBC"
								/>
							</Grid>
							<Grid item xs={4}>
								<Title14400 text="Diterima" fontWeight={500} color="#BABBBC" />
							</Grid>
							<Grid item xs={8}>
								<Title14400 text={_providedBy?.officerName} />
								<Title14400
									text={_providedBy?.officerPosition}
									color="#BABBBC"
								/>
							</Grid>
						</Grid>
					</CardContent>
				</CardActionArea>
			</Card>
		</Box>
	);
}

export default CardMobile;
