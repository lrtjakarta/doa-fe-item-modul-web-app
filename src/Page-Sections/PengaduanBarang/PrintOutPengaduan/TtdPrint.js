import React from "react";
import "./DataTable.css";
import Typography14 from "Component/Typography/Typography14";
import { Box, Divider, Grid, Stack } from "@mui/material";
import GenerateQr from "Component/GenerateQRCode/GenerateQr";

function TtdPrint({ dataId }) {
  return (
    <>
      <table className="data-table">
        <tbody>
          <tr >
            <td style={{borderTopColor: 'white'}}>
              <Stack direction="row" justifyContent="center">
                <Typography14 title="Tanda Tangan Pelapor" fontWeight={700} />
              </Stack>
            </td>
            <td style={{borderTopColor: 'white'}}>
              <Stack direction="row" justifyContent="center">
                <Typography14 title="Tanda Tangan Petugas" fontWeight={700} />
              </Stack>
            </td>
          </tr>

          <tr>
            <td>
              <Stack direction="row" justifyContent="center">
              <GenerateQr dataId={dataId?.reporterName} />
              </Stack>
            </td>
            <td>
              <Stack direction="row" justifyContent="center">
              <GenerateQr dataId={dataId?.officer.officerName} />
              </Stack>
            </td>
          </tr>

          <tr>
            <td>
              <Stack direction="row" justifyContent="center">
                <Typography14 title={dataId?.reporterName}  />
              </Stack>
            </td>
            <td>
              <Stack direction="row" justifyContent="center">
              <Typography14 title={dataId?.officer.officerName} />
              </Stack>
            </td>
          </tr>
        </tbody>
      </table>

      {/* <Grid container spacing={2} sx={{ pt: 5 }}>
        <Grid
          item
          sm={4}
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography14 title="Tanda Tangan Pelapor" fontWeight={600} />
          <Box >
            <GenerateQr dataId={dataId?.officer.officerName} />
          </Box>
          <Typography14 title={dataId?.officer.officerName} />
        </Grid>

        <Grid
          item
          sm={4}
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
         <Typography14 title="Diketahui," fontWeight={600} />
         <Typography14 title="Station Head" fontWeight={600} />
        </Grid>

      </Grid> */}
    </>
  );
}

export default TtdPrint;
