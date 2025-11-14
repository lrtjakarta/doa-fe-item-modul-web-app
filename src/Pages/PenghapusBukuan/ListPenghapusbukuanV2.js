import React, { useEffect, useContext, useState, useCallback } from "react";

import { Box, Grid, Typography, Button, Alert } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { addMonths, format, addDays } from "date-fns";
import moment from "moment";

import CustomNewTableCheklis from "Component/CustomTable/CustomNewTableCheklis";
import FlexBox from "Component/flexbox/FlexBox";
import Title14400 from "Component/Typographys/Title14400";
import Title16700 from "Component/Typographys/Title16700";

import columnShape from "Page-Sections/PenghapusBukuan/column-shapeV2";

import API from "Services/Api";
import { LostFoundContext } from "Context/LostFound";
import { UserProfilContext } from "Context/UserProfile";

const calculateExpiryDate = (expiredValue, expiredType, foundDate) => {
  const _date = moment(foundDate).format("YYYY-MM-DD");
  const _day = expiredValue;
  const _moon = expiredType;
  const _nextDate =
    _moon === "Bulan" ? addMonths(_date, _day) : addDays(_date, _day);

  return _nextDate;
};

const isExpired = (expiredValue, expiredType, foundDate) => {
  const expiryDate = calculateExpiryDate(expiredValue, expiredType, foundDate);
  const currentDate = new Date();
  return expiryDate < currentDate;
};

function ListPenghapusbukuanV2() {
  const navigate = useNavigate();
  const { lostFoundExpired, getLostFoundExpired } =
    useContext(LostFoundContext);
  const { userProfilById } = useContext(UserProfilContext);

  // state
  const [dataItems, setDataItems] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  const [search, setSearch] = useState("");
  const [allData, setAllData] = useState([]);

  const arraysAreDifferent = (array1, array2) => {
    if (array1.length !== array2.length) return true;
    for (let i = 0; i < array1.length; i++) {
      if (array1[i].idNumber !== array2[i].idNumber) return true; // asumsi objek memiliki properti 'id'
    }
    return false;
  };

  const handleView = () => {};

  const handleRowSelect = useCallback(
    (newSelectedRows) => {
      const _dataOriginal = newSelectedRows.map((item) => {
        return item.original;
      });
      const result = arraysAreDifferent(_dataOriginal, selectedRows);
      // console.log('data row', result);
      if (result === true) {
        setSelectedRows(_dataOriginal);
      }
    },
    [selectedRows]
  );

  const handleForm = async (e) => {
    // console.log('data respon', selectedRows);
    navigate("/manajemenBarang/penghapusbukuan/add", {
      state: { data: selectedRows },
    });
  };

  const handleFilter = () => {};

  const handleSearch = async () => {
    const filterData = {
      foundStatus: ["Identified", "Penyimpanan"],
      statusIndetification: [
        "Barang Berharga",
        "Barang Bersifat Tidak Mudah Rusak",
      ],
      startDate,
      endDate,
      foundSearch: search,
    };
    const respon = await API.getLostFoundExpired({ params: filterData });
    if (respon.statusText === "OK") {
      setAllData(respon.data);
    }
  };

  useEffect(() => {
    getLostFoundExpired({
      foundStatus: ["Identified", "Penyimpanan"],
      statusIndetification: [
        "Barang Berharga",
        "Barang Bersifat Tidak Mudah Rusak",
      ],
    });
  }, []);

  useEffect(() => {
    const filterItems = lostFoundExpired.filter((x) =>
      isExpired(
        x.identification.identificationExpired.expiredValue,
        x.identification.identificationExpired.expiredType,
        x.foundDate
      )
    );
    // console.log('data barang expired', filterItems)
    setAllData(filterItems);
  }, [lostFoundExpired]);

  // console.log("data by sort expired", lostFoundExpired);
  return (
    <Box>
      <Grid container spacing={2}>
        {/* <Grid item xs={12} sm={10}>
					<Grid container spacing={2}>
						<Grid item xs={12} sm={3}>
							<DatePicker
								// label="Tgl Start"
								value={startDate}
								onChange={date => setStartDate(date)}
								slots={{
									textField: AppTextField,
								}}
								slotProps={{
									textField: {
										fullWidth: true,
										size: 'small',
										placeholder: 'Tgl Start',
									},
								}}
								sx={{ mt: '0px' }}
								format="dd/MM/yyyy"
							/>
						</Grid>
						<Grid item xs={12} sm={3}>
							<DatePicker
								// label="Tgl End "
								value={endDate}
								onChange={date => setEndDate(date)}
								slots={{
									textField: AppTextField,
								}}
								slotProps={{
									textField: {
										fullWidth: true,
										size: 'small',
										placeholder: 'Tgl End',
									},
								}}
								sx={{ mt: '0px' }}
								format="dd/MM/yyyy"
							/>
						</Grid>
						<Grid item xs={12} sm={3}>
							<SearchInput
								placeholder="Search..."
								value={search}
								onChange={e => setSearch(e.target.value)}
							/>
						</Grid>
						<Grid item xs={10.5} sm={3}>
							<ButtonContainer title="Cari" onClick={handleSearch} />
						</Grid>
					</Grid>
				</Grid> */}
        <Grid
          item
          xs={12}
          sm={12}
          sx={{ display: "flex", justifyContent: "flex-end" }}
        >
          {selectedRows?.length > 0 && (
            <FlexBox alignItems="center" gap={1}>
              <Typography sx={{ fontSize: 14 }}>
                {selectedRows.length} Selected
              </Typography>
              <Button variant="contained" color="error" onClick={handleForm}>
                Penghapusbukuan
              </Button>
            </FlexBox>
          )}
        </Grid>
        {userProfilById?.jobPosition.name === "Kepala Stasiun" ? (
          <Grid item xs={12} sm={12} sx={{ mt: 3, mb: 7 }}>
            {allData?.length > 0 ? (
              <CustomNewTableCheklis
                data={allData}
                columnShape={columnShape({
                  onView: handleView,
                })}
                handleRowSelect={handleRowSelect}
              />
            ) : (
              <Box sx={{ display: "flex", justifyContent: "center" }}>
                <Title16700 text="Data List Barang Kosong." />
              </Box>
            )}
          </Grid>
        ) : (
          <Grid item xs={12} sm={12} sx={{ mt: 3, display: 'flex', justifyContent: 'center' }}>
            <Alert variant="filled" severity="warning" sx={{width: '70%'}}>
              Job Posisi tidak sesuai untuk mengakses halaman ini
            </Alert>
          </Grid>
        )}
      </Grid>
    </Box>
  );
}

export default ListPenghapusbukuanV2;
