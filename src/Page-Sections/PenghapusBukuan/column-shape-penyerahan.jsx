import { Box, IconButton, Typography } from "@mui/material";
import FlexBox from "../../Component/flexbox/FlexBox";
import FindInPageOutlinedIcon from "@mui/icons-material/FindInPageOutlined";
import moment from "moment";
import { useEffect, useState } from 'react';
import StaticVar from 'Config/StaticVar';
import AppAvatar from 'Component/avatars/AppAvatar';

const ColumnShapePenyerahan = (callback) => [
  {
		Header: 'Foto',
		accessor: 'avatar',
		Cell: ({ row: { original } }) => {
      const item = original?.removeItems
			const [dataImage, setDataImage] = useState({
				url: '/uploads',
				path: '',
				name: '',
			});

			useEffect(() => {
				if (item?.foundPhoto !== null) {
					const _foundPhoto =
						item?.foundPhoto?.uploadedFiles[0]?.uploadedName;
					const _pathPhoto = item?.foundPhoto?.path;
					setDataImage({
						url: '/uploads',
						path: `/${_pathPhoto}`,
						name: `/${_foundPhoto}`,
					});
				}
			}, [item.foundPhoto]);
			return (
				<Box>
					{item.foundPhoto !== null ? (
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
  	Header: 'Nama Barang',
  	Cell: ({ row: { original } }) => {
      const item = original?.removeItems
  		return (
  			<Box>
  				<Typography noWrap={false} sx={{ fontSize: 13, fontWeight: 400 }}>
  					{item.foundName}
  				</Typography>
  			</Box>
  		);
  	},
  },
  {
    Header: "Diajukan Oleh",
    Cell: ({ row: { original } }) => {
      const _removedBy = original?.submissiondBy;
      const _date = moment(_removedBy?.submissionDate).format("DD/MM/YYYY");
      const _time = moment(_removedBy?.submissionDate).format("HH:mm");
      return (
        <Box>
          <Typography noWrap={false} sx={{ fontSize: 13, fontWeight: 400 }}>
            {_removedBy?.officerName}
          </Typography>
          <Typography sx={{ fontSize: 13, fontWeight: 400, color: "#BABBBC" }}>
            {_removedBy?.officerPosition}
          </Typography>
          <Typography noWrap={false} sx={{ fontSize: 13, fontWeight: 400 }}>
            {_date + " " + _time}
          </Typography>
        </Box>
      );
    },
  },
  {
    Header: "Disetujui/Ditolak Oleh",
    Cell: ({ row: { original } }) => {
      const _removedBy = original?.approvalBy;
      const _date = moment(_removedBy?.approvalDate).format("DD/MM/YYYY");
      const _time = moment(_removedBy?.approvalDate).format("HH:mm");
    //   console.log(original?.disetujui);
      return (
        <Box>
          {_removedBy !== "-" ? (
            <>
              <Typography noWrap={false} sx={{ fontSize: 13, fontWeight: 400 }}>
                {_removedBy?.officerName}
              </Typography>
              <Typography
                sx={{ fontSize: 13, fontWeight: 400, color: "#BABBBC" }}
              >
                {_removedBy?.officerPosition}
              </Typography>
              <Typography noWrap={false} sx={{ fontSize: 13, fontWeight: 400 }}>
                {_removedBy !== undefined ? _date + " " + _time : ""}
              </Typography>
            </>
          ) : (
            <Typography noWrap={false} sx={{ fontSize: 13, fontWeight: 400 }}>
              -
            </Typography>
          )}
        </Box>
      );
    },
  },
  {
    Header: "Diterima Oleh",
    Cell: ({ row: { original } }) => {
      const _providedBy = original?.providedBy;
      const _date = moment(_providedBy?.officerDate).format("DD/MM/YYYY");
      const _time = moment(_providedBy?.officerDate).format("HH:mm");
      return (
        <Box>
          {_providedBy !== "-" ? (
            <>
              <Typography noWrap={false} sx={{ fontSize: 13, fontWeight: 400 }}>
                {_providedBy?.officerName}
              </Typography>
              <Typography
                sx={{ fontSize: 13, fontWeight: 400, color: "#BABBBC" }}
              >
                {_providedBy?.officerPosition}
              </Typography>
              <Typography noWrap={false} sx={{ fontSize: 13, fontWeight: 400 }}>
                {_providedBy !== undefined ? _date + " " + _time : ""}
              </Typography>
            </>
          ) : (
            <Typography noWrap={false} sx={{ fontSize: 13, fontWeight: 400 }}>
              -
            </Typography>
          )}
        </Box>
      );
    },
  },
  {
    Header: "Status",
    accessor: "removeStatus",
    Cell: ({ value }) => {
      const getStatusStyles = (status) => {
        switch (status) {
          case "Ditolak":
            return { backgroundColor: "#FFF5F8", color: "#F1416C" };
          case "Diajukan":
            return { backgroundColor: "#FFF8DD", color: "#F6C000" };
          case "Disetujui":
            return { backgroundColor: "#EEF6FF", color: "#3E97FF" };
          case "Dihapuskan":
            return { backgroundColor: "#E8FFF3", color: "#50CD89" };
          default:
            return null; // Mengembalikan null jika status tidak ditemukan
        }
      };
      const statusStyles = getStatusStyles(value);
      return (
        <Box sx={{ width: "120px" }}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: statusStyles
                ? statusStyles.backgroundColor
                : "transparent",
              height: "35px",
              borderRadius: "8px",
            }}
          >
            <Typography
              sx={{
                fontSize: 13,
                fontWeight: 400,
                color: statusStyles ? statusStyles.color : "black",
              }}
            >
              {value}
            </Typography>
          </Box>
        </Box>
      );
    },
  },
  {
    Header: "Aksi",
    accessor: "edit",
    Cell: ({ row }) => {
      const style = {
        fontSize: 19,
        transition: "color 0.3s",
        color: "#C07F20",
      };
      const { onView } = callback;
      return (
        <FlexBox justifyContent="center">
          <IconButton onClick={() => onView(row.original)}>
            <FindInPageOutlinedIcon sx={style} />
          </IconButton>
        </FlexBox>
      );
    },
  },
];
export default ColumnShapePenyerahan;
