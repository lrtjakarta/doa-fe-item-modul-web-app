import { Box, IconButton, Typography } from "@mui/material";
import FlexBox from "../../../Component/flexbox/FlexBox";
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import FindInPageOutlinedIcon from '@mui/icons-material/FindInPageOutlined';
import moment from "moment";
const ColumnShape = (callback) => [
 {
  Header: "Lokasi Penyimpanan",
  accessor: "location",
  Cell: ({
    value,
  }) =>{
    return (
      <Box>
        <Typography sx={{fontSize:13, fontWeight: 600}}>{value}</Typography>
      </Box>
    )
  }
  
}, 
{
  Header: "Waktu Penyimpanan",
  // accessor: "location"
  Cell: ({
    row: {
      original
    }
  }) =>{
    const _date = moment(original?.storageDate).format("DD/MM/YYYY")
    const _time = moment(original?.storageTime).format("HH:mm")
    return (
      <Box>
        <Typography sx={{fontSize:13, fontWeight: 600}}>{_date + ' ' + _time}</Typography>
      </Box>
    )
  }
  
}, 
{
  Header: "Petugas Yang Menerima",
  accessor: "officer",
  Cell: ({
    value,
    row: {
      original
    }
  }) =><Box>
  <Typography sx={{fontSize:13, fontWeight: 600}}>{original?.officerName ? original?.officerName : '-'}</Typography>
  <Typography sx={{fontSize:13, fontWeight: 500, color: '#7C7C7C'}}>{original?.officerPosition ? original?.officerPosition : '-'}</Typography>
</Box>
}, 
 {
  Header: "Aksi",
  accessor: "edit",
  Cell: ({
    row
  }) => {
    const style = {
      fontSize: 24,
      transition: "color 0.3s",
      color:  '#BC7E36'
    };
    const {onView,} = callback;
    // console.log('index', row)
    return <FlexBox >
          {
            row.index !== 0 ? (
              <IconButton  onClick={() => onView(row.original)}>
                <FindInPageOutlinedIcon sx={style} />
              </IconButton>
            ): null
          }
        
        </FlexBox>;
  }
}
];
export default ColumnShape;