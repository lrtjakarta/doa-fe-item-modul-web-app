import {
  Box,
  Grid,
  Stack,
  Snackbar,
  Alert,
  Backdrop,
  IconButton,
  Hidden,
  Button,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { KeyboardArrowDown } from "@mui/icons-material";
import CircularProgress from "@mui/material/CircularProgress";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";

import { useNavigate } from "react-router-dom";
import imageCompression from "browser-image-compression";

import CustomNewHeader from "Component/Headers/CustomNewHeader";
import Title16700 from "Component/Typographys/Title16700";
import Title18700 from "Component/Typographys/Title18700";
import Title16500 from "Component/Typographys/Title16500";
import AppTextField from "Component/input-fields/AppTextField";
import ButtonText from "Component/Buttons/ButtonText";
import ButtonSubmit from "Component/Buttons/ButtonSubmit";
import CustomNewTableDetail from "Component/CustomTable/CustomNewTableDetail";
import CardProfil from "Component/Cards/CardProfil";
import ButtonContainer from "Component/Buttons/ButtonContainer";

import ColumnShapeAdd from "Page-Sections/PeminjamanPengembalian/column-shape-add";
import ListForm from "Page-Sections/PeminjamanPengembalian/Data/ListForm";

import React, { useEffect, useContext, useState } from "react";

import API from "Services/Api";
import { UserProfilContext } from "Context/UserProfile";
import { StasiunContext } from "Context/Stasiun";
import CardAdd from "Page-Sections/PeminjamanPengembalian/Cards/CardAdd";
import Title14600 from "Component/Typographys/Title14600";
import AppModalMedium from "Component/AppModalMedium";
import MultiUpload from "Component/MultiUpload/MultiUpload";

function FormPeminjaman() {
  const navigate = useNavigate();

  // context
  const { userProfilById, profilOfficer, getAllOfficer, userProfile } =
    useContext(UserProfilContext);
  const { dataStasiun, getAllStasiun } = useContext(StasiunContext);

  // useState
  const [loanDate, setLoanDate] = useState(new Date());
  const [officer, setOfficer] = useState("");
  const [officerId, setOfficerId] = useState({
    officerId: "",
    officerName: "",
    officerPosition: "",
    officerDepartemen: "",
  });
  const [itemName, setItemName] = useState("");
  const [itemTotal, setItemTotal] = useState();
  const [itemInfo, setItemInfo] = useState("");
  const [loanItem, setLoanItem] = useState([]);
  const [stasiunPeminjam, setStasiunPeminjam] = useState(null);
  const [stasiunMeminjam, setStasiunMeminjam] = useState(null);

  const [loading, setLoading] = useState(false);
  const [notifMsg, setNotifMsg] = useState("");
  const [notif, setNotif] = useState(false);

  const [dialogPhoto, setDialogPhoto] = useState(false);
  const [dataRow, setDataRow] = useState(null)
  const [images, setImages] = useState([]);
  const [errors, setErrors] = useState([]);
  const [statusUpload, setStatusUpload] = useState(false);

  // handle
  const handleOfficer = (e) => {
    setOfficer(e.target.value);
    const _officerById = profilOfficer
      .filter((x) => x._id === e.target.value)
      .map((item) => {
        return {
          officerId: item._id,
          officerName: item.name,
          officerPosition: item.jobPosition.name,
          officerDepartemen: item.departement.name,
        };
      });
    // console.log('data officer by id', _officerById)
    setOfficerId(_officerById[0]);
  };

  const resetItem = () => {
    setItemName("");
    setItemTotal("");
    setItemInfo("");
  };

  // generate nomor barang
  const generateUniqueNumber = () => {
    const chars =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let result = "";
    for (let i = 0; i < 5; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  };

  const handleAddItems = () => {
    const jumlah = parseInt(itemTotal, 10);

    const newBarangList = [];
    for (let i = 0; i < jumlah; i++) {
      newBarangList.push({
        itemName,
        itemTotal: 1,
        itemInfo,
        itemNumber: generateUniqueNumber(),
        photo: null,
        file: null
        // loanStatus: "Dipinjam",
      });
    }

    setLoanItem([...loanItem, ...newBarangList]);
    resetItem();
  };

  const handleDelete = (row) => {
    const _dataFilter = loanItem.filter((x) => x.itemNumber !== row.itemNumber);
    setLoanItem(_dataFilter);
  };

  const handleBack = () => {
    navigate(-1);
  };

  const handlePhoto = (row) => {
    // console.log(row)
    setDataRow(row)
    setDialogPhoto(true);
    setImages([])
  };

  const handleImageChange = async (event) => {
    // console.log('data change', event.target.files)
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

    // const newImages = validFiles.map(file => ({
    // 	file,
    // 	preview: URL.createObjectURL(file),
    // }));

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

      // console.log('compressedFiles', compressedFiles)

    setImages((prevImages) => [...prevImages, ...compressedFiles]);
  };

  const handleDeleteImage = (index) => {
    setImages(images.filter((_, i) => i !== index));
  };

  const handleSavePhoto = () => {
	const updatePhoto = loanItem.filter(x => x.itemNumber === dataRow.itemNumber).map(item => {
		return {
			...item,
      file: images
		}
	})
  const _dataFilter = loanItem.filter((x) => x.itemNumber !== dataRow.itemNumber);

  setLoanItem([..._dataFilter, ...updatePhoto]);
  setDialogPhoto(false);
  setImages([])
  };

  const handleSubmit = async (e) => {
    const result = await handleSave(e)
    // return  
    if (result.statusText === "OK") {
      navigate(-1);
    } else {
      setNotifMsg("Gagal!");
      setLoading(false);
    }
  };

  const handleSave = async() => {

    // upload all photo
    const uploadedPhotos = await Promise.all(
      loanItem.map(async (barang) => {
        if (barang.file) {
          const formData = new FormData();
          barang.file.forEach(image => {
            formData.append('files', image.file);
          });
          const respon = await API.postManyImage('peminjaman/pengambilan', formData);
          // console.log('respon', respon)
          return { ...barang, photo: respon.data};
        }
        return barang;
      })
    );

    const _lendingStasiun = dataStasiun
      .filter((x) => x._id === stasiunPeminjam)
      .map((item) => {
        return {
          id: item._id,
          stationName: item.stationName,
          stationCode: item.stationCode,
        };
      });
    const _borrowingStasiun = dataStasiun
      .filter((x) => x._id === stasiunMeminjam)
      .map((item) => {
        return {
          id: item._id,
          stationName: item.stationName,
          stationCode: item.stationCode,
        };
      });
    const postData = {
      loanItem: uploadedPhotos,
      loanDate,
      loanGiverBy: userProfile,
      loanAppliBy: officerId,
      lendingStasiun: _lendingStasiun[0], // stasiun peminjam
      borrowingStasiun: _borrowingStasiun[0], // stasiun meminjamkan
	  loanStatus: "Dipinjam"
    };
    // console.log('data post', postData)
    return API.postGoodsLoanReturn(postData);
  };

  // useEffect
  useEffect(() => {
    getAllOfficer({ isLimit: false });
    getAllStasiun();
  }, []);

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

      <Grid container spacing={3}>
        <Grid item xs={12} sm={12}>
          <CustomNewHeader
            judul="FORM PEMINJAMAN  BARANG"
            title1="Home - Piminjaman & Pengembalian Barang - "
            title2="Form Peminjaman Barang"
          />
        </Grid>
        <Grid
          item
          xs={12}
          sm={12}
          sx={{ display: "flex", justifyContent: "center" }}
        >
          <Box>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={12}>
                <CardProfil />
              </Grid>
              <Grid item xs={12} sm={12} sx={{ mt: 3 }}>
                <Title16700 text="INFORMASI WAKTU" />
              </Grid>
              <Grid item xs={12} sm={4}>
                <DatePicker
                  label="Tanggal"
                  value={loanDate}
                  onChange={(date) => setLoanDate(date)}
                  slots={{
                    textField: AppTextField,
                  }}
                  slotProps={{
                    textField: {
                      fullWidth: true,
                    },
                  }}
                  format="dd/MM/yyyy"
                />
              </Grid>
              <Grid item xs={12} sm={12} sx={{ mt: 3 }}>
                <Title16700 text="INFO STASIUN" />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Title14600 text="Stasiun Peminjam" />
                <AppTextField
                  select
                  fullWidth
                  size="small"
                  label="Pilih Stasiun"
                  SelectProps={{
                    native: true,
                    IconComponent: KeyboardArrowDown,
                  }}
                  sx={{ mt: "10px" }}
                  value={stasiunPeminjam}
                  onChange={(e) => setStasiunPeminjam(e.target.value)}
                >
                  <option value=""></option>
                  {dataStasiun.map((item) => {
                    return <option value={item._id}>{item.stationName}</option>;
                  })}
                </AppTextField>
              </Grid>

              <Grid item xs={12} sm={6}>
                <Title14600 text="Stasiun yang Meminjamkan" />
                <AppTextField
                  select
                  fullWidth
                  size="small"
                  label="Pilih Stasiun"
                  SelectProps={{
                    native: true,
                    IconComponent: KeyboardArrowDown,
                  }}
                  sx={{ mt: "10px" }}
                  value={stasiunMeminjam}
                  onChange={(e) => setStasiunMeminjam(e.target.value)}
                >
                  <option value=""></option>
                  {dataStasiun.map((item) => {
                    return <option value={item._id}>{item.stationName}</option>;
                  })}
                </AppTextField>
              </Grid>
              <Grid item xs={12} sm={12} sx={{ mt: 3 }}>
                <Title16700 text="YANG MENGAJUKAN" />
              </Grid>
              <Grid item xs={12} sm={4}>
                <AppTextField
                  select
                  fullWidth
                  label="Nama Petugas"
                  SelectProps={{
                    native: true,
                    IconComponent: KeyboardArrowDown,
                  }}
                  value={officer}
                  onChange={handleOfficer}
                >
                  <option value=""></option>
                  {profilOfficer.length > 0
                    ? profilOfficer
                        ?.filter((x) => x._id !== userProfilById?._id)
                        .map((item) => {
                          return <option value={item._id}>{item.name}</option>;
                        })
                    : null}
                </AppTextField>
              </Grid>
              <Grid item xs={12} sm={3}>
                <AppTextField
                  fullWidth
                  label="Jabatan"
                  disabled
                  value={officerId?.officerPosition}
                />
              </Grid>
              <Grid item xs={12} sm={5}>
                <AppTextField
                  fullWidth
                  label="Departemen"
                  disabled
                  value={officerId?.officerDepartemen}
                />
              </Grid>
              <Grid item xs={12} sm={12} sx={{ mt: 3 }}>
                <Title16700 text="DAFTAR BARANG" />
              </Grid>
              <Grid item xs={12} sm={3.3}>
                <AppTextField
                  fullWidth
                  label="Tuliskan Nama Barang"
                  sx={{ mt: "0px" }}
                  value={itemName}
                  onChange={(e) => setItemName(e.target.value)}
                />
              </Grid>
              <Grid item xs={12} sm={3.3}>
                <AppTextField
                  fullWidth
                  label="Jumlah"
                  type="Number"
                  sx={{ mt: "0px" }}
                  value={itemTotal}
                  onChange={(e) => setItemTotal(e.target.value)}
                />
              </Grid>
              <Grid item xs={12} sm={3.3}>
                <AppTextField
                  fullWidth
                  label="Keterangan"
                  sx={{ mt: "0px" }}
                  value={itemInfo}
                  onChange={(e) => setItemInfo(e.target.value)}
                />
              </Grid>
              <Grid item xs={12} sm={2}>
                <IconButton onClick={handleAddItems}>
                  <AddCircleOutlineOutlinedIcon
                    color="primary"
                    sx={{ fontSize: 28 }}
                  />
                </IconButton>
              </Grid>

              {/* Versi Destop */}
              <Hidden only={["xs"]}>
                <Grid item xs={12} sm={12}>
                  {loanItem.length > 0 ? (
                    <CustomNewTableDetail
                      data={loanItem}
                      columnShape={ColumnShapeAdd({
                        onDelete: handleDelete,
                        onAdd: handlePhoto,
                      })}
                    />
                  ) : null}
                </Grid>
              </Hidden>

              {/* Versi Mobile */}
              <Hidden only={["sm", "md", "lg", "xl"]}>
                {loanItem.length > 0
                  ? loanItem.map((item) => {
                      return (
                        <Grid item xs={12} sm={12}>
                          <CardAdd
                            value1={item?.itemNumber}
                            value2={item?.itemName}
                            value3={item?.itemInfo}
                            onClick={() => handleDelete(item)}
                          />
                        </Grid>
                      );
                    })
                  : null}
              </Hidden>

              <Grid item xs={12} sm={12} sx={{ mt: 10, mb: { xs: 5, sm: 7 } }}>
                <Stack direction="row" justifyContent="flex-end" spacing={1}>
                  <ButtonText title="Batal" onClick={handleBack} />
                  <ButtonSubmit title="Submit" onClick={handleSubmit} />
                </Stack>
              </Grid>
            </Grid>
          </Box>
        </Grid>
      </Grid>

      <AppModalMedium open={dialogPhoto}>
        <Grid container>
          <Grid item xs={12} sm={12}>
            <MultiUpload
              images={images}
              errors={errors}
              handleImageChange={handleImageChange}
              handleDeleteImage={handleDeleteImage}
              status={statusUpload}
            />
          </Grid>
          {images.length > 0 && (
            <Grid
              item
              xs={12}
              sm={12}
              sx={{ mt: 3, display: "flex", justifyContent: "flex-end", mb: 7 }}
            >
              <Button variant="contained" onClick={handleSavePhoto}>
                Simpan
              </Button>
            </Grid>
          )}
        </Grid>
      </AppModalMedium>
    </Box>
  );
}

export default FormPeminjaman;
