import React, { useEffect, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Grid, Hidden } from '@mui/material';

import CustomNewTable from 'Component/CustomTable/CustomNewTable';
import Title14400 from 'Component/Typographys/Title14400';

import ColumnShape from 'Page-Sections/PenghapusBukuan/column-shape-history';

import { GoodsRemoveContext } from 'Context/GoodsRemove';
import postNavigate from 'Utils/Custom Navigate';
import CardMobile from 'Component/Cards/CardMobile';
import moment from 'moment';
import Title16700 from 'Component/Typographys/Title16700';

function ListHistoryPenghapusbukuan() {
	const navigate = useNavigate();
	const { dataGoodsRemove, getDataGoodsRemove } =
		useContext(GoodsRemoveContext);

	const handleView = row => {
		const url = '/manajemenBarang/penghapusbukuan/detail';
		navigate(url, {
			state: { dataRemove: row },
		});

		// postNavigate(url)
	};

	const [allData, setAllData] = useState([])

	useEffect(() => {
		const filter = {
			status: ['Diajukan'],
		};
		getDataGoodsRemove(filter);
	}, []);

	useEffect(() => {
		const dataByDate = dataGoodsRemove.reduce((acc, item) => {
            const date = item.submissiondBy.submissionDate;
            const submissiondBy = item.submissiondBy;
            const approvalBy = item.approvalBy;
            const providedBy = item.providedBy;
            const removeStatus = item.removeStatus;

            if (!acc[date]) {
                acc[date] = {
                    submissiondBy,
                    approvalBy,
                    providedBy,
                    removeStatus,
                    items: [] // Menyimpan item-item pada tanggal tersebut
                };
            }

            acc[date].items.push(item); // Menambahkan item ke dalam array items

            return acc;
        }, {});

        // Ubah objek menjadi array
        const formattedData = Object.entries(dataByDate).map(([date, details]) => ({
            date,
            submissiondBy: details.submissiondBy,
            approvalBy: details.approvalBy ? details.approvalBy : '-',
            providedBy: details.providedBy ? details.providedBy : '-',
            removeStatus: details.removeStatus,
            items: details.items
        }));

		setAllData(formattedData)
		// console.log('dat by date', formattedData)
	}, [dataGoodsRemove])

	return (
		<Box>
			<Grid container>
				{/* Versi Destop */}
				<Hidden only={['xs']}>
					<Grid item xs={12} sm={12} sx={{mb: 7}}>
						{dataGoodsRemove.length > 0 ? (
							<CustomNewTable
								data={allData}
								columnShape={ColumnShape({
									onView: handleView,
								})}
							/>
						) : (
							<Box sx={{ display: 'flex', justifyContent: 'center' }}>
								<Title16700 text="Data List Barang Kosong." />
							</Box>
						)}
					</Grid>
				</Hidden>

				{/* Versi Mobile */}
				<Hidden only={['sm', 'md', 'lg', 'xl']}>
					{dataGoodsRemove.length > 0 ? (
						dataGoodsRemove
							.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
							.map(item => {
								const _submissiondBy = item?.submissiondBy;
								const _approvalBy = item?.approvalBy;
								const _providedBy = item?.providedBy;
								return (
									<Grid item xs={12} sm={12} sx={{ mt: 1 }}>
										<CardMobile
											onClick={() => handleView(item)}
											status={item?.removeStatus}
											//   date= {_date + " " + _time}
											info1="Jumlah Barang"
											value1={item?.removeItems.length}
											info2="Diajukan Oleh"
											value2={_submissiondBy?.officerName}
											info3="Disetujui/Ditolak"
											value31={_approvalBy?.officerName}
											// value32={_date + ' ' + _time}
											info4="Diterima Oleh"
											value4={_providedBy?.officerName}
										/>
									</Grid>
								);
							})
					) : (
						<Grid item xs={12} sm={12} sx={{ mt: 3 }}>
							<Box sx={{ display: 'flex', justifyContent: 'center' }}>
								<Title16700 text="Data List Approval Kosong." />
							</Box>
						</Grid>
					)}
				</Hidden>
			</Grid>
		</Box>
	);
}

export default ListHistoryPenghapusbukuan;
