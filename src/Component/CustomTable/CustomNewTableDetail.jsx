import {
	Box,
	Table,
	TableRow,
	styled,
	TableCell,
	TableHead,
	TableBody,
	Stack,
    useTheme
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

const HeadTableCell = styled(TableCell)(({
    theme
  }) => ({
    fontSize: 15,
    fontWeight: 600,
    color: '#A1A5B7',
    "&:first-of-type": {
      paddingLeft: 24
    },
    "&:last-of-type": {
      paddingRight: 24
    }
  }));

  const BodyTableCell = styled(HeadTableCell)(({
    theme
  }) => ({
    color: '#333333',
    fontSize: 14,
    fontWeight: 400,
    borderBottom: `1px solid ${theme.palette.divider}`
  }));

function CustomNewTableDetail(props) {
    const theme = useTheme();
	const { data, rowClick, showFooter, columnShape, hidePagination } = props;
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
	} = useTable(
		{
			columns,
			data: tableData,
		},
		useGlobalFilter,
		useSortBy,
		usePagination,
		useRowSelect
	);

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
				<TableHead sx={{
            borderBottom: `1px solid ${theme.palette.divider}`
          }}>
					{headerGroups.map((headerGroup, index) => (
						<TableRow
							key={index}
							{...headerGroup.getHeaderGroupProps()}
						>
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
							<TableRow
								key={index}
								{...row.getRowProps()}
							>
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
		</Box>
	);
}

export default CustomNewTableDetail;
