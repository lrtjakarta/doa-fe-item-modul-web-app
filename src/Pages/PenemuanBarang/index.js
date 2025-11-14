import React, {
	useContext,
	useEffect,
	useState,
	useRef,
	useCallback,
} from 'react';
import './style.css';
import {
	Grid,
	Typography,
	Button,
	Stack,
	Box,
	styled,
	IconButton,
	Hidden,
	Card,
	CardActionArea,
	CardContent,
	TableRow,
	TableCell,
	Tooltip,
} from '@mui/material';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { KeyboardArrowDown } from '@mui/icons-material';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import EditIcon from '@mui/icons-material/Edit';
import FindInPageOutlinedIcon from '@mui/icons-material/FindInPageOutlined';
import QrCodeScannerIcon from '@mui/icons-material/QrCodeScanner';
import moment from 'moment';
import * as XLSX from 'xlsx';

import AppTextField from '../../Component/input-fields/AppTextField';
import SearchInput from '../../Component/input-fields/SearchInput';
import FlexBox from '../../Component/flexbox/FlexBox';
import AppModalSmall from 'Component/AppModalSmall';
// import CustomNewTable from 'Component/CustomTable/CustomNewTable';
import AppModalMedium from 'Component/AppModalMedium';
import CustomNewHeader from 'Component/Headers/CustomNewHeader';
import ButtonError from 'Component/Buttons/ButtonError';
import Title14400 from 'Component/Typographys/Title14400';
import ButtonFilter from 'Component/Buttons/ButtonFilter';
import ButtonContainer from 'Component/Buttons/ButtonContainer';
import BoxStatus from 'Component/CuxtomBox/BoxStatus';
import AppAvatar from 'Component/avatars/AppAvatar';

// import ItemsList from 'Page-Sections/PenemuanBarang';
// import LIST_ITEMS from 'Page-Sections/PenemuanBarang/list_products';
import columnShape from 'Page-Sections/PenemuanBarang/column-shape';
import AddIdentification from 'Page-Sections/PenemuanBarang/AddIdentification';
import AdvancedFilter from 'Page-Sections/PenemuanBarang/AdvancedFilter';
import CustomNewTable from 'Page-Sections/PenemuanBarang/Customtable/CustomNewTable';
import CustomTable from 'Page-Sections/PenemuanBarang/Customtable/CustomTable';

import ScanQRCode from './ScanQRCode';

import Add from 'Icons/Add';

import usePagination from 'Hooks/Pagination/usePagination';

import API from 'Services/Api';
import StaticVar from 'Config/StaticVar';
import { LostFoundContext } from 'Context/LostFound';
import { IdentificationContext } from 'Context/Indetificatiion';
import { LocationContext } from 'Context/Location';
import { ItemsContext } from 'Context/Items';
import PrintLabel from 'Page-Sections/PenemuanBarang/PrintOutPenemuan/PrintLabel';

export const HeadingWrapper = styled(FlexBox)(({ theme }) => ({
	marginBottom: 20,
	flexWrap: 'wrap',
	[theme.breakpoints.down(530)]: {
		'& .MuiButton-root': {
			width: '100%',
			marginBottom: 15,
		},
		'& .MuiInputBase-root': {
			maxWidth: '100%',
			marginBottom: 15,
		},
	},
}));

