import {
	Box,
	Card,
	Checkbox,
	Stack,
	styled,
	Table,
	TableRow,
	useTheme,
} from '@mui/material';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import AppPagination from 'Component/Paginations/AppPagination';
import Scrollbar from 'Component/ScrollBar';
import BlankCheckBoxIcon from 'Icons/BlankCheckBoxIcon';
import CheckBoxIcon from 'Icons/CheckBoxIcon';
import { forwardRef, useEffect, useMemo, useRef, useState } from 'react';
import {
	useAsyncDebounce,
	useGlobalFilter,
	usePagination,
	useRowSelect,
	useSortBy,
	useTable,
} from 'react-table';
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

const CustomTable = props => {
	const { data, columnShape } = props;
	const [value, setValue] = useState('');
	const theme = useTheme();
	const columns = useMemo(() => columnShape, [columnShape]);
	const tableData = useMemo(() => data, [data]);
	const {
		getTableProps,
		getTableBodyProps,
		headerGroups,
		prepareRow,
		page,
		pageOptions,
		gotoPage,
		state,
		setGlobalFilter,
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
					// Header: ({
					//   getToggleAllRowsSelectedProps
					// }) => <SelectCheckBox {...getToggleAllRowsSelectedProps()} />,
					// Cell: ({
					//   row
					// }) => <SelectCheckBox {...row.getToggleRowSelectedProps()} />
				},
				...columns,
			]);
		}
	); // handle change pagination

	const handleChange = (_, currentPageNo) => gotoPage(currentPageNo - 1); // handle change for tab list

	const changeTab = (_, newValue) => setValue(newValue); // search value state

	const [searchValue, setSearchValue] = useState(state.globalFilter);
	const handleSearch = useAsyncDebounce(
		value => setGlobalFilter(value || undefined),
		200
	);
	return (
		<Box>
			<Table
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
					count={pageOptions.length}
					onChange={handleChange}
					shape="rounded"
				/>
			</Stack>
		</Box>
	);
};

export default CustomTable;
