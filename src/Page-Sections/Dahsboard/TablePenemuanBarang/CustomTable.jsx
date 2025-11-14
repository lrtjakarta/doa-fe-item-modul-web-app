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
	ButtonBase,
	Button,
} from '@mui/material';
import React, { useMemo } from 'react';
import {
	useGlobalFilter,
	usePagination,
	useRowSelect,
	useSortBy,
	useTable,
} from 'react-table';
import { ArrowRightAlt } from '@mui/icons-material';
import { Paragraph } from 'Component/Typography';
import LaunchOutlinedIcon from '@mui/icons-material/LaunchOutlined';

const HeadTableCell = styled(TableCell)(({ theme }) => ({
	fontSize: 12,
	// fontWeight: 600,
	// color: '#35405B',
	'&:first-of-type': {
		paddingLeft: 10,
	},
	'&:last-of-type': {
		paddingRight: 10,
	},
}));

const BodyTableCell = styled(HeadTableCell)(({ theme }) => ({
	// color: '#333333',
	fontSize: 10,
	fontWeight: 400,
	// borderBottom: `1px solid ${theme.palette.divider}`
}));

function CustomNewTable(props) {
	const theme = useTheme();
	const { data, rowClick, showFooter, columnShape, handleLostFound } = props;
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

	const handleChange = (_e, currentPageNo) => {};

	return (
		<Box sx={{ width: '100%' }}>
			<Table
				// {...getTableProps()}
				sx={{
					width: '100%',
					borderCollapse: 'separate',
					borderSpacing: '0px 10px',
				}}
			>
				<TableHead>
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
			<Stack
				direction="row"
				justifyContent="space-between"
				alignItems="center"
				marginTop={2}
			>
				<Paragraph color="text.secondary" fontSize={13}>
					{page.length} Penemuan Barang
				</Paragraph>

				<Button
					variant="contained"
					startIcon={<LaunchOutlinedIcon />}
					onClick={handleLostFound}
				>
					Selengkapnya
				</Button>
			</Stack>
		</Box>
	);
}

export default CustomNewTable;
