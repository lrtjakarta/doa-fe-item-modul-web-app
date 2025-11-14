import React from "react";
import "./DataTable.css";
import moment from "moment";
import "moment/locale/id";
import { Box, Divider, Grid, Stack, Typography } from "@mui/material";
import Typography14 from "Component/Typographys/Typography14";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import GenerateQr from "Component/GenerateQRCode/GenerateQr";

function BodyPrint({ dataId }) {
  moment.locale("id");

  // Diserahkan Oleh
  const startOfficer =  dataId.storageLocation[dataId.storageLocation.length - 1];
  console.log('startOfficer', startOfficer)

  // Diterima Oleh
  const endOfficer =  dataId.storageLocation[dataId.storageLocation.length - 2];



  return (
    <>

      <Box sx={{ mt: 3 }}>
        <Typography14 title="INTERNAL TRANSFER" fontWeight={700} />
        <Grid container spacing={2} sx={{ mt: '5px' }}>
          <Grid item sm={8}>
            <Grid container spacing={1}>
              <Grid item sm={4}>
                <Typography14 title="Nama Sesuai ID" />
              </Grid>
              <Grid item sm={8}>
                <Typography14 title={": "} />
              </Grid>

              <Grid item sm={4}>
                <Typography14 title="Diserahkan oleh" />
              </Grid>
              <Grid item sm={8}>
                <Typography14 title={": " + " " + (startOfficer?.officerName ? startOfficer?.officerName : '-')} />
              </Grid>

              <Grid item sm={4}>
                <Typography14 title="Diterima oleh" />
              </Grid>
              <Grid item sm={8}>
                <Typography14 title={": " + " " + (endOfficer?.officerName ? endOfficer?.officerName : '-')} />
              </Grid>

              <Grid item sm={4}>
                <Typography14 title="Departemen" />
              </Grid>
              <Grid item sm={8}>
                <Typography14 title={": " + " " + (startOfficer?.officerDepartemen ? startOfficer?.officerDepartemen : '-')} />
              </Grid>

              <Grid item sm={4}>
                <Typography14 title="Tanggal Serah Terima" />
              </Grid>
              <Grid item sm={8}>
                <Typography14 title={": "  + (endOfficer?.storageDate ? moment(endOfficer?.storageDate).format("dddd, DD MMMM YYYY") : '-')} />
              </Grid>
            </Grid>
          </Grid>
         
        </Grid>
      </Box>

      <Box sx={{ my: 3 }}>
        <Divider />
      </Box>

      <Box>
        <Typography14 title="DIVISI" fontWeight={700} />
        <Grid container spacing={1} sx={{ mt: '5px' }}>
          <Grid item sm={4}>
            <Typography14 title="Tanggal Ditemukan" />
          </Grid>
          <Grid item sm={8}>
            <Typography14 title={": " + ' ' + moment(dataId?.foundDate).format("dddd, DD MMMM YYYY") } />
          </Grid>
          <Grid item sm={4}>
            <Typography14 title="Petugas Stasiun/Teknis" />
          </Grid>
          <Grid item sm={8}>
            <Typography14 title={": " + ' ' + dataId?.storageLocation[0]?.officerName } />
          </Grid>

          <Grid item sm={4}>
            <Typography14 title="Departemen" />
          </Grid>
          <Grid item sm={8}>
            <Typography14 title={": " + ' ' + dataId?.storageLocation[0]?.officerDepartemen} />
          </Grid>

          <Grid item sm={4}>
            <Typography14 title="Lokasi" />
          </Grid>
          <Grid item sm={8}>
            <Typography14 title={": " + ' ' + dataId?.foundLocation} />
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
            sm={4}
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              mt: 2
            }}
          >
            <Typography14 title="Departemen Teknis" />
            <GenerateQr dataId={dataId?.foundBy} />
            <Typography14 title={"(" + dataId?.foundBy + ")"} />
          </Grid>
          <Grid item sm={4}></Grid>
          <Grid
            item
            sm={4}
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Typography14 title="Mengetahui," />
            <Typography14 title="Station Head/Service Leader" />
            <GenerateQr dataId={dataId?.storageLocation[0]?.officerName} />
            <Typography14 title={"(" + (dataId?.storageLocation[0]?.officerName ? dataId?.storageLocation[0]?.officerName : '..........................') + ")"} />
          </Grid>
        </Grid>
      </Box>
    </>
  );
}

export default BodyPrint;
