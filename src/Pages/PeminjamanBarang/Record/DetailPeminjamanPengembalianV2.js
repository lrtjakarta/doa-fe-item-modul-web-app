import { Box, Grid, Stack, Link, Button } from '@mui/material';
import TextSnippetOutlinedIcon from '@mui/icons-material/TextSnippetOutlined';
import { useNavigate, useLocation } from 'react-router-dom';
import CustomHeaderTitle from 'Component/Headers/CustomHeaderTitle';
import CustomNewHeader from 'Component/Headers/CustomNewHeader';
import Title14400 from 'Component/Typographys/Title14400';
import Title18700 from 'Component/Typographys/Title18700';
import ListDetail from 'Page-Sections/PeminjamanPengembalian/Data/ListDataDetail';
import ColumnShape from 'Page-Sections/PeminjamanPengembalian/column-shape-detail';
import React, { useContext, useEffect } from 'react';
import Title16600 from 'Component/Typographys/Title16600';
import CustomNewTableDetail from 'Component/CustomTable/CustomNewTableDetail';

import { GoodsLoanReturnContext } from 'Context/GoodsLoanReturn';
import moment from 'moment';

function DetailPeminjamanPengembalian() {
	const navigate = useNavigate();
	const location = useLocation();
	const { id, dataLoan } = location.state;

	// context
	const { goodsLoanReturnById, getDataGoodsLoanReturnById } = useContext(
		GoodsLoanReturnContext
	);

	// handle
	const handlePeminjaman = () => {
		navigate('/manajemenBarang/peminjamanPengembalian/beritaAcara/Peminjaman');
	};

	const handlePengembalian = () => {
		navigate('/manajemenBarang/peminjamanPengembalian/addPengembalian', {
			state: { id, dataLoan },
		});
	};

	// useEffect
	useEffect(() => {
		if (id) {
			getDataGoodsLoanReturnById(id);
		}
	}, []);

	return (
		<Box
			sx={{
				padding: { xs: '15px', sm: '30px' },
				background: '#FFF',
				minHeight: '100vh',
			}}
		>
			<Grid container spacing={3}>
				<Grid item xs={12} sm={12}>
					<CustomNewHeader
						judul="DETAIL PEMINJAMAN & PENGEMBALIAN BARANG"
						title1="Home  -  Pinjaman & Pengembalian Barang -  "
						title2="Detail Peminjaman & Pengembalian Barang"
					/>
				</Grid>

				<Grid
					item
					xs={12}
					sm={12}
					sx={{ display: 'flex', justifyContent: 'center' }}
				>
					<Box>
						<Grid container spacing={2}>
							<Grid item xs={12} sm={12}>
								{goodsLoanReturnById?.loanItem !== undefined ? (
									<CustomNewTableDetail
										data={goodsLoanReturnById?.loanItem}
										columnShape={ColumnShape()}
									/>
								) : null}
							</Grid>
							<Grid item xs={12} sm={6}>
								<Box
									sx={{
										backgroundColor: '#F9F9F9',
										borderRadius: '12px',
										padding: 3,
									}}
								>
									<Stack direction="column" spacing={2}>
										<Title18700 text="PEMINJAMAN" />
										{/* <Link
											component="button"
											underline="none"
											onClick={handlePeminjaman}
										>
											<Stack direction="row" spacing={1}>
												<TextSnippetOutlinedIcon sx={{ color: '#3E97FF' }} />
												<Title14400
													text="Berita Acara Serah Terima"
													color="#3E97FF"
												/>
											</Stack>
										</Link> */}
										<Box>
											<Title16600 text="Tanggal Peminjaman" />
											<Title14400
												text={moment(goodsLoanReturnById?.loanDate).format(
													'DD/mm/yyyy'
												)}
											/>
										</Box>
										<Stack direction="column" spacing={2}>
											<Title16600 text="Diserahkan oleh :" />
											<Stack direction="row" spacing={2}>
												<Box sx={{ width: '25%' }}>
													<Title14400 text="Nama" />
												</Box>
												<Box>
													<Title14400
														text={
															': ' +
															goodsLoanReturnById?.loanGiverBy?.officerName
														}
													/>
												</Box>
											</Stack>
											<Stack direction="row" spacing={2}>
												<Box sx={{ width: '25%' }}>
													<Title14400 text="Jabatan" />
												</Box>
												<Box>
													<Title14400
														text={
															': ' +
															goodsLoanReturnById?.loanGiverBy?.officerPosition
														}
													/>
												</Box>
											</Stack>
											<Stack direction="row" spacing={2}>
												<Box sx={{ width: '25%' }}>
													<Title14400 text="Divisi/Dept" />
												</Box>
												<Box>
													<Title14400
														text={
															': ' +
															goodsLoanReturnById?.loanGiverBy
																?.officerDepartemen
														}
													/>
												</Box>
											</Stack>
										</Stack>
										<Stack direction="column" spacing={2}>
											<Title16600 text="Diajukan oleh" />
											<Stack direction="row" spacing={2}>
												<Box sx={{ width: '25%' }}>
													<Title14400 text="Nama" />
												</Box>
												<Box>
													<Title14400
														text={
															': ' +
															goodsLoanReturnById?.loanAppliBy?.officerName
														}
													/>
												</Box>
											</Stack>
											<Stack direction="row" spacing={2}>
												<Box sx={{ width: '25%' }}>
													<Title14400 text="Jabatan" />
												</Box>
												<Box>
													<Title14400
														text={
															': ' +
															goodsLoanReturnById?.loanAppliBy?.officerPosition
														}
													/>
												</Box>
											</Stack>
											<Stack direction="row" spacing={2}>
												<Box sx={{ width: '25%' }}>
													<Title14400 text="Divisi/Dept" />
												</Box>
												<Box>
													<Title14400
														text={
															': ' +
															goodsLoanReturnById?.loanAppliBy
																?.officerDepartemen
														}
													/>
												</Box>
											</Stack>
										</Stack>
									</Stack>
								</Box>
							</Grid>
							<Grid item xs={12} sm={6}>
								<Box
									sx={{
										backgroundColor: '#F9F9F9',
										borderRadius: '12px',
										padding: 3,
									}}
								>
									<Stack direction="column" spacing={2}>
										<Stack direction="row" justifyContent="space-between">
											<Title18700 text="PENGEMBALIAN" />
											{goodsLoanReturnById?.loanStatus === 'Dipinjam' ? (
												<Button
													variant="contained"
													onClick={handlePengembalian}
												>
													Pengembalian
												</Button>
											) : null}
										</Stack>
										{goodsLoanReturnById?.loanStatus !== 'Dipinjam' ? (
											<>
												{/* <Link
													component="button"
													underline="none"
													onClick={handlePengembalian}
												>
													<Stack direction="row" spacing={1}>
														<TextSnippetOutlinedIcon
															sx={{ color: '#3E97FF' }}
														/>
														<Title14400
															text="Berita Acara Serah Terima"
															color="#3E97FF"
														/>
													</Stack>
												</Link> */}
												<Box>
													<Title16600 text="Tanggal Pengembalian" />
													<Title14400
														text={moment(
															goodsLoanReturnById?.returnDate
														).format('DD/mm/yyyy')}
													/>
												</Box>
												<Stack direction="column" spacing={2}>
													<Title16600 text="Diserahkan oleh :" />
													<Stack direction="row" spacing={2}>
														<Box sx={{ width: '25%' }}>
															<Title14400 text="Nama" />
														</Box>
														<Box>
															<Title14400
																text={
																	': ' +
																	goodsLoanReturnById?.returnRecipientBy
																		?.officerName
																}
															/>
														</Box>
													</Stack>
													<Stack direction="row" spacing={2}>
														<Box sx={{ width: '25%' }}>
															<Title14400 text="Jabatan" />
														</Box>
														<Box>
															<Title14400
																text={
																	': ' +
																	goodsLoanReturnById?.returnRecipientBy
																		?.officerPosition
																}
															/>
														</Box>
													</Stack>
													<Stack direction="row" spacing={2}>
														<Box sx={{ width: '25%' }}>
															<Title14400 text="Divisi/Dept" />
														</Box>
														<Box>
															<Title14400
																text={
																	': ' +
																	goodsLoanReturnById?.returnRecipientBy
																		?.officerDepartemen
																}
															/>
														</Box>
													</Stack>
												</Stack>
												<Stack direction="column" spacing={2}>
													<Title16600 text="Diajukan oleh" />
													<Stack direction="row" spacing={2}>
														<Box sx={{ width: '25%' }}>
															<Title14400 text="Nama" />
														</Box>
														<Box>
															<Title14400
																text={
																	': ' +
																	goodsLoanReturnById?.returnGiverBy
																		?.officerName
																}
															/>
														</Box>
													</Stack>
													<Stack direction="row" spacing={2}>
														<Box sx={{ width: '25%' }}>
															<Title14400 text="Jabatan" />
														</Box>
														<Box>
															<Title14400
																text={
																	': ' +
																	goodsLoanReturnById?.returnGiverBy
																		?.officerPosition
																}
															/>
														</Box>
													</Stack>
													<Stack direction="row" spacing={2}>
														<Box sx={{ width: '25%' }}>
															<Title14400 text="Divisi/Dept" />
														</Box>
														<Box>
															<Title14400
																text={
																	': ' +
																	goodsLoanReturnById?.returnGiverBy
																		?.officerDepartemen
																}
															/>
														</Box>
													</Stack>
												</Stack>
											</>
										) : null}
									</Stack>
								</Box>
							</Grid>
						</Grid>
					</Box>
				</Grid>
			</Grid>
		</Box>
	);
}

export default DetailPeminjamanPengembalian;
