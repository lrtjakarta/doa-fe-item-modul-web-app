import { Box, IconButton, Typography } from "@mui/material";
import FlexBox from "../../Component/flexbox/FlexBox";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import EditIcon from "@mui/icons-material/Edit";
import FindInPageOutlinedIcon from "@mui/icons-material/FindInPageOutlined";
import AppAvatar from "Component/avatars/AppAvatar";
import moment from "moment";
import { addMonths, format, addDays } from "date-fns";
import StaticVar from "Config/StaticVar";
import { useEffect, useState } from "react";

const ColumnShape = (callback) => [
  {
    Header: "Foto",
    accessor: "avatar",
    Cell: ({ row: { original } }) => {
      const photo = original?.foundPhoto;
      const _foundPhoto = photo?.uploadedFiles
        ? photo?.uploadedFiles[0]?.uploadedName
        : "";
      const _pathPhoto = photo?.path ? photo?.path : "";
      const _url = "/uploads";

    //   const [dataImage, setDataImage] = useState({
    //     url: "/uploads",
    //     path: "",
    //     name: "",
    //   });

      // useEffect(() => {
      // 	if (original?.foundPhoto !== null && original?.foundPhoto.length > 0) {
      // 		const _foundPhoto =
      // 			original?.foundPhoto?.uploadedFiles[0]?.uploadedName;
      // 		const _pathPhoto = original?.foundPhoto?.path;
      // 		setDataImage({
      // 			url: '/uploads',
      // 			path: `/${_pathPhoto}`,
      // 			name: `/${_foundPhoto}`,
      // 		});
      // 	}
      // }, [original.foundPhoto]);

      return (
        <Box>
          {original.foundPhoto !== null ? (
            <AppAvatar
              // src={
              // 	StaticVar.URL_API +
              // 	dataImage.url +
              // 	dataImage.path +
              // 	dataImage.name
              // }
              src={
                StaticVar.URL_API + _url + "/" + _pathPhoto + "/" + _foundPhoto
              }
              sx={{
                borderRadius: "10%",
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
    Header: "Barang",
    accessor: "idNumber",
    Cell: ({ value, row: { original } }) => {
      return (
        <Box>
          <Typography noWrap={false} sx={{ fontSize: 13, fontWeight: 400 }}>
            {original.foundName}
          </Typography>
          <Typography sx={{ fontSize: 13, fontWeight: 400, color: "#BABBBC" }}>
            {original.foundType}
          </Typography>
        </Box>
      );
    },
  },
  {
    Header: "Batas Penyimpanan",
    // accessor: "date",
    Cell: ({ row: { original } }) => {
      const _identification = original.identification;
      const _date = moment(original.foundDate).format("YYYY-MM-DD");
      const _day = _identification.identificationExpired.expiredValue;
      const _moon = _identification.identificationExpired.expiredType;
      const _nextDate =
        _moon === "Bulan" ? addMonths(_date, _day) : addDays(_date, _day);
      const _status = new Date(_nextDate) <= new Date();
      return (
        <Box>
          <Typography
            sx={{
              fontSize: 13,
              fontWeight: 400,
              color: _status === true ? "#F1416C" : "black",
            }}
          >
            {format(_nextDate, "dd/MM/yyyy")}
          </Typography>
          {/* <Typography noWrap={false} sx={{fontSize:13, fontWeight: 400, color: original.status === "Penyimpanan"  ? "#333333" : '#D9214E'}}>{value}</Typography> */}
        </Box>
      );
    },
  },
  {
    Header: "Penemuan",
    accessor: "penemuan",
    Cell: ({ row: { original } }) => {
      const _date = moment(original.foundDate).format("DD/MM/YYYY");
      const _officer = original.foundOfficer?.name;
      return (
        <Box>
          <Typography sx={{ fontSize: 13, fontWeight: 400 }}>
            {original.foundLocation}
          </Typography>
          <Typography sx={{ fontSize: 13, fontWeight: 400, color: "#BABBBC" }}>
            {_date}
          </Typography>
          <Typography sx={{ fontSize: 13, fontWeight: 400 }}>
            {_officer}
          </Typography>
        </Box>
      );
    },
  },
  {
    Header: "Lokasi Penyimpanan",
    accessor: "storage",
    Cell: ({ value, row: { original } }) => {
      const _storage = original.storageLocation;
      const _lastStorage =
        _storage.length > 0 ? _storage[_storage.length - 1] : "-";
      const _date = moment(_lastStorage?.storageDate).format("DD MMMM YYYY");
      return (
        <Box>
          <Typography sx={{ fontSize: 13, fontWeight: 400 }}>
            {_lastStorage?.location}
          </Typography>
          <Typography sx={{ fontSize: 13, fontWeight: 400, color: "#BABBBC" }}>
            {_date}
          </Typography>
        </Box>
      );
    },
  },
  {
    Header: "Idetifikasi",
    accessor: "identification",
    Cell: ({ row: { original } }) => {
      const _identification = original.identification;
      return (
        <Box>
          <Typography sx={{ fontSize: 13, fontWeight: 400 }}>
            {_identification?.identificationName}
          </Typography>
          <Typography sx={{ fontSize: 13, fontWeight: 400, color: "#BABBBC" }}>
            {_identification?.identificationType}
          </Typography>
        </Box>
      );
    },
  },
  {
    Header: "Status",
    accessor: "status",
    Cell: ({ value, row: { original } }) => {
      const _identification = original.identification;
      const _date = moment(original.foundDate).format("YYYY-MM-DD");
      const _day = _identification.identificationExpired.expiredValue;
      const _moon = _identification.identificationExpired.expiredType;
      const _nextDate =
        _moon === "Bulan" ? addMonths(_date, _day) : addDays(_date, _day);
      const _status = new Date(_nextDate) <= new Date();

      const getStatusStyles = (status, type) => {
        switch (type) {
          case true:
            return {
              backgroundColor: "#FFF5F8",
              color: "#F1416C",
              text: "Expired",
            };
          case false:
            switch (status) {
              case "Identified":
                return {
                  backgroundColor: "#FFF8DD",
                  color: "#F6C000",
                  text: "Identified",
                };
              case "Penyimpanan":
                return {
                  backgroundColor: "#EEF6FF",
                  color: "#3E97FF",
                  text: "Penyimpanan",
                };
              default:
                return null; // Mengembalikan null jika status tidak ditemukan
            }
          default:
            return null;
        }
      };
      const statusStyles = getStatusStyles(original.foundStatus, _status);

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
              {statusStyles ? statusStyles.text : "-"}
            </Typography>
          </Box>
        </Box>
      );
    },
  },
];
export default ColumnShape;
