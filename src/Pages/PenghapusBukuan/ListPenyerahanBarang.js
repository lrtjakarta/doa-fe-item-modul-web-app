import React, { useContext, useEffect, useState } from 'react';

import { Box, Grid, Hidden } from '@mui/material';
import { useNavigate } from 'react-router-dom';

import CustomNewTable from 'Component/CustomTable/CustomNewTable';
import Title14400 from 'Component/Typographys/Title14400';

import ColumnShape from 'Page-Sections/PenghapusBukuan/column-shape-penyerahan';

import { GoodsRemoveContext } from 'Context/GoodsRemove';
import Title16700 from 'Component/Typographys/Title16700';
import CardMobile from 'Page-Sections/PenghapusBukuan/PenyerahanBarang/CardMobile';

function ListPenyerahanBarang() {
	const navigate = useNavigate();

	// context
	const { dataGoodsRemove, getDataGoodsRemove } =
		useContext(GoodsRemoveContext);

	// state
	const [allData, setAllData] = useState([]);

	// handle
	const handleView = row => {
		// console.log('row data', row);
		// return;
		const url = '/manajemenBarang/penghapusbukuan/penyerahan';
		navigate(url, {
			state: { dataRemove: row },
		});
	};

	useEffect(() => {
		const filter = {
			status: ['Disetujui', 'Ditolak', 'Dihapuskan'],
		};
		getDataGoodsRemove(filter);
	}, []);

	useEffect(() => {
		setAllData(dataGoodsRemove);
	}, [dataGoodsRemove]);

	// console.log('dataGoodsRemove', dataGoodsRemove)

	return (
		<Box>
			<Grid container>
				{/* Versi Destop */}
				<Hidden only={['xs']}>
					<Grid item xs={12} sm={12} sx={{ mb: 7 }}>
						{allData.length > 0 ? (
							<CustomNewTable
								data={allData}
								columnShape={ColumnShape({
									onView: handleView,
								})}
							/>
						) : (
							<Box sx={{ display: 'flex', justifyContent: 'center' }}>
								<Title14400 text="Data List Barang Kosong!!!" />
							</Box>
						)}
					</Grid>
				</Hidden>

				{/* Versi Mobile */}
				<Hidden only={['sm', 'md', 'lg', 'xl']}>
					{allData.length > 0 ? (
						allData.map(item => {
							return (
								<Grid item xs={12} sm={12} sx={{ mt: 2 }}>
									<CardMobile dataId={item} onView={() => handleView(item)} />
								</Grid>
							);
						})
					) : (
						<Grid item xs={12} sm={12} sx={{ mt: 3 }}>
							<Box sx={{ display: 'flex', justifyContent: 'center' }}>
								<Title16700 text="Data List Penyerahan Kosong." />
							</Box>
						</Grid>
					)}
				</Hidden>
			</Grid>
		</Box>
	);
}

export default ListPenyerahanBarang;
