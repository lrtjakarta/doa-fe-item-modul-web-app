import { Box, Button, Grid, Hidden } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { KeyboardArrowDown } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import CustomNewHeader from 'Component/Headers/CustomNewHeader';
import AppTextField from 'Component/input-fields/AppTextField';
import SearchInput from 'Component/input-fields/SearchInput';
import ButtonFilter from 'Component/Buttons/ButtonFilter';
import ButtonContainer from 'Component/Buttons/ButtonContainer';
import React, { useContext, useEffect, useState, useRef } from 'react';
import ButtonStartIcon from 'Component/Buttons/ButtonStartIcon';
import CustomTable from 'Page-Sections/PeminjamanPengembalian/CustomTable';
import ListDataView from 'Page-Sections/PeminjamanPengembalian/Data/ListDataView';
import ColumnShape from 'Page-Sections/PeminjamanPengembalian/column-shape';
import HeaderPrint from 'Component/CustomPrints/HeaderPrint';
import BodyPrint from 'Page-Sections/PeminjamanPengembalian/PrintOutPeminjaman/BodyPrint';

import API from 'Services/Api';
import { GoodsLoanReturnContext } from 'Context/GoodsLoanReturn';
import CardList from 'Page-Sections/PeminjamanPengembalian/Cards/CardList';
import moment from 'moment';

function DaftarPeminjaman() {
	const navigate = useNavigate();
	const printRef = useRef();

	// context
	const { dataGoodsLoanReturn, getDataGoodsLoanReturn } = useContext(
		GoodsLoanReturnContext
	);

	// state
	const [allData, setAllData] = useState([]);

	const [searchDate, setSearchDate] = useState();
	const [searchStatus, setSearchStatus] = useState('');
	const [search, setSearch] = useState('');

	const [status, setStatus] = useState(false);
	const [dataPrint, setDataPrint] = useState(null);

	// handle
	const handleAdd = () => {
		navigate('addPeminjaman');
	};
	const handleView = row => {
		console.log('detail row', row);
		// return;
		navigate('Detail', {
			state: { id: row._id, dataLoan: row },
		});
	};
	const handleSearch = async () => {
		const filterData = {
			loanDate: searchDate,
			loanSearch: search,
		};
		const respon = await API.getGoodsLoanReturn({ params: filterData });
		if (respon.statusText === 'OK') {
			setAllData(respon.data);
		}
	};

	const handlePrint = row => {
		setStatus(true);
		setDataPrint(row);
		// console.log('data print', row)
		// return
		setTimeout(() => {
			const printContents = printRef.current.innerHTML;
			const originalContents = document.body.innerHTML;

			document.body.innerHTML = printContents;
			window.print();
			document.body.innerHTML = originalContents;
			window.location.reload();
		}, 0);
	};

	// useEffect
	useEffect(() => {
		getDataGoodsLoanReturn();
	}, []);

	useEffect(() => {
		setAllData(dataGoodsLoanReturn);
	}, [dataGoodsLoanReturn]);

	return (
		<Box
			sx={{
				padding: { xs: '15px', sm: '30px' },
				background: '#FFF',
				minHeight: '100vh',
			}}
		>
			<Grid container spacing={3} sx={{ mb: 7 }}>
				<Grid item xs={12} sm={12}>
					<CustomNewHeader
						judul="DAFTAR PEMINJAMAN  BARANG"
						title1="Home - Piminjaman & Pengembalian Barang - "
						title2="Daftar Peminjaman Barang"
					/>
				</Grid>
				<Grid item xs={12} sm={12}>
					<Grid container spacing={2}>
						<Grid item xs={12} sm={6} md={2}>
							<DatePicker
								label="Tgl Peminjaman"
								value={searchDate}
								onChange={date => setSearchDate(date)}
								slots={{
									textField: AppTextField,
								}}
								slotProps={{
									textField: {
										fullWidth: true,
										size: 'small',
									},
								}}
								sx={{ mt: '0px' }}
								format="dd/MM/yyyy"
							/>
						</Grid>
						<Grid item xs={12} sm={6} md={3}>
							<SearchInput
								placeholder="Search..."
								value={search}
								onChange={e => setSearch(e.target.value)}
							/>
						</Grid>
						<Grid item xs={12} sm={12} md={2}>
							<ButtonContainer title="Cari" onClick={handleSearch} />
						</Grid>
						<Grid
							item
							xs={12}
							sm={12}
							md={5}
							sx={{ display: 'flex', justifyContent: 'flex-end' }}
						>
							<Box sx={{ width: { xs: '100%', sm: '100%', md: '30%' } }}>
								<ButtonStartIcon title="Tambah" onClick={handleAdd} />
							</Box>
						</Grid>
					</Grid>
				</Grid>

				{/* Versi Destop */}
				<Hidden only={['xs']}>
					<Grid item xs={12} sm={12}>
						{dataGoodsLoanReturn.length > 0 ? (
							<CustomTable
								data={
									allData !== null
										? allData
										: dataGoodsLoanReturn.sort(
												(a, b) => new Date(b.createdAt) - new Date(a.createdAt)
										  )
								}
								columnShape={ColumnShape({
									onView: handleView,
									onPrint: handlePrint,
								})}
							/>
						) : null}
					</Grid>
				</Hidden>

				{/* Versi Mobile */}
				<Hidden only={['sm', 'md', 'lg', 'xl']}>
					{allData.length > 0
						? allData
								.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
								.map(item => {
									const diserahkan = item?.loanGiverBy?.officerName;
									const diajukan = item.loanAppliBy?.officerName;
									const tglPengembalian = item?.returnDate;
									return (
										<Grid item xs={12} sm={12}>
											<CardList
												value1={diserahkan ? diserahkan : '-'}
												value2={diajukan ? diajukan : '-'}
												value3={item?.loanItem.length}
												value4={moment(item?.loanDate).format('DD/MM/YYYY')}
												value5={
													tglPengembalian
														? moment(tglPengembalian).format('DD/MM/YYYY')
														: '-'
												}
												onClick={() => handleView(item)}
											/>
										</Grid>
									);
								})
						: null}
				</Hidden>
			</Grid>

			{/* Print */}
			{status === true && (
				<div ref={printRef}>
					<HeaderPrint
						title="PEMINJAMAN DAN PENGEMBALIAN PERALATAN"
						number="LRTJ-FR-PEL-029"
						revisi="00"
						page="Page 3 of 3"
					/>
					<BodyPrint dataId={dataPrint} />
					{/* <TtdPrint dataId={dataPrint} /> */}
				</div>
			)}
		</Box>
	);
}

export default DaftarPeminjaman;
