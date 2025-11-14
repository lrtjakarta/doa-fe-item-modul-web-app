import { Edit } from "@mui/icons-material";
import { Box, IconButton, Typography } from "@mui/material";
import FindInPageOutlinedIcon from '@mui/icons-material/FindInPageOutlined';
import AppAvatar from "Component/avatars/AppAvatar";
import FlexBox from "../../Component/flexbox/FlexBox";
import moment from "moment";
import { addMonths, format, addDays } from 'date-fns';
const columnShape = [{
  Header: "Foto",
  accessor: "avatar",
  Cell: ({
    value
  }) => <AppAvatar src={value} sx={{
    borderRadius: "20%"
  }} />
}, {
  Header: "Barang",
  accessor: "idNumber",
  Cell: ({
    value,
    row: {
      original
    }
  }) =>{
    return (
      <Box>
        <Typography noWrap={false} sx={{fontSize:13, fontWeight: 400}}>{original.idNumber}</Typography>
        <Typography sx={{fontSize:13, fontWeight: 400, color: '#BABBBC'}}>{original.foundName}</Typography>
      </Box>
    )
  }
  
},  {
  Header: "Batas Penyimpanan",
  // accessor: "date",
  Cell: ({
    row: {
      original
    }
  }) =>{
    const _identification= original.identification
    const _date = moment(original.foundDate).format("YYYY-MM-DD")
    const _day= _identification.identificationExpired.expiredValue
    const _moon = _identification.identificationExpired.expiredType
    const _nextDate = _moon === 'Bulan' ? addMonths(_date, _day) : addDays(_date, _day)
    const _status = new Date(_nextDate) <= new Date();
    return (
    <Box >
      <Typography sx={{fontSize:13, fontWeight: 400, color: _status === true ? "#F1416C" : "black"}}>{format(_nextDate, 'dd/MM/yyyy')}</Typography>
      {/* <Typography noWrap={false} sx={{fontSize:13, fontWeight: 400, color: original.status === "Penyimpanan"  ? "#333333" : '#D9214E'}}>{value}</Typography> */}
    </Box>
    )
  }
  
}, 
{
  Header: "Penemuan",
  accessor: "penemuan",
  Cell: ({
    row: {
      original
    }
  }) =>{
    const _date = moment(original.foundDate).format("DD/MM/YYYY")
    const _officer = original.foundOfficer?.name
    return (
      <Box >
        <Typography sx={{fontSize:13, fontWeight: 400}}>{original.foundLocation}</Typography>
        <Typography sx={{fontSize:13, fontWeight: 400, color: '#BABBBC'}}>{_date}</Typography>
        <Typography sx={{fontSize:13, fontWeight: 400}}>{_officer}</Typography>
      </Box>
    )
  }
}, 
{
  Header: "Lokasi Penyimpanan",
  accessor: "storage",
  Cell: ({
    value,
    row: {
      original
    }
  }) => <Box >
  {/* <Typography sx={{fontSize:13, fontWeight: 400}}>{value.location}</Typography>
  <Typography sx={{fontSize:13, fontWeight: 400, color: '#BABBBC'}}>{value.date}</Typography> */}
</Box>
}, 
{
  Header: "Idetifikasi",
  accessor: "identification",
  Cell: ({
    row: {
      original
    }
  }) => {
    const _identification= original.identification
    return (
      <Box >
      <Typography sx={{fontSize:13, fontWeight: 400}}>{_identification?.identificationName}</Typography>
      <Typography sx={{fontSize:13, fontWeight: 400, color: '#BABBBC'}}>{_identification?.identificationType}</Typography>
    </Box>
    )
  }

}, 
{
  Header: "Status",
  accessor: "status",
  Cell: ({
    value,
    row: {
      original
    }
  }) => {
    const _identification= original.identification
    const _date = moment(original.foundDate).format("YYYY-MM-DD")
    const _day= _identification.identificationExpired.expiredValue
    const _moon = _identification.identificationExpired.expiredType
    const _nextDate = _moon === 'Bulan' ? addMonths(_date, _day) : addDays(_date, _day)
    const _status = new Date(_nextDate) <= new Date();
    return (
      <Box sx={{width: '120px'}}>
        <Box sx={{display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: _status === false ? "#FFF8DD" :  "#FFF5F8" , height: '35px', borderRadius: '8px'}}>
          <Typography sx={{fontSize:13, fontWeight: 400, color: _status === false ? "#F6C000" : "#F1416C"}}>{_status === false ? 'Peyimpanan': "Expired"}</Typography>
        </Box>
      </Box>
    )
  }
}, ];
export default columnShape;