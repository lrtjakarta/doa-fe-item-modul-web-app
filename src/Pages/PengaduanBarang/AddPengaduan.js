import React, { useContext, useEffect, useState } from "react";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import {
  Box,
  Card,
  Grid,
  Stack,
  Snackbar,
  Alert,
  Backdrop,
} from "@mui/material";
import { KeyboardArrowDown } from "@mui/icons-material";
import { useNavigate, useLocation } from "react-router-dom";
import moment from "moment";
import CircularProgress from "@mui/material/CircularProgress";
import { jwtDecode } from "jwt-decode";

import AppTextField from "Component/input-fields/AppTextField";
import CustomNewHeader from "Component/Headers/CustomNewHeader";
import Title16700 from "Component/Typographys/Title16700";
import Title14400 from "Component/Typographys/Title14400";
import ButtonText from "Component/Buttons/ButtonText";
import ButtonSubmit from "Component/Buttons/ButtonSubmit";
import CardProfil from "Component/Cards/CardProfil";

// data
import FoundLocation from "Page-Sections/PenemuanBarang/Data/FoundLocation";
import FoundName from "Page-Sections/PenemuanBarang/Data/FoundName";

import API from "Services/Api";
import { GoodsComplaintContext } from "Context/GoodsComplaint";
import { UserProfilContext } from "Context/UserProfile";
import { ItemsContext } from "Context/Items";
import { LocationContext } from "Context/Location";

