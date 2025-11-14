import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFnsV3';
import { BrowserRouter } from 'react-router-dom';
import Themes from './Themes/Mui';

import MultiProvider from 'Config/MultiProvider';

import LostFoundProvider from 'Context/LostFound';
import GoodsComplaintContext from 'Context/GoodsComplaint';
import GoodsRelocationProvider from 'Context/GoodsRelocation';
import GoodsRemoveProvider from 'Context/GoodsRemove';
import GenerateQrCodeProvider from 'Context/GenerateQrCode';
import UserProfilProvider from 'Context/UserProfile';
import GoodsLoanReturnProvider from 'Context/GoodsLoanReturn';
import DashboardProvider from 'Context/Dahsboard';

import IdentificationProvider from 'Context/Indetificatiion';
import LocationProvider from 'Context/Location';
import ItemsProvider from 'Context/Items';

import StasiunProvider from 'Context/Stasiun';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
	<BrowserRouter basename="app">
		<MultiProvider
			providers={[
				<LostFoundProvider />,
				<GoodsComplaintContext />,
				<GoodsRelocationProvider />,
				<GoodsRemoveProvider />,
				<GenerateQrCodeProvider />,
				<UserProfilProvider />,
				<GoodsLoanReturnProvider />,
				<DashboardProvider />,
				<IdentificationProvider />,
				<LocationProvider />,
				<ItemsProvider />,
				<StasiunProvider/>
			]}
		>
			<ThemeProvider theme={Themes.default}>
				<CssBaseline />
				<LocalizationProvider dateAdapter={AdapterDateFns}>
					<App />
				</LocalizationProvider>
			</ThemeProvider>
		</MultiProvider>
	</BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
