import React, { useEffect, useContext, useState, useRef } from "react";
import {
  Box,
  Grid,
  Stack,
  Button,
  Snackbar,
  Alert,
  Backdrop,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Typography,
  styled,
  Hidden,
  Dialog,
} from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";
import { KeyboardArrowDown } from "@mui/icons-material";
import moment from "moment";
import QrCode from "qrcode";
import imageCompression from "browser-image-compression";

import CustomNewTableDetail from "Component/CustomTable/CustomNewTableDetail";
import CustomNewHeader from "Component/Headers/CustomNewHeader";
import Title14400 from "Component/Typographys/Title14400";
import Title16500 from "Component/Typographys/Title16500";
import Title14600 from "Component/Typographys/Title14600";
import Title18700 from "Component/Typographys/Title18700";
import Title16700 from "Component/Typographys/Title16700";
import CardProfil from "Component/Cards/CardProfil";
import ButtonSubmit from "Component/Buttons/ButtonSubmit";
import AppTextField from "Component/input-fields/AppTextField";
import MultiUpload from "Component/MultiUpload/MultiUpload";
import CardInputBM from "Component/Cards/CardInputBM";
import CardBarangMobile from "Component/Cards/CardBarangMobile";
import AppAvatar from "Component/avatars/AppAvatar";
import GenerateQr from 'Component/GenerateQRCode/GenerateQr';

import ListDetail from "Page-Sections/PenghapusBukuan/Data/ListDetail";
import ColumnShapeDetail from "Page-Sections/PenghapusBukuan/column-space-detail";
import CustomTableHeader from "Page-Sections/PenghapusBukuan/CustomTableHeader";

import PhotoDR from "Assets/qr-code.png";
import NoImage from "Assets/no-image.jpg";

import API from "Services/Api";
import StaticVar from "Config/StaticVar";
import { UserProfilContext } from "Context/UserProfile";
import { LostFoundContext } from "Context/LostFound";

const BodyTableCell = styled(TableCell)(() => ({
  fontSize: 12,
  fontWeight: 600,
  "&:last-of-type": {
    textAlign: "right",
  },
}));

