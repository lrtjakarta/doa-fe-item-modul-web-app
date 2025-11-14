import { Box, Divider, Grid, Stack } from "@mui/material";
import moment from "moment";
import HeaderPrint from "Component/CustomPrints/HeaderPrint";
import Typography14 from "Component/Typographys/Typography14";
import GenerateQr from "Component/GenerateQRCode/GenerateQr";
import React from "react";

function PrintPenemuan({ dataId }) {
  moment.locale("id");

  // Diserahkan Oleh
  const startOfficer =
    dataId.storageLocation[dataId.storageLocation.length - 1];
  console.log("startOfficer", startOfficer);

  // Diterima Oleh
  const endOfficer = dataId.storageLocation[dataId.storageLocation.length - 2];

  return (
    <Box sx={{ p: 3, mb: 7 }}>
      <HeaderPrint
        title="Lost & Found"
        number="LRTJ-FR-PEL-020"
        revisi="01"
        page="Page 4 of 5"
      />
      <Box sx={{ mt: 3 }}>
        <Typography14 title="DIVISI" fontWeight={700} />
        <Grid container spacing={1} sx={{ mt: "5px" }}>
          <Grid item sm={4}>
            <Typography14 title="Tanggal Ditemukan" />
          </Grid>
          <Grid item sm={8}>
            <Typography14
              title={
                ": " +
                " " +
                moment(dataId?.foundDate).format("dddd, DD MMMM YYYY")
              }
            />
          </Grid>
          <Grid item sm={4}>
            <Typography14 title="Petugas Stasiun/Teknis" />
          </Grid>
          <Grid item sm={8}>
            <Typography14
              title={": " + " " + dataId?.storageLocation[0]?.officerName}
            />
          </Grid>

          <Grid item sm={4}>
            <Typography14 title="Departemen" />
          </Grid>
          <Grid item sm={8}>
            <Typography14
              title={": " + " " + dataId?.storageLocation[0]?.officerDepartemen}
            />
          </Grid>

          <Grid item sm={4}>
            <Typography14 title="Lokasi" />
          </Grid>
          <Grid item sm={8}>
            <Typography14 title={": " + " " + dataId?.foundLocation} />
          </Grid>

          <Grid item sm={4}>
            <Typography14 title="Penyimpanan" />
          </Grid>
          <Grid item sm={8}>
            <Typography14 title={": " + dataId?.storageLocation[0]?.location} />
          </Grid>
        </Grid>
      </Box>

      <Box sx={{ mt: 3 }}>
        <table className="data-table">
          <tbody>
            <tr>
              <td width="10%">
                <Stack direction="row" justifyContent="center">
                  <Typography14 title="No" fontWeight={700} />
                </Stack>
              </td>
              <td width="50%">
                <Stack direction="row" justifyContent="center">
                  <Typography14 title="KRONOLOGI" fontWeight={700} />
                </Stack>
              </td>
              <td>
                <Stack direction="row" justifyContent="center">
                  <Typography14 title="KETERANGAN" fontWeight={700} />
                </Stack>
              </td>
            </tr>

            <tr>
              <td rowSpan={2}>
                <Box sx={{ height: "200px" }}>
                  <Typography14 title="1." />
                </Box>
              </td>
              <td rowSpan={2}>
                <Box sx={{ height: "200px" }}>
                  <Typography14 title={dataId?.foundChronology} />
                </Box>
              </td>
              <td>
                <Box height="100px">
                  <Typography14 title="Jenis Barang Tertinggal:" />
                  <Typography14 title={dataId?.foundType} />
                </Box>
              </td>
            </tr>

            <tr>
              <td>
                <Box height="100px">
                  <Typography14 title="Detail/Karakteristik Barang Tertinggal:" />
                  <Typography14 title={dataId?.foundDescription} />
                </Box>
              </td>
            </tr>
          </tbody>
        </table>
      </Box>

      <Box sx={{ mt: 3 }}>
        <Grid container spacing={2}>
          <Grid
            item
            xs={12}
            sm={12}
            sx={{
              display: "flex",
              justifyContent: "flex-end",
            }}
          >
            <Stack
              direction="column"
              justifyContent="center"
              alignItems="center"
            >
              <Typography14 title="Mengetahui," />
              <Typography14
                title={dataId?.storageLocation[0]?.officerPosition}
              />
              {dataId?.storageLocation[0]?.officerId ? (
                <GenerateQr dataId={dataId?.storageLocation[0]?.officerId} />
              ) : (
                <Box sx={{ height: "50px" }}></Box>
              )}
              <Typography14
                title={
                  "(" +
                  (dataId?.storageLocation[0]?.officerName
                    ? dataId?.storageLocation[0]?.officerName
                    : "..........................") +
                  ")"
                }
              />
            </Stack>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}

export default PrintPenemuan;