function PenemuanPages() {
	const navigate = useNavigate();
	const printRef = useRef();
	const [searchParams, setSearchParams] = useSearchParams();

	const {
		dataLostFound,
		getDataLostFound,
		allLostFound,
		count,
		setTotalCount,
		getAllLostFound,
	} = useContext(LostFoundContext);
	const { dataIdentification, getDataIdentification } = useContext(
		IdentificationContext
	);
	const { dataLocation, getDataLocation } = useContext(LocationContext);
	const { dataItems, getDataItems } = useContext(ItemsContext);

	// pagination hooks
	const {
		emptyRows,
		page,
		rowsPerPage,
		handleChangePage,
		handleChangeRowsPerPage,
	} = usePagination({ data: allLostFound, useServerSide: true });

	// header
	const headerTable = [
		'No',
		'Foto',
		'Nomor Laporan',
		'Jenis Barang',
		'Penemuan',
		'Penyimpanan',
		'Identifikasi',
		'Status',
	];

	// state
	const [allData, setAllData] = useState([]);
	const [dataById, setDataById] = useState(null);

	const [openAdd, setOpenAdd] = useState(false);
	const [openFilter, setOpenFilter] = useState(false);
	const [openScan, setOpenScan] = useState(false);
	const [idLostFound, setIdLostFound] = useState('');
	const [identificationById, setIdentificationById] = useState(null);

	const [searchDate, setSearchDate] = useState();
	const [searchLocation, setSearchLocation] = useState('');
	const [searchItem, setSearchItem] = useState('');
	const [search, setSearch] = useState('');

	const [status, setStatus] = useState(false);
	const [dataPrint, setDataPrint] = useState(null);

	const [filterData, setFilterData] = useState({
		foundFirstDate: null,
		foundLastDate: null,
		foundLocation: '',
		storageFirstDate: null,
		storageLastDate: null,
		storageLocation: '',
		foundName: '',
		foundStatus: '',
		officialName: '',
		foundIdentification: '',
	});

	const getStatusStyles = status => {
		switch (status) {
			case 'Unidentified':
				return { backgroundColor: '#FFF5F8', color: '#F1416C' };
			case 'Identified':
				return { backgroundColor: '#FFF8DD', color: '#F6C000' };
			case 'Penyimpanan':
				return { backgroundColor: '#EEF6FF', color: '#3E97FF' };
			case 'Claimed':
				return { backgroundColor: '#E8FFF3', color: '#50CD89' };
			default:
				return null; // Mengembalikan null jika status tidak ditemukan
		}
	};

	// Modal Identification
	const handleAdd = data => {
		// console.log('data table', data);
		setIdLostFound(data._id);
		setOpenAdd(true);
	};
	const handleCloseModal = () => setOpenAdd(false);

	const handleSaveIdentification = async data => {
		let postData;
		if (
			dataById?.foundStatus === 'Penyimpanan' ||
			dataById?.foundStatus === 'Claimed'
		) {
			postData = {
				identification: data,
				foundStatus: dataById?.foundStatus,
			};
		} else {
			postData = {
				identification: data,
				foundStatus: 'Identified',
			};
		}
		console.log('data update', postData);
		// return;
		await API.putLostFound(idLostFound, postData)
			.then(result => {
				if (result.statusText === 'OK') {
					const params = {
						foundStatus: [
							'Unidentified',
							'Identified',
							'Penyimpanan',
							'Claimed',
						],
						pageIndex: page,
						pageSize: rowsPerPage,
					};
					getAllLostFound({
						...params,
					});
					// getDataLostFound({
					// 	foundStatus: [
					// 		'Unidentified',
					// 		'Identified',
					// 		'Penyimpanan',
					// 		'Claimed',
					// 	],
					// });
					setOpenAdd(false);
				} else {
					console.log('data tidak terupdate');
				}
			})
			.catch(err => console.log('update error', err));
	};
	const handleEdit = data => {
		// console.log('data identifikasi', data.identification);
		setIdentificationById(data.identification);
		setIdLostFound(data._id);
		setDataById(data);
		setOpenAdd(true);
	};

	// Modal Filter
	const handleFilter = () => {
		setOpenFilter(true);
	};
	const handleCloseModalFilter = () => setOpenFilter(false);

	const handleOnFilter = async filter => {
		// console.log('data filter', filter)

		const filterData = {
			foundStatus: filter.foundStatus,
			foundLocation: filter.foundLocation,
			foundType: filter.foundName,
			identification: filter.foundIdentification,
			startDate: filter.foundFirstDate,
			endDate: filter.foundLastDate,
			storageFirstDate: filter.storageFirstDate,
			storageLastDate: filter.storageLastDate,
			pageIndex: page,
			pageSize: rowsPerPage,
		};

		const respon = await API.getLostFoundAll({ params: filterData });
		if (respon.statusText === 'OK') {
			const { data, totalItems, totalCount } = respon.data;

			setAllData(data);
			setTotalCount(totalItems);
			handleCloseModalFilter();
		}
	};

	// Add Penemuan Barang Baru
	const handleClickAdd = () => {
		navigate('/manajemenBarang/penemuan/add', {
			state: { id: 0, status: 'Add' },
		});
	};

	// Detail Penemuan Barang
	const handleView = data => {
		// console.log(data._id);
		// return
		navigate('/manajemenBarang/penemuan/detail', {
			state: { id: data._id, status: 'Detail' },
		});
	};

	const handleClickScan = () => {
		navigate('/manajemenBarang/penemuan/qrCode');
	};

	// Search
	const handleSearch = async () => {
		const filterData = {
			foundStatus: ['Unidentified', 'Identified', 'Penyimpanan'],
			foundLocation: searchLocation,
			foundType: searchItem,
			foundSearch: search,
			pageIndex: page,
			pageSize: rowsPerPage,
		};

		const respon = await API.getLostFoundAll({ params: filterData });
		if (respon.statusText === 'OK') {
			const { data, totalItems, totalCount } = respon.data;

			setAllData(data);
			setTotalCount(totalItems);
		}
		// console.log('action cari', respon.data)
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

	const handleClickDownload = async () => {
		const respon = await API.getLostFound();
		const data = respon.data.map((item, index) => ({
			no: index + 1,
			foundDate: moment(item.foundDate).format('DD/MM/YYYY'),
			idNumber: item?.idNumber,
			foundName: item?.foundName,
			foundType: item?.foundType,
			foundBy: item?.foundBy,
			foundLocation: item?.foundLocation,
			photo:
				item?.foundPhoto?.path && item?.foundPhoto?.uploadedFiles?.length > 0
					? `${StaticVar.URL_API}/uploads/${item.foundPhoto.path}/${item.foundPhoto.uploadedFiles[0].uploadedName}`
					: '-',
		}));

		// Tentukan kolom yang ingin diekspor
		const fields = [
			'no',
			'foundDate',
			'idNumber',
			'foundName',
			'foundType',
			'foundBy',
			'foundLocation',
			'photo',
		]; // Field yang akan diambil
		const headers = [
			'Nomor',
			'Tanggal Penemuan',
			'Nomor Laporan',
			'Nama Barang',
			'Jenis Barang',
			'Nama Penemuan',
			'Lokasi Ditemukan',
			'Foto',
		]; // Header kustom

		// Filter data sesuai field yang dipilih
		const filteredData = data.map(item =>
			fields.reduce((acc, key) => {
				acc[key] = item[key];
				return acc;
			}, {})
		);

		// Tambahkan header di awal array
		const dataWithHeaders = [
			Object.fromEntries(fields.map((field, i) => [field, headers[i]])),
			...filteredData,
		];

		// Membuat worksheet dari data array
		const worksheet = XLSX.utils.json_to_sheet(dataWithHeaders, {
			skipHeader: true,
		});

		// Opsional: Jadikan URL sebagai hyperlink
		data.forEach((item, index) => {
			const cellAddress = `H${index + 2}`; // Kolom H untuk photo, +2 untuk header dan 1-based indexing
			if (item.photo !== '-') {
				worksheet[cellAddress].l = { Target: item.photo };
			}
		});

		// Membuat workbook dan menambahkan worksheet
		const workbook = XLSX.utils.book_new();
		XLSX.utils.book_append_sheet(workbook, worksheet, 'Data');

		// Menyimpan workbook ke file
		XLSX.writeFile(workbook, 'Data Penemuan.xlsx');
	};

	useEffect(() => {
		const params = {
			foundStatus: ['Unidentified', 'Identified', 'Penyimpanan', 'Claimed'],
			pageIndex: page,
			pageSize: rowsPerPage,
		};
		getAllLostFound({
			...params,
		});
	}, [page, rowsPerPage]);

	useEffect(() => {
		// getDataLostFound({
		// 	foundStatus: ['Unidentified', 'Identified', 'Penyimpanan', 'Claimed'],
		// });
		getDataIdentification();
		getDataLocation({ multiLocation: ['found', 'storagefound'] });
		getDataItems();
	}, []);

	useEffect(() => {
		setAllData(allLostFound);
	}, [allLostFound]);

	// console.log('data penemuan', allLostFound);

	return (
		<Box sx={{ padding: { xs: '15px', sm: '30px' }, background: '#fff' }}>
			<Grid container spacing={2}>
				<Grid item xs={12} sm={12}>
					<CustomNewHeader
						judul="DAFTAR PENEMUAN BARANG"
						title1="Home - Lost & Found - "
						title2="Penemuan Barang"
					/>
				</Grid>
				<Grid
					item
					xs={12}
					sm={12}
					md={7.5}
					sx={{
						display: 'flex',
						flexDirection: { xs: 'column', sm: 'row' },
						gap: 1,
					}}
				>
					<Box sx={{ width: { xs: '100%', sm: '150px' } }}>
						<AppTextField
							select
							fullWidth
							size="small"
							label="Lokasi Penemuan"
							SelectProps={{
								native: true,
								IconComponent: KeyboardArrowDown,
							}}
							sx={{ mt: '0px' }}
							value={searchLocation}
							onChange={e => setSearchLocation(e.target.value)}
						>
							<option value=""></option>;
							{dataLocation.map(item => {
								return (
									<option value={item.locationName}>{item.locationName}</option>
								);
							})}
						</AppTextField>
					</Box>
					<Box sx={{ width: { xs: '100%', sm: '150px' } }}>
						<AppTextField
							select
							fullWidth
							size="small"
							label="Jenis Barang"
							SelectProps={{
								native: true,
								IconComponent: KeyboardArrowDown,
							}}
							sx={{ mt: '0px' }}
							value={searchItem}
							onChange={e => setSearchItem(e.target.value)}
						>
							<option value=""></option>;
							{dataItems
								.sort((a, b) => a.itemName.localeCompare(b.itemName))
								.map(item => {
									return <option value={item.itemName}>{item.itemName}</option>;
								})}
						</AppTextField>
					</Box>
					<Box sx={{ width: { xs: '100%', sm: '150px' } }}>
						<SearchInput
							placeholder="Search..."
							value={search}
							onChange={e => setSearch(e.target.value)}
						/>
					</Box>
					<Box
						sx={{
							width: { xs: '100%', sm: '150px' },
							display: 'flex',
							gap: 1,
						}}
					>
						<ButtonContainer title="Cari" onClick={handleSearch} />
						<ButtonFilter onClick={handleFilter} />
					</Box>
				</Grid>
				<Grid
					item
					xs={12}
					sm={12}
					md={4.5}
					sx={{ display: 'flex', justifyContent: 'flex-end', gap: 1 }}
				>
					<Button
						fullWidth
						variant="contained"
						startIcon={<Add />}
						sx={{
							height: '40px',
							backgroundColor: '#1C8CED',
							padding: '4px 2px',
						}}
						onClick={handleClickAdd}
					>
						Tambah
					</Button>
					<Tooltip title="Download Excel">
						<Button
							fullWidth
							variant="contained"
							startIcon={<ArrowDownwardIcon />}
							sx={{
								height: '40px',
								backgroundColor: '#50CD89',
								padding: '4px 2px',
								'&:hover': {
									backgroundColor: '#3BAA6E', // Warna ketika hover
								},
							}}
							onClick={() => handleClickDownload()}
						>
							Download
						</Button>
					</Tooltip>
					<ButtonError
						title="Pengambilan"
						onClick={() => setOpenScan(true)}
						icon={<QrCodeScannerIcon />}
					/>
				</Grid>
				{/* versi destop */}
				<Hidden only={['xs']}>
					<Grid item xs={12} sm={12}>
						{allData?.length > 0 ? (
							<CustomTable
								useServerPagination
								data={allData}
								useActionCol
								headers={headerTable}
								emptyRows={emptyRows}
								page={page}
								pageCount={count}
								rowsPerPage={rowsPerPage}
								handleChangePage={handleChangePage}
								handleChangeRowsPerPage={handleChangeRowsPerPage}
							>
								{allData?.map((item, index) => {
									const photo = item?.foundPhoto;
									const _foundPhoto = photo?.uploadedFiles
										? photo?.uploadedFiles[0]?.uploadedName
										: '';
									const _pathPhoto = photo?.path ? photo?.path : '';
									const _url = '/uploads';

									const _date = moment(item.foundDate).format('DD MMMM YYYY');
									const _time = moment(item.foundTime).format('HH:mm');

									const _storage = item.storageLocation;
									const _lastStorage =
										_storage.length > 0 ? _storage[_storage.length - 1] : '-';
									const _dateStorage = moment(_lastStorage?.storageDate).format(
										'DD MMMM YYYY'
									);
									const _timeStorage = moment(_lastStorage?.storageTime).format(
										'HH:mm'
									);

									const style = {
										fontSize: 28,
										transition: 'color 0.3s',
										color: '#1C8CED',
									};

									const statusStyles = getStatusStyles(item?.foundStatus);
									return (
										<TableRow key={item._id}>
											<TableCell>
												{index + 1 + (page - 1) * rowsPerPage}
											</TableCell>
											<TableCell>
												{item?.foundPhoto !== null ? (
													<AppAvatar
														src={
															StaticVar.URL_API +
															_url +
															'/' +
															_pathPhoto +
															'/' +
															_foundPhoto
														}
														sx={{
															borderRadius: '10%',
															width: 50,
															height: 50,
														}}
													/>
												) : (
													<Typography sx={{ fontSize: 13, fontWeight: 400 }}>
														Gambar
													</Typography>
												)}
											</TableCell>
											<TableCell>
												<Typography
													noWrap={false}
													sx={{ fontSize: 13, fontWeight: 400 }}
												>
													{item?.idNumber}
												</Typography>
											</TableCell>
											<TableCell>
												<Typography
													noWrap={false}
													sx={{ fontSize: 13, fontWeight: 400 }}
												>
													{item?.foundName}
												</Typography>
												<Typography
													sx={{
														fontSize: 13,
														fontWeight: 400,
														color: '#BABBBC',
													}}
												>
													{item?.foundType}
												</Typography>
											</TableCell>
											<TableCell>
												<Typography sx={{ fontSize: 13, fontWeight: 400 }}>
													{item?.foundLocation}
												</Typography>
												<Typography
													sx={{
														fontSize: 13,
														fontWeight: 400,
														color: '#BABBBC',
													}}
												>
													{_date + ' ' + _time}
												</Typography>
												<Typography sx={{ fontSize: 13, fontWeight: 400 }}>
													{item?.foundBy}
												</Typography>
											</TableCell>
											<TableCell>
												<Typography sx={{ fontSize: 13, fontWeight: 400 }}>
													{_lastStorage?.location}
												</Typography>
												<Typography
													sx={{
														fontSize: 13,
														fontWeight: 400,
														color: '#BABBBC',
													}}
												>
													{_dateStorage + ' ' + _timeStorage}
												</Typography>
											</TableCell>
											<TableCell sx={{ width: '200px' }}>
												{item?.identification === null ? (
													<IconButton
														size="small"
														onClick={() => handleAdd(item)}
													>
														<AddCircleIcon sx={style} />
													</IconButton>
												) : (
													<Stack direction="row" spacing={1}>
														<Typography sx={{ fontSize: 13, fontWeight: 400 }}>
															{item?.identification?.identificationName}
														</Typography>
														{item?.foundStatus !== 'Claimed' ? (
															<IconButton
																size="small"
																onClick={() => handleEdit(item)}
															>
																<EditIcon sx={style} />
															</IconButton>
														) : null}
													</Stack>
												)}
											</TableCell>
											<TableCell>
												<Box
													sx={{
														display: 'flex',
														justifyContent: 'center',
														alignItems: 'center',
														backgroundColor: statusStyles
															? statusStyles.backgroundColor
															: 'transparent',
														height: '35px',
														borderRadius: '8px',
														padding: '10px',
													}}
												>
													<Typography
														sx={{
															fontSize: 13,
															fontWeight: 400,
															color: statusStyles
																? statusStyles.color
																: 'black',
														}}
													>
														{item?.foundStatus}
													</Typography>
												</Box>
											</TableCell>
											<TableCell>
												<Tooltip title="View">
													<IconButton onClick={() => handleView(item)}>
														<FindInPageOutlinedIcon sx={style} />
													</IconButton>
												</Tooltip>
											</TableCell>
										</TableRow>
									);
								})}
							</CustomTable>
						) : (
							<Box sx={{ display: 'flex', justifyContent: 'center' }}>
								<Title14400 text="Data Penemuan Kosong!!!" />
							</Box>
						)}
					</Grid>
				</Hidden>

				{/* versi mobile */}
				<Hidden only={['sm', 'md', 'lg', 'xl']}>
					{allData.length > 0
						? allData
								.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
								.map(item => {
									const _date = moment(item.foundDate).format('DD MMMM YYYY');
									const _time = moment(item.foundTime).format('HH:mm');
									return (
										<Grid item xs={12} sx={{ mt: 1 }}>
											<Card onClick={() => handleView(item)}>
												<CardActionArea>
													<CardContent>
														<Box
															sx={{
																display: 'flex',
																justifyContent: 'space-between',
															}}
														>
															<BoxStatus title={item.foundStatus} />
															<Title14400 text={_date + ' ' + _time} />
														</Box>
														<Box sx={{ display: 'flex', gap: 4, mt: 1 }}>
															<Box>
																<Title14400
																	text="Nomor Laporan"
																	fontWeight={500}
																	color="#BABBBC"
																/>
																<Title14400
																	text="Penemuan"
																	fontWeight={500}
																	color="#BABBBC"
																	mt={1}
																/>
															</Box>
															<Box>
																<Title14400 text={item.idNumber} />
																<Title14400 text={item.foundLocation} mt={1} />
															</Box>
														</Box>
														<Box sx={{ mt: 1 }}>
															<Title14400
																text="Informasi Barang"
																fontWeight={500}
																color="#BABBBC"
															/>
															<Title14400
																text={item.foundName}
																fontWeight={500}
																my={1}
															/>
															<Title14400 text={item.foundType} />
														</Box>
													</CardContent>
												</CardActionArea>
											</Card>
										</Grid>
									);
								})
						: null}
				</Hidden>
			</Grid>

			{/* Pop Up Identifikasi */}
			<AppModalSmall open={openAdd} handleClose={handleCloseModal}>
				<AddIdentification
					data={dataIdentification}
					dataById={identificationById}
					handleCancel={handleCloseModal}
					handleSubmit={handleSaveIdentification}
					type="View"
				/>
			</AppModalSmall>

			{/* Pop Up Filter */}
			<AppModalMedium open={openFilter} handleClose={handleCloseModalFilter}>
				<AdvancedFilter
					handleClose={handleCloseModalFilter}
					filterData={filterData}
					setFilterData={setFilterData}
					onFilter={handleOnFilter}
				/>
			</AppModalMedium>

			{/* Pop Up Pengambilan */}
			<AppModalMedium open={openScan} handleClose={() => setOpenScan(false)}>
				<ScanQRCode handleClose={() => setOpenScan(false)} />
			</AppModalMedium>
		</Box>
	);
}

export default PenemuanPages;