function AddPengaduan() {
  const navigate = useNavigate();
  const location = useLocation();
  const { id, data } = location.state;

  const { getDataGoodsComplaint } = useContext(GoodsComplaintContext);
  const { userProfilById, userWorkorder, userProfile } =
    useContext(UserProfilContext);
  const { dataLocation, getDataLocation } = useContext(LocationContext);
  const { dataItems, getDataItems } = useContext(ItemsContext);

  const [loading, setLoading] = useState(false);
  const [notifMsg, setNotifMsg] = useState("");
  const [notif, setNotif] = useState(false);

  const [dateComplaint, setDateComplaint] = useState();
  const [timeComplaint, setTimeComplaint] = useState();
  const [officerName, setOfficerName] = useState("");
  const [officerJob, setOfficerJob] = useState("");
  const [complaintBy, setComplaintBy] = useState("");
  const [complaintIdentity, setComplaintIdentity] = useState("");
  const [complaintPhone, setComplaintPhone] = useState("");
  const [complaintEmail, setComplaintEmail] = useState("");
  const [error, setError] = useState(false);
  const [complaintAddress, setComplaintAddress] = useState("");
  const [complaintName, setComplaintName] = useState("");
  const [complaintType, setComplaintType] = useState("");
  const [idNumber, setIdNumber] = useState("");
  const [complaintLocation, setComplaintLocation] = useState("");
  const [complaintDescription, setComplaintDescription] = useState("");
  const [complaintChronology, setComplaintChronology] = useState("");

  const handleClose = () => {
    navigate(-1);
  };
  const handleGetDetail = async () => {
    // const result = await getDataGoodsComplaintById(id);

    setDateComplaint(data?.complaintDate);
    setTimeComplaint(data?.complaintTime);
    setOfficerName(data?.officer?.officerName);
    setOfficerJob(data?.officer?.officerJob);
    setComplaintBy(data?.complaintBy);
    setComplaintIdentity(data?.complaintIdentity);
    setComplaintPhone(data?.complaintPhone);
    setComplaintEmail(data?.complaintEmail);
    setComplaintAddress(data?.complaintAddress);
    setComplaintName(data?.complaintName);
    setComplaintType(data?.complaintType);
    setComplaintLocation(data?.complaintLocation);
    setComplaintDescription(data?.complaintDescription);
    setComplaintChronology(data?.complaintChronology);
    setIdNumber(data?.idNumber);
  };
  const handleSave = async (e) => {
    await setLoading(true);

    const result = await handleSubmit(e);
    // return;
    // console.log('result submit', result);
    if (result.statusText === "OK") {
      setLoading(false);
      getDataGoodsComplaint();
      if (id !== 0) {
        navigate("/manajemenBarang/pengaduan");
      } else {
        navigate(-1);
      }
    } else {
      setNotifMsg("Gagal!");
      setLoading(false);
    }
  };
  const handleSubmit = () => {
    let postData = {
      complaintName,
      complaintType,
      idNumber,
      code: "LO",
      complaintDescription,
      complaintLocation,
      complaintDate: dateComplaint,
      complaintTime: timeComplaint,
      complaintChronology,
      complaintBy,
      complaintIdentity,
      complaintPhone,
      complaintEmail,
      complaintAddress,
      complaintOfficer: userProfile,
      complaintStatus: "Belum Ditemukan",
    };
    // console.log("data post", postData);

    if (id !== 0) {
      return API.putGoodsComplaint(id, postData);
    } else {
      return API.postGoodsComplaint(postData);
    }
  };

  const handleChangeEmail = (e) => {
    setComplaintEmail(e.target.value);
    setError(!isValidEmail(e.target.value));
  };

  const isValidEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  useEffect(() => {
    getDataLocation();
    getDataItems();
    if (id !== 0) {
      handleGetDetail();
    }
  }, []);

  return (
    <Box sx={{ padding: { xs: "15px", sm: "30px" }, background: "#FFF" }}>
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
            judul="PENGADUAN BARANG"
            title1="Home - Lost & Found - Pengaduan Barang - "
            title2="Form Pengaduan Barang"
          />
        </Grid>
        <Grid
          item
          xs={12}
          sm={12}
          sx={{ display: "flex", justifyContent: "center" }}
        >
          <Box>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={12}>
                <CardProfil />
              </Grid>
              <Grid item xs={12} sm={12} sx={{ mt: 2 }}>
                <Box
                  sx={{
                    width: "100%",
                    backgroundColor: "#fff",
                    borderRadius: "10px",
                    padding: "15px",
                  }}
                >
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={12}>
                      <Title16700 text="WAKTU KEHILANGAN" />
                    </Grid>
                    <Grid
                      item
                      xs={12}
                      sm={6}
                      sx={{ display: "flex", alignItems: "center" }}
                    >
                      <Title14400 text="Pilih Tanggal dan Waktu Kehilangan Barang" />
                    </Grid>
                    <Grid item xs={12} sm={3}>
                      <DatePicker
                        value={dateComplaint}
                        onChange={(date) => setDateComplaint(date)}
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
                    <Grid item xs={12} sm={3}>
                      <TimePicker
                        value={timeComplaint}
                        onChange={(date) => setTimeComplaint(date)}
                        slots={{
                          textField: AppTextField,
                        }}
                        slotProps={{
                          textField: {
                            fullWidth: true,
                          },
                        }}
                      />
                    </Grid>
                  </Grid>
                </Box>
              </Grid>

              <Grid item xs={12} sm={12}>
                <Box
                  sx={{
                    width: "100%",
                    backgroundColor: "#fff",
                    borderRadius: "10px",
                    padding: "15px",
                  }}
                >
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={12}>
                      <Title16700 text="INFORMASI PENUMPANG" />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <AppTextField
                        fullWidth
                        label="Nama Penumpang"
                        value={complaintBy}
                        onChange={(e) => setComplaintBy(e.target.value)}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <AppTextField
                        fullWidth
                        label="Nomor Identitas"
                        value={complaintIdentity}
                        onChange={(e) => setComplaintIdentity(e.target.value)}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <AppTextField
                        fullWidth
                        label="Nomor Telepon Penumpang"
                        value={complaintPhone}
                        onChange={(e) => setComplaintPhone(e.target.value)}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <AppTextField
                        fullWidth
                        label="Alamat Email Penumpang"
                        value={complaintEmail}
                        onChange={handleChangeEmail}
                        type="email"
                        error={error}
                        helperText={
                          error ? "Masukkan alamat email yang valid" : ""
                        }
                      />
                    </Grid>
                    <Grid item xs={12} sm={12}>
                      <AppTextField
                        fullWidth
                        label="Alamat Tempat Tinggal"
                        value={complaintAddress}
                        onChange={(e) => setComplaintAddress(e.target.value)}
                      />
                    </Grid>
                  </Grid>
                </Box>
              </Grid>
              <Grid item xs={12} sm={12}>
                <Box
                  sx={{
                    width: "100%",
                    backgroundColor: "#fff",
                    borderRadius: "10px",
                    padding: "15px",
                  }}
                >
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={12}>
                      <Title16700 text="INFORMASI KEHILANGAN" />
                    </Grid>
                    <Grid item xs={12} sm={12}>
                      <AppTextField
                        fullWidth
                        label="Nama Barang"
                        value={complaintName}
                        onChange={(e) => setComplaintName(e.target.value)}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <AppTextField
                        select
                        fullWidth
                        label="Jenis Barang"
                        SelectProps={{
                          native: true,
                          IconComponent: KeyboardArrowDown,
                        }}
                        value={complaintType}
                        onChange={(e) => setComplaintType(e.target.value)}
                      >
                        <option value=""></option>
                        {dataItems
                          .sort((a, b) => a.itemName.localeCompare(b.itemName))
                          .map((item) => {
                            return (
                              <option value={item.itemName}>
                                {item.itemName}
                              </option>
                            );
                          })}
                      </AppTextField>
                    </Grid>

                    <Grid item xs={12} sm={6}>
                      <AppTextField
                        select
                        fullWidth
                        label="Lokasi Kehilangan"
                        SelectProps={{
                          native: true,
                          IconComponent: KeyboardArrowDown,
                        }}
                        value={complaintLocation}
                        onChange={(e) => setComplaintLocation(e.target.value)}
                      >
                        <option value=""></option>
                        {dataLocation
                          .filter((x) => x.locationType !== "storage")
                          .map((item) => {
                            return (
                              <option value={item.locationName}>
                                {item.locationName}
                              </option>
                            );
                          })}
                      </AppTextField>
                    </Grid>
                    <Grid item xs={12} sm={12}>
                      <AppTextField
                        fullWidth
                        label="Detail / Karakteristik Barang"
                        value={complaintDescription}
                        onChange={(e) =>
                          setComplaintDescription(e.target.value)
                        }
                      />
                    </Grid>
                    <Grid item xs={12} sm={12}>
                      <AppTextField
                        multiline
                        rows={3}
                        fullWidth
                        label="Kronologi Kehilangan Barang"
                        value={complaintChronology}
                        onChange={(e) => setComplaintChronology(e.target.value)}
                      />
                    </Grid>
                  </Grid>
                </Box>
              </Grid>
              <Grid
                item
                xs={12}
                sm={12}
                sx={{
                  display: "flex",
                  justifyContent: "flex-end",
                  mb: { xs: 5, sm: 7 },
                }}
              >
                <Stack direction="row" spacing={1}>
                  <ButtonText title="Batal" onClick={handleClose} />
                  <ButtonSubmit title="Submit" onClick={handleSave} />
                </Stack>
              </Grid>
            </Grid>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}

export default AddPengaduan;
