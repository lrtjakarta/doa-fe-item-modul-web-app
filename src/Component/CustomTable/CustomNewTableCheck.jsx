import { Box, Checkbox, Stack, Table, TableBody, TableCell, TableHead, TableRow, useTheme } from "@mui/material";
import BlankCheckBoxIcon from "Icons/BlankCheckBoxIcon";
import CheckBoxIcon from "Icons/CheckBoxIcon";
import React, { forwardRef, useEffect, useMemo, useRef } from "react";
import { useFilters, usePagination, useRowSelect, useTable } from "react-table";
import { StyledPagination, StyledSearchIcon, StyledSearchInput, StyledTableBodyRow } from "./styledComponents";
const SelectCheckBox = forwardRef(({
  indeterminate,
  ...rest
}, ref) => {
  const defaultRef = useRef();
  const resolvedRef = ref || defaultRef;
  useEffect(() => {
    if (resolvedRef) {
      resolvedRef.current.indeterminate = indeterminate;
    }
  }, [resolvedRef, indeterminate]);
  return <Checkbox {...rest} ref={resolvedRef} disableRipple checkedIcon={<CheckBoxIcon fontSize="small" color="primary" />} icon={<BlankCheckBoxIcon fontSize="small" color="primary" />} />;
});

const DataTable = ({
  data,
  clearFilter,
  handleRowSelect,
  onFilterChange,
  columnShape
}) => {
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
    state,
    setAllFilters,
    selectedFlatRows
  } = useTable({
    columns,
    data: tableData
  }, useFilters, usePagination, useRowSelect, hooks => {
    hooks.visibleColumns.push(columns => [{
      id: "selection",
      Header: ({
        getToggleAllRowsSelectedProps
      }) => <SelectCheckBox {...getToggleAllRowsSelectedProps()} />,
      Cell: ({
        row
      }) => {
        return <SelectCheckBox {...row.getToggleRowSelectedProps()} />;
      }
    }, ...columns]);
  });
  useEffect(() => {
    handleRowSelect(selectedFlatRows);
  }, [selectedFlatRows, handleRowSelect]);
  useEffect(() => {
    setAllFilters([]);
  }, [clearFilter, setAllFilters]);
  useEffect(() => {
    if (onFilterChange) {
      onFilterChange(state.filters);
    }
  }, [onFilterChange, state.filters]); // handle pagination

  const handleChange = (_, currentPageNo) => {
    gotoPage(currentPageNo - 1);
  };

  const selectedRow = selectId => {
    const rowId = Object.keys(state.selectedRowIds);
    const findId = rowId.find(id => id === selectId);
    if (findId) return true;
    return false;
  };

  return <Box>
        <Table {...getTableProps()}>
          <TableHead>
            {headerGroups.map(headerGroup => <TableRow {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map(column => <TableCell {...column.getHeaderProps()} sx={{
              fontSize: 12,
              fontWeight: 600,
              minWidth: column.minWidth,
              borderColor: "secondary.300",
              "&:first-child": {
                paddingLeft: "16px"
              },
              "&:last-child": {
                paddingRight: "16px"
              }
            }}>
                    {column.render("Header")}
                    {column.canFilter ? column.render("Filter") : null}
                  </TableCell>)}
              </TableRow>)}
          </TableHead>

          <TableBody {...getTableBodyProps()}>
            {page.map(row => {
            prepareRow(row);
            return <StyledTableBodyRow {...row.getRowProps()} selected_row={selectedRow(row.id) ? "select" : ""}>
                  {row.cells.map(cell => <TableCell {...cell.getCellProps()} sx={{
                fontSize: 12,
                fontWeight: 500,
                borderColor: "secondary.300",
                "&:first-child": {
                  paddingLeft: "16px"
                }
              }}>
                      {cell.render("Cell")}
                    </TableCell>)}
                </StyledTableBodyRow>;
          })}
          </TableBody>
        </Table>

      <Stack alignItems="center" marginY="1rem">
      </Stack>
    </Box>;
};

export default DataTable;