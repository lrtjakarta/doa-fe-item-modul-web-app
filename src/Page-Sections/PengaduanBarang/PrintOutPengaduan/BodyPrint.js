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

  return (
    <>
      <Stack direction="row" gap={1} alignItems="center" sx={{ mt: 2 }}>
        <FiberManualRecordIcon sx={{ width: "10px", height: "10px" }} />
        <Typography14 title="Formulir Manual" />
      </Stack>

      <Box sx={{ border: "1px solid black", padding: 1, mt: 1 }}>
        <Grid container spacing={1}>
          <Grid item sm={3}>
            <Typography14 title="Nama Sesuai ID" />
          </Grid>
          <Grid item sm={9}>
            <Typography14 title={": " + " " + dataId?.complaintBy} />
          </Grid>

          <Grid item sm={3}>
            <Typography14 title="Nomor ID" />
          </Grid>
          <Grid item sm={9}>
            <Typography14 title={": " + " " + dataId?.complaintIdentity} />
          </Grid>

          <Grid item sm={3}>
            <Typography14 title="Alamat" />
          </Grid>
          <Grid item sm={9}>
            <Typography14 title={": " + " " + dataId?.complaintAddress} />
          </Grid>

          <Grid item sm={3}>
            <Typography14 title="No. Kontak" />
          </Grid>
          <Grid item sm={9}>
            <Typography14 title={": " + " " + dataId?.complaintIdentity} />
          </Grid>

          <Grid item sm={3}>
            <Typography14 title="Stasiun/Kereta" />
          </Grid>
          <Grid item sm={9}>
            <Typography14 title={": " + " " + dataId?.complaintLocation} />
          </Grid>

          <Grid item sm={3}>
            <Typography14 title="Lokasi" />
          </Grid>
          <Grid item sm={9}>
            <Typography14 title={": " + " " + dataId?.complaintLocation} />
          </Grid>

          <Grid item sm={3}>
            <Typography14 title="Tanggal Kehilangan" />
          </Grid>
          <Grid item sm={9}>
            <Typography14 title={": " + ' ' + moment(dataId?.complaintDate).format("dddd, DD MMMM YYYY") } />
          </Grid>

          <Grid item sm={3}>
            <Typography14 title="Jam" />
          </Grid>
          <Grid item sm={9}>
            <Typography14 title={": " + ' ' + moment(dataId?.complaintTime).format("HH:mm") } />
          </Grid>
        </Grid>
      </Box>

      <Box sx={{ mt: 2 }}>
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
                <Box sx={{ height: "160px" }}>
                  <Typography14 title="1." />
                </Box>
              </td>
              <td rowSpan={2}>
                <Box sx={{ height: "160px" }}>
                  <Typography14 title={dataId?.complaintChronology} />
                </Box>
              </td>
              <td>
                <Box height="80px">
                  <Typography14 title="Jenis Barang Tertinggal:" />
                  <Typography14 title={dataId?.complaintName} />
                </Box>
              </td>
            </tr>

            <tr>
              <td>
                <Box height="80px">
                  <Typography14 title="Detail/Karakteristik Barang Tertinggal:" />
                  <Typography14 title={dataId?.complaintDescription} />
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
              justifyContent: 'flex-end'
            }}
          >
            <Box sx={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
            <Typography14 title="Mengetahui," />
            <Typography14 title={dataId?.complaintOfficer?.officerPosition} />
            {
              dataId?.complaintOfficer?.officerId !== "" ? (
                <GenerateQr dataId={dataId?.complaintOfficer?.officerId} />
              ): null
            }
           
            <Typography14 title={"(" + (dataId?.complaintOfficer?.officerName ? dataId?.complaintOfficer?.officerName: '....................................') + ")"} />
            </Box>
          </Grid>
          
        </Grid>
      </Box>
    </>
  );
}

export default BodyPrint;
