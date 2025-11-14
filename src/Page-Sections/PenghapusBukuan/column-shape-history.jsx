import { Box, IconButton, Typography } from "@mui/material";
import FlexBox from "../../Component/flexbox/FlexBox";
import FindInPageOutlinedIcon from "@mui/icons-material/FindInPageOutlined";
import moment from "moment";
const ColumnShapeAdd = (callback) => [
  {
  	Header: 'Jenis Barang',
  	Cell: ({ row: { original } }) => {
  		const removeItems = original?.items; // Ganti dengan data array Anda
  		const firstFiveItems = removeItems.slice(0, 4); // Mengambil lima data pertama
  		const remainingItems = removeItems.slice(4); // Mengambil sisanya
  		return (
  			<Box>
  				{firstFiveItems?.map((item, index) => {
					const _item = item.removeItems
  					return (
  						<Typography noWrap={false} sx={{ fontSize: 13, fontWeight: 400 }}>
  							{'- ' + _item.foundName}
  						</Typography>
  					);
  				})}

  				<Typography noWrap={false} sx={{ fontSize: 13, fontWeight: 400 }}>
  					{remainingItems.length > 0
  						? remainingItems.length + ' Ada yang berikutnya'
  						: null}
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
      const _date = moment(_removedBy?.officerDate).format("DD/MM/YYYY");
      const _time = moment(_removedBy?.officerDate).format("HH:mm");
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
export default ColumnShapeAdd;
