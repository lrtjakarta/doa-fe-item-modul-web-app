import {
	Card,
	Stack,
	Typography,
	Box,
	useTheme,
	MenuItem,
	Select,
} from '@mui/material';
import AppSelect from 'Component/AppSelect';
import React, { useEffect, useState } from 'react';
import Chart from 'react-apexcharts';
import numeral from 'numeral';

// const chartData = [
// 	{
// 		title: 'Day',
// 		data: [
// 			{
// 				name: 'Penemuan',
// 				data: [8, 5, 8, 6, 7, 8, 9],
// 			},
// 			{
// 				name: 'Pengambilan',
// 				data: [5, 5, 5, 8, 5, 4, 4],
// 			},
// 			{
// 				name: 'Pengaduan',
// 				data: [6, 6, 6, 7, 7, 7, 7],
// 			},
// 		],
// 	},
// ];

function CardChart({ dataChart, value, onChange }) {
	const theme = useTheme();

	const [allData, setAllData] = useState([]);

	const chartCategories = allData?.map(item => item.date);
	// data chart daily, monthly
	const transformedData = [
		{
			title: value,
			data: [
				{
					name: 'Penemuan',
					data: allData.map(item => item.totalFound),
				},
				{
					name: 'Pengambilan',
					data: allData.map(item => item.totalClaimed),
				},
				{
					name: 'Pengaduan',
					data: allData.map(item => item.totalComplaints),
				},
			],
		},
	];
	const chartSeries = transformedData.find(item => item.title === value)?.data;

	const chartOptions = {
		chart: {
			background: 'transparent',
			toolbar: {
				show: false,
			},
		},
		colors: ['#ED1C24', '#1C8CED', '#FFA600'],
		dataLabels: {
			enabled: true,
		},
		grid: {
			show: false,
		},
		states: {
			active: {
				filter: {
					type: 'none',
				},
			},
			hover: {
				filter: {
					type: 'none',
				},
			},
		},
		theme: {
			mode: theme.palette.mode,
		},
		xaxis: {
			axisBorder: {
				show: true,
			},
			axisTicks: {
				show: true,
			},
			categories: chartCategories,
			labels: {
				style: {
					colors: theme.palette.text.secondary,
					fontFamily: theme.typography.fontFamily,
					fontWeight: 500,
				},
			},
		},
		yaxis: {
			axisBorder: {
				show: true,
			},
			show: true,
			min: 0,
			max: value === 'daily' ? 15 : 50,
			tickAmount: 5,
			labels: {
				style: {
					colors: theme.palette.text.secondary,
					fontFamily: theme.typography.fontFamily,
					fontWeight: 500,
				},
				formatter: value => numeral(value).format('0a'),
			},
		},
		tooltip: {
			x: {
				show: false,
			},
			y: {
				formatter: val => `${val}`,
			},
		},
		plotOptions: {
			bar: {
				borderRadius: 3,
				columnWidth: '50%',
				borderRadiusApplication: 'end',
			},
		},
		responsive: [
			{
				breakpoint: 550,
				options: {
					chart: {
						height: 350,
					},
					plotOptions: {
						bar: {
							horizontal: true,
						},
					},
					xaxis: {
						min: 0,
						max: 10,
						tickAmount: 4,
						labels: {
							show: true,
							style: {
								colors: theme.palette.text.secondary,
								fontFamily: theme.typography.fontFamily,
								fontWeight: 500,
							},
							formatter: value => numeral(value).format('0a'),
						},
					},
					yaxis: {
						show: true,
						labels: {
							style: {
								colors: theme.palette.text.secondary,
								fontFamily: theme.typography.fontFamily,
								fontWeight: 500,
							},
						},
					},
				},
			},
		],
	};

	useEffect(() => {
		if (dataChart) {
			setAllData(dataChart);
			// console.log('recentData', dataChart);
		}
	}, [dataChart]);

	return (
		<Card sx={{ padding: 3, borderRadius: '10px' }}>
			<Stack direction="row" justifyContent="space-between" alignItems="center">
				<Typography sx={{ fontSize: 24, fontWeight: 700 }}>
					Trend Lost & Found
				</Typography>
				<Select
					value={value}
					onChange={onChange}
					sx={{
						fontSize: 13,
						fontWeight: 500,
						color: 'text.secondary',
						'& fieldset': {
							border: '0 !important',
						},
						'& .MuiSvgIcon-root': {
							right: 0,
						},
						'& .MuiOutlinedInput-input.MuiInputBase-input': {
							paddingRight: 1,
							padding: '0 5px',
						},
					}}
				>
					<MenuItem value="monthly">Month</MenuItem>
					<MenuItem value="daily">Day</MenuItem>
				</Select>
			</Stack>

			<Box
				sx={{
					'& .apexcharts-tooltip *': {
						fontWeight: 500,
						fontFamily: theme.typography.fontFamily,
					},
					'& .apexcharts-tooltip': {
						boxShadow: 0,
						borderRadius: 4,
						alignItems: 'center',
						'& .apexcharts-tooltip-text-y-value': {
							color: 'primary.main',
						},
						'& .apexcharts-tooltip.apexcharts-theme-light': {
							border: `1px solid ${theme.palette.divider}`,
						},
						'& .apexcharts-tooltip-series-group:last-child': {
							paddingBottom: 0,
						},
					},
				}}
			>
				<Chart
					type="bar"
					height={300}
					options={chartOptions}
					series={chartSeries}
				/>
			</Box>
		</Card>
	);
}

export default CardChart;
