import { useNavigate } from 'react-router-dom';
import BlankCheckBoxIcon from 'Icons/BlankCheckBoxIcon';
import CheckBoxIcon from 'Icons/CheckBoxIcon';
import FindInPageOutlinedIcon from '@mui/icons-material/FindInPageOutlined';

import AppTextField from 'Component/input-fields/AppTextField';
import SearchInput from 'Component/input-fields/SearchInput';
import ButtonFilter from 'Component/Buttons/ButtonFilter';
import ButtonContainer from 'Component/Buttons/ButtonContainer';
import CustomNewTableCheck from 'Component/CustomTable/CustomNewTableCheck';
import AppPagination from 'Component/Paginations/AppPagination';

import USER_LIST from 'Page-Sections/PenghapusBukuan/Data/user_list';
// import columnShape from 'Page-Sections/PenghapusBukuan/columnShape1';

import CustomNewTable from 'Component/CustomTable/CustomNewTable';
import columnShape from 'Page-Sections/PenemuanBarang/column-shape';

import React from 'react';
import {
	forwardRef,
	useEffect,
	useMemo,
	useRef,
	useState,
	useContext,
} from 'react';
import {
	Box,
	Card,
	Checkbox,
	Stack,
	styled,
	Table,
	TableRow,
	useTheme,
	Button,
	Grid,
	Typography,
	IconButton,
} from '@mui/material';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import {
	useAsyncDebounce,
	useGlobalFilter,
	usePagination,
	useRowSelect,
	useSortBy,
	useTable,
} from 'react-table';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { KeyboardArrowDown } from '@mui/icons-material';

import FlexBox from 'Component/flexbox/FlexBox';

import { LostFoundContext } from 'Context/LostFound';
import DataTable from 'Component/CustomTable/CustomNewTableCheck';
// import columnShape from 'Page-Sections/PenghapusBukuan/columnShape1';

const HeadTableCell = styled(TableCell)(({ theme }) => ({
	fontSize: 12,
	fontWeight: 600,
	color: theme.palette.text.secondary,
	'&:first-of-type': {
		paddingLeft: 24,
	},
	'&:last-of-type': {
		paddingRight: 24,
	},
}));
const BodyTableCell = styled(HeadTableCell)(({ theme }) => ({
	color: theme.palette.text.secondary,
	fontSize: 13,
	fontWeight: 500,
	borderBottom: `1px solid ${theme.palette.divider}`,
}));
const SelectCheckBox = forwardRef(({ indeterminate, ...rest }, ref) => {
	const defaultRef = useRef();
	const resolvedRef = ref || defaultRef;
	useEffect(() => {
		if (resolvedRef) {
			resolvedRef.current.indeterminate = indeterminate;
		}
	}, [resolvedRef, indeterminate]);
	return (
		<Checkbox
			{...rest}
			disableRipple
			ref={resolvedRef}
			icon={<BlankCheckBoxIcon fontSize="small" color="disabled" />}
			checkedIcon={<CheckBoxIcon fontSize="small" color="primary" />}
		/>
	);
});

