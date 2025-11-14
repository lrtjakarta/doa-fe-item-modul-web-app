import React, { forwardRef, useEffect, useMemo, useRef, useState } from 'react';
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
	Checkbox,
} from '@mui/material';
import {
	useGlobalFilter,
	usePagination,
	useRowSelect,
	useSortBy,
	useTable,
} from 'react-table';

import BlankCheckBoxIcon from 'Icons/BlankCheckBoxIcon';
import CheckBoxIcon from 'Icons/CheckBoxIcon';
import AppPagination from 'Component/Paginations/AppPagination';

const HeadTableCell = styled(TableCell)(({ theme }) => ({
	fontSize: 15,
	fontWeight: 600,
	color: '#A1A5B7',
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
			ref={resolvedRef}
			disableRipple
			checkedIcon={<CheckBoxIcon fontSize="small" color="primary" />}
			icon={<BlankCheckBoxIcon fontSize="small" color="primary" />}
		/>
	);
});

function CustomNewTable(props) {
	const theme = useTheme();
	const { data, columnShape, handleRowSelect } = props;
	const tableData = useMemo(() => data, [data]);
	const columns = useMemo(() => columnShape, [columnShape]);

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
					Cell: ({ row }) => {
						return <SelectCheckBox {...row.getToggleRowSelectedProps()} />;
					},
				},
				...columns,
			]);
		}
	);

	useEffect(() => {
		handleRowSelect(selectedFlatRows);
		// selectedFlatRows(row)
	}, [selectedFlatRows, handleRowSelect]);

	const handleChange = (_e, currentPageNo) => {
		gotoPage(currentPageNo - 1);
	};

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
					count={pageOptions.length}
					onChange={handleChange}
					shape="rounded"
				/>
			</Stack>
		</Box>
	);
}

export default CustomNewTable;
