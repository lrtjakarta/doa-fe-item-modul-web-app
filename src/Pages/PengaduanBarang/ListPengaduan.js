import React, { useContext, useEffect, useState, useRef } from "react";
import "../style.css";

import {
  Grid,
  Typography,
  Button,
  IconButton,
  Box,
  Hidden,
  Dialog,
  Stack,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { KeyboardArrowDown } from "@mui/icons-material";
import PrintOutlinedIcon from '@mui/icons-material/PrintOutlined';
import { useNavigate } from "react-router-dom";
import { useReactToPrint } from 'react-to-print';

import CustomHeader from "Component/CustomHeader";
import AppTextField from "Component/input-fields/AppTextField";
import SearchInput from "Component/input-fields/SearchInput";
import CustomTableList from "Component/CustomTableList";
import CustomNewHeader from "Component/Headers/CustomNewHeader";
import ButtonContainer from "Component/Buttons/ButtonContainer";
import ButtonFilter from "Component/Buttons/ButtonFilter";
import ButtonStartIcon from "Component/Buttons/ButtonStartIcon";
import CustomNewTable from "Component/CustomTable/CustomNewTable";
import HeaderPrint from "Component/CustomPrints/HeaderPrint";
import Title14400 from "Component/Typographys/Title14400";


import columnShape from "Page-Sections/PengaduanBarang/column-shape1";
import LIST_DATA from "Page-Sections/PengaduanBarang/Data/ListData";
import BodyPrint from "Page-Sections/PengaduanBarang/PrintOutPengaduan/BodyPrint";

// Context
import API from "Services/Api";
import { GoodsComplaintContext } from "Context/GoodsComplaint";
import { LocationContext } from "Context/Location";
import CardMobile from "Component/Cards/CardMobile";
import moment from "moment";

function ListPengaduan() {
  const navigate = useNavigate();
  const printRef = useRef();
  const componentRef = useRef();

  const { dataGoodsComplaint, setDataGoodsComplaint, getDataGoodsComplaint } =
    useContext(GoodsComplaintContext);
  const { dataLocation, getDataLocation } = useContext(LocationContext);

  const [allData, setAllData] = useState([]);

  const [searchDate, setSearchDate] = useState();
  const [searchLocation, setSearchLocation] = useState("");
  const [search, setSearch] = useState("");

  const [status, setStatus] = useState(false);
  const [dataPrint, setDataPrint] = useState(null);

  const handleFilter = () => {};
  const handleClickAdd = () => {
    navigate("/manajemenBarang/pengaduan/add", { state: { id: 0 } });
  };
  const handleView = (row) => {
    navigate("/manajemenBarang/pengaduan/detail", {
      state: { id: row._id, data: row },
    });
  };

  const handleSearch = async () => {
    const filterData = {
      complaintDate: searchDate,
      location: searchLocation,
      complaintSearch: search,
    };

    const respon = await API.getGoodsComplaint({ params: filterData });
    if (respon.statusText === "OK") {
      setAllData(respon.data);
    }
  };

  // const handlePrint = (row) => {
  //   setStatus(true);
  //   setDataPrint(row);
  //   // console.log('data print', row)
  //   // return
  //   setTimeout(() => {
  //     const printContents = printRef.current.innerHTML;
  //     const originalContents = document.body.innerHTML;

  //     document.body.innerHTML = printContents;
  //     window.print();
  //     document.body.innerHTML = originalContents;
  //     window.location.reload();
  //   }, 0);
  // };

  const handleDialogPrint = (row) => {
		setStatus(true);
		setDataPrint(row);
	};

  const handlePrint = useReactToPrint({
		content: () => componentRef.current,
	});



  useEffect(() => {
    getDataGoodsComplaint();
    getDataLocation({multiLocation: ['found', 'storagefound']});
  }, []);

  useEffect(() => {
    setAllData(dataGoodsComplaint);
  }, [dataGoodsComplaint]);

  return (
    <Box sx={{ padding: { xs: "15px", sm: "30px" } }}>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={12}>
          <CustomNewHeader
            judul="Pengaduan Barang"
            title1="Home - Lost & Found - "
            title2="Daftar Pengaduan Barang"
          />
        </Grid>
        <Grid
          item
          xs={12}
          sm={8}
          sx={{
            display: "flex",
            flexDirection: { xs: "column", sm: "row" },
            gap: 2,
          }}
        >
          <Box sx={{ width: { xs: "100%", sm: "150px" } }}>
            <DatePicker
              label="Tanggal"
              value={searchDate}
              onChange={(date) => setSearchDate(date)}
              slots={{
                textField: AppTextField,
              }}
              slotProps={{
                textField: {
                  fullWidth: true,
                  size: "small",
                },
              }}
              sx={{ mt: "0px" }}
              format="dd/MM/yyyy"
            />
          </Box>
          <Box sx={{ width: { xs: "100%", sm: "150px" } }}>
            <AppTextField
              select
              fullWidth
              size="small"
              label="Lokasi Kehilangan"
              SelectProps={{
                native: true,
                IconComponent: KeyboardArrowDown,
              }}
              sx={{ mt: "0px" }}
              value={searchLocation}
              onChange={(e) => setSearchLocation(e.target.value)}
            >
              <option value=""></option>;
              {dataLocation.map((item) => {
                return (
                  <option value={item.locationName}>{item.locationName}</option>
                );
              })}
            </AppTextField>
          </Box>
          <Box sx={{ width: { xs: "100%", sm: "150px" } }}>
            <SearchInput
              placeholder="Search..."
              fullWidth
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </Box>
          <Box sx={{ width: { xs: "100%", sm: "150px" } }}>
            <ButtonContainer title="Cari" onClick={handleSearch} />
          </Box>
        </Grid>
        <Grid item xs={12} sm={4} sx={{display: 'flex', justifyContent: 'flex-end'}}>
        <Box sx={{ width: { xs: "100%", sm: "150px" } }}>
          <ButtonStartIcon title="Tambah" onClick={handleClickAdd} />
          </Box>
        </Grid>

        {/* Versi Destop */}
        <Hidden only={["xs"]}>
          <Grid item xs={12} sm={12} sx={{mb: 7}}>
            {dataGoodsComplaint.length > 0 ? (
              <CustomNewTable
                data={allData !== null ? allData : dataGoodsComplaint}
                columnShape={columnShape({
                  onView: handleView,
                  onPrint: handleDialogPrint,
                })}
              />
            ) : (
              <Box sx={{ display: "flex", justifyContent: "center" }}>
                <Title14400 text="Data Pengaduan Kosong!!!" />
              </Box>
            )}
          </Grid>
        </Hidden>

        {/* Versi Mobile */}
        <Hidden only={["sm", "md", "lg", "xl"]}>
          {allData.length > 0
            ? allData
                .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
                .map((item) => {
                  const _date = moment(item?.complaintDate).format("DD MMMM YYYY");
                  const _time = moment(item?.complaintTime).format("HH:mm");
                  return (
                    <Grid item xs={12} sm={12} sx={{ mt: 1 }}>
                      <CardMobile
                        onClick={() => handleView(item)}
                        status={item?.complaintStatus}
                        date= {_date + " " + _time}
                        info1="Jenis Barang"
                        value1={item?.complaintName}
                        info5="Nomor Pengaduan"
                        value5={item?.idNumber ? item?.idNumber : '-'}
                        info2="Lokasi Kehilangan"
                        value2={item?.complaintLocation}
                        info3="Pemilik"
                        value31= {item?.complaintBy}
                        value32=  {item?.complaintPhone}
                        info4='Detail/Katakteristik'
                        value4={item?.complaintDescription}
                      />
                    </Grid>
                  );
                })
            : null}
        </Hidden>
      </Grid>

      <Dialog open={status} fullScreen>
      <Stack
					direction="row"
					justifyContent="flex-end"
					spacing={2}
					sx={{ m: 3 }}
				>
					<Button
						sx={{ width: '100px' }}
						variant="outlined"
						onClick={() => setStatus(false)}
					>
						Kembali
					</Button>
					<Button
						sx={{ width: '100px' }}
						variant="contained"
						onClick={handlePrint}
						startIcon={<PrintOutlinedIcon />}
					>
						Print
					</Button>
         
				</Stack>
        <div ref={componentRef}>
          <Box sx={{p: 3, mb: 7}}>
            <HeaderPrint
              title="Lost & Found"
              number="LRTJ-FR-PEL-020"
              revisi="01"
              page="Page 4 of 5"
            />
            <BodyPrint dataId={dataPrint} />
            {/* <TtdPrint dataId={dataPrint} /> */}
            </Box>     
          </div>

      </Dialog>

      {/* Print */}
      {/* {status === true && (
        <div ref={printRef}>
          <HeaderPrint
            title="Lost & Found"
            number="LRTJ-FR-PEL-020"
            revisi="01"
            page="Page 4 of 5"
          />
          <BodyPrint dataId={dataPrint} />
          <TtdPrint dataId={dataPrint} />
        </div>
      )} */}
    </Box>
  );
}

export default ListPengaduan;