function DetailPenghapusBukuan() {
  const navigate = useNavigate();
  const location = useLocation();
  const { dataRemove } = location.state;

  // context
  const { userProfilById, profilOfficer, getAllOfficer, userProfile } =
    useContext(UserProfilContext);

  // state
  const [allData, setAllData] = useState([]);

  const [officer, setOfficer] = useState("");
  const [officerName, setOfficerName] = useState("");
  const [officerPosition, setOfficerPosition] = useState("");
  const [officerDepartemen, setOfficerDepartemen] = useState("");
  //   const [officerId, setOfficerId] = useState({
  //     officerId: "",
  //     officerName: "",
  //     officerPosition: "",
  //     officerDepartemen: "",
  //   });

  const [qrOfficer, setQrOfficer] = useState({
    removedBy: "",
    providedBy: "",
  });

  const [loading, setLoading] = useState(false);
  const [notifMsg, setNotifMsg] = useState("");
  const [notif, setNotif] = useState(false);

  const [images, setImages] = useState([]);
  const [errors, setErrors] = useState([]);
  const [statusUpload, setStatusUpload] = useState(false);

  const [statusError, setStatusError] = useState(false);
  const [dialogImage, setDialogImage] = useState(false);
  const [rowImage, setRowImage] = useState(null);

  // handle
  const handleBack = () => {
    navigate(-1);
  };

  const handleUpdateItem = (type, e, id) => {
    const _updateData = allData.map((item) => {
      // Pastikan item.removeItems adalah objek
      if (item.removeItems.idNumber === id) {
        if (type === "noteApproval") {
          item.removeItems.infoApproval = e.target.value;
        }
        if (type === "noteRemove") {
          item.removeItems.infoRemove = e.target.value;
        }
      }
      
      // Kembalikan item yang sudah dimodifikasi atau tidak dimodifikasi
      return item;
    });
  
    setAllData(_updateData);
      // console.log('update field', _updateData);
  };

  const handleSubmit = async (type) => {
    // const postData = {};
    if (type === "Disetujui" || type === "Ditolak") {

      const newData = allData.map(item => {
        return {
          ...item,
            approvalBy: {
              ...userProfile,
              approvalDate: new Date()
            },
            removeStatus: type === "Ditolak" ? "Ditolak" : "Disetujui",
        }
      })

      // const postData = {
      //   ...dataRemove,
      //   removeItems: allData, // foto, no.laporan, jenis barang,  keterangan
      //   approvalBy: userProfile,
      //   removeStatus: type === "Ditolak" ? "Ditolak" : "Disetujui",
      // };

      // console.log('newData', newData)
      const result = await API.putManyGoodsRemove(newData);
      if (result.statusText === "OK") {
        navigate(-1);
        // window.location.reload();
        console.log("data post persetujuan");
      } else {
        setNotifMsg("Gagal!");
        setLoading(false);
      }
    } else {
      if (!images || images.length === 0) {
        alert("No files selected.");
        return;
      }
      const formData = new FormData();
      images.forEach((image) => {
        formData.append("files", image.file);
      });
      const respon = await API.postManyImage("penghapusbukuan", formData);

      if (respon.statusText === "OK") {
        setStatusUpload(true);
        console.log("upload image berhasil");

        const postData = {
          ...dataRemove,
          removeItems: allData, // foto, no.laporan, jenis barang,  keterangan
          removeBy: userProfile,
          providedBy: {
            officerName,
            officerPosition,
            officerDepartemen,
          }, // petugas yg menerima
          removeStatus: "Dihapuskan",
          photoItem: respon.data,
        };
        console.log("data post penghapusan");

        const result = await API.putGoodsRemove(dataRemove?._id, postData);
        if (result.statusText === "OK") {
          navigate(-1);
          // window.location.reload();
        } else {
          setNotifMsg("Gagal!");
          setLoading(false);
        }
      }
    }
  };

  const handleImageChange = async (event) => {
    const files = Array.from(event.target.files);
    const validFiles = files.filter(
      (file) =>
        file.type === "image/jpeg" ||
        file.type === "image/jpg" ||
        file.type === "image/png"
    );

    if (validFiles.length !== files.length) {
      setErrors([
        ...errors,
        "Maaf, file yang Anda upload memiliki format yang salah. Silahkan Pilih format yang sesuai (JPEG, JPG, PNG)",
      ]);
    }

    const compressedFilesPromises = validFiles.map(async (file) => {
      const options = {
        maxSizeMB: 1, // Maximum size in MB
        maxWidthOrHeight: 1024, // Maximum width or height in pixels
        useWebWorker: true, // Use web worker for faster compression
      };
      try {
        const compressedFile = await imageCompression(file, options);
        return {
          file: compressedFile,
          preview: URL.createObjectURL(compressedFile),
        };
      } catch (error) {
        console.error("Error compressing image:", error);
        return {
          file,
          preview: URL.createObjectURL(file),
        };
      }
    });

    const compressedFiles = await Promise.all(compressedFilesPromises);

    setImages((prevImages) => [...prevImages, ...compressedFiles]);
  };

  const handleDeleteImage = (index) => {
    setImages(images.filter((_, i) => i !== index));
  };

  const handleImageError = () => {
    setStatusError(true);
  };

  const handleOpenImage = (type, dataRow) => {
    // console.log("data gambar", dataRow);
    setDialogImage(true);
    if (type === "Ada") {
      const photo = dataRow;
      const _foundPhoto = photo?.uploadedFiles[0]?.uploadedName;
      const _pathPhoto = photo?.path;
      const imageUrl = `${StaticVar.URL_API}/uploads/${_pathPhoto}/${_foundPhoto}`;
      setRowImage(imageUrl);
    } else {
      setRowImage(dataRow);
    }
  };

  useEffect(() => {
    getAllOfficer();
  }, []);

  useEffect(() => {
    const dataItem = dataRemove.items.map((item) => ({
      ...item,
      removeItems : {
        ...item.removeItems,
        infoApproval: item.infoApproval || "",
        infoRemove: item.infoRemove || "",
      }
    }))
    setAllData(dataItem)
  }, [dataRemove])

  // console.log('datail barang', allData)

  return (
    <Box
      sx={{
        padding: { xs: "15px", sm: "30px" },
        background: "#FFF",
        minHeight: "100vh",
      }}
    >
      <Snackbar
        open={notif}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        autoHideDuration={6000}
        onClose={(event, reason) => {
          if (reason === "clickaway") {
            return;
          }

          setNotif(false);
        }}
      >
        <Alert
          onClose={(event, reason) => {
            if (reason === "clickaway") {
              return;
            }

            setNotif(false);
          }}
          severity="warning"
          sx={{ width: "100%" }}
        >
          {notifMsg}
        </Alert>
      </Snackbar>
      <Backdrop sx={{ color: "#fff", zIndex: 9999 }} open={loading}>
        <CircularProgress color="inherit" />
      </Backdrop>

      <Grid container spacing={2}>
        <Grid item xs={12} sm={12}>
          <CustomNewHeader
            judul="PENGHAPUSBUKUAN BARANG"
            title1="Home - Lost & Found - Penghapusbukuan Barang  - "
            title2="Detail Penghapusbukuan Barang "
          />
        </Grid>

        {dataRemove?.removeStatus === "Diajukan" ? (
          <>
            <Grid item xs={12} sm={12} sx={{ my: 3 }}>
              <CardProfil />
            </Grid>
            <Grid item xs={12} sm={12}>
              <Title16700 text="YANG MENGAJUKAN" />
            </Grid>
            <Grid item xs={12} sm={4}>
              <Title14600 text="Nama" />
              <Title14400 text={dataRemove?.submissiondBy?.officerName} />
            </Grid>
            <Grid item xs={12} sm={4}>
              <Title14600 text="Jabatan" />
              <Title14400 text={dataRemove?.submissiondBy?.officerPosition} />
            </Grid>
            <Grid item xs={12} sm={4}>
              <Title14600 text="Departemen" />
              <Title14400 text={dataRemove?.submissiondBy?.officerDepartemen} />
            </Grid>
            <Grid item xs={12} sm={12} sx={{ mt: 3 }}>
              <Title16700 text="DAFTAR BARANG" />
            </Grid>

            {/* Versi Destop */}
            <Hidden only={["xs"]}>
              <Grid item xs={12} sm={12}>
                <CustomTableHeader
                  tebleBodyConten={
                    <>
                      {allData.length > 0
                        ? allData.map((item) => {
                            const _barang = item?.removeItems
                            const photo = _barang?.foundPhoto;
                            const _foundPhoto =
                              photo?.uploadedFiles[0]?.uploadedName;
                            const _pathPhoto = photo?.path;
                            return (
                              <TableRow key={_barang?.idNumber}>
                                <BodyTableCell>
                                  <Box>
                                    {_barang.foundPhoto !== null ? (
                                      <AppAvatar
                                        src={
                                          StaticVar.URL_API +
                                          "/uploads" +
                                          `/${_pathPhoto}` +
                                          `/${_foundPhoto}`
                                        }
                                        sx={{
                                          borderRadius: "10%",
                                          width: 50,
                                          height: 50,
                                        }}
                                      />
                                    ) : (
                                      <Typography
                                        sx={{ fontSize: 13, fontWeight: 400 }}
                                      >
                                        Gambar
                                      </Typography>
                                    )}
                                  </Box>
                                </BodyTableCell>
                                <BodyTableCell>
                                  <Typography
                                    noWrap={false}
                                    sx={{ fontSize: 13, fontWeight: 400 }}
                                  >
                                    {_barang?.foundName}
                                  </Typography>
                                  <Typography
                                    sx={{
                                      fontSize: 13,
                                      fontWeight: 400,
                                      color: "#BABBBC",
                                    }}
                                  >
                                    {_barang?.idNumber}
                                  </Typography>
                                </BodyTableCell>
                                <BodyTableCell>
                                  <Typography
                                    noWrap={false}
                                    sx={{ fontSize: 13, fontWeight: 400 }}
                                  >
                                    {_barang?.foundType}
                                  </Typography>
                                </BodyTableCell>
                                <BodyTableCell>
                                  <Typography
                                    noWrap={false}
                                    sx={{ fontSize: 13, fontWeight: 400 }}
                                  >
                                    {_barang?.locationStorage}
                                  </Typography>
                                </BodyTableCell>
                                <BodyTableCell>
                                  <Typography
                                    noWrap={false}
                                    sx={{ fontSize: 13, fontWeight: 400 }}
                                  >
                                    {_barang?.infoSubmission}
                                  </Typography>
                                  <Typography
                                    sx={{
                                      fontSize: 13,
                                      fontWeight: 400,
                                      color: "#BABBBC",
                                    }}
                                  >
                                    {_barang?.noteSubmission}
                                  </Typography>
                                </BodyTableCell>
                                <BodyTableCell>
                                  <AppTextField
                                    fullWidth
                                    size="small"
                                    label="Keterangan"
                                    onChange={(e) =>
                                      handleUpdateItem(
                                        "noteApproval",
                                        e,
                                        _barang?.idNumber
                                      )
                                    }
                                  />
                                </BodyTableCell>
                              </TableRow>
                            );
                          })
                        : null}
                    </>
                  }
                />
              </Grid>
            </Hidden>

            {/* Versi Mobile */}
            <Hidden only={["sm", "md", "lg", "xl"]}>
              {allData.length > 0
                ? allData.map((item) => (
                    <Grid item xs={12} sm={12}>
                      <CardInputBM
                        info1="Nomor Barang"
                        value1={item?.idNumber}
                        info2="Nama Barang"
                        value2={item.foundName}
                        info3="Lokasi Terakhir"
                        value3={<Title14400 text={item.locationStorage} />}
                        info4="Catatan"
                        value4={
                          <AppTextField
                            fullWidth
                            size="small"
                            label="Keterangan"
                            onChange={(e) =>
                              handleUpdateItem("noteApproval", e, item.idNumber)
                            }
                          />
                        }
                      />
                    </Grid>
                  ))
                : null}
            </Hidden>

            <Grid
              item
              xs={12}
              sm={12}
              sx={{
                display: "flex",
                justifyContent: "flex-end",
                marginTop: 3,
                mb: 7
              }}
            >
              <Stack direction="row" spacing={2}>
                <Button
                  variant="text"
                  color="error"
                  sx={{ padding: "10px 35px" }}
                  onClick={handleBack}
                >
                  Batal
                </Button>
                <Button
                  variant="contained"
                  sx={{ padding: "10px 35px" }}
                  onClick={() => handleSubmit("Ditolak")}
                  color="error"
                >
                  Tolak
                </Button>
                <ButtonSubmit
                  title="Setuju"
                  onClick={() => handleSubmit("Disetujui")}
                />
              </Stack>
            </Grid>
          </>
        ) : null}

        {dataRemove?.removeStatus === "Ditolak" ||
        dataRemove?.removeStatus === "Disetujui" ? (
          <>
            <Grid item xs={12} sm={12} sx={{ my: 3 }}>
              <CardProfil />
            </Grid>

            <Grid item xs={12} sm={12} sx={{ mt: 3 }}>
              <Title16700 text="YANG MENERIMA" />
            </Grid>
            <Grid item xs={12} sm={3}>
              <AppTextField
                fullWidth
                label="Nama Petugas"
                value={officerName}
                onChange={(e) => setOfficerName(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={3}>
              <AppTextField
                fullWidth
                label="Jabatan"
                value={officerPosition}
                onChange={(e) => setOfficerPosition(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={3}>
              <AppTextField
                fullWidth
                label="Departemen"
                value={officerDepartemen}
                onChange={(e) => setOfficerDepartemen(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={12} sx={{ mt: 3 }}>
              <Title16700 text="DAFTAR BARANG" />
            </Grid>

            {/* Versi Destop */}
            <Hidden only={["xs"]}>
              <Grid item xs={12} sm={12}>
                <CustomTableHeader
                  tebleBodyConten={
                    <>
                      {allData.length > 0
                        ? allData.map((item) => {
                            // console.log('data barang', item)
                            const photo = item.foundPhoto;
                            const _foundPhoto =
                              photo?.uploadedFiles[0]?.uploadedName;
                            const _pathPhoto = photo?.path;
                            // console.log('original.foundPhoto', _foundPhoto, _pathPhoto);
                            return (
                              <TableRow key={item.idNumber}>
                                <BodyTableCell>
                                  {statusError === false ? (
                                    <Box
                                      onClick={(e) =>
                                        handleOpenImage("Ada", item.foundPhoto)
                                      }
                                    >
                                      <img
                                        src={
                                          StaticVar.URL_API +
                                          "/uploads" +
                                          `/${_pathPhoto}` +
                                          `/${_foundPhoto}`
                                        }
                                        style={{
                                          borderRadius: "10%",
                                          width: 50,
                                          height: 50,
                                        }}
                                        onError={handleImageError}
                                      />
                                    </Box>
                                  ) : (
                                    <Box
                                      onClick={(e) =>
                                        handleOpenImage("Tidak Ada", NoImage)
                                      }
                                    >
                                      <img
                                        src={NoImage}
                                        style={{
                                          borderRadius: "10%",
                                          width: 50,
                                          height: 50,
                                        }}
                                      />
                                    </Box>
                                  )}
                                </BodyTableCell>
                                <BodyTableCell>
                                  <Typography
                                    noWrap={false}
                                    sx={{ fontSize: 13, fontWeight: 400 }}
                                  >
                                    {item.foundName}
                                  </Typography>
                                  <Typography
                                    sx={{
                                      fontSize: 13,
                                      fontWeight: 400,
                                      color: "#BABBBC",
                                    }}
                                  >
                                    {item?.idNumber}
                                  </Typography>
                                </BodyTableCell>
                                <BodyTableCell>
                                  <Typography
                                    noWrap={false}
                                    sx={{ fontSize: 13, fontWeight: 400 }}
                                  >
                                    {item.foundType}
                                  </Typography>
                                </BodyTableCell>
                                <BodyTableCell>
                                  <Typography
                                    noWrap={false}
                                    sx={{ fontSize: 13, fontWeight: 400 }}
                                  >
                                    {item.locationStorage}
                                  </Typography>
                                </BodyTableCell>
                                <BodyTableCell>
                                  <Typography
                                    noWrap={false}
                                    sx={{ fontSize: 13, fontWeight: 400 }}
                                  >
                                    {item.infoSubmission}
                                  </Typography>
                                  <Typography
                                    sx={{
                                      fontSize: 13,
                                      fontWeight: 400,
                                      color: "#BABBBC",
                                    }}
                                  >
                                    {item?.noteSubmission}
                                  </Typography>
                                </BodyTableCell>
                                <BodyTableCell>
                                  <AppTextField
                                    fullWidth
                                    size="small"
                                    label="Keterangan"
                                    onChange={(e) =>
                                      handleUpdateItem(
                                        "noteRemove",
                                        e,
                                        item.idNumber
                                      )
                                    }
                                  />
                                </BodyTableCell>
                              </TableRow>
                            );
                          })
                        : null}
                    </>
                  }
                />
                {/* <CustomNewTableDetail
								data={allData}
								columnShape={ColumnShapeDetail({
									onChangeRemove: handleChangeRemove,
								})}
							/> */}
              </Grid>
            </Hidden>

            {/* Versi Mobile */}
            <Hidden only={["sm", "md", "lg", "xl"]}>
              {allData.length > 0
                ? allData.map((item) => {
                    return (
                      <Grid item xs={12} sm={12}>
                        <CardInputBM
                          info1="Nomor Barang"
                          value1={item?.idNumber}
                          info2="Nama Barang"
                          value2={item.foundName}
                          info3="Lokasi Terakhir"
                          value3={<Title14400 text={item.locationStorage} />}
                          info4="Catatan"
                          value4={
                            <AppTextField
                              fullWidth
                              size="small"
                              label="Keterangan"
                              onChange={(e) =>
                                handleUpdateItem("noteRemove", e, item.idNumber)
                              }
                            />
                          }
                        />
                      </Grid>
                    );
                  })
                : null}
            </Hidden>

            <Grid item xs={12} sm={6}>
              <MultiUpload
                images={images}
                errors={errors}
                handleImageChange={handleImageChange}
                handleDeleteImage={handleDeleteImage}
                // handleUpload={handleUpload}
                status={statusUpload}
              />
            </Grid>

            <Grid
              item
              xs={12}
              sm={12}
              sx={{
                display: "flex",
                justifyContent: "flex-end",
                marginTop: 3,
                mb: { xs: 5, sm: 7 },
              }}
            >
              <Stack direction="row">
                <Button
                  variant="text"
                  color="error"
                  sx={{ padding: "10px 35px" }}
                  onClick={handleBack}
                >
                  Batal
                </Button>
                <ButtonSubmit
                  title="Submit"
                  onClick={() => handleSubmit("Dihapuskan")}
                />
              </Stack>
            </Grid>
          </>
        ) : null}

        {dataRemove?.removeStatus === "Dihapuskan" ? (
          <>
            <Grid
              item
              xs={12}
              sm={12}
              sx={{ display: "flex", justifyContent: "center", mt: 3 }}
            >
              <Title18700 text="BERITA ACARA SERAH TERIMA" />
            </Grid>
            <Grid item xs={12} sm={12}>
              <Stack direction="column" spacing={2}>
                <Title14400
                  text={
                    "Pada tanggal " +
                    moment(dataRemove?.providedBy?.officerDate).format(
                      "DD/MM/YYYY"
                    ) +
                    " pukul " +
                    moment(dataRemove?.providedBy?.officerDate).format(
                      "HH:mm"
                    ) +
                    " telah dilakukan serah terima antara Pihak"
                  }
                />
                <Stack direction="row" spacing={2}>
                  <Box>
                    <Title14400 text="1." />
                  </Box>
                  <Stack direction="column" spacing={2}>
                    <Title14400 text="Nama" />
                    <Title14400 text="Jabatan" />
                    <Title14400 text="Divis/Dept" />
                  </Stack>
                  <Stack direction="column" spacing={2}>
                    <Title14400
                      text={": " + dataRemove?.removeBy?.officerName}
                    />
                    <Title14400
                      text={": " + dataRemove?.removeBy?.officerPosition}
                    />
                    <Title14400
                      text={": " + dataRemove?.removeBy?.officerDepartemen}
                    />
                  </Stack>
                </Stack>
                <Stack direction="row" spacing={2}>
                  <Box>
                    <Title14400 text="2." />
                  </Box>
                  <Stack direction="column" spacing={2}>
                    <Title14400 text="Nama" />
                    <Title14400 text="Jabatan" />
                    <Title14400 text="Divis/Dept" />
                  </Stack>
                  <Stack direction="column" spacing={2}>
                    <Title14400
                      text={": " + dataRemove?.providedBy?.officerName}
                    />
                    <Title14400
                      text={": " + dataRemove?.providedBy?.officerPosition}
                    />
                    <Title14400
                      text={": " + dataRemove?.providedBy?.officerDepartemen}
                    />
                  </Stack>
                </Stack>
                <Title14400 text="berupa:" />
              </Stack>
            </Grid>

            {/* Versi Destop */}
            <Hidden only={["xs"]}>
              <Grid item xs={12} sm={12}>
                <CustomNewTableDetail
                  data={dataRemove.removeItems}
                  columnShape={ColumnShapeDetail()}
                />
              </Grid>
            </Hidden>

            {/* Versi Mobile */}
            <Hidden only={["sm", "md", "lg", "xl"]}>
              {dataRemove.removeItems.length
                ? dataRemove.removeItems.map((item) => {
                    return (
                      <Grid item xs={12} sm={12}>
                        <CardBarangMobile
                          info1="Nama Barang"
                          value1={item.foundName}
                          info2="Lokasi Terakhir"
                          value21={item.locationStorage}
                          // value22=""
                          info3="Keterangan"
                          value31={item.infoSubmission}
                          value32={item.noteSubmission}
                        />
                      </Grid>
                    );
                  })
                : null}
            </Hidden>

            <Grid item xs={12} sm={12}>
              <Title14400
                text="Demikian berita acara serah terima ini dibuat oleh kedua Pihak untuk dapat dipergunakan 
			sebagaimana mestinya. Adapun yang diserahterimakan dalam kondisi baik."
              />
            </Grid>
            <Grid item xs={12} sm={6} sx={{ mt: 5 }}>
              <Stack direction="column" alignItems="center">
                <Title16500 text="Pihak Yang Menyerahkan" />
                  {
                    dataRemove?.removeBy.officerId ? (
                      <GenerateQr dataId={dataRemove?.removeBy.officerId} />
                    ) : (
                      <Box sx={{width: 150,
                        height: 150,}}></Box>
                    )
                  }
               
                <Title14400 text={dataRemove?.removeBy?.officerName} />
              </Stack>
            </Grid>
            <Grid item xs={12} sm={6} sx={{ mt: 5 }}>
              <Stack direction="column" alignItems="center">
                <Title16500 text="Pihak Yang Menerima" />
                
                {
                    dataRemove?.providedBy.officerId ? (
                      <GenerateQr dataId={dataRemove?.providedBy.officerId} />
                    ) : (
                      <Box sx={{width: 150,
                        height: 150,}}></Box>
                    )
                  }
                <Title14400 text={dataRemove?.providedBy?.officerName} />
              </Stack>
            </Grid>
            <Grid
              item
              xs={12}
              sm={12}
              sx={{
                display: "flex",
                justifyContent: "flex-end",
                marginTop: 3,
                mb: 7
              }}
            >
              <Stack direction="row">
                <Button
                  variant="text"
                  sx={{ padding: "10px 35px 5px" }}
                  onClick={handleBack}
                  color="error"
                >
                  Back
                </Button>
                {/* <ButtonSubmit title="Cetak" /> */}
              </Stack>
            </Grid>
          </>
        ) : null}
      </Grid>

      {/* Pop Up Gambar */}
      <Dialog
        fullWidth={true}
        maxWidth="sm"
        open={dialogImage}
        onClose={() => setDialogImage(false)}
      >
        <img
          src={rowImage}
          style={{
            borderRadius: "10%",
            width: "100%",
          }}
        />
      </Dialog>
    </Box>
  );
}

export default DetailPenghapusBukuan;
