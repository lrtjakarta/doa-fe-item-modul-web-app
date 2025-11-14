import { Box, Grid, Stack } from '@mui/material';
import Title14400 from 'Component/Typographys/Title14400';
import Title14600 from 'Component/Typographys/Title14600';
import Title16700 from 'Component/Typographys/Title16700';
import moment from 'moment';
import StaticVar from 'Config/StaticVar';
import React from 'react';

import PhotoItem from 'Assets/bukti.png';

function DetailPenghapusan({ dataRow }) {
	// console.log('dataRow', dataRow);
	const _item = dataRow?.removeItems;
	const _dateItem = moment(_item?.foundDate).format('DD/MM/YYYY');
	const _timeItem = moment(_item?.foundTime).format('HH:mm');
	const _submissiondBy = dataRow?.submissiondBy;
	const _dateSub = moment(_submissiondBy?.submissionDate).format(
		'DD/MM/YYYY HH:mm'
	);
	const _approvalBy = dataRow?.approvalBy;
	const _dateApp = moment(_approvalBy?.approvalDate).format('DD/MM/YYYY HH:mm');
	const _providedBy = dataRow?.providedBy;
	const _datePro = moment(_providedBy?.providedDate).format('DD/MM/YYYY HH:mm');

	const _photoItem = _item?.foundPhoto;
	const _pathItem = _photoItem?.path;
	const _fileItem =
		_photoItem && _photoItem?.uploadedFiles.length > 0
			? _photoItem?.uploadedFiles
			: null;

	const _photoDoc = dataRow?.photoItem.length > 0 ? dataRow?.photoItem : null;
	const _pathDoc = _photoDoc.length > 0 ? _photoDoc[0]?.path : null;
	const _fileDoc = _photoDoc.length > 0 ? _photoDoc[0]?.uploadedFiles : null;
	// console.log('_fileItem', _fileItem);
	return (
		<Grid container spacing={1}>
			<Grid item xs={12} sm={12}>
				<Title16700 text="INFO BARANG" />
			</Grid>
			<Grid item xs={12} sm={3}>
				<Box
					sx={{
						width: '100%',
						// height: '150px',
						padding: '5px',
						borderRadius: '4px',
						border: '1px solid #ddd',
						display: 'flex',
						justifyContent: 'center',
					}}
				>
					{_fileItem !== null && (
						<img
							src={
								StaticVar.URL_API +
								'/uploads/' +
								_pathItem +
								'/' +
								_fileItem[0]?.uploadedName
							}
							style={{
								height: 'auto',
								width: '100%',
							}}
						/>
					)}
				</Box>
			</Grid>
			<Grid item xs={12} sm={9}>
				<Grid container spacing={1}>
					<Grid item xs={12} sm={4}>
						<Title14600 text="No. Laporan" />
						<Title14400 text={_item?.idNumber} />
					</Grid>
					<Grid item xs={12} sm={4}>
						<Title14600 text="Jenis Barang" />
						<Title14400 text={_item?.foundName} />
					</Grid>

					<Grid item xs={12} sm={4}>
						<Title14600 text="Lokasi Penemuan" />
						<Title14400 text={_item?.foundLocation} />
					</Grid>
					<Grid item xs={12} sm={4}>
						<Title14600 text="Yang Menemukan" />
						<Title14400 text={_item?.foundBy} />
					</Grid>
					<Grid item xs={12} sm={4}>
						<Title14600 text="Waktu Penemuan" />
						<Title14400 text={_dateItem + ' ' + _timeItem} />
					</Grid>
					<Grid item xs={12} sm={4}>
						<Title14600 text="Lokasi Penyimpanan" />
						<Title14400
							text={_item?.locationStorage ? _item?.locationStorage : '-'}
						/>
					</Grid>
				</Grid>
			</Grid>
			<Grid item xs={12} sm={12} sx={{ mt: 2 }}>
				<Title16700 text="DIAJUKAN OLEH" />
			</Grid>
			<Grid item xs={12} sm={4}>
				<Title14600 text="Tanggal" />
				<Title14400 text={_dateSub} />
			</Grid>
			<Grid item xs={12} sm={4}>
				<Title14600 text="Nama" />
				<Title14400 text={_submissiondBy?.officerName} />
			</Grid>
			<Grid item xs={12} sm={4}>
				<Title14600 text="Jabatan" />
				<Title14400 text={_submissiondBy?.officerPosition} />
			</Grid>
			<Grid item xs={12} sm={4}>
				<Title14600 text="Informasi" />
				<Title14400 text={_item?.infoSubmission} />
				<Title14400 text={_item?.noteSubmission} color="gray" />
			</Grid>

			<Grid item xs={12} sm={12} sx={{ mt: 2 }}>
				<Title16700 text="DISETUJUI / DITOLAK OLEH" />
			</Grid>
			<Grid item xs={12} sm={4}>
				<Title14600 text="Tanggal" />
				<Title14400 text={_dateApp} />
			</Grid>
			<Grid item xs={12} sm={4}>
				<Title14600 text="Nama" />
				<Title14400 text={_approvalBy?.officerName} />
			</Grid>
			<Grid item xs={12} sm={4}>
				<Title14600 text="Jabatan" />
				<Title14400 text={_approvalBy?.officerPosition} />
			</Grid>
			<Grid item xs={12} sm={4}>
				<Title14600 text="Informasi" />
				<Title14400 text={_item?.infoApproval} />
			</Grid>

			<Grid item xs={12} sm={12} sx={{ mt: 2 }}>
				<Title16700 text="DITERIMA OLEH" />
			</Grid>
			<Grid item xs={12} sm={4}>
				<Title14600 text="Tanggal" />
				<Title14400 text={_datePro} />
			</Grid>
			<Grid item xs={12} sm={4}>
				<Title14600 text="Nama" />
				<Title14400 text={_providedBy?.officerName} />
			</Grid>
			<Grid item xs={12} sm={4}>
				<Title14600 text="Jabatan" />
				<Title14400 text={_providedBy?.officerPosition} />
			</Grid>
			<Grid item xs={12} sm={4}>
				<Title14600 text="Informasi" />
				<Title14400 text={_item?.removeItems?.infoRemove} />
			</Grid>

			<Grid item xs={12} sm={12} sx={{ mt: 2 }}>
				<Title16700 text="DOKUMENTASI" />
			</Grid>
			{_photoDoc !== null && (
				<>
					{_fileDoc.map(item => {
						return (
							<Grid item xs={12} sm={3}>
								<Box
									sx={{
										width: '100%',
										height: 'auto',
									}}
								>
									<img
										src={
											StaticVar.URL_API +
											'/uploads/' +
											_pathDoc +
											'/' +
											item?.uploadedName
										}
										style={{
											height: '100%',
											width: '100%',
										}}
									/>
								</Box>
							</Grid>
						);
					})}
				</>
			)}
		</Grid>
	);
}

export default DetailPenghapusan;
