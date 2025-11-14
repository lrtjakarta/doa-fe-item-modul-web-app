import { KeyboardArrowDown } from "@mui/icons-material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { InputBase, MenuItem, Select, TextField, useTheme } from "@mui/material";
import AppAvatar from "Component/avatars/AppAvatar";
import FlexBox from "Component/flexbox/FlexBox";
import { useMemo } from "react"; // common cell component

const columnShape = [{
  minWidth: 100,
  Header: "Team",
  accessor: "team"
}, {
  minWidth: 150,
  Header: "Birth Date",
  accessor: "dateOfBirth",
} , {
  minWidth: 170,
  Header: "Address",
  accessor: "address",
}, {
  Header: "Status",
  accessor: "status",
}];
export default columnShape;