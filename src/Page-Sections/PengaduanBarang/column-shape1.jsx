import { Box, Button, IconButton, Typography, Tooltip } from "@mui/material";
import FlexBox from "../../Component/flexbox/FlexBox";
import FindInPageOutlinedIcon from "@mui/icons-material/FindInPageOutlined";
import LocalPrintshopOutlinedIcon from '@mui/icons-material/LocalPrintshopOutlined';
import moment from "moment";
const ColumnShape = (callback) => [
  {
    Header: "Nomor Pengaduan",
    accessor: "idNumber",
    Cell: ({ value, row: { original } }) => (
      <Box>
        <Typography noWrap={false} sx={{ fontSize: 13, fontWeight: 400 }}>
          {value ? value : '-'}
        </Typography>
      </Box>
    ),
  },
  {
    Header: "Jenis Barang",
    accessor: "complaintName",
    Cell: ({ value, row: { original } }) => (
      <Box>
        <Typography noWrap={false} sx={{ fontSize: 13, fontWeight: 400 }}>
          {value}
        </Typography>
        <Typography sx={{ fontSize: 13, fontWeight: 400, color: "#7C7C7C" }}>
          {original?.complaintType}
        </Typography>
      </Box>
    ),
  },
  {
    Header: "Detail/Katakteristik",
    accessor: "complaintDescription",
    Cell: ({ value }) => (
      <Box>
        <Typography noWrap={false} sx={{ fontSize: 13, fontWeight: 400 }}>
          {value}
        </Typography>
      </Box>
    ),
  },
  {
    Header: "Lokasi & Waktu Kehilangan",
    accessor: "location",
    Cell: ({ row: { original } }) => {
      const _date = moment(original.complaintDate).format("DD MMMM YYYY");
      const _time = moment(original.complaintTime).format("HH:mm");
      return (
        <Box>
          <Typography sx={{ fontSize: 13, fontWeight: 400 }}>
            {original?.complaintLocation}
          </Typography>
          <Typography sx={{ fontSize: 13, fontWeight: 400, color: "#7C7C7C" }}>
            {_date + " " + _time}
          </Typography>
        </Box>
      );
    },
  },
  {
    Header: "Pemilik",
    accessor: "by",
    Cell: ({ value, row: { original } }) => (
      <Box sx={{ width: "100px" }}>
        <Typography sx={{ fontSize: 13, fontWeight: 400 }}>
          {original?.complaintBy}
        </Typography>
        <Typography sx={{ fontSize: 13, fontWeight: 400, color: "#7C7C7C" }}>
          {original?.complaintPhone}
        </Typography>
      </Box>
    ),
  },
  {
    Header: "Petugas",
    accessor: "complaintOfficer",
    Cell: ({ row: { original } }) => {
      return (
        <Box sx={{ width: "100px" }}>
          <Typography sx={{ fontSize: 13, fontWeight: 400 }}>
            {original?.complaintOfficer?.officerName}
          </Typography>
          <Typography sx={{ fontSize: 13, fontWeight: 400, color: "#7C7C7C" }}>
            {original?.complaintOfficer?.officerPosition}
          </Typography>
        </Box>
      );
    },
  },
  {
    Header: "Status",
    accessor: "complaintStatus",
    Cell: ({ value }) => {
      const getStatusStyles = (status) => {
        switch (status) {
          case "Belum Ditemukan":
            return { backgroundColor: "#FFF5F8", color: "#F1416C" };
          case "Ditemukan":
            return { backgroundColor: "#FFF8DD", color: "#F6C000" };
          case "Claimed":
            return { backgroundColor: "#E8FFF3", color: "#50CD89" };
          default:
            return null; // Mengembalikan null jika status tidak ditemukan
        }
      };

      // Mendapatkan gaya berdasarkan status
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
        fontSize: 24,
        transition: "color 0.3s",
        color: "#BC7E36",
      };
      const { onView, typeButton, onMaping, onPrint } = callback;
      return (
        <FlexBox justifyContent="center">
          {typeButton === "Maping" ? (
            <Button variant="contained" onClick={() => onMaping(row.original)}>
              Link
            </Button>
          ) : (
            <>
            <Tooltip title="View">
             <IconButton onClick={() => onView(row.original)}>
              <FindInPageOutlinedIcon sx={style} />
            </IconButton>
            </Tooltip>
            <Tooltip title="Print">
					<IconButton onClick={() => onPrint(row.original)}>
						<LocalPrintshopOutlinedIcon sx={{color: '#3E97FF', fontSize: 24}} />
					</IconButton>
					</Tooltip>
            </>
           
          )}
        </FlexBox>
      );
    },
  },
];
export default ColumnShape;
