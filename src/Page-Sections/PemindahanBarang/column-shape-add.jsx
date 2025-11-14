import { Box, IconButton, Typography } from "@mui/material";
import FlexBox from "../../Component/flexbox/FlexBox";
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import DeleteIcon from '@mui/icons-material/Delete';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import AppAvatar from "Component/avatars/AppAvatar";
import AppTextField from "Component/input-fields/AppTextField";
const ColumnShapeAdd = (callback) => [
  {
    Header: "Foto",
    accessor: "photo",
    Cell: ({
      row: {
        original
      }
    }) => <Box sx={{width: '50px'}}>
      <AppAvatar src={original.photo} sx={{
            borderRadius: "10%",
            width: 50,
            height: 50
          }} />
    
  </Box>
  },
{
  Header: "No. Laporan",
  accessor: "idNumber",
  Cell: ({
    value
  }) =><Box sx={{width: '50px'}}>
  <Typography noWrap={false} sx={{fontSize:13, fontWeight: 400}}>{value}</Typography>
</Box>
}, 
{
  Header: "Jenis Barang",
  accessor: "foundName",
  Cell: ({
    value
  }) =><Box>
  <Typography noWrap={false} sx={{fontSize:13, fontWeight: 400}}>{value}</Typography>
</Box>
}, 
{
  Header: "Keterangan",
  // accessor: "dateTime",
  Cell: ({
    row
  }) =>{
    const {value,onChange} = callback;
    return (
      <Box>
        <AppTextField fullWidth placeholder="Masukkan keterangan" value={value} onChange={onChange} />
      </Box>
    )
  }
 
}, 
{
  Header: "Aksi",
  Cell: ({
    row
  }) => {
    const style = {
      fontSize: 24,
      transition: "color 0.3s",
      color: '#ED1C24'
    };
    const {onDelete,} = callback;
    return <Box>
          <IconButton  onClick={() => onDelete(row.original)}>
            <DeleteOutlineOutlinedIcon sx={style} />
          </IconButton>
        </Box>;
  }
}
];
export default ColumnShapeAdd;