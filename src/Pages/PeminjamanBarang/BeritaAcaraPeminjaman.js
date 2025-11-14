import { Box, Grid, Stack, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import CustomNewTableDetail from 'Component/CustomTable/CustomNewTableDetail';
import CustomNewHeader from 'Component/Headers/CustomNewHeader';
import Title14400 from 'Component/Typographys/Title14400';
import Title16500 from 'Component/Typographys/Title16500';
import Title18700 from 'Component/Typographys/Title18700';
import ListDetail from 'Page-Sections/PenghapusBukuan/Data/ListDetail';
import ColumnShapeDetail from 'Page-Sections/PenghapusBukuan/column-space-detail';
import PhotoDR from 'Assets/qr-code.png';
import ButtonSubmit from 'Component/Buttons/ButtonSubmit';
import React from 'react';

function BeritaAcaraPeminjaman() {
	const navigate = useNavigate();
	const handleBack = () => {
		navigate(-1);
	};
	return (
		<Box
			sx={{
				padding: { xs: '15px', sm: '30px' },
				background: '#FFF',
				minHeight: '100vh',
			}}
		>
			<Grid container spacing={4}>
				<Grid item xs={12} sm={12}>
					<CustomNewHeader
						judul="FORM PEMINJAMAN  BARANG"
						title1="Home  -  Pinjaman & Pengembalian Barang - "
						title2="  Form Peminjaman Barang"
					/>
				</Grid>
				<Grid
					item
					xs={12}
					sm={12}
					sx={{ display: 'flex', justifyContent: 'center' }}
				>
					<Box sx={{ width: '70%' }}>
						<Grid container spacing={3}>
							<Grid
								item
								xs={12}
								sm={12}
								sx={{ display: 'flex', justifyContent: 'center' }}
							>
								<Title18700 text="BERITA ACARA SERAH TERIMA" />
							</Grid>
							<Grid item xs={12} sm={12}>
								<Stack direction="column" spacing={2}>
									<Title14400 text="Pada hari ini Rabu 20/03/2024 pukul 18:09 telah dilakukan serah terima antara Pihak" />
									<Stack direction="row" spacing={2}>
										<Box>
											<Title14400 text="1." />
										</Box>
										<Stack direction="column" spacing={2}>
											<Title14400 text="Nama" />
											<Title14400 text="Jabatan" />
											<Title14400 text="Divis/Dept" />
										</Stack>
										<Stack direction="column" spacing={2}>
											<Title14400 text=": Khairul Mustaan" />
											<Title14400 text=": Passenger Service Agent" />
											<Title14400 text=": OPL/Pelayan" />
										</Stack>
									</Stack>
									<Stack direction="row" spacing={2}>
										<Box>
											<Title14400 text="2." />
										</Box>
										<Stack direction="column" spacing={2}>
											<Title14400 text="Nama" />
											<Title14400 text="Jabatan" />
											<Title14400 text="Divis/Dept" />
										</Stack>
										<Stack direction="column" spacing={2}>
											<Title14400 text=": Deddy Sunarya" />
											<Title14400 text=": Service Leader" />
											<Title14400 text=": OPL/Pelayan" />
										</Stack>
									</Stack>
									<Title14400 text="berupa:" />
								</Stack>
							</Grid>
							<Grid item xs={12} sm={12}>
								<CustomNewTableDetail
									data={ListDetail}
									columnShape={ColumnShapeDetail()}
								/>
							</Grid>
							<Grid item xs={12} sm={12}>
								<Title14400
									text="Demikian berita acara serah terima ini dibuat oleh kedua Pihak untuk dapat dipergunakan 
									sebagaimana mestinya. Adapun yang diserahterimakan dalam kondisi baik."
								/>
							</Grid>
							<Grid item xs={12} sm={6}>
								<Stack direction="column" alignItems="center">
									<Title16500 text="Pihak Yang Menyerahkan" />
									<img
										src={PhotoDR}
										style={{
											width: 150,
											height: 150,
										}}
									/>
									<Title16500 text="NIK : 7310054504970020" />
								</Stack>
							</Grid>
							<Grid item xs={12} sm={6}>
								<Stack direction="column" alignItems="center">
									<Title16500 text="Pihak Yang Menerima" />
									<img
										src={PhotoDR}
										style={{
											width: 150,
											height: 150,
										}}
									/>
									<Title16500 text="NIK : 7310054504970020" />
								</Stack>
							</Grid>
							<Grid
								item
								xs={12}
								sm={12}
								sx={{
									display: 'flex',
									justifyContent: 'flex-end',
									marginTop: 3,
								}}
							>
								<Stack direction="row">
									<Button
										variant="text"
										sx={{ padding: '10px 35px 5px' }}
										onClick={handleBack}
									>
										Selesai
									</Button>
									<ButtonSubmit title="Cetak" />
								</Stack>
							</Grid>
						</Grid>
					</Box>
				</Grid>
			</Grid>
		</Box>
	);
}

export default BeritaAcaraPeminjaman;
