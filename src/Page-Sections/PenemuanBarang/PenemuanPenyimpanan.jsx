import {
	Box,
	CardActionArea,
	CardContent,
	Grid,
	Hidden,
	Stack,
	Card,
	Button,
	Dialog,
	Alert,
} from '@mui/material';
import React, { useEffect, useState, useRef } from 'react';
import { useReactToPrint } from 'react-to-print';
import PrintOutlinedIcon from '@mui/icons-material/PrintOutlined';

import columnShape from './HistoryPenyimpanan/column-shape';
import LIST_HISTORY from './HistoryPenyimpanan/list_products';
import moment from 'moment';
import Title16700 from 'Component/Typographys/Title16700';
import Title14600 from 'Component/Typographys/Title14600';
import Title14400 from 'Component/Typographys/Title14400';
import CustomNewTableDetail from 'Component/CustomTable/CustomNewTableDetail';
import Title12 from 'Component/Typographys/Title12';

import PrintPenemuan from './PrintOutPenemuan/PrintPenemuan';

import StaticVar from 'Config/StaticVar';

function PenemuanPenyimpanan(props) {
	const { dataFound, dataStorage } = props;
	const componentRef = useRef();

	const _date = moment(dataFound?.foundDate).format('DD/MM/YYYY');
	const _time = moment(dataFound?.foundTime).format('HH:mm');

	const _lastStorage = dataStorage ? dataStorage[dataStorage.length - 1] : '-';

	const [status, setStatus] = useState(false);
	const [dataPrint, setDataPrint] = useState(null);
	const [photo, setPhoto] = useState(null);

	const handleDialogPrint = () => {
		setStatus(true);
		setDataPrint(dataFound);
	};

	const handlePrint = useReactToPrint({
		content: () => componentRef.current,
	});

	useEffect(() => {
		const foundPhoto = dataFound?.foundPhoto;
		if (foundPhoto) {
			if (Array.isArray(foundPhoto)) {
				setPhoto(foundPhoto.length > 0 ? foundPhoto[0] : null);
			} else if (
				typeof foundPhoto === 'object' &&
				foundPhoto !== null &&
				foundPhoto !== undefined
			) {
				setPhoto(foundPhoto);
			} else {
				setPhoto(null);
			}
		}
	}, [dataFound?.foundPhoto]);

	// console.log('dataFound?.foundPhoto', dataFound?.foundPhoto);
	return (
		<Box>
			<Grid container spacing={2}>
				<Grid item xs={6} sm={6}>
					<Title16700 text="PENEMUAN" />
				</Grid>
				<Grid
					item
					xs={6}
					sm={6}
					sx={{ display: 'flex', justifyContent: 'flex-end' }}
				>
					<Button variant="contained" onClick={handleDialogPrint}>
						Cetak
					</Button>
				</Grid>
				<Grid item xs={6} sm={3}>
					<Box sx={{ width: '100%' }}>
						<Title14600 text="Lokasi Ditemukan" />
						<Title14400 text={dataFound?.foundLocation} />
					</Box>
				</Grid>
				<Grid item xs={6} sm={3}>
					<Box sx={{ width: '100%' }}>
						<Title14600 text=" Waktu Penemuan" />
						<Title14400 text={_date + ' ' + _time} />
					</Box>
				</Grid>
				<Grid item xs={6} sm={3}>
					<Box sx={{ width: '100%' }}>
						<Title14600 text="Yang Menemukan" />
						<Title14400 text={dataFound?.foundBy} />
					</Box>
				</Grid>
				<Grid item xs={6} sm={3}>
					<Box sx={{ width: '100%' }}>
						<Title14600 text="Yang Menginput" />
						<Title14400 text={_lastStorage?.officerName} />
						<Title14400 text={_lastStorage?.officerPosition} />
					</Box>
				</Grid>
				<Grid item xs={12} sm={12}>
					<Box sx={{ width: '100%' }}>
						<Title14600 text="Kronologi Penemuan" />
						<Title14400 text={dataFound?.foundChronology} />
					</Box>
				</Grid>
				<Grid item xs={12} sm={12} sx={{ mt: 1 }}>
					<Title16700 text="DOKUMENTASI" />
				</Grid>

				{photo !== null ? (
					<>
						{photo?.uploadedFiles.map(xy => (
							<Grid item xs={12} sm={2} md={2}>
								<img
									src={
										StaticVar.URL_API +
										'/uploads/' +
										xy?.path +
										'/' +
										xy?.uploadedName
									}
									alt="dokumentasi"
									style={{ width: '100%', height: 'auto' }}
								/>
							</Grid>
						))}
					</>
				) : (
					<Grid item xs={12} sm={3}>
						<Alert severity="warning">Dokumentasi Kosong</Alert>
					</Grid>
				)}

				<Grid item xs={12} sm={12} sx={{ mt: 3 }}>
					<Title16700 text="RIWAYAT PENYIMPANAN BARANG" />
				</Grid>

				{/* versi destop */}
				<Hidden only={['xs']}>
					<Grid item xs={12} sm={12} sx={{ mb: 7 }}>
						<CustomNewTableDetail
							data={dataStorage ? dataStorage : LIST_HISTORY}
							columnShape={columnShape({
								onView: '',
							})}
						/>
					</Grid>
				</Hidden>
				{/* versi mobile */}
				<Hidden only={['sm', 'md', 'lg', 'xl']}>
					{dataStorage?.length > 0
						? dataStorage?.map(item => {
								const _date = moment(item?.storageDate).format('DD/MM/YYYY');
								const _time = moment(item?.storageTime).format('HH:mm');
								return (
									<Grid item xs={12} sm={12} sx={{ mt: 1 }}>
										<Card>
											<CardActionArea>
												<CardContent>
													<Grid container spacing={1}>
														<Grid item xs={6}>
															<Title12
																text="Lokasi Penyimpanan"
																fontWeight={500}
															/>
														</Grid>
														<Grid item xs={6}>
															<Title12 text={item.location} />
														</Grid>
														<Grid item xs={6}>
															<Title12
																text="Waktu Penyimpanan"
																fontWeight={500}
															/>
														</Grid>
														<Grid item xs={6}>
															<Title12 text={_date + ' ' + _time} />
														</Grid>
														<Grid item xs={6}>
															<Title12
																text="Petugas Penerima"
																fontWeight={500}
															/>
														</Grid>
														<Grid item xs={6}>
															<Title12
																text={
																	item?.officerName ? item?.officerName : '-'
																}
															/>
															<Title12
																text={
																	item?.officerPosition
																		? item?.officerPosition
																		: '-'
																}
															/>
														</Grid>
													</Grid>
												</CardContent>
											</CardActionArea>
										</Card>
									</Grid>
								);
						  })
						: null}
				</Hidden>
			</Grid>

			<Dialog open={status} fullScreen>
				<Stack
					direction="row"
					justifyContent="flex-end"
					spacing={2}
					sx={{ m: 3 }}
				>
					<Button
						sx={{ width: '100px' }}
						variant="outlined"
						onClick={() => setStatus(false)}
					>
						Kembali
					</Button>
					<Button
						sx={{ width: '100px' }}
						variant="contained"
						onClick={handlePrint}
						startIcon={<PrintOutlinedIcon />}
					>
						Print
					</Button>
				</Stack>
				<div ref={componentRef}>
					<PrintPenemuan dataId={dataPrint} />
				</div>
			</Dialog>
		</Box>
	);
}

export default PenemuanPenyimpanan;
