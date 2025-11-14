import {
	Box,
	Table,
	TableRow,
	styled,
	TableCell,
	TableHead,
	TableBody,
	Stack,
	useTheme,
	TableContainer,
} from '@mui/material';
import React, { useMemo } from 'react';
import {
	useGlobalFilter,
	usePagination,
	useRowSelect,
	useSortBy,
	useTable,
} from 'react-table';
import AppPagination from 'Component/Paginations/AppPagination';

const HeadTableCell = styled(TableCell)(({ theme }) => ({
	fontSize: '15px',
	// fontWeight: 600,
	color: '#35405B',
	'&:first-of-type': {
		paddingLeft: 24,
	},
	'&:last-of-type': {
		paddingRight: 24,
	},
}));

const BodyTableCell = styled(HeadTableCell)(({ theme }) => ({
	color: '#333333',
	fontSize: 14,
	fontWeight: 400,
	// borderBottom: `1px solid ${theme.palette.divider}`
}));

function CustomNewTable(props) {
	const theme = useTheme();
	const {
		data,
		columnShape,
		hidePagination,
		pageIndex,
		pageCount: controlledPageCount,
		handleChangePagination,
	} = props;
	const tableData = useMemo(() => data, [data]);
	const columns = useMemo(() => columnShape, [columnShape]);

	const {
		getTableProps,
		getTableBodyProps,
		headerGroups,
		prepareRow,
		page,
		pageCount,
		pageOptions,
		gotoPage,
	} = useTable(
		{
			columns,
			data: tableData,
			initialState: { pageIndex: 0 },
			pageCount: controlledPageCount,
		},
		useGlobalFilter,
		useSortBy,
		usePagination,
		useRowSelect
	);

	// const handleChange = (_e, currentPageNo) => {
	// 	gotoPage(currentPageNo - 1);
	// };

	const handleChange = (_e, currentPageNo) =>
		handleChangePagination('page', currentPageNo);

	return (
		<TableContainer>
			<Table
				// {...getTableProps()}
				sx={{
					minWidth: 690,
					borderCollapse: 'separate',
					borderSpacing: '0px 10px',
					borderRadius: 3,
				}}
			>
				<TableHead
					sx={
						{
							// borderBottom: `1px solid ${theme.palette.divider}`
						}
					}
				>
					{headerGroups.map((headerGroup, index) => (
						<TableRow
							key={index}
							// {...headerGroup.getHeaderGroupProps()}
						>
							{headerGroup.headers.map((column, index) => (
								<HeadTableCell
									key={index}
									// {...column.getHeaderProps(column.getSortByToggleProps())}
								>
									{column.render('Header')}
								</HeadTableCell>
							))}
						</TableRow>
					))}
				</TableHead>

				<TableBody
				// {...getTableBodyProps()}
				>
					{page.map((row, index) => {
						prepareRow(row);
						return (
							<TableRow key={index} {...row.getRowProps()}>
								{row?.cells?.map((cell, index) => (
									<BodyTableCell key={index} {...cell.getCellProps()}>
										{cell.render('Cell')}
									</BodyTableCell>
								))}
							</TableRow>
						);
					})}
				</TableBody>
			</Table>
			<Stack alignItems="center" marginTop={3}>
				<AppPagination
					count={pageCount}
					page={pageIndex}
					shape="rounded"
					onChange={handleChange}
					// count={pageOptions.length}
					// onChange={handleChange}
					// shape="rounded"
				/>
			</Stack>
		</TableContainer>
	);
}

export default CustomNewTable;
