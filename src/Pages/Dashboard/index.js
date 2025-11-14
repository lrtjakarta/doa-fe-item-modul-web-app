import React, { useContext, useEffect, useState } from 'react';
import './style.css';
import { Grid, Typography, Box, Stack, Button } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import moment from 'moment';

import AppTextField from 'Component/input-fields/AppTextField';

import CardCount from 'Page-Sections/Dahsboard/CardCount';
import CardChart from 'Page-Sections/Dahsboard/CardChart';
import CardIdentification from 'Page-Sections/Dahsboard/CardIdentification';
import CardStatus from 'Page-Sections/Dahsboard/CardStatus';
import TableListPenemuan from 'Page-Sections/Dahsboard/TablePenemuanBarang/TableListPenemuan';
import TableListPengaduan from 'Page-Sections/Dahsboard/TablePengaduanBarang/TableListPengaduan';

import { DashboardContext } from 'Context/Dahsboard';
import { LostFoundContext } from 'Context/LostFound';
import { GoodsComplaintContext } from 'Context/GoodsComplaint';
import API from 'Services/Api';

function DashboardPages() {
	// context
	const {
		dataDashboard,
		countLostFound,
		countComplaint,
		countCombinasi,
		getDataDashboard,
		getLostFoundCount,
		getComplaintCount,
		getCombinasiCount,
	} = useContext(DashboardContext);
	const { dataLostFound, getDataLostFound } = useContext(LostFoundContext);
	const { dataGoodsComplaint, getDataGoodsComplaint } = useContext(
		GoodsComplaintContext
	);

	// state
	const [formDate, setFormDate] = useState();
	const [formYear, setFormYear] = useState();
	const [formPeriod, setFormPeriod] = useState('daily');
	const [dataCountLF, setDataCountLF] = useState([]);
	const [dataCountC, setDataCountC] = useState([]);
	const [dataCountCombinasi, setDataCountCombinasi] = useState([]);

	// handle
	const handleSearch = async () => {
		const filter = {
			period: 'daily',
			year: moment(formYear).format('YYYY'),
			specificDate: moment(formDate).format('YYYY-MM-DD'),
		};

		const respon = await API.getCountLostFound({ params: filter });
		const responComplaint = await API.getCountComplaint({ params: filter });

		if (respon.statusText === 'OK' && responComplaint.statusText === 'OK') {
			// console.log('respon.data', respon.data);
			setDataCountLF(respon.data);
			setDataCountC(responComplaint.data);
		}
	};

	const handleChangeChart = async e => {
		setFormPeriod(e.target.value);
		const _filterCombined = {
			period: e.target.value,
			year: formYear,
		};
		const respon = await API.getCountCombinasi({ params: _filterCombined });
		if (respon.statusText === 'OK') {
			// console.log('respon.data', respon.data);
			setDataCountCombinasi(respon.data);
		}
	};

	useEffect(() => {
		const _date = moment(new Date()).format('YYYY-MM-DD');
		const _year = moment(new Date()).format('YYYY');
		const _filter = {
			period: 'daily',
			year: _year,
			specificDate: _date,
		};
		const _filterCombined = {
			period: formPeriod,
			year: _year,
		};
		getDataLostFound({
			foundStatus: ['Unidentified', 'Identified', 'Penyimpanan', 'Claimed'],
		});
		getDataGoodsComplaint();
		getLostFoundCount(_filter);
		getComplaintCount(_filter);
		getCombinasiCount(_filterCombined);
		setFormDate(_date);
		setFormYear(_year);
	}, []);

	useEffect(() => {
		setDataCountLF(countLostFound);
		setDataCountC(countComplaint);
		setDataCountCombinasi(countCombinasi);
	}, [countLostFound, countComplaint, countCombinasi]);

	return (
		<Box
			sx={{ padding: { xs: '15px', sm: '30px' }, background: '#fff', mb: 7 }}
		>
			<Typography sx={{ fontSize: 32, fontWeight: 700, color: '#011E3D' }}>
				Dashboard Lost & Found
			</Typography>
			<Typography>ENV : {process.env.REACT_APP_ENVIRONMENT}</Typography>
			<Box sx={{ height: '100%' }}>
				<Grid container spacing={2} sx={{ marginTop: 2 }}>
					<Grid item xs={12} sm={3}>
						<DatePicker
							label="Tanggal"
							value={formDate}
							onChange={date => {
								setFormDate(date);
								setFormYear(moment(date).format('YYYY'));
							}}
							slots={{
								textField: AppTextField,
							}}
							slotProps={{
								textField: {
									// fullWidth: true,
									size: 'small',
								},
							}}
							sx={{ mt: '0px' }}
							format="dd/MM/yyyy"
						/>
					</Grid>
					<Grid item xs={12} sm={1}>
						<Button variant="contained" fullWidth onClick={handleSearch}>
							Cari
						</Button>
					</Grid>
					<Grid item xs={12}>
						<CardCount dataCountLF={dataCountLF} dataCountC={dataCountC} />
					</Grid>
					<Grid item xs={12}>
						<CardChart
							dataChart={dataCountCombinasi}
							value={formPeriod}
							onChange={handleChangeChart}
						/>
					</Grid>
					{/* <Grid item xs={12} sm={6}>
						<CardIdentification dataChart={dataDashboard} />
					</Grid> */}
					{/* <Grid item xs={12} sm={6}>
						<CardStatus dataChart={dataDashboard} />
					</Grid> */}
					<Grid item xs={12} sm={6}>
						<TableListPenemuan dataTable={dataLostFound} />
					</Grid>

					<Grid item xs={12} sm={6}>
						<TableListPengaduan dataTable={dataGoodsComplaint} />
					</Grid>
				</Grid>
			</Box>
		</Box>
	);
}

export default DashboardPages;
