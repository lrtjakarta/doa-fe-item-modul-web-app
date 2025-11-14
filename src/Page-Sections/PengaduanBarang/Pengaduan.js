import React from 'react';

import { Box, Grid, Stack } from '@mui/material';

import Title16700 from 'Component/Typographys/Title16700';
import Title14600 from 'Component/Typographys/Title14600';
import Title14400 from 'Component/Typographys/Title14400';

function Pengaduan({ data }) {
	// console.log('data detail', data);
	return (
		<Grid container spacing={3} sx={{mb: 7}}>
			<Grid item xs={12} sm={12}>
				<Title16700 text="DATA PEMILIK" />
			</Grid>
			<Grid item xs={12} sm={3}>
				<Title14600 text="Nama" />
				<Title14400 text={data?.complaintBy} />
			</Grid>
			<Grid item xs={12} sm={3}>
				<Title14600 text="Nomor Identitas" />
				<Title14400 text={data?.complaintIdentity} />
			</Grid>
			<Grid item xs={12} sm={3}>
				<Title14600 text="Nomor Telepon" />
				<Title14400 text={data?.complaintPhone} />
			</Grid>
			<Grid item xs={12} sm={3}>
				<Title14600 text="Alamat Email" />
				<Title14400 text={data?.complaintEmail} />
			</Grid>
			<Grid item xs={12} sm={12}>
				<Title14600 text="Alamat Tempat Tinggal" />
				<Title14400 text={data?.complaintAddress} />
			</Grid>
			<Grid item xs={12} sm={12} sx={{ mt: '20px' }}>
				<Title16700 text="DATA PETUGAS" />
			</Grid>
			<Grid item xs={12} sm={4}>
				<Title14600 text="Nama Petugas" />
				<Title14400 text={data?.complaintOfficer?.officerName} />
			</Grid>
			<Grid item xs={12} sm={4}>
				<Title14600 text="Jabatan" />
				<Title14400 text={data?.complaintOfficer?.officerPosition} />
			</Grid>
			<Grid item xs={12} sm={4}>
				<Title14600 text="Departemen" />
				<Title14400 text={data?.complaintOfficer?.officerDepartemen} />
			</Grid>
		</Grid>
	);
}

export default Pengaduan;
