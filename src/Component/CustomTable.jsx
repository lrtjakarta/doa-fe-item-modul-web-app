import {
	Box,
	Table,
	TableRow,
	styled,
	TableCell,
	TableHead,
	TableBody,
	Stack,
	ButtonBase
} from '@mui/material';
import React, { useMemo } from 'react';
import {
	useAsyncDebounce,
	useGlobalFilter,
	usePagination,
	useRowSelect,
	useSortBy,
	useTable,
} from 'react-table';

import { Paragraph } from 'Component/Typography';
import { ArrowRightAlt } from "@mui/icons-material";


const BodyTableCell = styled(TableCell)(() => ({
	fontSize: 12,
	fontWeight: 600,
	borderBottom: 0,
	transition: 'color 0.3s',
	'&:first-of-type': {
		paddingLeft: 24,
	},
	'&:last-of-type': {
		textAlign: 'center',
	},
	'&:nth-child(10)': {
		maxWidth: 50,
		textAlign: 'center',
	},
}));

const HeadTableCell = styled(BodyTableCell)(({ theme }) => ({
	color: '#fff',
	padding: '10px',
}));

const BodyTableRow = styled(TableRow)(({ theme, select_row }) => ({
	transition: 'background-color 0.3s',
	backgroundColor: theme.palette.background.paper,

	'& td:first-of-type': {
		borderTopLeftRadius: '0px',
		borderBottomLeftRadius: '0px',
	},
	'& td:last-of-type': {
		textAlign: 'center',
		borderTopRightRadius: '0px',
		borderBottomRightRadius: '0px',
	},
	'& td': {
		color: select_row ? 'white' : 'inherit',
	},
}));

function CustomTable(props) {
	const { data, rowClick, showFooter, columnShape, hidePagination } = props;
	const tableData = useMemo(() => data, [data]);
	const columns = useMemo(() => columnShape, [columnShape]);

	const {
		getTableProps,
		getTableBodyProps,
		headerGroups,
		prepareRow,
		page,
		state,
		gotoPage,
		pageCount
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
					// minWidth: 900,
					width: '100%',
					borderSpacing: '0 10px',
					borderCollapse: 'separate',
				}}
			>
				<TableHead>
					{headerGroups.map((headerGroup, index) => (
						<TableRow
							key={index}
							{...headerGroup.getHeaderGroupProps()}
							sx={{
								backgroundColor: '#C07F20',
							}}
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
							<BodyTableRow
								key={index}
								{...row.getRowProps()}
								onClick={rowClick && rowClick(row.original)}
							>
								{row?.cells?.map((cell, index) => (
									<BodyTableCell key={index} {...cell.getCellProps()}>
										{cell.render('Cell')}
									</BodyTableCell>
								))}
							</BodyTableRow>
						);
					})}
				</TableBody>
			</Table>
			<Stack direction='row' justifyContent='space-between' alignItems="center" marginTop={2}>
				<Paragraph color="text.secondary" fontSize={13}>
				12 Penemuan Barang
				</Paragraph>

				<ButtonBase onClick={handleChange} disableRipple sx={{
					fontSize: 13,
					fontWeight: 600,
					color: '#C07F20'
				}}>
					Selengkapnya
					<ArrowRightAlt sx={{
					marginLeft: 0.5,
					color: '#C07F20'
					}} />
					</ButtonBase>
			</Stack>
		</Box>
	);
}

export default CustomTable;
