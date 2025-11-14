import { Box, IconButton, Typography } from "@mui/material";
import FlexBox from "../../Component/flexbox/FlexBox";
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import DeleteIcon from '@mui/icons-material/Delete';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import AppAvatar from "Component/avatars/AppAvatar";
import AppTextField from "Component/input-fields/AppTextField";
import StaticVar from 'Config/StaticVar';
import { useEffect, useState } from 'react';

const ColumnShapeDetail = (callback) => [
  {
		Header: 'Foto',
		accessor: 'image',
		Cell: ({ row: { original } }) => {
			const [dataImage, setDataImage] = useState({
				url: '/uploads',
				path: '',
				name: '',
			});

			useEffect(() => {
				if (original?.foundPhoto !== null) {
					const _foundPhoto =
						original?.foundPhoto?.uploadedFiles[0]?.uploadedName;
					const _pathPhoto = original?.foundPhoto?.path;
					setDataImage({
						url: '/uploads',
						path: `/${_pathPhoto}`,
						name: `/${_foundPhoto}`,
					});
				}
			}, [original.foundPhoto]);

			return (
				<Box>
					{original.foundPhoto !== null ? (
						<AppAvatar
							src={
								StaticVar.URL_API +
								dataImage.url +
								dataImage.path +
								dataImage.name
							}
							sx={{
								borderRadius: '10%',
								width: 50,
								height: 50,
							}}
						/>
					) : (
						<Typography sx={{ fontSize: 13, fontWeight: 400 }}>
							Gambar
						</Typography>
					)}
				</Box>
			);
		},
	},
{
  Header: "Jenis Barang",
  accessor: "foundName",
  Cell: ({
    value,
    row: {
      original
    }
  }) =><Box>
  <Typography noWrap={false} sx={{fontSize:13, fontWeight: 400}}>{value}</Typography>
  <Typography sx={{fontSize:13, fontWeight: 400, color: "#7C7C7C"}}>{original?.foundType}</Typography>
</Box>
}, 
{
    Header: "No. Laporan",
    accessor: "idNumber",
    Cell: ({
      value
    }) =><Box>
    <Typography noWrap={false} sx={{fontSize:13, fontWeight: 400}}>{value}</Typography>
  </Box>
  }, 
  {
    Header: "Keterangan",
    accessor: "information",
    Cell: ({
      value,
      row: {
        original
      }
    }) =>{
      return (
      <Box>
      <Typography noWrap={false} sx={{fontSize:13, fontWeight: 400}}>{original?.firstInformation}</Typography>
      <Typography sx={{fontSize:13, fontWeight: 400, color: "#7C7C7C"}}>{original?.firstNote}</Typography>
    </Box>
    )}
   
  }, 
];
export default ColumnShapeDetail;