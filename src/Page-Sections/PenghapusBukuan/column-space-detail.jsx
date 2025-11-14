import { Box, IconButton, Typography } from '@mui/material';
import FlexBox from '../../Component/flexbox/FlexBox';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import DeleteIcon from '@mui/icons-material/Delete';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import AppAvatar from 'Component/avatars/AppAvatar';
import AppTextField from 'Component/input-fields/AppTextField';
import React, { useCallback, useState } from 'react';

const ColumnShapeDetail = () => {
	return [
		{
			Header: 'Nama Barang',
			accessor: 'foundName',
			Cell: ({ value, row: { original } }) => (
				<Box>
					<Typography noWrap={false} sx={{ fontSize: 13, fontWeight: 400 }}>
						{value}
					</Typography>
					<Typography sx={{ fontSize: 13, fontWeight: 400, color: '#BABBBC' }}>
						{original?.idNumber}
					</Typography>
				</Box>
			),
		},
		{
			Header: 'Jenis Barang',
			accessor: 'foundType',
			Cell: ({ value }) => (
				<Box>
					<Typography noWrap={false} sx={{ fontSize: 13, fontWeight: 400 }}>
						{value}
					</Typography>
				</Box>
			),
		},
		{
			Header: 'Lokasi Terakhir',
			accessor: 'locationStorage',
			Cell: ({ value }) => (
				<Box>
					<Typography noWrap={false} sx={{ fontSize: 13, fontWeight: 400 }}>
						{value}
					</Typography>
				</Box>
			),
		},
		{
			Header: 'Keterangan',
			accessor: 'infoSubmission',
			Cell: ({ value, row: { original } }) => (
				<Box>
					<Typography noWrap={false} sx={{ fontSize: 13, fontWeight: 400 }}>
						{value}
					</Typography>
					<Typography sx={{ fontSize: 13, fontWeight: 400, color: '#BABBBC' }}>
						{original?.noteSubmission}
					</Typography>
				</Box>
			),
		},
		{
			Header: 'Catatan',
			accessor: '',
			Cell: ({ row }) => {
				return <Box></Box>;
			},
		},
	];
};
export default ColumnShapeDetail;
