import { Card, Typography, useTheme, Box, Stack } from '@mui/material';
import React, { useEffect, useState } from 'react';
import Chart from 'react-apexcharts';

function CardIdentification({ dataChart }) {
	const theme = useTheme();
	const chartOptions = {
		colors: ['#FFA600', '#5388D8', '#0D2535'],
		chart: {
			stacked: false,
			background: 'transparent',
			sparkline: {
				enabled: true,
			},
			fontFamily: theme.typography.fontFamily,
		},
		plotOptions: {
			pie: {
				donut: {
					size: '60%',
				},
			},
		},
		states: {
			normal: {
				filter: {
					type: 'none',
				},
			},
			hover: {
				filter: {
					type: 'none',
				},
			},
			active: {
				filter: {
					type: 'none',
				},
			},
		},
		labels: [
			'Makanan / Barang segar',
			'Barang tidak mudah rusak',
			'Barang berharga',
		],
		theme: {
			mode: theme.palette.mode,
		},
		legend: {
			show: true,
			position: 'right',
			fontSize: '13px',
			fontWeight: 500,
			itemMargin: {
				horizontal: 10,
			},
			onItemClick: {
				toggleDataSeries: false,
			},
			onItemHover: {
				highlightDataSeries: false,
			},
			offsetY: 0,
		},
		tooltip: {
			style: {
				fontSize: '13px',
			},
		},
		stroke: {
			width: 0,
		},
	};

	const [dataSeries, setDataSeries] = useState([]);

	useEffect(() => {
		if (dataChart !== null) {
			const _dataChart = dataChart ? dataChart?._dataByIdentification[0] : 0;
			const _dataseries = [
				_dataChart?.makanan,
				_dataChart?.tidakRusak,
				_dataChart?.berharga,
			];
			setDataSeries(_dataseries);
		}
	}, []);
	return (
		<Card
			sx={{
				padding: 2,
				borderRadius: '10px',
				height: '95%',
			}}
		>
			<Stack
				direction="column"
				justifyContent="space-around"
				spacing={2}
				sx={{ height: '100%' }}
			>
				<Typography sx={{ fontSize: 24, fontWeight: 700 }}>
					Identifikasi Barang
				</Typography>
				<Chart
					height={200}
					type="donut"
					series={dataSeries.length > 0 ? dataSeries : [0, 0, 0]}
					options={chartOptions}
				/>
			</Stack>
		</Card>
	);
}

export default CardIdentification;