function ListPenghapusBukuan() {
	const navigate = useNavigate();
	const { dataLostFound, getDataLostFound } = useContext(LostFoundContext);
	const [dataItems, setDataItems] = useState([]);

	const theme = useTheme();
	const columns = useMemo(() => columnShape, []);
	const tableData = useMemo(() => dataItems, []);
	const {
		getTableProps,
		getTableBodyProps,
		headerGroups,
		prepareRow,
		page,
		pageOptions,
		gotoPage,
		selectedFlatRows,
	} = useTable(
		{
			columns,
			data: tableData,
		},
		useGlobalFilter,
		useSortBy,
		usePagination,
		useRowSelect,
		hooks => {
			hooks.visibleColumns.push(columns => [
				{
					id: 'selection',
					Header: ({ getToggleAllRowsSelectedProps }) => (
						<SelectCheckBox {...getToggleAllRowsSelectedProps()} />
					),
					Cell: ({ row }) => (
						<SelectCheckBox {...row.getToggleRowSelectedProps()} />
					),
				},
				...columns,
			]);
		}
	); // handle change pagination

	const handleChange = (_, currentPageNo) => gotoPage(currentPageNo - 1); // handle change for tab list

	const handleView = row => {
		console.log('data row', row);
		// navigate('/manajemenBarang/penghapusbukuan/detail');
	};
	const handleForm = () => {
		console.log('data select', selectedFlatRows);
		const _data = selectedFlatRows.map(item => {
			return item.original;
		});
		navigate('/manajemenBarang/penghapusbukuan/add', {
			state: { data: _data },
		});
	};

	useEffect(() => {
		getDataLostFound({
			foundStatus: ['Unidentified', 'Identified', 'Penyimpanan'],
		});
	}, []);
	useEffect(() => {
		if (dataLostFound.length > 0) {
			const _dataLostFound = dataLostFound.filter(
				x => x.identification !== null
			);
			setDataItems(_dataLostFound);
		}
	}, [dataLostFound]);
	return (
		<Box
			sx={{
				padding: { xs: '15px', sm: '30px' },
				background: '#FFF',
				minHeight: '100vh',
			}}
		>
			<Grid container spacing={3}>
				<Grid item xs={12} sm={12}>
					<Grid container spacing={2}>
						<Grid item xs={12} sm={1.5}>
							<DatePicker
								label="Masa Simpan"
								// value={values.birthday}
								// onChange={date => setFieldValue('birthday', date)}
								slots={{
									textField: AppTextField,
								}}
								slotProps={{
									textField: {
										fullWidth: true,
										size: 'small',
									},
								}}
							/>
						</Grid>
						<Grid item xs={12} sm={1.5}>
							<DatePicker
								label="Masa Simpan"
								// value={values.birthday}
								// onChange={date => setFieldValue('birthday', date)}
								slots={{
									textField: AppTextField,
								}}
								slotProps={{
									textField: {
										fullWidth: true,
										size: 'small',
									},
								}}
							/>
						</Grid>
						<Grid item xs={12} sm={2}>
							<AppTextField
								select
								fullWidth
								size="small"
								label="Identifikasi"
								SelectProps={{
									native: true,
									IconComponent: KeyboardArrowDown,
								}}
							>
								<option value=""></option>;
							</AppTextField>
						</Grid>
						<Grid item xs={12} sm={2}>
							<SearchInput
								placeholder="Search..."
								// value={value || ''}
								// onChange={e => setValue(e.target.value)}
							/>
						</Grid>
						<Grid item xs={10.5} sm={0.8}>
							<ButtonContainer title="Cari" onClick="" />
						</Grid>
						<Grid item xs={1} sm={1.2}>
							<ButtonFilter onClick="" />
						</Grid>
						<Grid
							item
							xs={12}
							sm={3}
							sx={{ display: 'flex', justifyContent: 'flex-end' }}
						>
							{selectedFlatRows && selectedFlatRows.length > 0 && (
								<FlexBox alignItems="center" gap={1}>
									<Typography>{selectedFlatRows.length} Selected</Typography>
									<Button
										variant="contained"
										color="error"
										onClick={handleForm}
									>
										Penghapusbukuan
									</Button>
								</FlexBox>
							)}
						</Grid>
					</Grid>
				</Grid>
				<Grid item xs={12} sm={12}>
					{/* <DataTable data={dataLostFound} columnShape={columnShape()} /> */}
				</Grid>
				<Grid item xs={12} sm={12}>
					{/* <Table
						{...getTableProps()}
						sx={{
							minWidth: 900,
						}}
					>
						<TableHead
							sx={{
								borderBottom: `1px solid ${theme.palette.divider}`,
							}}
						>
							{headerGroups.map((headerGroup, index) => (
								<TableRow key={index} {...headerGroup.getHeaderGroupProps()}>
									{headerGroup.headers.map((column, index) => (
										<HeadTableCell
											key={index}
											{...column.getHeaderProps(column.getSortByToggleProps())}
										>
											{column.render('Header')}
										</HeadTableCell>
									))}
								</TableRow>
							))}
						</TableHead>

						<TableBody {...getTableBodyProps()}>
							{page.map((row, index) => {
								prepareRow(row);
								return (
									<TableRow {...row.getRowProps()} key={index}>
										{row.cells.map((cell, index) => (
											<BodyTableCell key={index} {...cell.getCellProps()}>
												{cell.render('Cell')}
											</BodyTableCell>
										))}
									</TableRow>
								);
							})}
						</TableBody>
					</Table>
					<Stack alignItems="center" marginY={4}>
						<AppPagination
							shape="rounded"
							onChange={handleChange}
							count={pageOptions.length}
						/>
					</Stack> */}
				</Grid>
			</Grid>
		</Box>
	);
}

export default ListPenghapusBukuan;
