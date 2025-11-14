import React from 'react'
import { Box, Stack } from '@mui/material'

import OnCamera from '../../../Assets/oncamera.png'

function QRCode() {
  return (
    <Stack direction='row' justifyContent='center'>
        <Box sx={{display: 'flex', justifyContent: 'center', alignItems: 'center', width: '80%', height: '600px', backgroundColor: '#89898B',}}>
            <img
                src={OnCamera}
                style={{
                    objectFit: 'cover',
                    height: '200px',
                    width: '250px',
                }}
            />
        </Box>
    </Stack>
  )
}

export default QRCode